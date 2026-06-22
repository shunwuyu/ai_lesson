---
name: data-analysis
description: |
  Comprehensive data analysis workflow for CSV files with interactive guidance and flexible output formats.
  Use this skill whenever the user mentions: analyzing data, CSV files, data insights, generating reports,
  data cleaning, exploratory analysis, business metrics, sales analysis, user behavior analysis, data visualization,
  creating dashboards, or asks questions like "what does this data tell us?" or "analyze this dataset".
  Also trigger when the user provides a CSV file path and asks for any kind of analysis or summary.
  This skill provides a professional 7-step workflow with quality checks, interactive cleaning strategy selection,
  and multiple output formats (Markdown report, interactive HTML, or full dashboard).
---

# Data Analysis Skill

A comprehensive, interactive data analysis workflow that transforms CSV data into actionable business insights. This skill guides you through professional data analysis from initial exploration to final deliverable, with quality gates and user confirmations at key decision points.

## Core Workflow

This skill follows a 7-step methodology with 3 interaction points:

```
Input → Business Understanding → Data Inspection → Cleaning Strategy → EDA → Deep Analysis → Insights → Output
  ↓           ↓                      ↓                ↓                ↓           ↓          ↓
Required   Interaction 1        Quality Gate     Interaction 2    Auto-run    Auto-run   Interaction 3
```

---

## Input Requirements

**Required:**
- CSV file path (absolute or relative)
- Business question or analysis goal

**Optional:**
- Data dictionary (field descriptions)
- Analysis depth: `--quick` (basic stats), `--standard` (default), or `--deep` (advanced modeling)
- Auto mode: `--auto` (skip interactions, use recommended strategies)
- Output preference: `--format=markdown|html|dashboard`

**Usage examples:**
```
"Analyze sales_data.csv - I want to know which channels have the best conversion rates"
"Help me understand customer_behavior.csv, specifically looking at retention patterns"
"Quick analysis of Q4_results.csv --quick --auto"
```

---

## Step 1: Business Understanding (Interaction Point 1)

### Your Actions

1. **Parse the business question** and identify:
   - Key metrics mentioned (revenue, conversion rate, churn, etc.)
   - Analysis type needed (trend analysis, comparison, attribution, prediction)
   - Expected dimensions (time, geography, customer segments, channels)
   - Chart types that would best illustrate the answer

2. **Generate an analysis plan** in this format:
   ```markdown
   ## Analysis Plan

   **Core Question:** [Restate the user's goal in one sentence]

   **Key Metrics to Calculate:**
   - [Metric 1: e.g., Monthly conversion rate by channel]
   - [Metric 2: e.g., Average order value trend]

   **Analysis Dimensions:**
   - [e.g., Channel, Time period, Customer segment]

   **Expected Deliverables:**
   - [e.g., Comparison chart showing channel performance]
   - [e.g., Trend line with annotations for key events]
   ```

### Interaction Point 1

Present your analysis plan and ask:
```
Does this match what you're looking for?
If you'd like me to focus on different aspects or add something, let me know.
```

**If the business goal is unclear**, offer templates:
```
I can help with common scenarios:
1. Sales Analysis (channel comparison, trend forecasting, top products)
2. User Behavior (funnel analysis, retention cohorts, churn prediction)
3. Operations (ROI calculation, campaign effectiveness, resource allocation)

Which best describes what you need, or would you like to describe it differently?
```

Wait for user confirmation before proceeding.

---

## Step 2: Data Inspection (Auto-run with Quality Gate)

### Your Actions

1. **Load the CSV file:**
   ```python
   import pandas as pd
   import numpy as np

   # Try UTF-8 first, fall back to other encodings if needed
   try:
       df = pd.read_csv(file_path, encoding='utf-8')
   except UnicodeDecodeError:
       df = pd.read_csv(file_path, encoding='latin-1')
   ```

2. **Generate a data overview report:**
   ```
   ## Data Overview

   📊 Dimensions: {rows:,} rows × {cols} columns
   💾 Memory: {size} MB

   📋 Columns:
   | Column Name | Data Type | Sample Value |
   |-------------|-----------|--------------|
   | ...         | ...       | ...          |

   🔍 Preview (first 5 rows):
   [Display formatted table]
   ```

3. **Perform quality checks:**
   - **Missing values:** Count and percentage per column
   - **Duplicates:** Check for fully duplicate rows
   - **Data types:** Verify numeric columns aren't stored as strings, dates are parseable
   - **Outliers (quick check):** Flag columns with extreme values using IQR method

