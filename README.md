\# 3-Tier Application



A 3-tier web application consisting of a \*\*Frontend\*\*, \*\*Backend API\*\*, and \*\*Database\*\*.



\## Architecture



```text

&#x20;                   ┌─────────────────────┐

&#x20;                   │      Frontend       │

&#x20;                   │   Presentation Tier │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                           HTTP/REST

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │       Backend       │

&#x20;                   │   Application Tier  │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                        SQL / Database

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │      Database       │

&#x20;                   │      Data Tier      │

&#x20;                   └─────────────────────┘



