import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setProgress(0);

      const res = await axios.post(
        "https://transaction-validator-backend.onrender.com/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) /
              progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      setMessage(res.data.message);

      setSummary({
        rows: res.data.rows,
        valid: res.data.valid_rows,
        invalid: res.data.invalid_rows,
      });

    } catch (err) {
      console.log(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <h1> Transaction Validator</h1>

      <p>
        Upload transaction CSV files for validation and processing.
      </p>

      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br /><br />

      <button
        onClick={uploadFile}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload CSV
      </button>

      <br /><br />

      {progress > 0 && (
        <div>
          <p>Upload Progress: {progress}%</p>

          <div
            style={{
              width: "100%",
              backgroundColor: "#ddd",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                backgroundColor: "#28a745",
                color: "white",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}

      <br />

      {message && (
        <h3 style={{ color: "green" }}>
          {message}
        </h3>
      )}

      {summary && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <h2>📊 Validation Summary</h2>

          <p>
            <strong>Total Rows:</strong>{" "}
            {summary.rows}
          </p>

          <p style={{ color: "green" }}>
            <strong>✅ Valid Rows:</strong>{" "}
            {summary.valid}
          </p>

          <p style={{ color: "red" }}>
            <strong>❌ Invalid Rows:</strong>{" "}
            {summary.invalid}
          </p>
<button
  onClick={() =>
    window.open(
      "https://transaction-validator-backend.onrender.com/download",
      "_blank"
    )
  }
  style={{
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  ⬇️ Download Validated CSV
</button>
        </div>
      )}
    </div>
  );
}

export default App;