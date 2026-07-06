import { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'patient' | 'doctor' | 'hospital' | 'diagnostic';

export interface Facility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'diagnostic';
  address: string;
  departments?: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  facilityId: string;
  facilityName: string;
  experience: string;
  availability: string;
  currentToken: number;
  totalTokens: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  facilityName: string;
  date: string;
  time: string;
  tokenNumber: number;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  symptoms: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientName: string;
  doctorName: string;
  date: string;
  medications: string;
  recommendedTests: string[];
  instructions: string;
  status: 'pending_diagnostic' | 'tests_booked' | 'completed';
}

export interface DiagnosticBooking {
  id: string;
  patientName: string;
  prescriptionId?: string;
  facilityId: string;
  facilityName: string;
  testName: string;
  date: string;
  time: string;
  status: 'pending' | 'completed';
  reportName?: string;
  reportUrl?: string;
}

interface State {
  currentRole: UserRole;
  facilities: Facility[];
  doctors: Doctor[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  diagnosticBookings: DiagnosticBooking[];
}

interface Actions {
  setRole: (role: UserRole) => void;
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'tokenNumber' | 'status'>) => Appointment;
  updateQueueStatus: (doctorId: string, action: 'call_next' | 'reset' | 'delay') => void;
  addPrescription: (prescription: Omit<Prescription, 'id' | 'status'>) => void;
  bookDiagnostic: (booking: Omit<DiagnosticBooking, 'id' | 'status'>) => void;
  uploadDiagnosticReport: (bookingId: string, reportName: string, reportUrl: string) => void;
  cancelAppointment: (id: string) => void;
  clearAllData: () => void;
}

export type Store = State & Actions;

const defaultFacilities: Facility[] = [
  { id: 'fac-1', name: 'Metro Life Multispecialty Hospital', type: 'hospital', address: 'Sector 62, Noida, UP', departments: ['Cardiology', 'Pediatrics', 'General Medicine'] },
  { id: 'fac-2', name: 'Apex Heart & Care Clinic', type: 'clinic', address: 'Indiranagar, Bengaluru, KA', departments: ['Cardiology', 'Orthopedics'] },
  { id: 'fac-3', name: 'City Diagnostics & Scan Center', type: 'diagnostic', address: 'Connaught Place, New Delhi', departments: ['Radiology', 'Pathology'] },
  { id: 'fac-4', name: 'Care Labs & Imaging', type: 'diagnostic', address: 'Salt Lake, Kolkata, WB', departments: ['Blood Work', 'MRI/CT Scan'] },
];

const defaultDoctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Rohan Malhotra', specialization: 'Cardiology', facilityId: 'fac-1', facilityName: 'Metro Life Multispecialty Hospital', experience: '12 Years', availability: 'Mon, Wed, Fri (10 AM - 4 PM)', currentToken: 1, totalTokens: 3 },
  { id: 'doc-2', name: 'Dr. Shalini Sen', specialization: 'Pediatrics', facilityId: 'fac-1', facilityName: 'Metro Life Multispecialty Hospital', experience: '8 Years', availability: 'Tue, Thu, Sat (11 AM - 3 PM)', currentToken: 0, totalTokens: 1 },
  { id: 'doc-3', name: 'Dr. Vikram Seth', specialization: 'Orthopedics', facilityId: 'fac-2', facilityName: 'Apex Heart & Care Clinic', experience: '15 Years', availability: 'Mon to Sat (4 PM - 8 PM)', currentToken: 2, totalTokens: 2 },
  { id: 'doc-4', name: 'Dr. Amit Verma', specialization: 'General Medicine', facilityId: 'fac-1', facilityName: 'Metro Life Multispecialty Hospital', experience: '6 Years', availability: 'Daily (9 AM - 1 PM)', currentToken: 0, totalTokens: 0 },
];

