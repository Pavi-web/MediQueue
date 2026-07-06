import { useStore } from '../store';

export default function HospitalDashboard() {
  const { doctors, appointments, facilities } = useStore();

  // Filter facilities related to hospital/clinics
  const hospitalsList = facilities.filter((f) => f.type === 'hospital' || f.type === 'clinic');

  // Total appointments today at hospital facilities
  const totalApts = appointments.length;
  const completedApts = appointments.filter((a) => a.status === 'completed').length;
  const scheduledApts = appointments.filter((a) => a.status === 'scheduled').length;
  const activeApts = appointments.filter((a) => a.status === 'active').length;
  const cancelledApts = appointments.filter((a) => a.status === 'cancelled').length;

  // Let's compute average wait time estimation based on queue length
  // In manual system, wait time is ~55 mins. Under MediQueue: active scheduled count * 8 mins
  const activeWaitTime = Math.max(15, Math.min(55, scheduledApts * 8 + 12));
  const waitImprovement = 55 - activeWaitTime;

  // Department statistics
  const depts = ['Cardiology', 'Pediatrics', 'General Medicine', 'Orthopedics'];
  const getDeptStats = (dept: string) => {
    const deptDocs = doctors.filter((d) => d.specialization.toLowerCase() === dept.toLowerCase());
    const docIds = deptDocs.map((d) => d.id);
    const deptApts = appointments.filter((a) => docIds.includes(a.doctorId));
    
    return {
      doctorsCount: deptDocs.length,
      activeApts: deptApts.filter((a) => a.status === 'active' || a.status === 'scheduled').length,
      completedApts: deptApts.filter((a) => a.status === 'completed').length,
    };
  };

  return (
    <div className="dashboard-grid">
      {/* LEFT COLUMN: Hospital Profiles & Departments */}
      <div className="sidebar-panel">
        
        {/* Hospital Card */}
        <div className="glass-card">
          <h3 className="text-primary-gradient" style={{ marginBottom: '1rem' }}>Ecosystem Scope</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Active facilities onboarded in target district pilot.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {hospitalsList.map((fac) => (
              <div key={fac.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '0.75rem', gap: '0.25rem' }}>
                <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{fac.name}</strong>
                <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>{fac.type}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{fac.address}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Status */}
        <div className="glass-card">
          <h3 className="text-primary-gradient" style={{ marginBottom: '1rem' }}>Department Loads</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {depts.map((dept) => {
              const stats = getDeptStats(dept);
              const maxLoad = 10; // Mock maximum load
              const fillPct = Math.min(100, ((stats.activeApts) / maxLoad) * 100);

              return (
                <div key={dept} style={{ fontSize: '0.8rem' }}>
                  <div className="flex-justify-between" style={{ marginBottom: '0.25rem' }}>
                    <span style={{ color: '#fff', fontWeight: '500' }}>{dept}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {stats.activeApts} patients ({stats.doctorsCount} doc)
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${fillPct || 5}%`, 
                        background: fillPct > 70 ? 'var(--error)' : fillPct > 40 ? 'var(--warning)' : 'var(--primary)',
                        transition: 'width 0.5s ease-in-out' 
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Operational Metrics & Doctor Rosters */}
      <div className="main-panel">
        
        {/* KPI Scorecards */}
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Operational Analytics</h2>
          
          <div className="grid-3">
            {/* KPI 1 */}
            <div className="glass-card" style={{ textAlign: 'center', position: 'relative' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Total Registrations</span>
              <div className="text-large text-primary-gradient" style={{ margin: '0.5rem 0' }}>{totalApts}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {activeApts} active / {completedApts} done
              </p>
            </div>

            {/* KPI 2 */}
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Avg Wait Time</span>
              <div className="text-large" style={{ color: '#fff', margin: '0.5rem 0' }}>{activeWaitTime} Mins</div>
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                -{Math.round((waitImprovement/55)*100)}% Wait Reduction
              </span>
            </div>

            {/* KPI 3 */}
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>OPD Consult Rate</span>
              <div className="text-large text-primary-gradient" style={{ margin: '0.5rem 0' }}>
                {totalApts > 0 ? Math.round((completedApts / (totalApts - cancelledApts)) * 100) : 0}%
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Completed vs scheduled ratio
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Queue Roster */}
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Live Doctor Roster & Cabin Status</h2>
          
          <div className="glass-card" style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>Doctor</th>
                  <th style={{ padding: '1rem' }}>Specialization</th>
                  <th style={{ padding: '1rem' }}>Facility</th>
                  <th style={{ padding: '1rem' }}>Queue Load</th>
                  <th style={{ padding: '1rem' }}>Cabin Status</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => {
                  const docApts = appointments.filter((a) => a.doctorId === doc.id);
                  const activeApt = docApts.find((a) => a.status === 'active');
                  const remaining = docApts.filter((a) => a.status === 'scheduled').length;

                  let cabinStatus = 'Idle / Ready';
                  let badgeClass = 'badge-secondary';
                  if (activeApt) {
                    cabinStatus = `Consulting: ${activeApt.patientName}`;
                    badgeClass = 'badge-success';
                  } else if (doc.currentToken > doc.totalTokens && doc.totalTokens > 0) {
                    cabinStatus = 'OPD Completed';
                    badgeClass = 'badge-teal';
                  } else if (remaining > 0) {
                    cabinStatus = 'Awaiting Patient Call';
                    badgeClass = 'badge-info';
                  }

                  return (
                    <tr key={doc.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '1rem', fontWeight: 6, color: '#fff' }}>{doc.name}</td>
                      <td style={{ padding: '1rem' }}>{doc.specialization}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{doc.facilityName.split(' ')[0] + ' ' + (doc.facilityName.split(' ')[1] || '')}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ color: '#fff', fontWeight: 6 }}>{doc.currentToken === 0 ? 0 : doc.currentToken}</span>
                        <span style={{ color: 'var(--text-secondary)' }}> / {doc.totalTokens} Tokens</span>
                        {remaining > 0 && <span style={{ color: 'var(--warning)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>({remaining} waiting)</span>}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${badgeClass}`} style={{ fontSize: '0.7rem', textTransform: 'none' }}>
                          {cabinStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
