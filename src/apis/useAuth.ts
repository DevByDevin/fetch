export const checkSession = async (name: string, email: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return true;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};
