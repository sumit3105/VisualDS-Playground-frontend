const API_URL = `${import.meta.env.VITE_BACKEND_URL}auth`;

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  if(res.status == 401)
    return { success: false, message: "Invalid Credentials" };  

  const data = await res.text();
  if (res.ok) {
    localStorage.setItem("token", data);
  }
  const decoded = JSON.parse(atob(data.split('.')[1]));
  console.log(decoded);
  return {
    success: true,
    token: data
  };
};

export const signup = async (email, password, name) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      name,
      password
    })
  });

  const message = res.text();
  if(message == "Email is already registered!")
    return { success: false, message: message };

  return { success: true, message: message };
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");