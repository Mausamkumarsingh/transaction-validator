# 🚀 Transaction Validator & Processing Platform

A scalable web-based platform for transaction data validation and processing built using **React.js** and **Flask**.

The platform validates transaction datasets, performs country-specific checks, generates cleaned output files, and automatically splits large CSV files into manageable chunks.

---

## 🌐 Live Demo

### Frontend (Vercel)
🔗 https://transaction-validators-gfh84auno-mausam-kumars-projects.vercel.app/

### Backend API (Render)
🔗 https://transaction-validator-backend.onrender.com/

---

## ✨ Features

### ✅ Transaction Data Validation
- Order-level validation
- Product-level validation
- Payment mode validation
- Data integrity checks

### 🌍 Country-Specific Phone Validation

| Country | Phone Length |
|---------|-------------|
| India | 10 digits |
| Singapore | 8 digits |

### 📅 Date Validation
- Validates dates against predefined formats.
- Detects invalid date entries.

### 🔍 General Data Integrity Checks
- Missing values detection
- Invalid formats detection
- Incorrect data identification

### 📥 Download Validated CSV
Generates cleaned and validated output files for download.

### ✂️ CSV Chunking
Automatically splits large CSV files into smaller chunks for efficient processing.

### 📊 Validation Summary
Displays:
- Total Rows
- Valid Rows
- Invalid Rows

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Flask
- Flask-CORS
- Pandas

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```text
transaction-validator/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── uploads/
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Mausamkumarsingh/transaction-validator.git
cd transaction-validator
```

---

## Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

Backend runs at:

```text
http://127.0.0.1:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

## 📄 Sample CSV Format

```csv
order_id,product_name,phone,country,date,payment_mode,amount
1,Laptop,9876543210,India,2026-06-15,Credit Card,1000
2,Phone,12345,India,2026-06-15,UPI,500
3,Headphone,91234567,Singapore,2026-06-15,Cash,700
4,TV,987654321,India,15/06/2026,Credit Card,1200
5,Smart Watch,87654321,Singapore,2026-06-15,Debit Card,900
```

---

## 🧪 Validation Logic

### Phone Validation

- India → 10 digits
- Singapore → 8 digits

### Date Validation

Accepted format:

```text
YYYY-MM-DD
```

Rows are marked as:

```text
Valid
Invalid
```

---

## 📥 Generated Files

- `validated_output.csv`
- `chunk_1.csv`
- `chunk_2.csv`
- `chunk_n.csv`

---

## 🚀 Deployment

### Frontend (Vercel)

```text
https://YOUR_VERCEL_URL
```

### Backend (Render)

```text
https://YOUR_RENDER_URL
```

---

## 📝 Project Approach

Built a scalable transaction validation platform using React and Flask. The system validates international phone numbers, date formats, and transaction integrity while generating downloadable cleaned CSV files and splitting large datasets into manageable chunks. The solution is designed to support diverse international transaction formats efficiently.

---

## 🔮 Future Enhancements

- Support for additional countries
- Authentication system
- Database integration
- Dashboard analytics
- Drag & Drop file upload
- Real-time upload progress

---

## 👨‍💻 Author

**Mausam Kumar**

- B.E. Computer Science Engineering
- Chandigarh University

GitHub:
https://github.com/Mausamkumarsingh

---

⭐ If you found this project useful, consider giving it a star!
