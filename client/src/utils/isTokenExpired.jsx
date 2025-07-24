const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true; // No token means expired/unauthenticated

  try {
    // Split the token to get the payload (second part of JWT)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix base64 encoding
    const decoded = JSON.parse(atob(base64)); // Decode the base64 payload

    const currentTime = Date.now() / 1000; // Get current time in seconds
    const expirationTime = decoded.exp;

    return expirationTime < currentTime; // Compare token expiry with current time
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // If any error occurs during decoding, consider token as expired
  }
};

export default isTokenExpired;
