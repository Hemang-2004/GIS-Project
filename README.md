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
## 🚀 Tech Stack

### Core & Data Science

* **Language:** Python 3.9+
* **Data Processing:** Pandas, NumPy
* **Machine Learning:** Scikit-Learn
    * Random Forest (Grid Search Tuned)
    * Gradient Boosting
    * AdaBoost
* **Visualization:** Matplotlib, Seaborn

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

