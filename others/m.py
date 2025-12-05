import pandas as pd

# Load dataset
df = pd.read_csv("dataset-3.csv")   # <-- put your actual filename here

# Apply: new_last_col = 100 - old_last_col
# last_col_name = df.columns[-1]
# df[last_col_name] =  df[last_col_name]

second = df.columns[-2]
df[second] = df[second]+5

first = df.columns[-3]
df[first] = df[first]+4

# Save updated dataset
df.to_csv("dataset_updated_3.csv", index=False)

print("✅ Last column transformed using (100 - value) and saved successfully.")