const defaultAppointments: Appointment[] = [
  {
    id: 'apt-1',
    patientName: 'Priya Sharma',
    patientPhone: '+91 98765 43210',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rohan Malhotra',
    facilityName: 'Metro Life Multispecialty Hospital',
    date: new Date().toISOString().split('T')[0],
    time: '10:15 AM',
    tokenNumber: 1,
    status: 'active',
    symptoms: 'Mild chest pain and shortness of breath during morning walks.',
  },
  {
    id: 'apt-2',
    patientName: 'Rahul Verma',
    patientPhone: '+91 91234 56789',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rohan Malhotra',
    facilityName: 'Metro Life Multispecialty Hospital',
    date: new Date().toISOString().split('T')[0],
    time: '10:30 AM',
    tokenNumber: 2,
    status: 'scheduled',
    symptoms: 'Routine post-surgery checkup and blood pressure monitoring.',
  },
  {
    id: 'apt-3',
    patientName: 'Arjun Das',
    patientPhone: '+91 99887 76655',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rohan Malhotra',
    facilityName: 'Metro Life Multispecialty Hospital',
    date: new Date().toISOString().split('T')[0],
    time: '10:45 AM',
    tokenNumber: 3,
    status: 'scheduled',
    symptoms: 'High blood pressure reading at home.',
  },
  {
    id: 'apt-4',
    patientName: 'Ananya Rao',
    patientPhone: '+91 88776 65544',
    doctorId: 'doc-3',
    doctorName: 'Dr. Vikram Seth',
    facilityName: 'Apex Heart & Care Clinic',
    date: new Date().toISOString().split('T')[0],
    time: '04:15 PM',
    tokenNumber: 1,
    status: 'completed',
    symptoms: 'Knee joint pain after long hours of sitting.',
    notes: 'Prescribed X-Ray and hot water therapy. Reflected in prescription records.',
  },
  {
    id: 'apt-5',
    patientName: 'Aarav Mehta',
    patientPhone: '+91 77665 54433',
    doctorId: 'doc-3',
    doctorName: 'Dr. Vikram Seth',
    facilityName: 'Apex Heart & Care Clinic',
    date: new Date().toISOString().split('T')[0],
    time: '04:30 PM',
    tokenNumber: 2,
    status: 'active',
    symptoms: 'Sprained left ankle during football practice.',
  }
];

const defaultPrescriptions: Prescription[] = [
  {
    id: 'rx-1',
    appointmentId: 'apt-4',
    patientName: 'Ananya Rao',
    doctorName: 'Dr. Vikram Seth',
    date: new Date().toISOString().split('T')[0],
    medications: '1. Tab OsteoPlus 500mg - Once daily for 30 days\n2. Tab JointEase 10mg - After food for 10 days',
    recommendedTests: ['X-Ray Left Knee (AP/Lateral)', 'Blood Test: Calcium Profile'],
    instructions: 'Avoid heavy exercises. Walk 15 mins morning/evening.',
    status: 'pending_diagnostic'
  }
];

const defaultDiagnostics: DiagnosticBooking[] = [
  {
    id: 'diag-1',
    patientName: 'Ananya Rao',
    prescriptionId: 'rx-1',
    facilityId: 'fac-3',
    facilityName: 'City Diagnostics & Scan Center',
    testName: 'X-Ray Left Knee (AP/Lateral)',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    status: 'pending'
  }
];

