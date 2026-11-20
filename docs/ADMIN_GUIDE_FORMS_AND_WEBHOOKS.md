# Secure-Centric: Administrator Guide for Forms & Webhooks

This guide is designed for website administrators and team members with no coding experience. It explains step-by-step how to find, edit, customize, and connect webhooks to forms on **secure-centric.com** using the WordPress admin dashboard.

---

## 1. Overview of Website Forms

The website currently uses **Forminator** to handle all forms and lead generation. Here are the active forms:

| Form Name | Form ID | Where It Appears on the Website | What It Does |
|---|---|---|---|
| **Contact Us Form** | `101` | Contact Page (`/contact/`) & Contact sections | Inquiries, consultation requests |
| **CMMC & NIST Checklist Download Form** | `102` | Checklist pages (`/checklist/level-1/`, `/checklist/level-2/`, `/checklist/unmarked-cui/`) & Download bands | Gated lead magnet downloads with instant PDF delivery |
| **Newsletter Signup** | `106` | Global site footer | Email newsletter subscriptions |
| **CUI Identification Session Form** | `367` | Homepage Hero (Right card) | Free CUI session bookings (redirects to `/cui-session/`) |

---

## 2. How to Access the Forms in WordPress

1. Log into your WordPress Admin Dashboard at:
   ```
   https://secure-centric.com/wp-admin
   ```
2. In the dark left-hand navigation sidebar, look for **Forminator**.
3. Click on **Forms** (or hover over Forminator and select **Forms**).
4. You will see the list of all forms currently created on the website.

---

## 3. How to Edit an Existing Form

### Step 3.1: Open the Form Editor
1. In the **Forminator > Forms** list, find the form you want to edit.
2. Hover your mouse over the form title or click the **Gear icon (⚙️)** on the right side of the row.
3. Click **Edit**. This opens the Form Builder.

---

### Step 3.2: Editing, Adding, or Removing Fields

Inside the **Fields** tab (selected by default on the left):

* **To change field text (Labels or Placeholders):**
  1. Click directly on the field card (for example, *Full name*, *Work email*, or *Company*).
  2. A popup window titled **Edit Field** will appear.
  3. Under the **Labels** tab:
     * **Label**: The title displayed above the field.
     * **Placeholder**: The gray hint text shown inside the box before someone types.
  4. Under the **Settings** tab:
     * Choose whether the field is **Required** (mandatory) or **Optional**.
  5. Click the blue **Apply** button at the bottom right of the popup.

* **To reorder fields:**
  * Click and hold any field card, then drag it up or down to your desired position.

* **To delete a field:**
  * Hover over the field card and click the small **trash can icon (🗑️)** or click the gear icon inside the field card and choose **Delete**.

* **To add a new field:**
  1. Click the blue **+ Insert Fields** button above the form canvas.
  2. Select the field type you want to add (e.g., *Phone*, *Select/Dropdown*, *Checkbox*, *Textarea*, or *Website*).
  3. Click **Insert Fields**.
  4. Configure its label and placeholder, then click **Apply**.

---

### Step 3.3: Changing the Submit Button Text

1. In the Form Builder, scroll down to the bottom where the **Submit** button is displayed.
2. Click on the button card.
3. In the popup window under **Button Text**, change the text (e.g., from *"Submit"* to *"Get My Checklist"* or *"Talk to an Expert"*).
4. Click **Apply**.

---

### Step 3.4: Changing What Happens After Submission (Thank You vs Redirect)

1. In the left-hand menu of the Form Builder, click on **Behavior**.
2. Under **Submission Behaviour**, you will see how the form responds when someone submits:
   * **Inline Message**: Shows a thank-you note or custom message directly on the page without reloading.
   * **Redirect user to a URL**: Sends the user to a dedicated page (such as `/thank-you/` or `/cui-session/`).
3. To edit the redirect URL, simply paste the full URL in the **Redirect URL** field.
4. Click **Apply** or proceed to save.

