# Jury Voting System - Playwright Automation

Playwright + TypeScript automation tests for the GCA **Jury Voting System (SP-1965)** epic.

Covers all 6 stories: SP-1793 (Judge Nominations), SP-1794 (Judge Voting), SP-1795 (Judge Final Evaluation), SP-1796 (Admin Nominations), SP-1797 (Admin Voting), SP-1798 (Admin Final Evaluation).

---

## Prerequisites

- Node.js 18+
- - npm 9+
  - - Git
   
    - ---

    ## Setup

    ### 1. Clone the repository

    ```bash
    git clone https://github.com/alaaramadan-qa/jury-voting-system-automation.git
    cd jury-voting-system-automation
    ```

    ### 2. Install dependencies

    ```bash
    npm install
    ```

    ### 3. Install Playwright browsers

    ```bash
    npx playwright install
    ```

    ### 4. Configure environment

    Copy the example env file and fill in your values:

    ```bash
    cp .env.example .env
    ```

    Edit `.env`:

    ```
    ADMIN_URL=https://admin.stg.alweb4tech.com/
    ADMIN_EMAIL=alaa.ramadan+ai@alweb.com
    ADMIN_PASSWORD=Test@1234
    JUDGE1_EMAIL=alaa.ramadan+jf@alweb.com
    JUDGE1_PASSWORD=Test@1234
    JUDGE2_EMAIL=alaa.ramadan+final2@alweb.com
    JUDGE2_PASSWORD=Test@1234
    JUDGE3_EMAIL=alaa.ramadan+final3@alweb.com
    JUDGE3_PASSWORD=Test@1234
    ```

    ---

    ## Pre-Test Setup: Fetch Dynamic Data from Admin

    Before running tests, fetch the following dynamic data from the admin panel and update `fixtures/testData.ts`:

    ### Award Categories
    1. Log in to `https://admin.stg.alweb4tech.com/` with admin credentials
    2. 2. Navigate to **Categories** page
       3. 3. Filter by entity type = **Jury** / **لجنة التحكيم**
          4. 4. Copy all active category names into `testData.awardCategories`
            
             5. ### Evaluation Criteria & Weights
             6. 1. Navigate to **Jury Award** page in the admin panel
                2. 2. Find the evaluation criteria section
                   3. 3. Copy each criterion name and its weight percentage into `testData.evaluationCriteria`
                     
                      4. ---
                     
                      5. ## Running Tests
                     
                      6. ### Run all tests
                     
                      7. ```bash
                         npx playwright test
                         ```

                         ### Run by tag

                         ```bash
                         # Smoke tests only
                         npx playwright test --grep @smoke

                         # Regression tests
                         npx playwright test --grep @regression

                         # English language tests
                         npx playwright test --grep @lang-en

                         # Arabic language tests
                         npx playwright test --grep @lang-ar

                         # End-to-end workflow tests
                         npx playwright test --grep @e2e

                         # Negative/edge case tests
                         npx playwright test --grep "@negative|@edge"

                         # Tests for a specific story
                         npx playwright test --grep @SP-1795
                         ```

                         ### Run a specific spec file

                         ```bash
                         npx playwright test tests/jury-voting-system/01-navigation.spec.ts
                         npx playwright test tests/jury-voting-system/06-e2e-workflow.spec.ts
                         ```

                         ### Run in headed mode (see browser)

                         ```bash
                         npx playwright test --headed
                         ```

                         ### Run in debug mode

                         ```bash
                         npx playwright test --debug
                         ```

                         ---

                         ## View Reports

                         ### Open HTML report after test run

                         ```bash
                         npx playwright show-report
                         ```

                         Reports are saved to `playwright-report/` after each run.
                         Screenshots on failure are saved to `test-results/`.

                         ---

                         ## Project Structure

                         ```
                         jury-voting-system-automation/
                         ├── .env.example               # Environment variable template
                         ├── .gitignore
                         ├── package.json
                         ├── playwright.config.ts       # Playwright configuration
                         ├── tsconfig.json
                         ├── fixtures/
                         │   └── testData.ts            # Test data: users, categories, criteria
                         ├── pages/                     # Page Object Model classes
                         │   ├── LoginPage.ts
                         │   ├── NominationsPage.ts
                         │   ├── VotingPage.ts
                         │   └── FinalEvaluationPage.ts
                         └── tests/
                             └── jury-voting-system/
                                 ├── 01-navigation.spec.ts        # Login + JVS navigation (SP-1793..SP-1798)
                                 ├── 02-judge-nominations.spec.ts # Judge nominations tab (SP-1793)
                                 ├── 03-admin-nominations.spec.ts # Admin nominations tab (SP-1796)
                                 ├── 04-voting.spec.ts            # Judge + Admin voting (SP-1794, SP-1797)
                                 ├── 05-final-evaluation.spec.ts  # Judge + Admin final eval (SP-1795, SP-1798)
                                 └── 06-e2e-workflow.spec.ts      # Full end-to-end workflow (all 6 stories)
                         ```

                         ---

                         ## Test States

                         Tests depend on specific system states. Set up the correct state before running:

                         | State | Description | Required for |
                         |-------|-------------|--------------|
                         | 0 | Clean - No nominations submitted | 01, 02, 03 |
                         | 1 | All judges submitted nominations | 03 (admin tests) |
                         | 2 | Admin published refined list | 04 (voting tests) |
                         | 3 | All judges voted | 04 (admin voting tests) |
                         | 4 | Admin confirmed top 3 | 05 (eval tests) |
                         | 5 | All judges submitted evaluations | 05 (admin winner tests) |

                         ---

                         ## Test Accounts

                         | Role | Email | Login URL |
                         |------|-------|-----------|
                         | Admin | alaa.ramadan+ai@alweb.com | https://admin.stg.alweb4tech.com/ |
                         | Final Judge 1 | alaa.ramadan+jf@alweb.com | https://admin.stg.alweb4tech.com/ |
                         | Final Judge 2 | alaa.ramadan+final2@alweb.com | https://admin.stg.alweb4tech.com/ |
                         | Final Judge 3 | alaa.ramadan+final3@alweb.com | https://admin.stg.alweb4tech.com/ |

                         ---

                         ## Language Testing

                         All bilingual scenarios are split into `@lang-en` and `@lang-ar` variants.
                         - **English (`@lang-en`)**: `/en/` URL prefix, LTR direction, English fonts
                         - - **Arabic (`@lang-ar`)**: No prefix (default), RTL direction, Arabic fonts
                          
                           - ---

                           ## Related Stories

                           | Story | Title |
                           |-------|-------|
                           | SP-1793 | Judge Nominations Tab |
                           | SP-1794 | Judge Voting Tab |
                           | SP-1795 | Judge Final Evaluation Tab |
                           | SP-1796 | Admin Nominations Tab |
                           | SP-1797 | Admin Voting Tab |
                           | SP-1798 | Admin Final Evaluation Tab |