4. **Calculate a data quality score (0-100):**
   ```
   Score = 100 - (missing_penalty + duplicate_penalty + type_mismatch_penalty)

   Where:
   - missing_penalty = min(40, missing_rate * 100)
   - duplicate_penalty = min(20, duplicate_rate * 100)
   - type_mismatch_penalty = 10 per column with wrong type
   ```

### Quality Gate 1

Based on the quality score, present findings:

**Score ≥ 80 (Good):**
```
✅ Data quality looks good (Score: {score}/100)
Minor issues found: [list if any]
Proceeding to analysis...
```

**Score 60-79 (Fair):**
```
⚠️ Data has some quality issues (Score: {score}/100)
Issues found: [list]
I can still analyze this, but results may be limited. Continue?
```

**Score < 60 (Poor):**
```
🚨 Data quality is concerning (Score: {score}/100)
Major issues:
- [Issue 1 with impact]
- [Issue 2 with impact]

Recommendation: Contact the data provider or provide a data dictionary.
Would you like me to proceed with limited analysis, or should we address these issues first?
```

---

## Step 3: Data Cleaning Strategy (Interaction Point 2)

### Your Actions

**If quality score ≥ 80 and issues are minor**, apply automatic fixes and report:
```
🧹 Applied automatic cleaning:
- Standardized date format in 'OrderDate' column
- Trimmed whitespace from text fields
Ready to analyze!
```

**If quality score < 80**, present issues with specific strategy options:

```markdown
## Data Cleaning Recommendations

### Issue 1: Missing Values in 'Age' Column (20% missing)
**Strategy options:**
A. Delete rows with missing Age (lose 20% of data) ← Recommended if Age is critical
B. Fill with median age (35 years)
C. Fill with group average (median by Gender)
D. Keep as-is and exclude Age from analysis

### Issue 2: Outliers in 'Price' Column (3 negative values)
**Strategy options:**
A. Remove the 3 rows ← Recommended
B. Set negative values to 0
C. Set to the minimum valid price

### Issue 3: Date Format Inconsistency in 'PurchaseDate'
**Strategy options:**
A. Standardize to YYYY-MM-DD format ← Recommended (automatic)
```

### Interaction Point 2

Ask the user:
```
Please choose a strategy for each issue (e.g., "1A, 2A, 3A"),
or type "recommended" to use all recommended strategies,
or type "auto" to let me decide.
```

**In auto mode (`--auto` flag):** Skip this interaction and use all recommended strategies.

### Execute Cleaning

1. Apply the chosen strategies
2. Log all changes made
3. Report the results:
   ```
   ✅ Cleaning completed:
   - Age: Filled 1,234 missing values with median (35)
   - Price: Removed 3 rows with negative values
   - PurchaseDate: Standardized format for all 6,000 rows

   📊 Final dataset: {final_rows:,} rows × {cols} columns (was {original_rows:,} rows)
   ```

4. **Save the cleaned data:**
   ```python
   cleaned_path = output_dir / 'cleaned_data.csv'
   df_clean.to_csv(cleaned_path, index=False)
   ```

---

## Step 4: Exploratory Data Analysis (Auto-run)

### Your Actions

1. **Descriptive statistics:**
   - For numeric columns: mean, median, std, min, max, quartiles
   - For categorical columns: value counts, unique values, mode

2. **Single-variable analysis:**
   - **Numeric:** Generate histograms, identify distribution shape (normal, skewed, multimodal)
   - **Categorical:** Generate bar charts showing frequency distribution

3. **Multi-variable analysis:**
   - **Correlation matrix:** For all numeric columns (use heatmap visualization)
   - **Cross-tabulation:** For key categorical dimensions from Step 1
   - **Scatter plots:** For top 3 correlated pairs related to the business question

4. **Generate initial insights:**
   Extract Top 3-5 preliminary findings, such as:
   - "Channel A has 3x the conversion rate of Channel B"
   - "Sales show a strong upward trend since March"
   - "Age and purchase amount have a weak negative correlation (-0.23)"

### Output

Save all visualizations as PNG files:
```python
import matplotlib.pyplot as plt
import seaborn as sns

# Example
fig, ax = plt.subplots(figsize=(10, 6))
sns.histplot(data=df, x='Age', bins=30, ax=ax)
plt.title('Age Distribution')
plt.savefig(output_dir / 'age_distribution.png', dpi=300, bbox_inches='tight')
plt.close()
```

