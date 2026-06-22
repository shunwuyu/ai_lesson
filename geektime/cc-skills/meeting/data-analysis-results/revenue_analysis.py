#!/usr/bin/env python3
"""RavenStack Revenue Analysis"""

import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import seaborn as sns
from pathlib import Path
from datetime import datetime
import json, warnings
warnings.filterwarnings('ignore')

# Configure Chinese font
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'SimHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False
sns.set_style("whitegrid")

BASE = Path('/Users/shunwuyu/workspace/lesson/ai_lesson/geektime/cc-skills/meeting')
ARCHIVE = BASE / 'archive'
OUT = Path('/Users/shunwuyu/workspace/lesson/ai_lesson/geektime/cc-skills/meeting/data-analysis-results/2026-06-20_19-33-37')
CHARTS = OUT / 'charts'
CHARTS.mkdir(exist_ok=True)

# ─── 1. Load Data ───
print("📂 Loading data...")
accounts = pd.read_csv(ARCHIVE / 'ravenstack_accounts.csv')
subscriptions = pd.read_csv(ARCHIVE / 'ravenstack_subscriptions.csv')
feature_usage = pd.read_csv(ARCHIVE / 'ravenstack_feature_usage.csv')
support = pd.read_csv(ARCHIVE / 'ravenstack_support_tickets.csv')
churn = pd.read_csv(ARCHIVE / 'ravenstack_churn_events.csv')

# Parse dates
subscriptions['start_date'] = pd.to_datetime(subscriptions['start_date'])
subscriptions['end_date'] = pd.to_datetime(subscriptions['end_date'], errors='coerce')
accounts['signup_date'] = pd.to_datetime(accounts['signup_date'])
churn['churn_date'] = pd.to_datetime(churn['churn_date'])

subs = subscriptions.copy()

# ─── 2. Data Inspection ───
print("\n📊 Data Inspection")
print(f"Accounts: {len(accounts):,} rows, {accounts.columns.tolist()}")
print(f"Subscriptions: {len(subs):,} rows")
print(f"Missing values in subscriptions:")
for col in subs.columns:
    miss = subs[col].isna().sum()
    if miss > 0:
        print(f"  {col}: {miss} ({miss/len(subs)*100:.1f}%)")

# Quality check on key revenue columns
for col in ['mrr_amount', 'arr_amount']:
    if subs[col].isna().sum() > 0:
        print(f"  WARNING: {col} has nulls!")
    if (subs[col] < 0).sum() > 0:
        print(f"  WARNING: {col} has negative values!")

# ─── 3. Revenue Overview ───
print("\n💰 Revenue Overview")
total_mrr = subs['mrr_amount'].sum()
total_arr = subs['arr_amount'].sum()
avg_mrr = subs['mrr_amount'].mean()
avg_arr = subs['arr_amount'].mean()
active_subs = subs[subs['churn_flag'] == False]
churned_subs = subs[subs['churn_flag'] == True]

active_mrr = active_subs['mrr_amount'].sum()
active_arr = active_subs['arr_amount'].sum()

print(f"Total MRR (all subscriptions): ${total_mrr:,.0f}")
print(f"Total ARR (all subscriptions): ${total_arr:,.0f}")
print(f"Average MRR per subscription: ${avg_mrr:,.0f}")
print(f"Average ARR per subscription: ${avg_arr:,.0f}")
print(f"Active subscriptions: {len(active_subs):,}")
print(f"Active MRR: ${active_mrr:,.0f}")
print(f"Churned subscriptions: {len(churned_subs):,}")
churned_mrr = churned_subs['mrr_amount'].sum()
print(f"Churned MRR: ${churned_mrr:,.0f}")

revenue_overview = {
    "total_mrr": float(total_mrr), "total_arr": float(total_arr),
    "avg_mrr": float(avg_mrr), "avg_arr": float(avg_arr),
    "active_mrr": float(active_mrr), "active_arr": float(active_arr),
    "active_count": len(active_subs), "churned_count": len(churned_subs),
    "churned_mrr": float(churned_mrr)
}

