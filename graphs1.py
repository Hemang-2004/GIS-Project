import matplotlib.pyplot as plt
import numpy as np

# ================== DATA ==================
models = ["RF (40)", "RF (80)", "GTB (50)", "GTB (100)", "CART"]

# R² as POINT SCALE (0–2)
r2_points = np.array([0.91, 0.90, 0.89, 0.89, 0.88])
rmse = np.array([1.471, 1.424, 1.447, 1.408, 1.505])
mae  = np.array([0.510, 0.550, 0.742, 0.915, 0.890])

x = np.arange(len(models))
w = 0.22   # thin bar width

# ================== BIG FIGURE ==================
fig, ax1 = plt.subplots(figsize=(16, 7))

# ================== COLORS ==================
color_r2bar = "#1f77b4"   # Blue → R² BAR
color_mae   = "#ff7f0e"   # Orange → MAE BAR
color_rmse  = "#2ca02c"   # Green  → RMSE BAR
color_curve = "#000000"   # Black  → R² Curve
color_pts   = "#6a0dad"   # Purple → R² Points

# ================== PRIMARY AXIS (R² BAR + MAE BAR) ==================
bars_r2  = ax1.bar(x - w, r2_points, width=w, color=color_r2bar, label="R² (0–2)")
bars_mae = ax1.bar(x, mae, width=w, color=color_mae, label="MAE")

# ================== SECONDARY AXIS (RMSE BAR) ==================
ax2 = ax1.twinx()
bars_rmse = ax2.bar(x + w, rmse, width=w, color=color_rmse, label="RMSE")

# ================== R² CURVE (MORE ATTRACTIVE) ==================
ax1.plot(
    x - w,
    r2_points,
    linestyle="--",
    linewidth=3,
    color=color_curve,
    marker="o",
    markersize=9,
    markerfacecolor=color_pts,
    markeredgecolor="black",
    label="R² Trend"
)

# ================== VALUE LABELS ==================
def label_bars(bars, axis, offset):
    for b in bars:
        val = b.get_height()
        axis.text(
            b.get_x() + b.get_width() / 2,
            val + offset,
            f"{val:.2f}",
            ha="center",
            fontsize=11,
            fontweight="bold"
        )

label_bars(bars_r2, ax1, 0.04)
label_bars(bars_mae, ax1, 0.05)
label_bars(bars_rmse, ax2, 0.03)

# ================== AXIS SETTINGS ==================
ax1.set_xticks(x)
ax1.set_xticklabels(models, fontsize=13)

ax1.set_ylabel("R² (0–2 scale)  |  MAE", fontsize=13)
ax2.set_ylabel("RMSE", fontsize=13)

ax1.set_ylim(0, 2.0)
ax2.set_ylim(1.30, 1.60)

# ================== TITLE ==================
plt.title(
    "Triple-Parameter Model Performance (Paper-1)\nR² (Bar + Curve) + RMSE + MAE",
    fontsize=17,
    fontweight="bold"
)

# ================== GRID ==================
ax1.grid(True, linestyle=":", alpha=0.6)

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
