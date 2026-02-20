function RemedyResult({ result }) {
  if (!result) return null;

  if (result === "notfound") {
    return <p className="text-danger mt-3">No remedy found.</p>;
  }

  return (
    <div className="card mt-4 p-3 bg-light">
      <h5 className="text-primary">Remedy</h5>
      <p>{result.remedy}</p>

      <h6 className="mt-3">Doctor</h6>
      <p>
        {result.doctor.name} ({result.doctor.specialist})
      </p>
      <p>Phone: {result.doctor.phone}</p>
    </div>
  );
}

export default RemedyResult;
