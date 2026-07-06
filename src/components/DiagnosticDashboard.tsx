import { useState } from 'react';
import { useStore, type DiagnosticBooking } from '../store';

export default function DiagnosticDashboard() {
  const {
    facilities,
    diagnosticBookings,
    uploadDiagnosticReport,
  } = useStore();

  const diagLabs = facilities.filter((f) => f.type === 'diagnostic');
  const [activeLabId, setActiveLabId] = useState(diagLabs[0]?.id || '');
  const [uploadingBooking, setUploadingBooking] = useState<DiagnosticBooking | null>(null);
  
  // Report Form state
  const [reportName, setReportName] = useState('');
  const [reportUrl, setReportUrl] = useState('');

  const selectedLab = facilities.find((f) => f.id === activeLabId);

  // Bookings assigned to this lab
  const labBookings = diagnosticBookings.filter(
    (db) => db.facilityId === activeLabId
  );

  const pendingBookings = labBookings.filter((b) => b.status === 'pending');
  const completedBookings = labBookings.filter((b) => b.status === 'completed');

  const handleOpenUpload = (booking: DiagnosticBooking) => {
    setUploadingBooking(booking);
    setReportName(`${booking.testName.replace(/\s+/g, '_').toLowerCase()}_report.pdf`);
    // Simulated mock PDF URL
    setReportUrl('https://example.com/reports/' + Math.random().toString(36).substring(7) + '.pdf');
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadingBooking) return;

    uploadDiagnosticReport(uploadingBooking.id, reportName, reportUrl);
    setUploadingBooking(null);
    setReportName('');
    setReportUrl('');
    alert('Medical report uploaded. Patient notified, prescription updated.');
  };

  return (
    <div className="dashboard-grid">
      {/* LEFT COLUMN: Lab details & analytics summary */}
      <div className="sidebar-panel">
        
        {/* Lab Facility Selector */}
        <div className="glass-card">
          <label className="form-label">Logged In Diagnostic Center</label>
          <select
            className="form-select"
            value={activeLabId}
            onChange={(e) => setActiveLabId(e.target.value)}
          >
            {diagLabs.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.name}
              </option>
            ))}
          </select>

          {selectedLab && (
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <p style={{ color: '#fff', fontWeight: 6 }}>{selectedLab.address}</p>
              <p>Specialty: Radiology, Ultrasound, Blood Work</p>
            </div>
          )}
        </div>

        {/* Analytics Card */}
        <div className="glass-card">
          <h3 className="text-primary-gradient" style={{ marginBottom: '1rem' }}>Lab Workload</h3>
          <div className="info-row">
            <span className="opacity-60">Total Lab Bookings</span>
            <strong style={{ color: '#fff' }}>{labBookings.length}</strong>
          </div>
          <div className="info-row">
            <span className="opacity-60">Pending Scans/Tests</span>
            <span className="badge badge-warning">{pendingBookings.length} Pending</span>
          </div>
          <div className="info-row">
            <span className="opacity-60">Completed Reports</span>
            <span className="badge badge-success">{completedBookings.length} Uploaded</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Bookings lists & report upload triggers */}
      <div className="main-panel">
        
        {/* Pending Scan Bookings list */}
        <div>
          <h2 style={{ marginBottom: '1rem' }} className="flex-align-center">
            <span className="live-dot" style={{ backgroundColor: 'var(--warning)' }} /> Pending Scans & Lab Requests
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {pendingBookings.map((booking) => (
              <div key={booking.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>{booking.testName}</h3>
                    <span className="badge badge-warning">Pending Sample</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Patient: <strong>{booking.patientName}</strong> | Scheduled Slot: {booking.date} at {booking.time}
                  </p>
                  {booking.prescriptionId && (
                    <span className="badge badge-teal" style={{ fontSize: '0.65rem', marginTop: '0.4rem' }}>
                      Linked to Rx: {booking.prescriptionId}
                    </span>
                  )}
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenUpload(booking)}
                >
                  Upload Report
                </button>
              </div>
            ))}

            {pendingBookings.length === 0 && (
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No pending diagnostic scans found.</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  When a patient uses "Smart Scan Booking" from their prescription dashboard, the slot request will show up here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Tests & Reports */}
        <div>
          <h2>Completed Test Logs</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {completedBookings.map((booking) => (
              <div key={booking.id} className="glass-card" style={{ borderLeft: '4px solid var(--success)' }}>
                <div className="flex-justify-between" style={{ marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ color: '#fff' }}>{booking.testName}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Patient: <strong>{booking.patientName}</strong>
                    </p>
                  </div>
                  <span className="badge badge-success">Completed & Uploaded</span>
                </div>
                
                <div className="flex-justify-between" style={{ background: 'rgba(0,0,0,0.15)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>File: <strong>{booking.reportName}</strong></span>
                  <a href={booking.reportUrl} target="_blank" rel="noreferrer" style={{ fontWeight: 6 }}>
                    Download Document
                  </a>
                </div>
              </div>
            ))}

            {completedBookings.length === 0 && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                No completed tests logged yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Report Upload Simulator */}
      {uploadingBooking && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '100%', background: 'var(--bg-secondary)', padding: '2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Upload Diagnostic Report</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Simulate file generation and database syncing for <strong>{uploadingBooking.patientName}</strong>.
            </p>

            <form onSubmit={handleUploadSubmit}>
              <div className="form-group">
                <label className="form-label">Generated File Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Simulated Cloud URL Path</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={reportUrl}
                  onChange={(e) => setReportUrl(e.target.value)}
                />
              </div>

              <div className="grid-2" style={{ marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setUploadingBooking(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Complete & Sync Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
