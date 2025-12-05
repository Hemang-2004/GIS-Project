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
# ==============================
#  MAIN AI ANALYSIS — FINAL FORCED TREND MODE
# ==============================
def generate_textual_analysis(dataset_id: str, user_prompt: str = "", api_key: Optional[str] = None) -> str:

    if not HAS_GEMINI:
        return "Gemini library missing. Run: pip install google-generativeai"

    _configure_gemini(api_key=api_key)

    context = _build_context_text(dataset_id)

    # 🔥 HARD-FORCED SCIENTIFIC QUESTIONS (NO ML METRICS ALLOWED)
    forced_questions = """
QUESTION 1:
What do the long-term trends in turbidity, chlorophyll (algal concentration), and water shrinkage reveal about how these factors are physically linked? Explain how changes in turbidity influence algal behavior, how algae respond over time, and how this combined interaction drives the observed shrinkage patterns in the water body.

QUESTION 2:
Based on the observed data, what is the dominant order of correlation between turbidity, algae (chlorophyll), and water shrinkage? Which variable acts as the primary driver, which responds second, and which emerges as the final outcome? Using this relationship, what future conditions can be predicted if present trends continue?
"""

    # ✅ FINAL LLM PROMPT — ML METRICS COMPLETELY BLOCKED
    full_prompt = f"""
You are an expert in remote sensing, lake ecology, sediment dynamics, and water-body shrinkage analysis.

ABSOLUTE RULES:
- DO NOT mention R², RMSE, MAE, Accuracy, Kappa, or any ML performance metric.
- DO NOT evaluate model performance.
- ONLY analyze physical-environmental trends, causal linkages, and predictions.

You must strictly answer ONLY the two scientific questions below using:
- Trend reasoning
- Physical cause–effect chains
- Turbidity → Algae → Shrinkage linkage
- Correlation order
- Long-term future environmental prediction

===========================
DATA CONTEXT (DO NOT DISCUSS ML METRICS)
===========================
{context}

===========================
FORCED SCIENTIFIC QUESTIONS
===========================
{forced_questions}

Generate a BIG, DEEP, RESEARCH-GRADE EXPLANATION.
"""

    model = genai.GenerativeModel(GEMINI_MODEL_NAME)
    response = model.generate_content(full_prompt)

    return getattr(response, "text", str(response))