# ─── 4. Plan Tier Revenue Analysis ───
print("\n📋 Plan Tier Analysis")
plan_stats = subs.groupby('plan_tier').agg(
    subscriptions=('subscription_id', 'count'),
    total_mrr=('mrr_amount', 'sum'),
    avg_mrr=('mrr_amount', 'mean'),
    total_arr=('arr_amount', 'sum'),
    avg_arr=('arr_amount', 'mean'),
    avg_seats=('seats', 'mean'),
    upgrade_rate=('upgrade_flag', 'mean'),
    downgrade_rate=('downgrade_flag', 'mean'),
    churn_rate=('churn_flag', 'mean')
).round(2)
plan_stats['mrr_share'] = (plan_stats['total_mrr'] / total_mrr * 100).round(1)
plan_stats['sub_share'] = (plan_stats['subscriptions'] / len(subs) * 100).round(1)
print(plan_stats)

# Plan tier chart
fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# MRR by plan
colors = {'Basic': '#94a3b8', 'Pro': '#3b82f6', 'Enterprise': '#8b5cf6'}
ax = axes[0]
plans = plan_stats.index.tolist()
mrr_vals = plan_stats['total_mrr'].values
bars = ax.bar(plans, mrr_vals, color=[colors.get(p, '#64748b') for p in plans], edgecolor='white')
for bar, val in zip(bars, mrr_vals):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + val*0.01,
            f'${val:,.0f}', ha='center', fontsize=11, fontweight='bold')
ax.set_title('Total MRR by Plan Tier', fontsize=14, fontweight='bold')
ax.set_ylabel('MRR ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))

# Subscription distribution
ax = axes[1]
sub_vals = plan_stats['subscriptions'].values
colors_pie = ['#94a3b8', '#3b82f6', '#8b5cf6']
wedges, texts, autotexts = ax.pie(sub_vals, labels=plans, autopct='%1.1f%%',
                                    colors=colors_pie, startangle=90)
ax.set_title('Subscription Distribution', fontsize=14, fontweight='bold')

# Average MRR per subscription
ax = axes[2]
avg_mrr_vals = plan_stats['avg_mrr'].values
bars = ax.bar(plans, avg_mrr_vals, color=[colors.get(p, '#64748b') for p in plans], edgecolor='white')
for bar, val in zip(bars, avg_mrr_vals):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + val*0.01,
            f'${val:,.0f}', ha='center', fontsize=11, fontweight='bold')
ax.set_title('Avg MRR per Subscription', fontsize=14, fontweight='bold')
ax.set_ylabel('Avg MRR ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))

plt.tight_layout()
plt.savefig(CHARTS / 'plan_tier_revenue.png', dpi=200, bbox_inches='tight')
plt.close()

# ─── 5. MRR Trend Over Time ───
print("\n📈 MRR Trend Analysis")
subs['year_month'] = subs['start_date'].dt.to_period('M')

# Active subscriptions at each month (subscriptions that started before and haven't ended)
# For simplicity, calculate MRR by start_date month
monthly_sub_stats = subs.groupby('year_month').agg(
    new_subs=('subscription_id', 'count'),
    new_mrr=('mrr_amount', 'sum'),
    new_arr=('arr_amount', 'sum'),
    avg_mrr=('mrr_amount', 'mean')
).sort_index()

# Calculate churned MRR by month
subs_ended = subs[subs['end_date'].notna()].copy()
subs_ended['end_month'] = subs_ended['end_date'].dt.to_period('M')
monthly_churn = subs_ended.groupby('end_month').agg(
    churned_subs=('subscription_id', 'count'),
    churned_mrr=('mrr_amount', 'sum')
).sort_index()

# Merge
monthly = monthly_sub_stats.join(monthly_churn, how='outer').fillna(0)
monthly.index = monthly.index.astype(str)

# Net MRR
monthly['net_mrr_change'] = monthly['new_mrr'] - monthly['churned_mrr']
monthly_total = monthly[['new_mrr', 'churned_mrr']].tail(12)

fig, axes = plt.subplots(1, 2, figsize=(18, 5))

# New MRR vs Churned MRR (last 12 months)
ax = axes[0]
x = range(len(monthly_total))
width = 0.35
ax.bar([i - width/2 for i in x], monthly_total['new_mrr'], width, label='New MRR', color='#3b82f6', edgecolor='white')
ax.bar([i + width/2 for i in x], monthly_total['churned_mrr'], width, label='Churned MRR', color='#ef4444', edgecolor='white')
ax.set_xticks(x)
ax.set_xticklabels(monthly_total.index, rotation=45)
ax.set_title('New vs Churned MRR (Last 12 Months)', fontsize=14, fontweight='bold')
ax.set_ylabel('MRR ($)')
ax.legend()
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))

