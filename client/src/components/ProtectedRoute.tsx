import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000') + '/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    async function verifyToken() {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        await axios.get(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
      } catch {
        navigate('/login');
      }
    }
    verifyToken();
  }, [token, navigate, authLoading]);

  if (authLoading || loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return <>{children}</>;
}
