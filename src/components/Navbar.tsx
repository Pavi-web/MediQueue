import { useStore, type UserRole } from '../store';

export default function Navbar() {
  const { currentRole, setRole, clearAllData } = useStore();

  const roles = [
    {
      id: 'patient',
      label: 'Patient Portal',
      color: 'var(--primary)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'doctor',
      label: 'Doctor Console',
      color: 'var(--success)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.8 8H12" />
          <path d="M16 8h3.2" />
          <path d="M12 4v8" />
          <path d="M12 12a4 4 0 1 0 8 0v-2.7a2.7 2.7 0 0 0-5.4 0v1.35c0 .75-.6 1.35-1.35 1.35a1.35 1.35 0 0 1-1.35-1.35v-1.35c0-.75-.6-1.35-1.35-1.35A1.35 1.35 0 0 0 9.3 9.45v1.35c0 .75-.6 1.35-1.35 1.35A1.35 1.35 0 0 1 6.6 10.8V4.8C6.6 4.36 6.96 4 7.4 4h9.2c.44 0 .8.36.8.8v6c0 .75-.6 1.35-1.35 1.35a1.35 1.35 0 0 1-1.35-1.35v-.6" />
          <path d="M12 16v4" />
          <path d="M8 20h8" />
        </svg>
      ),
    },
    {
      id: 'hospital',
      label: 'Hospital Admin',
      color: 'var(--info)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
          <path d="M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
          <path d="M10 9h4" />
          <path d="M12 7v4" />
        </svg>
      ),
    },
    {
      id: 'diagnostic',
      label: 'Diagnostics Lab',
      color: 'var(--warning)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v7.31" />
          <path d="M14 2v7.31" />
          <path d="M8.5 2h7" />
          <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
          <path d="M8.5 15h7" />
        </svg>
      ),
    },
  ];

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all mock data to defaults?')) {
      clearAllData();
      alert('Data reset successfully.');
      window.location.reload();
    }
  };

  return (
    <header className="hud-header">
      <div className="hud-container">
        <div className="logo-section">
          <div className="logo-icon">MQ</div>
          <div>
            <h1 className="logo-text">MediQueue</h1>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '-2px' }}>
              Integrated Coordination System
            </p>
          </div>
        </div>

        <div className="role-switcher-hud">
          {roles.map((role) => (
            <button
              key={role.id}
              className={`role-btn ${currentRole === role.id ? 'active' : ''}`}
              onClick={() => setRole(role.id as UserRole)}
              style={
                currentRole === role.id
                  ? { background: `linear-gradient(135deg, ${role.color}, rgba(255,255,255,0.05))` }
                  : {}
              }
            >
              {role.icon}
              <span>{role.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-align-center">
          <div className="badge badge-success flex-align-center" style={{ padding: '0.35rem 0.75rem', background: 'rgba(16, 185, 129, 0.08)' }}>
            <span className="live-dot" />
            <span style={{ fontSize: '0.7rem' }}>Sim State: Connected</span>
          </div>
          
          <button 
            className="btn btn-secondary" 
            onClick={handleReset}
            title="Reset Mock Data"
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-full)', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', color: 'var(--text-secondary)' }}>
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