---

### Step 3.5: Saving Your Changes
* Whenever you finish making changes, click the blue **Update** button in the top right corner of the screen.
* *Your changes will go live on the website immediately.*

---

## 4. How to Edit or Add a Webhook for a Form (GoHighLevel, Zapier, etc.)

A **Webhook** sends the lead data (name, email, company, phone) instantly to an external tool like **GoHighLevel**, **Zapier**, or **Make** whenever someone submits the form.

You can configure and manage webhooks in the WordPress dashboard without writing any code:

### Step 4.1: Open the Form's Integrations Tab
1. Go to **Forminator > Forms**.
2. Click **Edit** on the form you want to connect (e.g., *Contact Us Form*).
3. In the left-hand column inside the Form Builder, click on **Integrations**.

---

### Step 4.2: Connecting or Editing the Webhook

Under the **Available Integrations** or **Connected Apps** list:

* **If Webhook is already connected:**
  1. Look for **Webhook** in the list.
  2. Click the **Gear icon (⚙️)** next to it and select **Edit Connection** (or **Configure**).
  3. You will see the current **Webhook URL** (e.g., your GoHighLevel link `https://services.leadconnectorhq.com/hooks/...`).
  4. Replace or update the URL with your new webhook URL.
  5. Click **Save** / **Activate**.

* **If Webhook is NOT yet connected to this form:**
  1. In the **Integrations** tab, find **Webhook** under *Available Apps*.
  2. Click the blue **+ (Plus)** button or **Activate** next to Webhook.
  3. A popup window will prompt you for:
     * **Webhook Name**: Enter a descriptive name (e.g., `GoHighLevel Lead Capture` or `CRM Sync`).
     * **Webhook URL**: Paste your inbound webhook URL provided by GoHighLevel or Zapier.
  4. Click **Next** / **Save**.
  5. Forminator will automatically map all form fields (name, email, phone, text) to the webhook payload.

---

### Step 4.3: Saving & Testing the Webhook
1. Click the blue **Update** button in the top right corner to publish your form changes.
2. Go to the live page on the website.
3. Fill out the form with test information (e.g., name `Test Admin`, email `test@secure-centric.com`).
4. Click submit.
5. Check your GoHighLevel Workflow (or Zapier History) to confirm that the lead arrived successfully.

---

## 5. How to View and Export Form Submissions in WordPress

Even if webhooks are sent to your CRM, WordPress stores an automatic backup copy of every form submission inside the database:

1. In the left-hand admin sidebar, go to **Forminator > Submissions**.
2. From the dropdown menu at the top, select the form you want to check (e.g., *Contact Us Form* or *CMMC & NIST Checklist Download Form*).
3. Click **Show Submissions**.
4. You will see a complete table listing:
   * Date and time of submission.
   * Full name, work email, phone, and company name.
   * The page URL where the submission took place.
5. **To Export to Excel / CSV:**
   * Click the **Export** button in the top right above the table.
   * Select the date range and click **Download CSV**.

---

## 6. Reference: Server-Side Custom Automated Webhooks

For advanced tracking, the website also has a dedicated server-side forwarder configured in the theme:

* **Lead Magnet Downloads (Flow 3)**:
  * Handled by: `wp-content/themes/secure-centric/inc/ghl-flow3-lead-magnet.php`
  * Automatically matches which PDF the user requested based on the page URL, triggers an instant browser download, and sends the lead to GoHighLevel with tags `source - website` and `website - lead magnet - <checklist-name>`.
* **Newsletter (Flow 1) & Contact Us (Flow 4)**:
  * Handled by: `wp-content/themes/secure-centric/functions.php`

> [!TIP]
> If a marketing manager or team member wants to redirect leads to a new CRM or add a Zapier webhook in the future, they do **not** need to touch server code. They can simply use **Step 4** above directly inside the WordPress Forminator editor.
