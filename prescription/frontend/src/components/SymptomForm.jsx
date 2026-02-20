import { useState } from "react";
import { fetchSymptom } from "../services/api";
import RemedyResult from "./RemedyResult";

function SymptomForm() {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState(null);

  function searchRemedy() {
    fetchSymptom(problem).then(data => {
      if (data.length > 0) {
        setResult(data[0]);
      } else {
        setResult("notfound");
      }
    });
  }

  return (
    <div className="card p-4 shadow">
      <div className="input-group">
        <input
          className="form-control"
          placeholder="Enter your symptom (e.g., fever)"
          onChange={e => setProblem(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchRemedy}>
          Get Remedy
        </button>
      </div>

      <RemedyResult result={result} />
    </div>
  );
}

export default SymptomForm;