# Net MRR change trend
ax = axes[1]
periods = monthly.index[-18:]
net = monthly['net_mrr_change'][-18:]
colors_bar = ['#3b82f6' if v >= 0 else '#ef4444' for v in net]
ax.bar(range(len(periods)), net, color=colors_bar, edgecolor='white')
ax.set_xticks(range(len(periods)))
ax.set_xticklabels(periods, rotation=45)
ax.axhline(y=0, color='black', linewidth=0.8)
ax.set_title('Net MRR Change by Month', fontsize=14, fontweight='bold')
ax.set_ylabel('Net MRR Change ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))

plt.tight_layout()
plt.savefig(CHARTS / 'mrr_trend.png', dpi=200, bbox_inches='tight')
plt.close()

# ─── 6. Upgrade & Downgrade Analysis ───
print("\n🔄 Upgrade/Downgrade Analysis")
upgrade_count = subs['upgrade_flag'].sum()
downgrade_count = subs['downgrade_flag'].sum()
print(f"Upgrades: {upgrade_count} ({upgrade_count/len(subs)*100:.1f}%)")
print(f"Downgrades: {downgrade_count} ({downgrade_count/len(subs)*100:.1f}%)")

# Upgrade/downgrade by plan tier
plan_up_down = subs.groupby('plan_tier').agg(
    total=('subscription_id', 'count'),
    upgrades=('upgrade_flag', 'sum'),
    downgrades=('downgrade_flag', 'sum')
)
plan_up_down['upgrade_rate'] = (plan_up_down['upgrades'] / plan_up_down['total'] * 100).round(1)
plan_up_down['downgrade_rate'] = (plan_up_down['downgrades'] / plan_up_down['total'] * 100).round(1)
print(plan_up_down)

# Upgrade/downgrade impact on revenue
upgraded = subs[subs['upgrade_flag'] == True]
downgraded = subs[subs['downgrade_flag'] == True]
print(f"Upgraded subs avg MRR: ${upgraded['mrr_amount'].mean():,.0f}")
print(f"Downgraded subs avg MRR: ${downgraded['mrr_amount'].mean():,.0f}")
print(f"Non-changed subs avg MRR: ${subs[(subs['upgrade_flag']==False)&(subs['downgrade_flag']==False)]['mrr_amount'].mean():,.0f}")

# Chart: upgrade/downgrade by plan tier
fig, ax = plt.subplots(figsize=(10, 5))
x = range(len(plans))
width = 0.35
ax.bar([i - width/2 for i in x], plan_up_down['upgrade_rate'], width, label='Upgrade Rate', color='#22c55e', edgecolor='white')
ax.bar([i + width/2 for i in x], plan_up_down['downgrade_rate'], width, label='Downgrade Rate', color='#f59e0b', edgecolor='white')
ax.set_xticks(x)
ax.set_xticklabels(plans)
ax.set_title('Upgrade & Downgrade Rate by Plan Tier', fontsize=14, fontweight='bold')
ax.set_ylabel('Rate (%)')
ax.legend()
for i, (u, d) in enumerate(zip(plan_up_down['upgrade_rate'], plan_up_down['downgrade_rate'])):
    ax.text(i - width/2, u + 0.5, f'{u}%', ha='center', fontsize=9)
    ax.text(i + width/2, d + 0.5, f'{d}%', ha='center', fontsize=9)

plt.tight_layout()
plt.savefig(CHARTS / 'upgrade_downgrade.png', dpi=200, bbox_inches='tight')
plt.close()

# ─── 7. Revenue by Industry ───
print("\n🏭 Revenue by Industry")
accounts_merge = accounts[['account_id', 'industry', 'country', 'referral_source', 'signup_date']]
merged = subs.merge(accounts_merge, on='account_id', how='left')

industry_revenue = merged.groupby('industry').agg(
    accounts=('account_id', 'nunique'),
    subscriptions=('subscription_id', 'count'),
    total_mrr=('mrr_amount', 'sum'),
    avg_mrr=('mrr_amount', 'mean'),
    total_arr=('arr_amount', 'sum'),
    churn_rate=('churn_flag', 'mean')
).round(2)
industry_revenue = industry_revenue.sort_values('total_mrr', ascending=False)
industry_revenue['mrr_share'] = (industry_revenue['total_mrr'] / total_mrr * 100).round(1)
print(industry_revenue)

# Chart
fig, ax = plt.subplots(figsize=(12, 5))
industries = industry_revenue.index.tolist()
mrr_by_ind = industry_revenue['total_mrr'].values
bars = ax.barh(range(len(industries)), mrr_by_ind, color='#3b82f6', edgecolor='white')
ax.set_yticks(range(len(industries)))
ax.set_yticklabels(industries)
ax.set_title('Total MRR by Industry', fontsize=14, fontweight='bold')
ax.set_xlabel('MRR ($)')
ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))
for bar, val in zip(bars, mrr_by_ind):
    ax.text(bar.get_width() + val*0.01, bar.get_y() + bar.get_height()/2,
            f'${val:,.0f}', va='center', fontsize=9)