Report the findings in a structured format:
```markdown
## Exploratory Findings

### Distribution Overview
- [Key observation about data distribution]

### Preliminary Insights
1. **[Insight 1]:** [Data supporting it]
2. **[Insight 2]:** [Data supporting it]
3. **[Insight 3]:** [Data supporting it]

📊 Visualizations saved: age_distribution.png, correlation_heatmap.png, channel_comparison.png
```

---

## Step 5: Deep Analysis (Auto-run)

### Your Actions

Based on the business question type identified in Step 1, automatically choose and apply the appropriate analysis method:

| Business Question Type | Analysis Method |
|------------------------|-----------------|
| **Trend over time** | Time series analysis with moving averages, seasonality detection |
| **Attribution/cause** | Grouped comparison, contribution breakdown (e.g., which factor drives 80% of variance) |
| **User behavior** | Funnel analysis (conversion at each step), cohort retention analysis |
| **Customer value** | RFM model (Recency, Frequency, Monetary), clustering into segments |
| **Forecasting** | Simple linear regression or exponential smoothing for trend extrapolation |

### Example: Trend Analysis

```python
# Time series with moving average
df['Date'] = pd.to_datetime(df['Date'])
df = df.sort_values('Date')
df['7d_MA'] = df['Revenue'].rolling(window=7).mean()

# Detect trend
from scipy.stats import linregress
slope, intercept, r_value, p_value, std_err = linregress(
    df['Date'].map(pd.Timestamp.toordinal),
    df['Revenue']
)

if p_value < 0.05:
    trend = "increasing" if slope > 0 else "decreasing"
    print(f"Statistically significant {trend} trend detected (p={p_value:.4f})")
```

### Example: RFM Analysis

```python
# Calculate RFM scores
current_date = df['PurchaseDate'].max()
rfm = df.groupby('CustomerID').agg({
    'PurchaseDate': lambda x: (current_date - x.max()).days,  # Recency
    'OrderID': 'count',  # Frequency
    'Amount': 'sum'  # Monetary
}).rename(columns={
    'PurchaseDate': 'Recency',
    'OrderID': 'Frequency',
    'Amount': 'Monetary'
})

# Score customers (1-5 scale)
rfm['R_Score'] = pd.qcut(rfm['Recency'], 5, labels=[5, 4, 3, 2, 1])
rfm['F_Score'] = pd.qcut(rfm['Frequency'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5])
rfm['M_Score'] = pd.qcut(rfm['Monetary'], 5, labels=[1, 2, 3, 4, 5])

# Segment customers
rfm['Segment'] = rfm['R_Score'].astype(str) + rfm['F_Score'].astype(str) + rfm['M_Score'].astype(str)
```

### Output

Report deep analysis results with specific numbers:
```markdown
## Deep Analysis Results

### [Analysis Type: e.g., "Channel Performance Attribution"]

**Key Metric Calculated:** [e.g., Conversion Rate by Channel]

| Channel | Orders | Conversion Rate | Contribution to Revenue |
|---------|--------|-----------------|-------------------------|
| A       | 5,234  | 8.5%            | 45%                     |
| B       | 3,102  | 3.7%            | 28%                     |
| C       | 1,876  | 2.1%            | 27%                     |

**Statistical Finding:**
Channel A's conversion rate is 2.3x higher than Channel B (p < 0.001), indicating significantly better targeting or user experience.

📊 Visualization saved: channel_performance.png
```

---

## Step 6: Insights Generation (Auto-run)

### Your Actions

Synthesize all findings into a structured narrative following the What → So What → Now What framework:

```markdown
## Analysis Report

### 🔍 Core Findings (What)
Objective facts from the data:
1. **[Finding 1]:** [Specific numbers and context]
2. **[Finding 2]:** [Specific numbers and context]
3. **[Finding 3]:** [Specific numbers and context]

### 💡 Business Insights (So What)
Interpretation and implications:
1. **[Insight 1]:** Why this matters for the business
   - Impact: [Quantify if possible: e.g., "Could increase revenue by 15%"]
   - Root cause hypothesis: [Why you think this is happening]

2. **[Insight 2]:** Why this matters for the business
   - Impact: [...]
   - Root cause hypothesis: [...]

### 🎯 Action Recommendations (Now What)
Prioritized next steps:
1. **[Action 1 - High Priority]:** What to do, expected outcome
   - Timeline: [Immediate / This quarter / Long-term]
   - Owner: [Which team should handle this]

2. **[Action 2 - Medium Priority]:** What to do, expected outcome
   - Timeline: [...]
   - Owner: [...]
```

