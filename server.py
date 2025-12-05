from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import backend
import analysis
import os



# ------------------------------------------------------------
# ASK AT START: "Type to continue"
# ------------------------------------------------------------
print("\nEnter Port :")
_choice = input().strip()

if _choice not in ["1", "2", "3"]:
    print("Invalid input — defaulting to dataset 1.")
    _choice = "1"

backend.SELECTED_DATASET = _choice
CURRENT_DATASET = _choice

print(f"\n✔ Port selected: {CURRENT_DATASET}")
print("✔ Starting server...\n")

# ------------------------------------------------------------
# FLASK APP
# ------------------------------------------------------------

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


def _get_dataset_id_from_request():
    ds = request.args.get("id")
    return ds if ds else CURRENT_DATASET


@app.route("/", methods=["GET"])
def home():
    return """
    <h1>Backend Server Running ✔</h1>
    <p>Welcome to the hydrological Dashboard</p>
    """


@app.route("/api/select", methods=["GET"])
def select_dataset():
    global CURRENT_DATASET
    ds_id = request.args.get("id")
    if ds_id not in backend.DATASETS:
        return jsonify({"error": "Invalid dataset id. Use 1, 2, or 3"}), 400

    CURRENT_DATASET = ds_id
    backend.SELECTED_DATASET = ds_id
    return jsonify({"selected": CURRENT_DATASET})


@app.route("/api/selected", methods=["GET"])
def get_selected_dataset():
    return jsonify({"selected_dataset": CURRENT_DATASET})


# ------------------ META ------------------ #

@app.route("/api/datasets", methods=["GET"])
def list_datasets():
    return jsonify(backend.get_dataset_metadata())


@app.route("/api/summary", methods=["GET"])
def dataset_summary():
    ds_id = _get_dataset_id_from_request()
    return jsonify(backend.get_basic_summary(ds_id))


# ------------------ PLOTS ------------------ #

@app.route("/api/plot/correlation", methods=["GET"])
def plot_correlation():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_correlation_heatmap(ds_id), mimetype="image/png")


@app.route("/api/plot/ndci", methods=["GET"])
def plot_ndci():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_ndci_trend(ds_id), mimetype="image/png")


@app.route("/api/plot/turbidity", methods=["GET"])
def plot_turbidity():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_turbidity_trend(ds_id), mimetype="image/png")


@app.route("/api/plot/shrinkage", methods=["GET"])
def plot_shrinkage():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_shrinkage_trend(ds_id), mimetype="image/png")


@app.route("/api/plot/violin/ndci", methods=["GET"])
def plot_violin_ndci():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_violin_ndci(ds_id), mimetype="image/png")



@app.route("/api/plot/violin/turbidity", methods=["GET"])
def plot_violin_turbidity():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_violin_turbidity(ds_id), mimetype="image/png")


@app.route("/api/plot/violin/shrinkage", methods=["GET"])
def plot_violin_shrinkage():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_violin_shrinkage(ds_id), mimetype="image/png")



@app.route("/api/plot/box/ndci", methods=["GET"])
def plot_box_ndci():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_box_ndci(ds_id), mimetype="image/png")


@app.route("/api/plot/box/turbidity", methods=["GET"])
def plot_box_turbidity():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_box_turbidity(ds_id), mimetype="image/png")


@app.route("/api/plot/box/shrinkage", methods=["GET"])
def plot_box_shrinkage():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_box_shrinkage(ds_id), mimetype="image/png")


@app.route("/api/plot/model_accuracy", methods=["GET"])
def plot_model_accuracy():
    ds_id = _get_dataset_id_from_request()
    return send_file(backend.plot_model_accuracy(ds_id), mimetype="image/png")


# ------------------ METRICS ------------------ #

@app.route("/api/model/metrics", methods=["GET"])
def model_metrics():
    ds_id = _get_dataset_id_from_request()
    return jsonify(backend.train_and_evaluate_model(ds_id))


# ------------------ ANALYSIS ------------------ #

@app.route("/api/analyze", methods=["POST"])
def analyze():
    body = request.get_json(force=True) or {}
    ds_id = body.get("id", CURRENT_DATASET)
    prompt = body.get("prompt", "")
    return jsonify({"analysis": analysis.generate_textual_analysis(ds_id, prompt)})


# ------------------ EXPORT PDF ------------------ #

@app.route("/api/export/pdf", methods=["GET"])
def export_pdf():
    ds_id = request.args.get("id", CURRENT_DATASET)
    filename_map = {"1": "Analysis.pdf", "2": "Analysis_2.pdf", "3": "Analysis_3.pdf"}
    name = filename_map.get(ds_id, "analysis.pdf")
    path = f"others/{name}"

    if not os.path.exists(path):
        return jsonify({"error": f"PDF '{name}' not found"}), 404

    return send_file(path, mimetype="application/pdf", as_attachment=True)




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8040, debug=True)
