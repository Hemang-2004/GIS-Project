import matplotlib.pyplot as plt
import numpy as np

# ================== DATA (ARAL BASIN PAPER 2) ==================
models = ["CART", "SVM", "GTB (100)", "RF (100)"]

accuracy = np.array([85.53, 87.15, 89.48, 90.55])   # %
kappa    = np.array([0.66, 0.75, 0.71, 0.81]) * 100 # ×100
rmse     = np.array([2.150, 2.004, 1.910, 1.818])  # absolute

x = np.arange(len(models))
w = 0.25

# ================== BIG FIGURE ==================
fig, ax1 = plt.subplots(figsize=(16, 7))

# ================== NEW PREMIUM COLOR SCHEME ==================
color_acc   = "#6a0dad"   # Royal Purple → Accuracy
color_kappa = "#00bcd4"   # Cyan / Aqua → Kappa × 100
color_rmse  = "#c2185b"   # Deep Crimson → RMSE
trend_color = "#111111"   # Black trend line

# ================== PRIMARY AXIS (ACCURACY & KAPPA×100) ==================
bars_acc   = ax1.bar(x - w, accuracy, width=w, color=color_acc, label="R2 Confidence (%)")
bars_kappa = ax1.bar(x, kappa, width=w, color=color_kappa, label="Kappa × 100")

# ================== SECONDARY AXIS (RMSE) ==================
ax2 = ax1.twinx()
bars_rmse = ax2.bar(x + w, rmse, width=w, color=color_rmse, label="RMSE")

# ================== ACCURACY TREND LINE ==================
ax1.plot(
    x,
    accuracy,
    linestyle="--",
    marker="o",
    linewidth=3,
    color=trend_color,
    label="Accuracy Trend"
)

# ================== BAR VALUE LABELS ==================
def label_bars(bars, axis, offset):
    for b in bars:
        v = b.get_height()
        axis.text(
            b.get_x() + b.get_width()/2,
            v + offset,
            f"{v:.2f}",
            ha="center",
            fontsize=11,
            fontweight="bold"
        )

label_bars(bars_acc, ax1, 0.5)
label_bars(bars_kappa, ax1, 0.5)
label_bars(bars_rmse, ax2, 0.03)

# ================== AXIS FORMATTING ==================
ax1.set_xticks(x)
ax1.set_xticklabels(models, fontsize=13)
ax1.set_ylabel("Accuracy (%)  |  Kappa × 100", fontsize=13)
ax2.set_ylabel("RMSE", fontsize=13)

ax1.set_ylim(0, 100)
ax2.set_ylim(1.75, 2.25)

# ================== TITLE ==================
plt.title(
    "Triple-Metric Model Performance (Aral Basin – Paper 2)\nAccuracy + Kappa + RMSE",
    fontsize=16,
    fontweight="bold"
)

# ================== GRID ==================
ax1.grid(True, linestyle=":", alpha=0.5)

# ================== MERGED LEGEND ==================
h1, l1 = ax1.get_legend_handles_labels()
h2, l2 = ax2.get_legend_handles_labels()

plt.legend(
    h1 + h2,
    l1 + l2,
    loc="upper left",
    fontsize=12,
    frameon=True
)

plt.tight_layout()
plt.show()