### Chart Selection

For each finding, choose the most effective visualization:
- **Trend over time** → Line chart with annotations
- **Comparison** → Bar chart (horizontal if many categories)
- **Part-to-whole** → Pie chart or stacked bar
- **Correlation** → Scatter plot with trendline
- **Distribution** → Histogram or box plot

Ensure all charts have:
- Clear title stating the main message (not just "Sales Chart")
- Labeled axes with units
- Legend if multiple series
- Data labels for key points

---

## Step 7: Output Delivery (Interaction Point 3)

### Interaction Point 3

**If user specified format in initial request** (e.g., `--format=html`), skip this and use that format.

**Otherwise, present options:**
```
## Analysis Complete! 🎉

Your analysis is ready. Please choose an output format:

1. **Quick Report** - Markdown document with embedded PNG charts
   - Best for: Sharing via email, documentation, GitHub
   - Generation time: ~10 seconds

2. **Interactive Report** - Single-page HTML with embedded Chart.js
   - Best for: Presentations, exploring data interactively
   - Generation time: ~30 seconds

3. **Full Dashboard** - Multi-page web application (Tailwind CSS + Chart.js)
   - Best for: Sharing with stakeholders, ongoing monitoring
   - Generation time: ~2 minutes

Enter 1, 2, or 3:
```

### Generate Output

#### Option 1: Quick Report (Markdown)

```python
import shutil

report_path = output_dir / 'analysis_report.md'

with open(report_path, 'w', encoding='utf-8') as f:
    f.write(f"# Data Analysis Report\n\n")
    f.write(f"**Dataset:** {csv_filename}\n")
    f.write(f"**Analysis Date:** {datetime.now().strftime('%Y-%m-%d')}\n\n")
    f.write(f"---\n\n")
    f.write(f"## Business Question\n\n{business_question}\n\n")
    f.write(f"## Data Overview\n\n{data_overview}\n\n")
    f.write(f"## Findings\n\n{findings}\n\n")
    f.write(f"## Insights\n\n{insights}\n\n")
    f.write(f"## Recommendations\n\n{recommendations}\n\n")
    f.write(f"---\n\n")
    f.write(f"## Appendix: Visualizations\n\n")
    for chart in chart_files:
        f.write(f"![{chart.stem}]({chart.name})\n\n")

# Copy all chart PNGs to the output directory
for chart in chart_files:
    shutil.copy(chart, output_dir)
```

#### Option 2: Interactive Report (Single HTML)

Use this template structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Analysis Report</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Data Analysis Report</h1>

        <!-- Business Question Section -->
        <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-700 mb-3">Business Question</h2>
            <p class="text-gray-600">[Insert question]</p>
        </section>

        <!-- Key Findings Section -->
        <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-700 mb-3">🔍 Key Findings</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="text-3xl font-bold text-blue-600">[Metric 1]</div>
                    <div class="text-sm text-gray-600">[Description]</div>
                </div>
                <!-- Repeat for other metrics -->
            </div>
        </section>

        <!-- Charts Section -->
        <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-700 mb-3">📊 Visualizations</h2>
            <div class="mb-6">
                <canvas id="chart1"></canvas>
            </div>
            <!-- Repeat for other charts -->
        </section>

        <!-- Recommendations Section -->
        <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-700 mb-3">🎯 Recommendations</h2>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
                <li>[Recommendation 1]</li>
                <li>[Recommendation 2]</li>
            </ol>
        </section>
    </div>

    <script>
        // Chart.js configurations
        const ctx1 = document.getElementById('chart1').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: [labels_from_analysis],
                datasets: [{
                    label: 'Metric Name',
                    data: [data_from_analysis],
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Chart Title'
                    }
                }
            }
        });
    </script>
</body>
</html>
```

#### Option 3: Full Dashboard (Multi-page)

Create a file structure:
```
dashboard/
├── index.html (overview page)
├── data.html (detailed data explorer)
├── insights.html (findings and recommendations)
└── assets/
    ├── data.json (exported data for interactivity)
    └── styles.css (custom styling)
```

Use the frontend-design or ui-ux-pro-max skill if available for this option, as it requires more sophisticated UI work.

### Final Delivery

Present the deliverables to the user:

```markdown
## ✅ Analysis Complete!

Your analysis has been saved to: `{output_directory}`

