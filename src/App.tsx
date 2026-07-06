import { StoreProvider, useStore } from './store';
import Navbar from './components/Navbar';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import HospitalDashboard from './components/HospitalDashboard';
import DiagnosticDashboard from './components/DiagnosticDashboard';

function MainAppContent() {
  const { currentRole } = useStore();

  const renderDashboard = () => {
    switch (currentRole) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'hospital':
        return <HospitalDashboard />;
      case 'diagnostic':
        return <DiagnosticDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="container" style={{ flexGrow: 1 }}>
        {/* Simulator Info Banner */}
        <div 
          className="glass-card" 
          style={{ 
            background: 'rgba(59, 130, 246, 0.08)', 
            border: '1px solid rgba(59, 130, 246, 0.15)', 
            padding: '0.85rem 1.25rem', 
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.50rem', fontSize: '0.825rem' }}>
            <span style={{ color: 'var(--info)', fontWeight: 'bold' }}>💡 Simulator Tip:</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {currentRole === 'patient' && "Book an appointment on the left. Your live token and arrival instructions will appear immediately!"}
              {currentRole === 'doctor' && "Advance queue numbers or prescribe medicine/scans. The Patient Portal updates automatically!"}
              {currentRole === 'hospital' && "Observe district OPD load balancing and check active clinic logs in real-time."}
              {currentRole === 'diagnostic' && "Check pending scans, click 'Upload Report' to submit results and clear the Patient's checklist."}
            </span>
          </div>
          <span 
            className="badge badge-info" 
            style={{ 
              fontSize: '0.65rem', 
              background: 'rgba(59, 130, 246, 0.15)', 
              color: '#93c5fd', 
              textTransform: 'uppercase' 
            }}
          >
            Role Sandbox Mode
          </span>
        </div>

        {/* Dynamic Dashboard Section */}
        {renderDashboard()}
      </main>
      
      {/* Platform Footer */}
      <footer style={{ borderTop: 'var(--glass-border)', padding: '1.25rem', textAlign: 'center', background: 'rgba(17, 24, 39, 0.4)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          MediQueue © 2026. Made with ♥ for Indian Healthcare Coordination.
        </p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
