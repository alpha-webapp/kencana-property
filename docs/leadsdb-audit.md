
---

## Executive summary (ID vs AU)

| Check                                                    | Indonesia (ID) | Australia (AU) |
| -------------------------------------------------------- | -------------: | -------------: |
| Companies in company list                                |            114 |             22 |
| Contact rows                                             |            211 |             61 |
| Companies with ≥1 contact                                |             78 |             22 |
| **Companies missing contacts**                           |         **36** |          **0** |
| **Contacts missing/invalid LinkedIn**                    |   **32 / 211** |    **47 / 61** |
| **Companies with NO valid LinkedIn across all contacts** |          **7** |         **14** |
| **Contacts missing/invalid email**                       |   **83 / 211** |    **14 / 61** |
| **Companies with NO valid email across all contacts**    |         **29** |          **6** |
| **Companies missing any phone number**                   |         **64** |          **1** |
| Phone values starting with `"="` (format issue)          |             91 |             38 |
| Company rows with bad/missing Linkedin/Website           |             26 |              5 |

---

## Indonesia (ID) audit

### 1) Companies missing decision-maker contacts

* **36 / 114** companies in **Company Lists ID** have **no matching company in Contacts ID**.

Since your current priority is **invoice fraud detection**, here are the **Fraud-category companies missing contacts** (**12** total — highest priority to fill first):

* Dekoruma
* PLP Indonesia (PT Preformed Line Products Indonesia)
* PT Andalan Fluid Sistem
* PT Dyandra Promosindo
* PT Genesis Regeneration Smelting
* PT Global Medik Persada (Glomeda)
* PT Gracia Pharmindo
* PT Hon Chuan Indonesia
* PT Maju Express Indonesia
* PT Mustika Ratu Tbk
* PT Nusa Raya Cipta Tbk
* PT. MSMO Indonesia Grup

(Full list of all 36 “no contacts” companies is in the report: **ID_Companies_NoContacts**.)

---

### 2) Decision-maker LinkedIn profile link quality

In **Contacts ID**:

* **32 / 211** contacts have **missing/invalid** LinkedIn profile links.

  * **21** = blank/missing
  * **8** = “LinkedIn text but not an actual URL” (ex: `Name - Title | LinkedIn`, “Paywall”, etc.)
  * **3** = **Sales Navigator** links (`linkedin.com/sales/lead/...`) → not a normal public profile link

**Companies where *none* of the contacts have a valid LinkedIn URL (7):**

* Integrity Asia
* PT AKR Corporindo Tbk
* PT Galenium Pharmasia Laboratories
* PT Infomedia Nusantara
* Sayurbox
* Tempo Scan Pacific Tbk
* Waresix

These 7 are all **Fraud** leads (so this is a meaningful gap for outreach).

---

### 3) Company numbers (phone) audit

Interpreting “company numbers” as **Company Phone Number** in the contact rows (since there’s no separate company-level phone column):

* **64 / 114** ID companies have **no phone number at all** captured in the contacts data (this includes companies with no contacts and companies with contacts but phone missing/placeholder).
* **Formatting issue:** **91** contact rows have phone numbers starting with `"="` (example: `=+62 21 ...`). This is risky in Google Sheets/exports and should be cleaned to `+62 21 ...` as plain text.

The report includes:

* **ID_Companies_NoPhone**
* **ID_Contacts_Phone_Issues**
* **ID_Phone_LeadingEquals**

---

### 4) Emails audit

In **Contacts ID**:

* **83 / 211** contacts have **missing/invalid** “Company Contactable Email”

  * **73** missing
  * **6** are literal placeholders like **“Not found”**
  * **4** contain **notes/instructions** instead of an email (ex: “Use pattern first@…”, “use web form …”) → should be moved to Notes, leaving the email cell blank or filled with a real email

**Fraud companies with contacts but NO valid email across all contacts (18):**

* Allianz Indonesia (Allianz Life)**
* Burger Bangor
* Combiphar
* Integrity Asia
* Lion Parcel (PT Lion Express)
* PT AKR Corporindo Tbk
* PT Bina Karya Prima
* PT Century Franchisindo Utama (Apotek Century)
* PT Dewata Kencana Distribusi (Orang Tua Group)
* PT Galenium Pharmasia Laboratories
* PT Hexindo Adiperkasa Tbk
* PT Infomedia Nusantara
* PT K-24 Indonesia
* PT Kubangan Putra Karya (Kubangan Kitchen)
* PT Mulia Boga Raya Tbk (Prochiz)
* PT Sejahtera Sama Kita
* Sociolla
* Waresix

---

### 5) Missing Role / Department (affects targeting + messaging)

In **Contacts ID**:

* **Role missing:** **18**
* **Department missing:** **78** (big one)

Also, **4 companies** have contacts but **every contact has Role empty** (so they are basically “not decision-maker usable” yet):

* Allianz Indonesia (Allianz Life)**
* Integrity Asia
* Lion Parcel (PT Lion Express)
* PT Galenium Pharmasia Laboratories