### Deliverables:
- 📄 Analysis Report: `analysis_report.{md|html}`
- 📊 Visualizations: {list of chart files}
- 🧹 Cleaned Data: `cleaned_data.csv`
- 💾 Analysis Code: `analysis_notebook.ipynb` (optional)

### Key Takeaways:
1. [One-sentence summary of finding 1]
2. [One-sentence summary of finding 2]
3. [One-sentence summary of finding 3]

[If HTML/Dashboard]
You can open `{report_filename}` in your browser to explore the interactive report.

Would you like me to explain any part of the analysis in more detail, or make changes to the report?
```

---

## Exception Handling

### Large Datasets (> 100,000 rows)

Detect large files early and present options:
```
This dataset has {rows:,} rows. For faster analysis, I can:
1. Analyze a random sample (10%, ~{sample_size:,} rows) ← Recommended
2. Aggregate by {suggested_dimension} before analyzing
3. Process the full dataset (will take longer)

Which would you prefer?
```

### Very Wide Datasets (> 50 columns)

```
This dataset has {cols} columns. To focus the analysis, I can:
1. Use only columns relevant to your question: {relevant_cols}
2. Let you select which columns to include
3. Analyze all columns (report will be lengthy)

Which approach works best?
```

### Unclear Business Goal

If the user just says "analyze this CSV" without a specific question:
```
I can analyze this data for you! To make it most useful, what would you like to understand?

Common scenarios:
- 🎯 Performance: "Which {dimension} performs best on {metric}?"
- 📈 Trends: "How has {metric} changed over time?"
- 🔍 Patterns: "What factors correlate with {outcome}?"
- 📊 Overview: "Give me a general summary of this data"

Or describe what you're trying to figure out in your own words.
```

### Poor Data Quality (Score < 40)

```
⚠️ This data has significant quality issues (Score: {score}/100):
- {issue_1}
- {issue_2}

Recommendations:
1. Contact the data source to get a cleaner version
2. Provide a data dictionary so I can better interpret the fields
3. I can proceed with a limited analysis, but findings will be marked as "low confidence"

How would you like to proceed?
```

---

## Technical Stack

**Data Processing:**
- `pandas` - Primary data manipulation
- `numpy` - Numerical operations
- `scipy` - Statistical tests

**Visualization:**
- `matplotlib` - Static charts (PNG output)
- `seaborn` - Statistical visualizations
- Chart.js (via CDN) - Interactive HTML charts

**Output Generation:**
- Markdown for quick reports
- HTML + Tailwind CSS for styled reports
- Chart.js for interactive visualizations

**Always install required packages if missing:**
```python
import subprocess
import sys

def ensure_package(package):
    try:
        __import__(package)
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# Ensure core packages
for pkg in ['pandas', 'numpy', 'scipy', 'matplotlib', 'seaborn']:
    ensure_package(pkg)
```

---

## Quality Principles

1. **Always explain the "why"**: Don't just report numbers—interpret what they mean for the business
2. **Use concrete numbers**: "Channel A converts at 8.5%" beats "Channel A converts better"
3. **Visualize effectively**: Choose chart types that make patterns immediately obvious
4. **Acknowledge uncertainty**: If data quality is poor or sample size is small, say so
5. **Prioritize recommendations**: Mark actions as High/Medium/Low priority with expected impact
6. **Save intermediate outputs**: Always save the cleaned data and analysis code for reproducibility

---

## Working Directory

All outputs are saved to: `./data-analysis-results/{timestamp}/`

Structure:
```
data-analysis-results/
└── 2024-03-29_14-30-45/
    ├── analysis_report.md (or .html)
    ├── cleaned_data.csv
    ├── charts/
    │   ├── age_distribution.png
    │   ├── correlation_heatmap.png
    │   └── channel_comparison.png
    └── analysis_notebook.ipynb (if requested)
```

Create the timestamped directory at the start:
```python
from datetime import datetime
from pathlib import Path

timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
output_dir = Path(f'./data-analysis-results/{timestamp}')
output_dir.mkdir(parents=True, exist_ok=True)
(output_dir / 'charts').mkdir(exist_ok=True)
```

---

## Tips for Success

- **Read the CSV early**: Don't wait—load it in Step 1 to validate the file exists and is readable
- **Keep the user informed**: After each step, give a brief status update
- **Don't over-engineer**: If the data is clean and the question is simple, don't force complex analysis
- **Reuse code patterns**: Common operations (loading CSV, quality checks, generating charts) should follow consistent patterns to maintain reliability
- **Test visualizations**: Always check that charts are readable and the main message is obvious at a glance
