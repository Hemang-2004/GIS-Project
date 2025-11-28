# 🌊 The NEREAS Analyzer – Water Quality Intelligence Platform

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Pro-magenta?logo=google)

**NEREAS Analyzer** is an AI-powered analytics system designed for monitoring and predicting inland water quality. By fusing Satellite Data (**Google Earth Engine**) with **Ensemble Machine Learning**, and enhancing it with **Generative AI** (Google Gemini 2.5 Pro), this platform generates automatic, actionable insights for environmental preservation.

---

## 🚀 Key Features

* **Remote Sensing Integration:** Automates extraction of raw satellite data (Sentinel-2/Landsat) using Google Earth Engine.
* **Multi-Parameter Tracking:** Monitors **NDCI** (Algal Blooms), **Turbidity**, and **Water Surface Area** (Shrinkage).
* **Generative AI Reporting:** Uses **Gemini 2.5 Pro** to produce human-readable risk assessments and trend analysis.
* **High-Accuracy Forecasting:** Implements a stacked ensemble model (Random Forest + Gradient Boosting) achieving ~93% R².
* **Full-Stack Dashboard:** A Next.js web application for visualizing correlations, trends, and anomalies.

---
## Tech Stack

### Core & Data Science

* **Language:** Python 3.9+
* **Data Processing:** Pandas, NumPy
* **Machine Learning:** Scikit-Learn
    * Random Forest (Grid Search Tuned)
    * Gradient Boosting
    * AdaBoost
* **Visualization:** Matplotlib, Seaborn

---
## Installation & Setup

* **Clone the repository**
git clone https://github.com/Hemang-2004/GIS-Project.git
cd GIS-project

* **Install Dependencies**
  pip install pandas numpy matplotlib seaborn scikit-learn python-dotenv google-generativeai xgboost

* **Configuration (.env file)**
  GEMINI_API_KEY=your_actual_google_gemini_api_key_here

  ⚠️ **Important**: Never commit your .env file to GitHub.

* **Dataset Placement**:Place all exported CSV files from Google Earth Engine inside the others/ directory.

---

## Launching the Web App
cd web-app
npm install
npm run dev

Open your browser at: http://localhost:3000

---

## Methodology 
The NEREAS Analyzer follows 4 stage pipeline:

***Data Acquisition**:
   *Uses Google Earth Engine scripts located in GEE-Codes/
   ***Extracted Parameters**: NDCI, Turbidity, Water Surface Area.

***Preprocessing & Feature Engineering**
   *Handled via backend.py
   ***Time-series enhancements**: Cyclical Encoding (Day of Year), Normalized Year Feature.
   *Interpolation and null value handling.

***Predictive Modeling**
   *Stacked Ensemble Regressor combining:
      *Random Forest Regression 
      *CART Regression
   ***Final Prediction Formula:** $$Prediction = 0.65(RF) + 0.35(GB)$$
   ***Accuracy**:~92-93%
      
  
  
