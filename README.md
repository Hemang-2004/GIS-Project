# 🌊 NEREAL Analyzer – Water Quality Intelligence Platform

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Pro-magenta?logo=google)
![License](https://img.shields.io/badge/License-MIT-green)

**NEREAL Analyzer** is an AI-powered analytics system designed for monitoring and predicting inland water quality. By fusing Satellite Data (**Google Earth Engine**) with **Ensemble Machine Learning**, and enhancing it with **Generative AI** (Google Gemini 2.5 Pro), this platform generates automatic, actionable insights for environmental preservation.

---

## 🚀 Key Features

* **Remote Sensing Integration:** Automates extraction of raw satellite data (Sentinel-2/Landsat) using Google Earth Engine.
* **Multi-Parameter Tracking:** Monitors **NDCI** (Algal Blooms), **Turbidity**, and **Water Surface Area** (Shrinkage).
* **Generative AI Reporting:** Uses **Gemini 2.5 Pro** to produce human-readable risk assessments and trend analysis.
* **High-Accuracy Forecasting:** Implements a stacked ensemble model (Random Forest + Gradient Boosting) achieving ~93% R².
* **Full-Stack Dashboard:** A Next.js web application for visualizing correlations, trends, and anomalies.

---

## 📂 Project Structure

```text
C:.
├───data                  # Processed datasets and intermediate files
├───GEE-Codes             # Google Earth Engine scripts (JS/Python)
├───images                # Static assets and plot exports
├───others                # Raw CSV inputs (Place GEE exports here)
├───web-app               # Frontend Application
│   ├───app
│   │   ├───api           # Backend API endpoints (Analyze, Export, Plot)
│   │   ├───ask-nereus    # AI Chatbot interface
│   │   └───dashboard     # Main User Interface
│   ├───components
│   └───lib
└───__pycache__

## 🚀 Tech Stack

### Core & Data Science

* **Language:** Python 3.9+
* **Data Processing:** Pandas, NumPy
* **Machine Learning:** Scikit-Learn
    * Random Forest (Grid Search Tuned)
    * Gradient Boosting
    * AdaBoost
* **Visualization:** Matplotlib, Seaborn

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/nereal-analyzer.git](https://github.com/your-username/nereal-analyzer.git)
cd nereal-analyzer

# Create virtual environment
python -m venv venv

# Activate environment (Windows)
venv\Scripts\activate

# Activate environment (Mac/Linux)
source venv/bin/activate

#Install Dependencies
pip install pandas numpy matplotlib seaborn scikit-learn python-dotenv google-generativeai xgboost

# .env
GEMINI_API_KEY=your_actual_google_gemini_api_key_here

⚠️ Important: Never commit your .env file to GitHub.

## 📊 Usage

### 🔹 Running the Backend Analysis (Terminal)
You can run the analysis engine directly via Python:

```python
import backend
import analysis

# Load Dataset
df = backend.load_dataset("1")

# Generate AI-based Report
report = analysis.generate_textual_analysis(
    dataset_id="1",
    user_prompt="What are the trends for Turbidity in 2024?"
)
print(report)

# Evaluate Model Accuracy
metrics = backend.train_and_evaluate_model("1")
print(metrics)

### 🔹 Launching the Web App
Navigate to the web frontend folder to start the dashboard:

```bash
cd web-app
npm install
npm run dev

Open your browser at: http://localhost:3000

## 📈 Methodology

The NEREAL Analyzer follows a structured 4-stage pipeline:

### 1️⃣ Data Acquisition
* Uses Google Earth Engine scripts located in `GEE-Codes/`.
* **Extracted Parameters:** NDCI (Normalized Difference Chlorophyll Index), Turbidity, and Water Surface Area.

### 2️⃣ Preprocessing & Feature Engineering
* Handled via `backend.py`.
* **Time-series enhancements:** Cyclical Encoding (Day of Year) and Normalized Year Feature.
* Includes automated interpolation and null value handling.

### 3️⃣ Predictive Modeling
* **Model Architecture:** Stacked Ensemble Regressor.
* **Base Models:**
    * Random Forest (GridSearchCV tuned)
    * Gradient Boosting
* **Final Prediction Formula:**
$$Prediction = 0.65(RF) + 0.35(GB)$$
* **Performance:** ~93% R² Accuracy.

### 4️⃣ Generative Insights Engine
* Internal context includes statistical summaries, correlation matrices, and anomaly flags.
* **Gemini 2.5 Pro generates:**
    * Comprehensive Risk Analysis
    * Water Quality Trends
    * Algal Bloom Probabilities
