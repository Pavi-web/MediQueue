import { useState } from 'react';
import { useStore, type Doctor, type Appointment, type Prescription } from '../store';

export default function PatientDashboard() {
  const {
    doctors,
    facilities,
    appointments,
    prescriptions,
    diagnosticBookings,
    bookAppointment,
    bookDiagnostic,
    cancelAppointment,
  } = useStore();

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Booking Modal / Form state
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [patientName, setPatientName] = useState('Pavit Singh');
  const [patientPhone, setPatientPhone] = useState('+91 98765 00000');
  const [symptoms, setSymptoms] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);

  // Diagnostic Booking state
  const [bookingRx, setBookingRx] = useState<Prescription | null>(null);
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedDiagCenter, setSelectedDiagCenter] = useState('');
  const [diagBookingSuccess, setDiagBookingSuccess] = useState(false);

  // Filter doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.facilityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || doc.specialization === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const specializations = Array.from(new Set(doctors.map((d) => d.specialization)));
  const diagCenters = facilities.filter((f) => f.type === 'diagnostic');

  // Handle appointment submission
  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoctor) return;

    const today = new Date().toISOString().split('T')[0];
    const newApt = bookAppointment({
      patientName,
      patientPhone,
      doctorId: bookingDoctor.id,
      doctorName: bookingDoctor.name,
      facilityName: bookingDoctor.facilityName,
      date: today,
      time: '11:00 AM', // Simulated time slot
      symptoms,
    });

    setBookingSuccess(newApt);
    setSymptoms('');
    setTimeout(() => {
      setBookingSuccess(null);
      setBookingDoctor(null);
    }, 4000);
  };

  // Handle diagnostic booking
  const handleDiagBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingRx || !selectedTest || !selectedDiagCenter) return;

    const center = facilities.find((f) => f.id === selectedDiagCenter);
    const today = new Date().toISOString().split('T')[0];

    bookDiagnostic({
      patientName: bookingRx.patientName,
      prescriptionId: bookingRx.id,
      facilityId: selectedDiagCenter,
      facilityName: center ? center.name : 'City Diagnostic Center',
      testName: selectedTest,
      date: today,
      time: '02:00 PM', // Simulated slot
    });

    setDiagBookingSuccess(true);
    setTimeout(() => {
      setDiagBookingSuccess(false);
      setBookingRx(null);
      setSelectedTest('');
      setSelectedDiagCenter('');
    }, 4000);
  };

  // Find active patient bookings (scheduled or active)
  const activeBookings = appointments.filter(
    (apt) => (apt.status === 'scheduled' || apt.status === 'active') && apt.patientName === patientName
  );

  // Find past bookings
  // (Declared for tracking but not visualised directly in initial MVP)

  return (
    <div className="dashboard-grid">
      {/* LEFT COLUMN: Discovery & Records */}
      <div className="sidebar-panel">
        
        {/* Profile Card */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem' }} className="text-primary-gradient">Patient Profile</h3>
          <div className="info-row">
            <span className="opacity-60">Name</span>
            <strong style={{ color: '#fff' }}>{patientName}</strong>
          </div>
          <div className="info-row">
            <span className="opacity-60">Mobile</span>
            <span style={{ color: '#fff' }}>{patientPhone}</span>
          </div>
          <div className="info-row">
            <span className="opacity-60">Location</span>
            <span style={{ color: '#fff' }}>New Delhi, IN</span>
          </div>
        </div>

        {/* Doctor Discovery */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 className="text-primary-gradient">Find Healthcare</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Book appointments at top hospitals & clinics</p>
          </div>

          <input
            type="text"
            className="form-input"
            placeholder="Search doctors or facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-select"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem' }}>{doc.name}</h4>
                    <span className="badge badge-teal" style={{ marginTop: '0.25rem' }}>{doc.specialization}</span>
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    onClick={() => setBookingDoctor(doc)}
                  >
                    Book
                  </button>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', width: '100%' }}>
                  <p style={{ color: '#fff', fontWeight: '500' }}>{doc.facilityName}</p>
                  <p>Experience: {doc.experience}</p>
                  <p>Schedule: {doc.availability}</p>
                </div>
              </div>
            ))}
            {filteredDoctors.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No doctors found matching filters.</p>
            )}
          </div>
        </div>

        {/* Medical Records & Reports */}
        <div className="glass-card">
          <h3 className="text-primary-gradient" style={{ marginBottom: '0.75rem' }}>Medical Records</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Your reports and lab outcomes</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {diagnosticBookings
              .filter((db) => db.patientName === patientName && db.status === 'completed')
              .map((db) => (
                <div key={db.id} className="list-item" style={{ padding: '0.75rem' }}>
                  <div>
                    <h5 style={{ fontSize: '0.85rem', color: '#fff' }}>{db.testName}</h5>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{db.facilityName}</p>
                  </div>
                  <a
                    href={db.reportUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="badge badge-success"
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    View PDF
                  </a>
                </div>
              ))}

            {diagnosticBookings.filter((db) => db.patientName === patientName && db.status === 'completed').length === 0 && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>No reports available yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Active Queues & Prescriptions */}
      <div className="main-panel">
        
        {/* Live Queue tracking */}
        <div>
          <h2 style={{ marginBottom: '0.75rem' }} className="flex-align-center">
            <span className="live-dot" /> Live Queue Tracking
          </h2>
          
          {activeBookings.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {activeBookings.map((apt) => {
                const doc = doctors.find((d) => d.id === apt.doctorId);
                const currentToken = doc ? doc.currentToken : 0;
                
                // Calculate wait estimation
                const diff = apt.tokenNumber - currentToken;
                const isMyTurn = diff === 0;
                const hasPassed = diff < 0;
                const estWait = diff > 0 ? diff * 10 : 0;

                return (
                  <div key={apt.id} className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(13, 148, 136, 0.25)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                      <div>
                        <span className="badge badge-teal">{apt.facilityName}</span>
                        <h3 style={{ margin: '0.35rem 0 0.15rem' }}>{apt.doctorName}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Symptoms: {apt.symptoms}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className="badge badge-info" style={{ textTransform: 'capitalize' }}>{apt.status}</span>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Token Generated</p>
                      </div>
                    </div>

                    <div className="queue-card-lg">
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', zIndex: 1 }}>
                        <div style={{ flex: '1 1 120px' }}>
                          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Currently Serving</span>
                          <div className="text-large text-primary-gradient">
                            {currentToken === 0 ? 'Not Started' : `#${currentToken}`}
                          </div>
                        </div>

                        <div style={{ flex: '1 1 120px' }}>
                          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Your Token</span>
                          <div className="text-large" style={{ color: '#fff' }}>#{apt.tokenNumber}</div>
                        </div>

                        <div style={{ flex: '2 1 200px' }}>
                          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Queue Status</span>
                          <div style={{ fontSize: '1rem', fontWeight: 6, color: isMyTurn ? 'var(--success)' : '#fff', marginTop: '0.35rem' }}>
                            {isMyTurn ? (
                              '🌟 It is your turn! Please enter the cabin.'
                            ) : hasPassed ? (
                              '⚠️ Your token has been called. Please contact the coordinator.'
                            ) : (
                              `⏰ ${diff} patients ahead of you. Est. wait: ~${estWait} mins`
                            )}
                          </div>
                          
                          {!isMyTurn && !hasPassed && (
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                              Recommended arrival: In {Math.max(0, estWait - 15)} mins
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex-justify-between" style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Appointment Time: <strong>{apt.time}</strong> | Date: {apt.date}
                      </p>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        onClick={() => cancelAppointment(apt.id)}
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>You don't have any active appointments for today.</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Choose a doctor from the discovery panel on the left to schedule a token and watch the live queue.</p>
            </div>
          )}
        </div>

        {/* Digital Prescriptions & Smart Booking */}
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Digital Prescriptions</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {prescriptions.map((rx) => (
              <div key={rx.id} className="glass-card" style={{ borderLeft: '4px solid var(--success)' }}>
                <div className="flex-justify-between" style={{ marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ color: '#fff' }}>Prescription from {rx.doctorName}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Date: {rx.date}</p>
                  </div>
                  <span className={`badge ${rx.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                    {rx.status.replace('_', ' ')}
                  </span>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.15)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', whiteSpace: 'pre-line', color: 'var(--text-primary)' }}>{rx.medications}</p>
                  {rx.instructions && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
                      Instructions: {rx.instructions}
                    </p>
                  )}
                </div>

                {rx.recommendedTests.length > 0 && (
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 6, color: '#fff', marginBottom: '0.5rem' }}>Recommended Lab Tests:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      {rx.recommendedTests.map((test) => (
                        <span key={test} className="badge badge-info">{test}</span>
                      ))}
                    </div>

                    {rx.status === 'pending_diagnostic' && (
                      <button
                        className="btn btn-success"
                        style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                        onClick={() => {
                          setBookingRx(rx);
                          setSelectedTest(rx.recommendedTests[0]);
                        }}
                      >
                        Smart Diagnostic Scan Booking
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {prescriptions.length === 0 && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
                No active digital prescriptions found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Book Doctor Appointment */}
      {bookingDoctor && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', background: 'var(--bg-secondary)', padding: '2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Book Appointment Token</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Confirm your booking with <strong>{bookingDoctor.name}</strong> at <strong>{bookingDoctor.facilityName}</strong>.
            </p>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <span className="badge badge-success" style={{ fontSize: '1rem', padding: '0.5rem 1.25rem', marginBottom: '1rem' }}>
                  Booking Confirmed!
                </span>
                <p style={{ fontSize: '1.5rem', fontWeight: 8, color: '#fff', margin: '0.5rem 0' }}>
                  Token: #{bookingSuccess.tokenNumber}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Your live token status is now visible in the main queue tracking dashboard panel.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBook}>
                <div className="form-group">
                  <label className="form-label">Patient Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Chief Symptoms / Reason</label>
                  <textarea
                    required
                    rows={3}
                    className="form-textarea"
                    placeholder="Describe symptoms, e.g. headache, high blood pressure..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </div>

                <div className="grid-2" style={{ marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setBookingDoctor(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Book & Get Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Smart Diagnostic Test Booking */}
      {bookingRx && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', background: 'var(--bg-secondary)', padding: '2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Smart Scan Booking</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Choose a lab or diagnostic scan center for your tests recommended by {bookingRx.doctorName}.
            </p>

            {diagBookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <span className="badge badge-success" style={{ fontSize: '1rem', padding: '0.5rem 1.25rem', marginBottom: '1rem' }}>
                  Diagnostic Slot Booked!
                </span>
                <p style={{ fontSize: '0.9rem', color: '#fff', margin: '0.5rem 0' }}>
                  Lab: {facilities.find(f => f.id === selectedDiagCenter)?.name}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  The diagnostic lab can now view this booking, check-in your physical sample, and upload your PDF report.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDiagBook}>
                <div className="form-group">
                  <label className="form-label">Select Test to Book</label>
                  <select
                    className="form-select"
                    value={selectedTest}
                    onChange={(e) => setSelectedTest(e.target.value)}
                  >
                    {bookingRx.recommendedTests.map((test) => (
                      <option key={test} value={test}>{test}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Choose Near Lab / Diagnostic Center</label>
                  <select
                    required
                    className="form-select"
                    value={selectedDiagCenter}
                    onChange={(e) => setSelectedDiagCenter(e.target.value)}
                  >
                    <option value="">Select diagnostic facility...</option>
                    {diagCenters.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.name} ({center.address})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid-2" style={{ marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setBookingRx(null)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={!selectedDiagCenter} className="btn btn-success">
                    Confirm Lab Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
