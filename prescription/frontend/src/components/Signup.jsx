import { useState } from "react";
import { signupUser } from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup() {
    signupUser({ name, email, password }).then(() => {
      alert("Signup successful");
      window.location.href = "/";
    });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Create Account</h3>

        <input
          className="form-control mb-3"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

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

        <button className="btn btn-success w-100" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
