import os
from typing import Optional
import pandas as pd
import backend

# ==============================
#  AUTO-LOAD .env (FASTER THAN os.getenv)
# ==============================
from dotenv import load_dotenv
load_dotenv()   # loads .env once → variables available instantly

# ==============================
#  TRY IMPORT GEMINI
# ==============================
try:
    import google.generativeai as genai
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False


GEMINI_MODEL_NAME = "gemini-2.5-pro"


# ==============================
#  CONFIGURE GEMINI
# ==============================
def _configure_gemini(api_key: Optional[str] = None) -> None:
    if not HAS_GEMINI:
        raise RuntimeError("The 'google-generativeai' package is not installed.")

    # FASTEST: Load directly from environment (already loaded via dotenv)
    key = api_key or os.environ.get("GEMINI_API_KEY")

    if not key:
        raise RuntimeError(
            "Gemini API key not found. Add GEMINI_API_KEY to .env file "
            "or pass api_key directly."
        )

    genai.configure(api_key=key)


# ==============================
#  BUILD CONTEXT (IMPROVED)
# ==============================
def _build_context_text(dataset_id: str) -> str:
    df = backend.load_dataset(dataset_id)
    summary = backend.get_basic_summary(dataset_id)
    corr = backend.get_corr_matrix(dataset_id)
    metrics = backend.train_and_evaluate_model(dataset_id)

    corr_rounded = corr.round(3)

    context_lines = [
        f"Dataset ID: {dataset_id}",
        f"Total Rows: {len(df)}",

        "\n=== SUMMARY STATISTICS ===",
        str(pd.DataFrame(summary['summary'])),

        "\n=== NULL VALUE COUNTS ===",
        str(summary["null_counts"]),

        "\n=== CORRELATION MATRIX (rounded) ===",
        str(corr_rounded),

        "\n=== MODEL PERFORMANCE (ML Predictions) ===",
        f"Display Model R²: {metrics['display_r2']}  (~{metrics['display_r2_percent']:.2f}%)",
        f"Display Model RMSE: {metrics['display_rmse']}",

        "\n=== FORECASTING REQUIREMENT ===",
        "Please analyze patterns and PREDICT future values for:",
        "- NDCI_Value",
        "- Turbidity_NTU",
        "- Shrinkage_Percent",
        "",
        "Also identify trends, warnings, anomalies, and stability indicators.",
    ]

    return "\n".join(context_lines)


# ==============================
#  MAIN AI ANALYSIS
# ==============================
def generate_textual_analysis(dataset_id: str, user_prompt: str = "", api_key: Optional[str] = None) -> str:

    if not HAS_GEMINI:
        return "Gemini library missing. Run: pip install google-generativeai"

    _configure_gemini(api_key=api_key)

    context = _build_context_text(dataset_id)

    full_prompt = f"""
You are an expert in remote sensing, lake ecology, and water quality ML analysis.

Using the dataset + ML model summary below, provide:

1. A high-quality structured analytical report  
2. Detailed bullet points  
3. Trend analysis across all parameters  
4. Future predictions (short-term & long-term)  
5. Risk analysis (e.g., algal bloom probability, turbidity surges)  
6. Anomaly detection  
7. Actionable insights  
8. A clear final conclusion  

===========================
DATA + MODEL CONTEXT
===========================
{context}

===========================
USER QUESTION / FOCUS AREA
===========================
{user_prompt}

Now generate the final full analysis.
"""

    model = genai.GenerativeModel(GEMINI_MODEL_NAME)
    response = model.generate_content(full_prompt)

    return getattr(response, "text", str(response))
