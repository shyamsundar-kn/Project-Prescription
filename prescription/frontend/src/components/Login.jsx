import { useState } from "react";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    loginUser(email, password).then(data => {
      if (data) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "/dashboard";
      } else {
        alert("Invalid credentials");
      }
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Medical Login</h3>

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center mt-3">
          New user? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
