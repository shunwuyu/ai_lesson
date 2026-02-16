#!/usr/bin/env python3
"""
Financial Ratios Calculator

Usage:
    python calculate_ratios.py <data_file>

Data file format (JSON):
{
    "revenue": 1000000,
    "cogs": 400000,
    "operating_expenses": 300000,
    "net_income": 150000,
    "total_assets": 2000000,
    "shareholders_equity": 800000,
    "previous_revenue": 900000
}
"""

import json
import sys


def calculate_ratios(data):
    """Calculate common financial ratios."""
    ratios = {}

    # Revenue Growth
    if 'previous_revenue' in data and data['previous_revenue'] > 0:
        ratios['revenue_growth'] = (
            (data['revenue'] - data['previous_revenue'])
            / data['previous_revenue'] * 100
        )

    # Gross Margin
    if 'cogs' in data:
        gross_profit = data['revenue'] - data['cogs']
        ratios['gross_margin'] = gross_profit / data['revenue'] * 100

    # Operating Margin
    if 'cogs' in data and 'operating_expenses' in data:
        operating_income = data['revenue'] - data['cogs'] - data['operating_expenses']
        ratios['operating_margin'] = operating_income / data['revenue'] * 100

    # Net Margin
    if 'net_income' in data:
        ratios['net_margin'] = data['net_income'] / data['revenue'] * 100

    # ROA
    if 'net_income' in data and 'total_assets' in data:
        ratios['roa'] = data['net_income'] / data['total_assets'] * 100

    # ROE
    if 'net_income' in data and 'shareholders_equity' in data:
        ratios['roe'] = data['net_income'] / data['shareholders_equity'] * 100

    return ratios


def main():
    if len(sys.argv) < 2:
        print("Usage: python calculate_ratios.py <data_file>")
        sys.exit(1)

    with open(sys.argv[1], 'r') as f:
        data = json.load(f)

    ratios = calculate_ratios(data)

    print("\n=== Financial Ratios ===\n")
    for name, value in ratios.items():
        print(f"{name.replace('_', ' ').title()}: {value:.2f}%")


if __name__ == '__main__':
    main()