ax.invert_yaxis()
plt.tight_layout()
plt.savefig(CHARTS / 'revenue_by_industry.png', dpi=200, bbox_inches='tight')
plt.close()

# ─── 8. Revenue by Country ───
print("\n🌍 Revenue by Country (Top 10)")
country_revenue = merged.groupby('country').agg(
    total_mrr=('mrr_amount', 'sum'),
    subscriptions=('subscription_id', 'count'),
    avg_mrr=('mrr_amount', 'mean'),
    churn_rate=('churn_flag', 'mean')
).sort_values('total_mrr', ascending=False).head(10).round(2)
country_revenue['mrr_share'] = (country_revenue['total_mrr'] / total_mrr * 100).round(1)
print(country_revenue)

# ─── 9. Revenue by Referral Source ───
print("\n📣 Revenue by Referral Source")
referral_revenue = merged.groupby('referral_source').agg(
    accounts=('account_id', 'nunique'),
    subscriptions=('subscription_id', 'count'),
    total_mrr=('mrr_amount', 'sum'),
    avg_mrr=('mrr_amount', 'mean'),
    churn_rate=('churn_flag', 'mean')
).sort_values('total_mrr', ascending=False).round(2)
referral_revenue['mrr_share'] = (referral_revenue['total_mrr'] / total_mrr * 100).round(1)
print(referral_revenue)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# MRR by referral source
ax = axes[0]
refs = referral_revenue.index.tolist()
ref_mrr = referral_revenue['total_mrr'].values
bars = ax.bar(refs, ref_mrr, color=['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'], edgecolor='white')
for bar, val in zip(bars, ref_mrr):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + val*0.01,
            f'${val:,.0f}', ha='center', fontsize=10, fontweight='bold')
ax.set_title('MRR by Referral Source', fontsize=14, fontweight='bold')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))

# Churn rate by referral source
ax = axes[1]
churn_by_ref = referral_revenue['churn_rate'].values * 100
bars = ax.bar(refs, churn_by_ref, color=['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'], edgecolor='white')
for bar, val in zip(bars, churn_by_ref):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3,
            f'{val:.1f}%', ha='center', fontsize=10, fontweight='bold')
ax.set_title('Churn Rate by Referral Source', fontsize=14, fontweight='bold')
ax.set_ylabel('Churn Rate (%)')

plt.tight_layout()
plt.savefig(CHARTS / 'referral_source_analysis.png', dpi=200, bbox_inches='tight')
plt.close()