This is important because even if you have a name + LinkedIn, missing role/department makes sequencing + personalization much harder.

---

### 6) Company list completeness

In **Company Lists ID**:

* Missing **Location**: **32**
* Missing **Total Employee**: **11**
* Missing **Industry**: **2** (Bina Nusantara IT Division, Mitrais)
* Missing **Leads Category**: **1** (Mitrais)

**Linkedin/Website field issues (26 total):**

* **9** missing completely:
  Integrity Asia; Mitrais; PT Integra Solusi Mandiri; PT iForce Consulting Indonesia; PT Zahir Internasional (Zahir Accounting); PT Bina Karya Prima; PT Galenium Pharmasia Laboratories; PT Hexpharm Jaya Laboratories; PT Antarmitra Sembada
* **15** are in the format `Company | LinkedIn` (text, not clickable URL)
* **2** are non-links like “Not found” / “SamaKita”

---

### 7) Data hygiene problems (small but worth fixing)

* **Blank / placeholder rows in Contacts ID:**

  * 1 fully blank row (everything empty)
  * 4 placeholder rows where **Company is filled but all contact fields are empty** (3 duplicates under PT Galenium + 1 under Apotek Century)
* **Trailing spaces in company names** in both Company + Contacts sheets:

  * `PT K-24 Indonesia `
  * `Mayapada Healthcare Group `
    These should be trimmed to avoid future join/match issues.

---

## Australia (AU) audit

### 1) Company-to-contact coverage

* **0 / 22** companies missing contacts (good coverage)

But…

### 2) Decision-maker LinkedIn profile link quality (major gap)

In **Contact Lists AU**:

* Only **14 / 61** contacts have a valid LinkedIn profile URL.
* **47 / 61** are missing/invalid:

  * **32** blank/missing
  * **13** explicitly set as **“Not found”**
  * a small number are malformed/non-standard

**Companies where *none* of the contacts have a valid LinkedIn URL (14):**

* 4mation Technologies
* Aidacare Pty Ltd
* Beacon Lighting Group (Beacon Lighting)
* Brand Collective Pty Ltd
* Computer Alliance
* D.J. Wightman & Co Pty Ltd (Wightman Transport)
* Ethan (Ethan Group)
* Farm Pride Foods Ltd
* Fusion5 (Australia / New Zealand)
* GBST
* Hall & Prior Health & Aged Care Group
* MSP Corporation
* Simplyai
* Who Gives A Crap

**Note:** all **7 Fraud-category AU companies** currently have **no valid LinkedIn** captured.

Also: **4** of the “valid” LinkedIn links are missing the `https://` prefix (easy cleanup).

---

### 3) Phone numbers

* **1 / 22** companies missing a phone number: **Who Gives A Crap**
* **Formatting issue:** **38** phone numbers start with `"="` (example: `=+61 ...`) → clean to plain text

---

### 4) Emails

In **Contact Lists AU**:

* **14 / 61** contacts missing/invalid email (includes “Not found” placeholders and a couple entries with notes mixed into the field)

**Companies with no valid email across all contacts (6):**

* Fraud: D.J. Wightman & Co; Hall & Prior; Who Gives A Crap
* Modernization: Fusion5; GBST; SRA Information Technology

---

### 5) Structural issues in AU Contacts tab

* There is **1 completely blank row**.
* There is **1 contact row missing the Company name**:

  * **Dane Eldridge (Chief Executive Officer)** has Company = blank
  * This almost certainly belongs to **4mation Technologies** (same email domain + phone), so the company should be filled in to preserve matching.

---

### 6) AU Company list completeness

In **Company Lists AU**:

* Missing **Location**: **8**
* Missing **Industry**: **1** (KJR Australia)
* Missing **Total Employee**: **1** (KJR Australia)
* Missing **Linkedin/Website**: **5**
  (Discovery Consulting, Advent One, MSP Corporation, SRA Information Technology, ASI Solutions)

Also: one row (**Micromine**) has the same long note duplicated into **Status** and **Notes**, suggesting the **Status** column is being used inconsistently.

---

## What I’d fix first (fastest improvements for outreach)

### Priority 1 (blocks outreach)

1. **ID Fraud companies with zero contacts** (12 listed above)
2. **AU LinkedIn**: replace “Not found” / blank with actual `https://linkedin.com/in/...` links (47 contact rows impacted)

### Priority 2 (makes sequencing workable)

3. Fill **Role + Department** for ID contacts where missing (Role missing 18; Dept missing 78)
4. Fill **emails** for the highest-value Fraud companies (ID: 18 Fraud companies currently have no valid email across contacts)

### Priority 3 (cleanup / prevents Sheet bugs)

5. Remove leading `"="` from phone numbers (ID: 91 rows; AU: 38 rows)
6. Convert company “Linkedin/Website” entries like `Company | LinkedIn` into real URLs (ID has 15 like this)
7. Delete placeholder blank rows + trim trailing spaces in company names

---

## Attached: full fix lists

Everything above is broken down row-by-row in the audit workbook.

