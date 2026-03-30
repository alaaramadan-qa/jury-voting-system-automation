import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { NominationsPage } from '../../pages/NominationsPage';
import { VotingPage } from '../../pages/VotingPage';
import { FinalEvaluationPage } from '../../pages/FinalEvaluationPage';
import { testData } from '../../fixtures/testData';

/**
 * End-to-End Workflow Tests
 * Connects all 6 stories: SP-1793, SP-1794, SP-1795, SP-1796, SP-1797, SP-1798
 *
 * Full JVS Workflow:
 * State 0: Clean - No nominations
 * State 1: All judges submit nominations (SP-1793)
 * State 2: Admin publishes refined nominations list (SP-1796)
 * State 3: All judges vote (SP-1794)
 * State 4: Admin confirms top 3 (SP-1797)
 * State 5: All judges submit final evaluations (SP-1795)
 * State 6: Admin declares winner (SP-1798)
 */

test.describe('E2E Workflow - Full Jury Voting System (SP-1793 + SP-1794 + SP-1795 + SP-1796 + SP-1797 + SP-1798)', () => {

  test('@smoke @e2e @SP-1793 @SP-1796 @SP-1794 @SP-1797 @SP-1795 @SP-1798 - Complete JVS workflow from nominations to winner declaration', async ({ browser }) => {
    // === STATE 1: Judges submit nominations ===
    const judgeContext1 = await browser.newContext();
    const judgePage1 = await judgeContext1.newPage();
    const loginJ1 = new LoginPage(judgePage1);
    const nominationsJ1 = new NominationsPage(judgePage1);

    await loginJ1.login(testData.judge1.email, testData.judge1.password);
    await nominationsJ1.navigateToJuryVotingSystem();
    await nominationsJ1.clickNominationsTab();
    await nominationsJ1.selectAllCategoryNominations(testData.awardCategories);
    await nominationsJ1.clickSubmitNominations();
    await nominationsJ1.confirmSubmitNominations();
    await nominationsJ1.verifyNominationsSubmitted();
    await judgeContext1.close();

    const judgeContext2 = await browser.newContext();
    const judgePage2 = await judgeContext2.newPage();
    const loginJ2 = new LoginPage(judgePage2);
    const nominationsJ2 = new NominationsPage(judgePage2);

    await loginJ2.login(testData.judge2.email, testData.judge2.password);
    await nominationsJ2.navigateToJuryVotingSystem();
    await nominationsJ2.clickNominationsTab();
    await nominationsJ2.selectAllCategoryNominations(testData.awardCategories);
    await nominationsJ2.clickSubmitNominations();
    await nominationsJ2.confirmSubmitNominations();
    await nominationsJ2.verifyNominationsSubmitted();
    await judgeContext2.close();

    const judgeContext3 = await browser.newContext();
    const judgePage3 = await judgeContext3.newPage();
    const loginJ3 = new LoginPage(judgePage3);
    const nominationsJ3 = new NominationsPage(judgePage3);

    await loginJ3.login(testData.judge3.email, testData.judge3.password);
    await nominationsJ3.navigateToJuryVotingSystem();
    await nominationsJ3.clickNominationsTab();
    await nominationsJ3.selectAllCategoryNominations(testData.awardCategories);
    await nominationsJ3.clickSubmitNominations();
    await nominationsJ3.confirmSubmitNominations();
    await nominationsJ3.verifyNominationsSubmitted();
    await judgeContext3.close();

    // === STATE 2: Admin publishes refined nominations list ===
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const loginAdmin = new LoginPage(adminPage);
    const nominationsAdmin = new NominationsPage(adminPage);

    await loginAdmin.login(testData.admin.email, testData.admin.password);
    await nominationsAdmin.navigateToJuryVotingSystem();
    await nominationsAdmin.clickNominationsTab();
    await nominationsAdmin.verifyAllJudgesSubmitted();
    await nominationsAdmin.submitRefinedNominationsList();
    await nominationsAdmin.confirmSubmitRefinedList();
    await nominationsAdmin.verifyRefinedListPublished();
    await adminContext.close();

    // === STATE 3: All judges vote ===
    const voteContext1 = await browser.newContext();
    const votePage1 = await voteContext1.newPage();
    const loginVJ1 = new LoginPage(votePage1);
    const nominationsVJ1 = new NominationsPage(votePage1);
    const votingJ1 = new VotingPage(votePage1);

    await loginVJ1.login(testData.judge1.email, testData.judge1.password);
    await nominationsVJ1.navigateToJuryVotingSystem();
    await nominationsVJ1.clickVotingTab();
    await votingJ1.selectNomineeForVote(testData.awardCategories);
    await votingJ1.clickSubmit();
    await votingJ1.confirmSubmit();
    await votingJ1.verifyVoteSubmitted();
    await voteContext1.close();

    const voteContext2 = await browser.newContext();
    const votePage2 = await voteContext2.newPage();
    const loginVJ2 = new LoginPage(votePage2);
    const nominationsVJ2 = new NominationsPage(votePage2);
    const votingJ2 = new VotingPage(votePage2);

    await loginVJ2.login(testData.judge2.email, testData.judge2.password);
    await nominationsVJ2.navigateToJuryVotingSystem();
    await nominationsVJ2.clickVotingTab();
    await votingJ2.selectNomineeForVote(testData.awardCategories);
    await votingJ2.clickSubmit();
    await votingJ2.confirmSubmit();
    await votingJ2.verifyVoteSubmitted();
    await voteContext2.close();

    const voteContext3 = await browser.newContext();
    const votePage3 = await voteContext3.newPage();
    const loginVJ3 = new LoginPage(votePage3);
    const nominationsVJ3 = new NominationsPage(votePage3);
    const votingJ3 = new VotingPage(votePage3);

    await loginVJ3.login(testData.judge3.email, testData.judge3.password);
    await nominationsVJ3.navigateToJuryVotingSystem();
    await nominationsVJ3.clickVotingTab();
    await votingJ3.selectNomineeForVote(testData.awardCategories);
    await votingJ3.clickSubmit();
    await votingJ3.confirmSubmit();
    await votingJ3.verifyVoteSubmitted();
    await voteContext3.close();

    // === STATE 4: Admin confirms top 3 ===
    const adminVoteContext = await browser.newContext();
    const adminVotePage = await adminVoteContext.newPage();
    const loginAdminV = new LoginPage(adminVotePage);
    const nominationsAdminV = new NominationsPage(adminVotePage);
    const votingAdmin = new VotingPage(adminVotePage);

    await loginAdminV.login(testData.admin.email, testData.admin.password);
    await nominationsAdminV.navigateToJuryVotingSystem();
    await nominationsAdminV.clickVotingTab();
    await votingAdmin.verifyAllJudgesVoted();
    await votingAdmin.clickSubmit();
    await votingAdmin.confirmAdminSubmitTop3();
    await votingAdmin.verifyTop3Confirmed();
    await adminVoteContext.close();

    // === STATE 5: All judges submit final evaluations ===
    const evalContext1 = await browser.newContext();
    const evalPage1 = await evalContext1.newPage();
    const loginEJ1 = new LoginPage(evalPage1);
    const nominationsEJ1 = new NominationsPage(evalPage1);
    const evalJ1 = new FinalEvaluationPage(evalPage1);

    await loginEJ1.login(testData.judge1.email, testData.judge1.password);
    await nominationsEJ1.navigateToJuryVotingSystem();
    await nominationsEJ1.clickFinalEvaluationTab();
    await evalJ1.fillAllScoresWithValidValues();
    await evalJ1.clickSubmitEvaluation();
    await evalJ1.confirmSubmitEvaluation();
    await evalJ1.verifyEvaluationSubmitted();
    await evalContext1.close();

    const evalContext2 = await browser.newContext();
    const evalPage2 = await evalContext2.newPage();
    const loginEJ2 = new LoginPage(evalPage2);
    const nominationsEJ2 = new NominationsPage(evalPage2);
    const evalJ2 = new FinalEvaluationPage(evalPage2);

    await loginEJ2.login(testData.judge2.email, testData.judge2.password);
    await nominationsEJ2.navigateToJuryVotingSystem();
    await nominationsEJ2.clickFinalEvaluationTab();
    await evalJ2.fillAllScoresWithValidValues();
    await evalJ2.clickSubmitEvaluation();
    await evalJ2.confirmSubmitEvaluation();
    await evalJ2.verifyEvaluationSubmitted();
    await evalContext2.close();

    const evalContext3 = await browser.newContext();
    const evalPage3 = await evalContext3.newPage();
    const loginEJ3 = new LoginPage(evalPage3);
    const nominationsEJ3 = new NominationsPage(evalPage3);
    const evalJ3 = new FinalEvaluationPage(evalPage3);

    await loginEJ3.login(testData.judge3.email, testData.judge3.password);
    await nominationsEJ3.navigateToJuryVotingSystem();
    await nominationsEJ3.clickFinalEvaluationTab();
    await evalJ3.fillAllScoresWithValidValues();
    await evalJ3.clickSubmitEvaluation();
    await evalJ3.confirmSubmitEvaluation();
    await evalJ3.verifyEvaluationSubmitted();
    await evalContext3.close();

    // === STATE 6: Admin declares winner ===
    const winnerContext = await browser.newContext();
    const winnerPage = await winnerContext.newPage();
    const loginAdminW = new LoginPage(winnerPage);
    const nominationsAdminW = new NominationsPage(winnerPage);
    const evalAdmin = new FinalEvaluationPage(winnerPage);

    await loginAdminW.login(testData.admin.email, testData.admin.password);
    await nominationsAdminW.navigateToJuryVotingSystem();
    await nominationsAdminW.clickFinalEvaluationTab();
    await evalAdmin.verifySetAsWinnerBtnEnabled();
    await evalAdmin.clickSetAsWinner();
    await evalAdmin.confirmSetAsWinner();
    await evalAdmin.verifyWinnerDeclared();
    await winnerContext.close();
  });

  test('@regression @e2e @SP-1793 @SP-1796 - Admin cannot publish list until all judges submit nominations', async ({ browser }) => {
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const loginAdmin = new LoginPage(adminPage);
    const nominationsAdmin = new NominationsPage(adminPage);

    await loginAdmin.login(testData.admin.email, testData.admin.password);
    await nominationsAdmin.navigateToJuryVotingSystem();
    await nominationsAdmin.clickNominationsTab();
    await nominationsAdmin.verifyAdminSubmitBtnDisabled();
    await adminContext.close();
  });

  test('@regression @e2e @SP-1794 @SP-1797 - Judges cannot vote until admin publishes refined list', async ({ browser }) => {
    const judgeContext = await browser.newContext();
    const judgePage = await judgeContext.newPage();
    const loginJ = new LoginPage(judgePage);
    const nominationsJ = new NominationsPage(judgePage);

    await loginJ.login(testData.judge1.email, testData.judge1.password);
    await nominationsJ.navigateToJuryVotingSystem();
    await nominationsJ.clickVotingTab();
    await nominationsJ.verifyVotingLockedUntilAdminPublishes();
    await judgeContext.close();
  });

  test('@regression @e2e @SP-1795 @SP-1798 - Judges cannot evaluate until admin confirms top 3', async ({ browser }) => {
    const judgeContext = await browser.newContext();
    const judgePage = await judgeContext.newPage();
    const loginJ = new LoginPage(judgePage);
    const nominationsJ = new NominationsPage(judgePage);

    await loginJ.login(testData.judge1.email, testData.judge1.password);
    await nominationsJ.navigateToJuryVotingSystem();
    await nominationsJ.clickFinalEvaluationTab();
    await nominationsJ.verifyEvaluationLockedUntilAdminConfirmsTop3();
    await judgeContext.close();
  });

  test('@regression @e2e @SP-1797 @SP-1798 - Admin cannot declare winner until all judges submit evaluations', async ({ browser }) => {
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const loginAdmin = new LoginPage(adminPage);
    const nominationsAdmin = new NominationsPage(adminPage);
    const evalAdmin = new FinalEvaluationPage(adminPage);

    await loginAdmin.login(testData.admin.email, testData.admin.password);
    await nominationsAdmin.navigateToJuryVotingSystem();
    await nominationsAdmin.clickFinalEvaluationTab();
    await evalAdmin.verifySetAsWinnerBtnDisabled();
    await adminContext.close();
  });

  test('@regression @e2e @SP-1793 @SP-1794 - Judge nominations tab is read-only after submission, voting tab opens', async ({ browser }) => {
    // After judge submits nominations and admin publishes the list, judge can vote
    const judgeContext = await browser.newContext();
    const judgePage = await judgeContext.newPage();
    const loginJ = new LoginPage(judgePage);
    const nominationsJ = new NominationsPage(judgePage);

    await loginJ.login(testData.judge1.email, testData.judge1.password);
    await nominationsJ.navigateToJuryVotingSystem();
    await nominationsJ.clickNominationsTab();
    await nominationsJ.verifyNominationsTabReadOnly();
    await nominationsJ.clickVotingTab();
    await nominationsJ.verifyVotingTabActive();
    await judgeContext.close();
  });

  test('@regression @e2e @SP-1794 @SP-1795 - Judge voting tab is read-only after submission, eval tab opens', async ({ browser }) => {
    const judgeContext = await browser.newContext();
    const judgePage = await judgeContext.newPage();
    const loginJ = new LoginPage(judgePage);
    const nominationsJ = new NominationsPage(judgePage);
    const votingJ = new VotingPage(judgePage);

    await loginJ.login(testData.judge1.email, testData.judge1.password);
    await nominationsJ.navigateToJuryVotingSystem();
    await nominationsJ.clickVotingTab();
    await votingJ.verifySubmitBtnNotVisible();
    await nominationsJ.clickFinalEvaluationTab();
    await nominationsJ.verifyFinalEvaluationTabActive();
    await judgeContext.close();
  });

  test('@smoke @e2e @lang-en @SP-1793 @SP-1794 @SP-1795 @SP-1796 @SP-1797 @SP-1798 - Full workflow UI renders correctly in English throughout', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const nominationsPage = new NominationsPage(page);

    await loginPage.setLanguage('en');
    await loginPage.login(testData.judge1.email, testData.judge1.password);
    await nominationsPage.navigateToJuryVotingSystem();
    await nominationsPage.verifyJVSPageTitleEN();
    await nominationsPage.verifyAllTabLabelsEN();
    await nominationsPage.verifyTextDirection('ltr');
    await context.close();
  });

  test('@smoke @e2e @lang-ar @SP-1793 @SP-1794 @SP-1795 @SP-1796 @SP-1797 @SP-1798 - Full workflow UI renders correctly in Arabic throughout', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const nominationsPage = new NominationsPage(page);

    await loginPage.setLanguage('ar');
    await loginPage.login(testData.judge1.email, testData.judge1.password);
    await nominationsPage.navigateToJuryVotingSystem();
    await nominationsPage.verifyJVSPageTitleAR();
    await nominationsPage.verifyAllTabLabelsAR();
    await nominationsPage.verifyTextDirection('rtl');
    await context.close();
  });

});
