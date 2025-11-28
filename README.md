# 🌊 The NEREAS Analyzer – Water Quality Intelligence Platform

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Pro-magenta?logo=google)

**NEREAS Analyzer** is an AI-powered analytics system designed for monitoring and predicting inland water quality. By fusing Satellite Data (**Google Earth Engine**) with **Ensemble Machine Learning**, and enhancing it with **Generative AI** (Google Gemini 2.5 Pro), this platform generates automatic, actionable insights for environmental preservation.

---

## Key Features

* **Remote Sensing Integration:** Automates extraction of raw satellite data (Sentinel-2/Landsat) using Google Earth Engine.
* **Multi-Parameter Tracking:** Monitors **NDCI** (Algal Blooms), **Turbidity**, and **Water Surface Area** (Shrinkage).
* **Generative AI Reporting:** Uses **Gemini 2.5 Pro** to produce human-readable risk assessments and trend analysis.
* **High-Accuracy Forecasting:** Implements a stacked ensemble model (Random Forest + CART regression) achieving ~92-93% R².

---
## Tech Stack

### Core & Data Science

* **Language:** Python 3.9+
* **Data Processing:** Pandas, NumPy
* **Machine Learning:** Scikit-Learn
    * Random Forest (Grid Search Tuned)
    * CART Regression
* **Visualization:** Matplotlib, Seaborn

---
## Installation & Setup

* **Clone the repository**
```bash
git clone https://github.com/Hemang-2004/GIS-Project.git
cd GIS-project
```
* **Install Dependencies**
 ```bash
  pip install pandas numpy matplotlib seaborn scikit-learn python-dotenv google-generativeai xgboost
  ```

* **Configuration (.env file)**
```bash
  GEMINI_API_KEY=your_actual_google_gemini_api_key_here
```
  ⚠️ **Important**: Never commit your .env file to GitHub.

* **Dataset Placement**:Place all exported CSV files from Google Earth Engine inside the others/ directory.

---

## Launching the Web App
```bash
cd web-app
npm install
npm run dev
```
Open your browser at: http://localhost:3000
---

## Methodology

The **NEREAS Analyzer** follows a comprehensive **4-stage pipeline**:

### 1️⃣ Data Acquisition
* **Source:** Uses Google Earth Engine (GEE) scripts located in the `GEE-Codes/` directory.
* **Extracted Parameters:**
    * **NDCI** (Normalized Difference Chlorophyll Index)
    * **Turbidity**
    * **Water Surface Area**

### 2️⃣ Preprocessing & Feature Engineering
* **Logic:** Handled via `backend.py`.
* **Time-Series Enhancements:**
    * Cyclical Encoding (Sine/Cosine for Day of Year).
    * Normalized Year Feature.
* **Cleaning:** Interpolation and null value handling.

### 3️⃣ Predictive Modeling
* **Model:** Stacked Ensemble Regressor combining:
    * **Random Forest Regression** (Base)
    * **Gradient Boosting Regression** (Booster)
* **Final Prediction Formula:**
    $$Prediction = 0.65(RF) + 0.35(GB)$$
* **Performance:** Achieves an approximate accuracy of **~92-93%**.

### 4️⃣ Generative Insights Engine
* **Integration:** Powered by **Google Gemini 2.5 Pro**.
* **Function:** Ingests statistical summaries and model predictions to generate automated text reports, identifying risks (algal blooms) and anomalies in plain English.
---
## Acknowledgement
Built with care and code for Earth’s Water Bodies. If this project helps you, please star ⭐ it on GitHub!
  
  
