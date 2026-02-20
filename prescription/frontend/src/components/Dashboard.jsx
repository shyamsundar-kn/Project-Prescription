import { useState, useEffect } from "react";
import { fetchSymptom } from "../services/api";

export default function Dashboard() {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState(null);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
      window.location.href = "/";
    }
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/";
  };

  /* ---------------- GET REMEDY ---------------- */
  const getRemedy = async () => {
    if (!problem) return;

    try {
      const data = await fetchSymptom(problem);

      if (data.status === "notfound") {
        setResult("notfound");
      } else {
        setResult(data.data);
      }
    } catch (err) {
      console.error(err);
      setResult("notfound");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Medical Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="card p-4 shadow">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your symptom (e.g. fever)"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />

          <button className="btn btn-primary" onClick={getRemedy}>
            Get Remedy
          </button>
        </div>

        {/* ---------------- RESULT DISPLAY ---------------- */}

        {result === "notfound" && (
          <p className="text-danger mt-3">No remedy found.</p>
        )}

        {result && result !== "notfound" && (
          <div className="card mt-4 p-3 bg-light">
            <h5 className="text-primary">Remedy</h5>
            <p>{result.remedy}</p>

            <h6 className="mt-3">Doctor</h6>
            <p>
              {result.doctor_name} ({result.doctor_specialist})
            </p>

            <p>Phone: {result.doctor_phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