const StoreContext = createContext<Store | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Load state from localStorage or use defaults
  const [currentRole, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('mq_role') as UserRole) || 'patient';
  });

  const [facilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem('mq_facilities');
    return saved ? JSON.parse(saved) : defaultFacilities;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('mq_doctors');
    return saved ? JSON.parse(saved) : defaultDoctors;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('mq_appointments');
    return saved ? JSON.parse(saved) : defaultAppointments;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem('mq_prescriptions');
    return saved ? JSON.parse(saved) : defaultPrescriptions;
  });

  const [diagnosticBookings, setDiagnosticBookings] = useState<DiagnosticBooking[]>(() => {
    const saved = localStorage.getItem('mq_diagnostics');
    return saved ? JSON.parse(saved) : defaultDiagnostics;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mq_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('mq_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('mq_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('mq_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('mq_diagnostics', JSON.stringify(diagnosticBookings));
  }, [diagnosticBookings]);

  // Actions
  const setRole = (role: UserRole) => {
    setRoleState(role);
  };

  const bookAppointment = (aptData: Omit<Appointment, 'id' | 'tokenNumber' | 'status'>) => {
    // Generate token number for this doctor on this day
    const sameDocApts = appointments.filter(
      (a) => a.doctorId === aptData.doctorId && a.date === aptData.date && a.status !== 'cancelled'
    );
    const tokenNumber = sameDocApts.length + 1;

    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      tokenNumber,
      status: 'scheduled',
    };

    setAppointments((prev) => [...prev, newApt]);

    // Update doctor's total tokens
    setDoctors((prevDoctors) =>
      prevDoctors.map((doc) => {
        if (doc.id === aptData.doctorId) {
          const newTotal = Math.max(doc.totalTokens, tokenNumber);
          // If doctor had 0 tokens, set current token to 1 to kickstart queue
          const newCurrent = doc.currentToken === 0 ? 1 : doc.currentToken;
          return {
            ...doc,
            totalTokens: newTotal,
            currentToken: newCurrent,
          };
        }
        return doc;
      })
    );

    // Auto-update active status if doctor has no active patients and this is token 1
    if (tokenNumber === 1) {
      setTimeout(() => {
        setAppointments((prev) =>
          prev.map((a) => (a.id === newApt.id ? { ...a, status: 'active' } : a))
        );
      }, 100);
    }

    return newApt;
  };

  const updateQueueStatus = (doctorId: string, action: 'call_next' | 'reset' | 'delay') => {
    setDoctors((prevDoctors) =>
      prevDoctors.map((doc) => {
        if (doc.id === doctorId) {
          let nextToken = doc.currentToken;

          if (action === 'call_next') {
            // Find current active appointment for this doctor and mark it as completed
            setAppointments((prevApts) => {
              const currentActive = prevApts.find(
                (a) => a.doctorId === doctorId && a.status === 'active'
              );
              
              let updated = prevApts;
              if (currentActive) {
                updated = updated.map((a) =>
                  a.id === currentActive.id ? { ...a, status: 'completed' } : a
                );
              }

              // Now set the next scheduled token (which is doc.currentToken + 1) to active
              const nextTokenNum = doc.currentToken + 1;
              const nextApt = updated.find(
                (a) => a.doctorId === doctorId && a.tokenNumber === nextTokenNum && a.status === 'scheduled'
              );

              if (nextApt) {
                updated = updated.map((a) =>
                  a.id === nextApt.id ? { ...a, status: 'active' } : a
                );
              }

              return updated;
            });

            nextToken = Math.min(doc.currentToken + 1, doc.totalTokens + 1);
          } else if (action === 'reset') {
            nextToken = 0;
            // Cancel remaining scheduled appointments for this doctor
            setAppointments((prevApts) =>
              prevApts.map((a) =>
                a.doctorId === doctorId && (a.status === 'scheduled' || a.status === 'active')
                  ? { ...a, status: 'cancelled' }
                  : a
              )
            );
          } else if (action === 'delay') {
            // Add a soft visual delay message or wait adjustment
            nextToken = doc.currentToken; // Stays same, but triggers warning
          }

          return { ...doc, currentToken: nextToken };
        }
        return doc;
      })
    );
  };

  const addPrescription = (rxData: Omit<Prescription, 'id' | 'status'>) => {
    const newRx: Prescription = {
      ...rxData,
      id: `rx-${Date.now()}`,
      status: rxData.recommendedTests.length > 0 ? 'pending_diagnostic' : 'completed',
    };

    setPrescriptions((prev) => [...prev, newRx]);

    // Also update the related appointment notes
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === rxData.appointmentId
          ? {
              ...a,
              status: 'completed',
              notes: `Prescription issued. Meds: ${rxData.medications.substring(0, 40)}...`,
            }
          : a
      )
    );
  };

  const bookDiagnostic = (bookingData: Omit<DiagnosticBooking, 'id' | 'status'>) => {
    const newBooking: DiagnosticBooking = {
      ...bookingData,
      id: `diag-${Date.now()}`,
      status: 'pending',
    };

    setDiagnosticBookings((prev) => [...prev, newBooking]);

    // Update prescription status if linked
    if (bookingData.prescriptionId) {
      setPrescriptions((prev) =>
        prev.map((rx) => {
          if (rx.id === bookingData.prescriptionId) {
            // Check if all recommended tests are now booked
            // (In MVP context, booking one test satisfies the visual connection)
            return { ...rx, status: 'tests_booked' };
          }
          return rx;
        })
      );
    }
  };

  const uploadDiagnosticReport = (bookingId: string, reportName: string, reportUrl: string) => {
    setDiagnosticBookings((prev) =>
      prev.map((booking) => {
        if (booking.id === bookingId) {
          // If linked to a prescription, verify and mark that as completed
          if (booking.prescriptionId) {
            setPrescriptions((prevRx) =>
              prevRx.map((rx) =>
                rx.id === booking.prescriptionId ? { ...rx, status: 'completed' } : rx
              )
            );
          }
          return {
            ...booking,
            status: 'completed',
            reportName,
            reportUrl,
          };
        }
        return booking;
      })
    );
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    );
  };

  const clearAllData = () => {
    localStorage.removeItem('mq_doctors');
    localStorage.removeItem('mq_appointments');
    localStorage.removeItem('mq_prescriptions');
    localStorage.removeItem('mq_diagnostics');
    setDoctors(defaultDoctors);
    setAppointments(defaultAppointments);
    setPrescriptions(defaultPrescriptions);
    setDiagnosticBookings(defaultDiagnostics);
  };

  return (
    <StoreContext.Provider
      value={{
        currentRole,
        facilities,
        doctors,
        appointments,
        prescriptions,
        diagnosticBookings,
        setRole,
        bookAppointment,
        updateQueueStatus,
        addPrescription,
        bookDiagnostic,
        uploadDiagnosticReport,
        cancelAppointment,
        clearAllData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
