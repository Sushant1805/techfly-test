export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const fetchInstitutes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/institutes`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching institutes:", err);
    return { ok: false, error: 'Could not fetch institutes' };
  }
};

export const setupAuthOptions = () => {
  return {
    getToken: () => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
      }
      return null;
    },
    setToken: (token: string, user: any) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  };
};
