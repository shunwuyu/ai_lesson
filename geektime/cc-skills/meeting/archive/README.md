\# RavenStack: Synthetic SaaS Dataset (Multi-Table)



\*\*Author:\*\* River @ Rivalytics  

\*\*Credit Requirement:\*\* You may use or remix this dataset for educational or portfolio purposes, but please credit the original author.  

\*\*Blog:\*\* \[Building a Dataset Generator App Journey](https://rivalytics.medium.com)  

\*\*License:\*\* MIT-like (fully synthetic, no PII)  

\*\*Refresh Interval:\*\* Monthly  

\*\*Complexity:\*\* Capstone-level (multi-table, event-driven, time-sensitive)  

\*\*Data Format:\*\* CSV  

\*\*Row Volume:\*\*

\- accounts – 500

\- subscriptions – 5,000

\- feature\_usage – 25,000

\- support\_tickets – 2,000

\- churn\_events – 600



---



\## Scenario



You're investigating RavenStack, a stealth-mode SaaS startup delivering AI-driven team tools. The product was secretly piloted with coding bootcamp graduates, and every sign-up, feature use, support ticket, and churn was captured. Now, you're tasked with discovering what drove conversions, support load, and churn patterns before their public launch.



---



\## How This Dataset Was Generated



\- Scripted in Python using pandas, numpy, and uuid

\- Temporal logic: Validated date ranges (e.g., signup ≤ subscription ≤ churn)

\- Statistical realism: Exponential and Poisson distributions for seats, usage, and durations

\- Primary \& foreign keys: All tables link properly; no orphans

\- Edge cases: Mid-cycle plan changes, null fields, reactivations, duplicate referrals, beta feature spikes

\- Nulls included: Satisfaction scores, feature usage, churn feedback

\- Fully synthetic: All names, domains, feedback, and data are generated



---



\## Table Relationships



accounts (PK: account\_id)

│

├── subscriptions (FK → accounts.account\_id)

│ └── feature\_usage (FK → subscriptions.subscription\_id)

│

├── support\_tickets (FK → accounts.account\_id)

└── churn\_events (FK → accounts.account\_id)



pgsql

Copy

Edit



All account\_id and subscription\_id links are referentially complete.



---



\## Table Schemas



\### accounts.csv

| Column         | Type       | Description                                |

|----------------|------------|--------------------------------------------|

| account\_id     | ID         | Unique customer (primary key)              |

| account\_name   | string     | Fictional company name                     |

| industry       | categorical| SaaS vertical (e.g., DevTools, EdTech)     |

| country        | string     | ISO-2 country code                         |

| signup\_date    | date       | Account creation date                      |

| referral\_source| categorical| organic, ads, event, partner, other        |

| plan\_tier      | categorical| Initial plan (Basic, Pro, Enterprise)      |

| seats          | integer    | Licensed user count                        |

| is\_trial       | boolean    | Currently trialing                         |

| churn\_flag     | boolean    | Churned at any point                       |



\### subscriptions.csv

| Column           | Type       | Description                            |

|------------------|------------|----------------------------------------|

| subscription\_id  | ID         | Unique subscription (primary key)      |

| account\_id       | ID (FK)    | Links to accounts.account\_id           |

| start\_date       | date       | Subscription start                     |

| end\_date         | date       | Nullable for active plans              |

| plan\_tier        | categorical| Plan at time of billing                |

| seats            | integer    | Licensed seats                         |

| mrr\_amount       | currency   | Monthly revenue                        |

| arr\_amount       | currency   | Annual revenue                         |

| is\_trial         | boolean    | Trial status                           |

| upgrade\_flag     | boolean    | Plan upgraded mid-cycle                |

| downgrade\_flag   | boolean    | Plan downgraded mid-cycle              |

| churn\_flag       | boolean    | True if ended                          |

| billing\_frequency| categorical| monthly or annual                      |

| auto\_renew\_flag  | boolean    | 80% true                               |



\### feature\_usage.csv

| Column           | Type       | Description                            |

|------------------|------------|----------------------------------------|

| usage\_id         | ID         | Unique usage event                     |

| subscription\_id  | ID (FK)    | Links to subscriptions.subscription\_id |

| usage\_date       | date       | Date of usage                          |

| feature\_name     | categorical| From pool of 40 SaaS features          |

| usage\_count      | integer    | Event frequency                        |

| usage\_duration\_secs | integer | Time spent                             |

| error\_count      | integer    | Logged errors                          |

| is\_beta\_feature  | boolean    | 10% flagged as beta                    |



\### support\_tickets.csv

| Column                  | Type       | Description                          |

|-------------------------|------------|--------------------------------------|

| ticket\_id               | ID         | Unique ticket                        |

| account\_id              | ID (FK)    | Links to accounts.account\_id         |

| submitted\_at            | datetime   | Time opened                          |

| closed\_at               | datetime   | Time resolved                        |

| resolution\_time\_hours   | float      | Duration                             |

| priority                | categorical| low, medium, high, urgent            |

| first\_response\_time\_minutes | integer| Minutes to first response            |

| satisfaction\_score      | integer    | 1–5 (null = no response)             |

| escalation\_flag         | boolean    | True if escalated                    |



\### churn\_events.csv

| Column              | Type       | Description                           |

|---------------------|------------|---------------------------------------|

| churn\_event\_id      | ID         | Unique churn instance                 |

| account\_id          | ID (FK)    | Links to accounts.account\_id          |

| churn\_date          | date       | When account left                     |

| reason\_code         | categorical| pricing, support, features, etc.      |

| refund\_amount\_usd   | currency   | $0 default, 25% have credit/refund    |

| preceding\_upgrade\_flag| boolean | Had upgrade within 90 days             |

| preceding\_downgrade\_flag| boolean| Had downgrade within 90 days          |

| is\_reactivation     | boolean    | 10% were previously churned           |

| feedback\_text       | string     | Optional customer comment             |



---



\## Suggested Projects



\- Churn prediction using subscriptions + support data

\- Feature adoption tracking during beta phases

\- Support workload forecasting

\- Revenue cohort analysis by referral channel

\- Plan tier upgrade funnel by industry

\- Latency analysis by seat count and plan tier



---



\## Licensing



This dataset is fully synthetic and distributed under a permissive MIT-like license.  

You may use or remix it for learning, research, or portfolio purposes, but \*\*you must credit the dataset author: River @ Rivalytics.\*\*