# ─── 10. Billing Frequency Analysis ───
print("\n💳 Billing Frequency Impact")
billing_stats = subs.groupby('billing_frequency').agg(
    subscriptions=('subscription_id', 'count'),
    total_mrr=('mrr_amount', 'sum'),
    avg_mrr=('mrr_amount', 'mean'),
    total_arr=('arr_amount', 'sum'),
    avg_arr=('arr_amount', 'mean'),
    churn_rate=('churn_flag', 'mean'),
    upgrade_rate=('upgrade_flag', 'mean'),
    auto_renew_rate=('auto_renew_flag', 'mean')
).round(2)
billing_stats['sub_share'] = (billing_stats['subscriptions'] / len(subs) * 100).round(1)
billing_stats['mrr_share'] = (billing_stats['total_mrr'] / total_mrr * 100).round(1)
print(billing_stats)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

ax = axes[0]
freqs = billing_stats.index.tolist()
sub_counts = billing_stats['subscriptions'].values
bars = ax.bar(freqs, sub_counts, color=['#3b82f6', '#8b5cf6'], edgecolor='white')
for bar, val in zip(bars, sub_counts):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + val*0.01,
            f'{val:,}', ha='center', fontsize=12, fontweight='bold')
ax.set_title('Subscriptions by Billing Frequency', fontsize=14, fontweight='bold')
ax.set_ylabel('Count')

ax = axes[1]
metrics = ['Churn Rate', 'Upgrade Rate']
monthly_vals = [billing_stats.loc['monthly', 'churn_rate']*100, billing_stats.loc['monthly', 'upgrade_rate']*100]
annual_vals = [billing_stats.loc['annual', 'churn_rate']*100, billing_stats.loc['annual', 'upgrade_rate']*100]
x = range(len(metrics))
width = 0.35
ax.bar([i - width/2 for i in x], monthly_vals, width, label='Monthly', color='#3b82f6', edgecolor='white')
ax.bar([i + width/2 for i in x], annual_vals, width, label='Annual', color='#8b5cf6', edgecolor='white')
ax.set_xticks(x)
ax.set_xticklabels(metrics)
ax.set_ylabel('Rate (%)')
ax.set_title('Monthly vs Annual: Churn & Upgrade', fontsize=14, fontweight='bold')
ax.legend()
for i, (m, a) in enumerate(zip(monthly_vals, annual_vals)):
    ax.text(i - width/2, m + 0.3, f'{m:.1f}%', ha='center', fontsize=9)
    ax.text(i + width/2, a + 0.3, f'{a:.1f}%', ha='center', fontsize=9)

plt.tight_layout()
plt.savefig(CHARTS / 'billing_frequency.png', dpi=200, bbox_inches='tight')
plt.close()

# ─── 11. Revenue Cohort (by signup month) ───
print("\n📅 Revenue Cohort Analysis")
cohort = merged.groupby(merged['signup_date'].dt.to_period('M')).agg(
    accounts=('account_id', 'nunique'),
    subscriptions=('subscription_id', 'count'),
    total_mrr=('mrr_amount', 'sum'),
    avg_mrr=('mrr_amount', 'mean'),
    churn_rate=('churn_flag', 'mean'),
    upgrade_rate=('upgrade_flag', 'mean')
).sort_index().tail(12)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

ax = axes[0]
months = [str(m) for m in cohort.index]
ax.plot(months, cohort['total_mrr'], marker='o', color='#3b82f6', linewidth=2, markersize=8)
ax.fill_between(range(len(months)), cohort['total_mrr'], alpha=0.1, color='#3b82f6')
ax.set_title('MRR by Signup Cohort (Last 12 Months)', fontsize=14, fontweight='bold')
ax.set_ylabel('Total MRR ($)')
ax.set_xticklabels(months, rotation=45)
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))

