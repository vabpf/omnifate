import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setInitialized(true);
    });
    return () => unsub();
  }, []);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-[#050614] flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="text-purple-300 font-mono text-sm animate-pulse">ĐANG KHỞI TẠO OMNIFATE...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage />;
  }

  return <DashboardPage />;
}
