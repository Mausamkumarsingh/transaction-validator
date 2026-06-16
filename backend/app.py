from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Country-specific phone rules
country_rules = {
    "India": 10,
    "Singapore": 8
}

valid_payment_modes = [
    "UPI",
    "Credit Card",
    "Debit Card",
    "Cash",
    "Net Banking"
]

# Phone Validation
def validate_phone(phone, country):
    phone = str(phone).strip()

    if country not in country_rules:
        return False

    return phone.isdigit() and len(phone) == country_rules[country]

# Date Validation
def validate_date(date_string):
    try:
        datetime.strptime(
            str(date_string),
            "%Y-%m-%d"
        )
        return True
    except:
        return False

# Time Validation
def validate_time(time_string):
    try:
        datetime.strptime(
            str(time_string),
            "%H:%M:%S"
        )
        return True
    except:
        return False

# Payment Validation
def validate_payment(mode):
    return mode in valid_payment_modes


@app.route("/")
def home():
    return "Transaction Validator Backend Running"


@app.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:
        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["file"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    df = pd.read_csv(filepath)

    required_columns = [
        "order_id",
        "product_name",
        "phone",
        "country",
        "date",
        "time",
        "payment_mode",
        "amount"
    ]

    for col in required_columns:
        if col not in df.columns:
            return jsonify({
                "error": f"Missing column: {col}"
            }), 400

    validation_results = []

    for _, row in df.iterrows():

        valid = True

        # Phone Validation
        if not validate_phone(
            row["phone"],
            row["country"]
        ):
            valid = False

        # Date Validation
        if not validate_date(
            row["date"]
        ):
            valid = False

        # Time Validation
        if not validate_time(
            row["time"]
        ):
            valid = False

        # Payment Validation
        if not validate_payment(
            row["payment_mode"]
        ):
            valid = False

        # Amount Validation
        try:
            if float(row["amount"]) < 0:
                valid = False
        except:
            valid = False

        # Product Validation
        if pd.isna(
            row["product_name"]
        ):
            valid = False

        validation_results.append(
            "Valid" if valid else "Invalid"
        )

    df["is_valid"] = validation_results

    output_path = os.path.join(
        UPLOAD_FOLDER,
        "validated_output.csv"
    )

    df.to_csv(
        output_path,
        index=False
    )

    # CSV Chunking
    chunk_size = 1000

    for i in range(
        0,
        len(df),
        chunk_size
    ):

        chunk = df.iloc[
            i:i + chunk_size
        ]

        chunk.to_csv(
            os.path.join(
                UPLOAD_FOLDER,
                f"chunk_{i//chunk_size + 1}.csv"
            ),
            index=False
        )

    return jsonify({
        "message": "Validation completed",
        "rows": len(df),
        "valid_rows": int(
            (df["is_valid"] == "Valid").sum()
        ),
        "invalid_rows": int(
            (df["is_valid"] == "Invalid").sum()
        )
    })


@app.route("/download")
def download():

    file_path = os.path.join(
        UPLOAD_FOLDER,
        "validated_output.csv"
    )

    if not os.path.exists(file_path):
        return jsonify({
            "error":
            "No validated file available. Upload a CSV first."
        }), 404

    return send_file(
        file_path,
        as_attachment=True,
        download_name="validated_output.csv"
    )


if __name__ == "__main__":
    app.run(debug=True)