ax = axes[1]
ax2 = ax.twinx()
ax.bar(months, cohort['subscriptions'], color='#8b5cf6', alpha=0.7, edgecolor='white', label='Subscriptions')
ax2.plot(months, cohort['churn_rate']*100, marker='s', color='#ef4444', linewidth=2, markersize=6, label='Churn Rate')
ax.set_title('Subscriptions & Churn Rate by Cohort', fontsize=14, fontweight='bold')
ax.set_ylabel('Subscriptions')
ax2.set_ylabel('Churn Rate (%)')
ax.set_xticklabels(months, rotation=45)
lines1, labels1 = ax.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax.legend(lines1 + lines2, labels1 + labels2, loc='upper left')

plt.tight_layout()
plt.savefig(CHARTS / 'cohort_analysis.png', dpi=200, bbox_inches='tight')
plt.close()

# ─── 12. MRR Distribution (Boxplot) ───
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

ax = axes[0]
sns.boxplot(data=subs, x='plan_tier', y='mrr_amount', palette=colors, ax=ax)
ax.set_title('MRR Distribution by Plan Tier', fontsize=14, fontweight='bold')
ax.set_ylabel('MRR ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))

ax = axes[1]
seats_mrr = subs.groupby('seats')['mrr_amount'].mean().reset_index().head(20)
sns.regplot(data=seats_mrr, x='seats', y='mrr_amount', ax=ax, scatter_kws={'color': '#3b82f6', 'alpha': 0.6},
            line_kws={'color': '#ef4444', 'linewidth': 2})
ax.set_title('MRR vs Seats', fontsize=14, fontweight='bold')
ax.set_xlabel('Licensed Seats')
ax.set_ylabel('MRR ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))

plt.tight_layout()
plt.savefig(CHARTS / 'mrr_distribution.png', dpi=200, bbox_inches='tight')
plt.close()

# ─── 13. Trial vs Paid Revenue ───
print("\n🧪 Trial vs Paid Revenue")
trial_revenue = subs.groupby('is_trial').agg(
    subscriptions=('subscription_id', 'count'),
    total_mrr=('mrr_amount', 'sum'),
    avg_mrr=('mrr_amount', 'mean'),
    avg_seats=('seats', 'mean'),
    churn_rate=('churn_flag', 'mean'),
    upgrade_rate=('upgrade_flag', 'mean')
).round(2)
trial_revenue.index = ['Paid', 'Trial']
print(trial_revenue)

# ─── 14. Auto-renew Impact on Revenue ───
print("\n🔄 Auto-renew Impact")
auto_stats = subs.groupby('auto_renew_flag').agg(
    subscriptions=('subscription_id', 'count'),
    total_mrr=('mrr_amount', 'sum'),
    avg_mrr=('mrr_amount', 'mean'),
    churn_rate=('churn_flag', 'mean')
).round(2)
auto_stats.index = ['Manual Renew', 'Auto Renew']
auto_stats['sub_share'] = (auto_stats['subscriptions'] / len(subs) * 100).round(1)
print(auto_stats)

# ─── 15. Summary Stats ───
print("\n📊 Summary Statistics for MRR")
print(subs['mrr_amount'].describe())

# ─── 16. Save Analysis Data ───
results = {
    "revenue_overview": revenue_overview,
    "plan_tier": plan_stats.to_dict(),
    "industry_revenue": industry_revenue.to_dict(),
    "country_top10": country_revenue.to_dict(),
    "referral_revenue": referral_revenue.to_dict(),
    "billing_stats": billing_stats.to_dict(),
    "trial_revenue": trial_revenue.to_dict(),
    "auto_renew": auto_stats.to_dict(),
    "mrr_summary": subs['mrr_amount'].describe().to_dict(),
    "upgrade_count": int(upgrade_count),
    "downgrade_count": int(downgrade_count),
    "upgrade_rate": float(upgrade_count/len(subs)*100),
    "downgrade_rate": float(downgrade_count/len(subs)*100),
}

with open(OUT / 'revenue_analysis_data.json', 'w') as f:
    json.dump(results, f, indent=2, ensure_ascii=False, default=str)

print(f"\n✅ Analysis complete! Charts saved to {CHARTS}")
print(f"📄 Data saved to {OUT / 'revenue_analysis_data.json'}")
