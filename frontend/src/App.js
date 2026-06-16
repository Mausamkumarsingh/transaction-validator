import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);
  const [progress, setProgress] = useState(0);

  const BACKEND_URL =
    "https://transaction-validator-backend.onrender.com";

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
        `${BACKEND_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

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

  const downloadFile = () => {
    window.open(
      `${BACKEND_URL}/download`,
      "_blank"
    );
  };

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "50px auto",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 0 20px rgba(0,0,0,0.15)",
        backgroundColor: "#ffffff",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "10px",
        }}
      >
        Transaction Validator
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#555",
        }}
      >
        Upload transaction CSV files for validation
        and processing.
      </p>

      <br />

      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br />
      <br />

      <button
        onClick={uploadFile}
        style={{
          padding: "12px 25px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Upload CSV
      </button>

      <br />
      <br />

      {progress > 0 && (
        <div>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Upload Progress: {progress}%
          </p>

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
                padding: "8px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}

      <br />

      {message && (
        <h2
          style={{
            color: "green",
          }}
        >
          {message}
        </h2>
      )}

      {summary && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
          }}
        >
          <h2>📊 Validation Summary</h2>

          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Total Rows: {summary.rows}
          </p>

          <p
            style={{
              color: "green",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            ✅ Valid Rows: {summary.valid}
          </p>

          <p
            style={{
              color: "red",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            ❌ Invalid Rows: {summary.invalid}
          </p>

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <button
              onClick={downloadFile}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "14px 28px",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              ⬇️ Download Validated CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;