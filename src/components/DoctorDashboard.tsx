import { useState } from 'react';
import { useStore } from '../store';

export default function DoctorDashboard() {
  const {
    doctors,
    appointments,
    updateQueueStatus,
    addPrescription,
  } = useStore();

  // Selected doctor state (default to first doctor: Dr. Rohan)
  const [activeDocId, setActiveDocId] = useState(doctors[0]?.id || '');
  
  // Prescription form state
  const [medications, setMedications] = useState('');
  const [testInput, setTestInput] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prescriptionSuccess, setPrescriptionSuccess] = useState(false);

  const selectedDoctor = doctors.find((d) => d.id === activeDocId);

  // Appointments for this doctor today
  const docAppointments = appointments.filter(
    (apt) => apt.doctorId === activeDocId
  ).sort((a, b) => a.tokenNumber - b.tokenNumber);

  // Active patient (the one currently in the cabin)
  const activeApt = docAppointments.find((apt) => apt.status === 'active');

  // Next patient in line
  const nextApt = docAppointments.find(
    (apt) => apt.status === 'scheduled' && apt.tokenNumber === (selectedDoctor?.currentToken || 0) + 1
  );

  const handleCallNext = () => {
    if (selectedDoctor) {
      updateQueueStatus(selectedDoctor.id, 'call_next');
      // Reset prescription form for the new patient
      setMedications('');
      setTestInput('');
      setInstructions('');
    }
  };

  const handleResetQueue = () => {
    if (selectedDoctor && confirm('Warning: This will clear the entire queue for today. Proceed?')) {
      updateQueueStatus(selectedDoctor.id, 'reset');
    }
  };

  const handlePrescribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApt) return;

    // Parse recommended tests from comma-separated input
    const tests = testInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addPrescription({
      appointmentId: activeApt.id,
      patientName: activeApt.patientName,
      doctorName: activeApt.doctorName,
      date: new Date().toISOString().split('T')[0],
      medications,
      recommendedTests: tests,
      instructions,
    });

    setPrescriptionSuccess(true);
    setTimeout(() => {
      setPrescriptionSuccess(false);
      // Auto-advance to next patient after prescribing
      handleCallNext();
    }, 2000);
  };

  return (
    <div className="dashboard-grid">
      {/* LEFT COLUMN: Doctor profile & Schedule lists */}
      <div className="sidebar-panel">
        
        {/* Doctor Selector */}
        <div className="glass-card">
          <label className="form-label">Logged In Doctor</label>
          <select
            className="form-select"
            value={activeDocId}
            onChange={(e) => setActiveDocId(e.target.value)}
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>

          {selectedDoctor && (
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <p style={{ color: '#fff', fontWeight: 6 }}>{selectedDoctor.facilityName}</p>
              <p>Schedule: {selectedDoctor.availability}</p>
              <p>Experience: {selectedDoctor.experience}</p>
            </div>
          )}
        </div>

        {/* Daily Queue schedule */}
        <div className="glass-card">
          <h3 className="text-primary-gradient" style={{ marginBottom: '0.75rem' }}>Today's Queue</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Total Tokens: {selectedDoctor?.totalTokens || 0}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
            {docAppointments.map((apt) => (
              <div 
                key={apt.id} 
                className="list-item" 
                style={{ 
                  padding: '0.75rem',
                  borderLeft: apt.status === 'active' ? '4px solid var(--success)' : '1px solid rgba(255,255,255,0.04)' 
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ color: '#fff' }}>Token #{apt.tokenNumber}</strong>
                    <span style={{ fontSize: '0.8rem' }}>{apt.patientName}</span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {apt.time} - {apt.symptoms.substring(0, 30)}...
                  </p>
                </div>
                <span className={`badge ${
                  apt.status === 'active' ? 'badge-success' :
                  apt.status === 'scheduled' ? 'badge-info' :
                  apt.status === 'completed' ? 'badge-teal' : 'badge-error'
                }`} style={{ padding: '0.15rem 0.5rem', fontSize: '0.65rem' }}>
                  {apt.status}
                </span>
              </div>
            ))}

            {docAppointments.length === 0 && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                No appointments scheduled for today.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Queue operations HUD & Prescription issuer */}
      <div className="main-panel">
        
        {/* Queue Operations HUD */}
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Queue Live Operations</h2>
          
          <div className="glass-card">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="live-dot" />
                  <h3 style={{ fontSize: '1.25rem' }}>Active Cabin Monitor</h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Manage consultations and advance tokens in real-time.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => updateQueueStatus(activeDocId, 'delay')}
                  disabled={!selectedDoctor || selectedDoctor.currentToken === 0}
                >
                  Broadcast Delay (10m)
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleResetQueue}
                  disabled={!selectedDoctor || selectedDoctor.totalTokens === 0}
                >
                  Emergency Reset
                </button>
              </div>
            </div>

            {/* Active Consult panel */}
            <div className="queue-card-lg" style={{ background: 'rgba(31, 41, 55, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: 'none' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', alignItems: 'center' }}>
                
                {activeApt ? (
                  <div style={{ flex: '2 1 300px' }}>
                    <div className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Currently In Cabin</div>
                    <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>{activeApt.patientName}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Token: <strong>#{activeApt.tokenNumber}</strong> | Phone: {activeApt.patientPhone}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#fff', marginTop: '0.5rem', fontStyle: 'italic', background: 'rgba(0,0,0,0.15)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      " {activeApt.symptoms} "
                    </p>
                  </div>
                ) : (
                  <div style={{ flex: '2 1 300px' }}>
                    <div className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>Cabin Status</div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>No active patient in consultation</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {nextApt ? `Next patient in line: Token #${nextApt.tokenNumber} (${nextApt.patientName})` : 'Queue is currently empty.'}
                    </p>
                  </div>
                )}

                <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Current Token Serving</span>
                  <div className="text-large text-primary-gradient">
                    {selectedDoctor?.currentToken === 0 ? 'Not Started' : `#${selectedDoctor?.currentToken}`}
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.6rem 1rem' }}
                    onClick={handleCallNext}
                    disabled={!selectedDoctor || selectedDoctor.currentToken > selectedDoctor.totalTokens || (selectedDoctor.totalTokens === 0)}
                  >
                    {selectedDoctor && selectedDoctor.currentToken === 0 ? 'Start Consults' : 'Call Next Patient'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Prescription Pad */}
        <div>
          <h2>Digital Prescription Pad</h2>
          
          {activeApt ? (
            <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Issuing Rx for patient:</p>
                <h4 style={{ color: '#fff', fontSize: '1.15rem' }}>{activeApt.patientName} (Token #{activeApt.tokenNumber})</h4>
              </div>

              {prescriptionSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.95rem', padding: '0.5rem 1.25rem', marginBottom: '1rem' }}>
                    Prescription Submitted Successfully!
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Prescription records updated. Shifting to next patient in queue...
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePrescribeSubmit}>
                  <div className="form-group">
                    <label className="form-label">Medications (One per line with dosage)</label>
                    <textarea
                      required
                      rows={4}
                      className="form-textarea"
                      placeholder="e.g.&#10;1. Tab Paracetamol 650mg - Thrice daily after food (3 days)&#10;2. Syrup CoughRelief 10ml - Morning/Night"
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Recommended Lab Scans & Tests (Comma-separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. X-Ray Left Knee, Blood Test: Calcium Profile, MRI Brain"
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                      Recommending a test allows the patient to click-book it immediately at a diagnostic center.
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">General Advice / Instructions</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      placeholder="e.g. Bed rest for 2 days. Drink plenty of warm fluids."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-success" style={{ width: '100%', marginTop: '0.75rem' }}>
                    Submit Prescription & Complete Consult
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                No patient is currently in active consultation.
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Please select "Call Next Patient" from the Cabin Monitor to call a patient into the cabin and unlock the prescription sheet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
