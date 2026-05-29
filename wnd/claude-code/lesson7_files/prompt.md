The EDA.ipynb contains exploratory data analysis on e-commerce data in @ecommerce_data, focusing on sales metrics for 2023. Keep the same analysis and graphs, and improve the structure and documentation of the notebook.

Review the existing notebook and identify:
- What business metrics are currently calculated
- What visualizations are created
- What data transformations are performed
- Any code quality issues or inefficiencies

**Refactoring Requirements**
1. Notebook Structure & Documentation
    - Add proper documentation and markdown cells with clear header and a brief explanation for the section
    - Organize into logical sections:
        - Introduction & Business Objectives
        - Data Loading & Configuration
        - Data Preparation & Transformation
        - Business Metrics Calculation (revenue, product, geographic, customer experience analysis)
        - Summary of observations
    - Add table of contents at the beginning
    - Include data dictionary explaining key columns and business terms

2. Code Quality Improvements
    - Create reusable functions with docstrings
    - Implement consistent naming and formatting
    - Create separate Python files:
        - business_metrics.py containing business metric calculations only
        - data_loader.py loading, processing and cleaning the data

3. Enhanced Visualizations
    - Improve all plots with:
        - Clear and descriptive titles
        - Proper axis labels with units
        - Legends where needed
        - Appropriate chart types for the data
        - Include date range in plot titles or captions
        - use consistent color business-oriented color schemes

4. Configurable Analysis Framework
    The notebook shows the computation of metrics for a specific date range (entire year of 2023 compared to 2022).Refactor the code so that the data is first filtered according to configurable month and year & implement general-purpose metric calculations.

**Deliverables Expected**
- Refactored Jupyter notebook (EDA_Refactored.ipynb) with all improvements
- Business metrics module (business_metrics.py) with documented functions
- Requirements file (requirements.txt) listing all dependencies
- README section explaining how to use the refactored analysis