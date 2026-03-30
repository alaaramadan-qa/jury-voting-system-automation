import { Page, expect, Locator } from '@playwright/test';

export class FinalEvaluationPage {
  private submitEvalBtn: Locator;

    constructor(private page: Page) {
        this.submitEvalBtn = page.locator('button').filter({ hasText: /Submit Evaluation|إرسال التقييم/ }).first();
          }

            async verifyPendingText(lang: 'en' | 'ar') {
                const text = lang === 'en'
                      ? 'The voting process has not been completed yet'
                            : 'لم تكتمل عملية التصويت بعد';
                                await expect(this.page.locator('body')).toContainText(text);
                                  }

                                    async verifyAdminPendingText(lang: 'en' | 'ar') {
                                        const text = lang === 'en'
                                              ? 'The voting process has not been completed yet, and the top three nominees'
                                                    : 'لم تكتمل عملية التصويت بعد، ولم يتم اختيار أفضل ثلاثة مرشحين';
                                                        await expect(this.page.locator('body')).toContainText(text);
                                                          }

                                                            async verifyInstructionText(lang: 'en' | 'ar') {
                                                                const text = lang === 'en'
                                                                      ? 'Evaluate the application according to the Jury criteria'
                                                                            : 'تقييم الطلب حسب معايير لجنة التحكيم';
                                                                                await expect(this.page.locator('body')).toContainText(text);
                                                                                  }

                                                                                    async enterScore(nomineeName: string, criterionName: string, score: string | number) {
                                                                                        const row = this.page.locator('tr, [role="row"], div').filter({ hasText: criterionName }).first();
                                                                                            const input = row.locator('input[type="number"], input[type="text"]').first();
                                                                                                await input.fill(String(score));
                                                                                                    await input.press('Tab');
                                                                                                      }
                                                                                                      
                                                                                                        async verifyScoreError(lang: 'en' | 'ar') {
                                                                                                            const text = 'Please enter a number between 0-100.';
                                                                                                                await expect(this.page.locator('body')).toContainText(text);
                                                                                                                  }
                                                                                                                  
                                                                                                                    async verifySubmitEvalBtnDisabled() {
                                                                                                                        await expect(this.submitEvalBtn).toBeDisabled();
                                                                                                                          }
                                                                                                                          
                                                                                                                            async verifySubmitEvalBtnEnabled() {
                                                                                                                                await expect(this.submitEvalBtn).toBeEnabled();
                                                                                                                                  }
                                                                                                                                  
                                                                                                                                    async clickSubmitEvaluation() {
                                                                                                                                        await this.submitEvalBtn.click();
                                                                                                                                            await this.page.waitForLoadState('networkidle');
                                                                                                                                              }
                                                                                                                                              
                                                                                                                                                async verifyPageReadOnly() {
                                                                                                                                                    const inputs = this.page.locator('input[type="number"], input[type="text"]');
                                                                                                                                                        const count = await inputs.count();
                                                                                                                                                            for (let i = 0; i < count; i++) {
                                                                                                                                                                  const isDisabled = await inputs.nth(i).isDisabled();
                                                                                                                                                                        const isReadOnly = await inputs.nth(i).getAttribute('readonly');
                                                                                                                                                                              expect(isDisabled || isReadOnly !== null).toBeTruthy();
                                                                                                                                                                                  }
                                                                                                                                                                                    }
                                                                                                                                                                                    
                                                                                                                                                                                      // Admin final evaluation
                                                                                                                                                                                        async verifySetAsWinnerBtnDisabled() {
                                                                                                                                                                                            const btn = this.page.locator('button').filter({ hasText: /Set as Winner|تعيين كفائز/ }).first();
                                                                                                                                                                                                await expect(btn).toBeDisabled();
                                                                                                                                                                                                  }
                                                                                                                                                                                                  
                                                                                                                                                                                                    async verifySetAsWinnerBtnEnabled() {
                                                                                                                                                                                                        const btn = this.page.locator('button').filter({ hasText: /Set as Winner|تعيين كفائز/ }).first();
                                                                                                                                                                                                            await expect(btn).toBeEnabled();
                                                                                                                                                                                                              }
                                                                                                                                                                                                              
                                                                                                                                                                                                                async clickSetAsWinner(nomineeName: string) {
                                                                                                                                                                                                                    const section = this.page.locator('div, section').filter({ hasText: nomineeName }).first();
                                                                                                                                                                                                                        await section.locator('button').filter({ hasText: /Set as Winner/ }).click();
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                          
                                                                                                                                                                                                                            async verifyWinnerConfirmPopup(nomineeName: string) {
                                                                                                                                                                                                                                await expect(this.page.locator('body')).toContainText(`Are you sure you want to select`);
                                                                                                                                                                                                                                    await expect(this.page.locator('body')).toContainText(nomineeName);
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                        async confirmWinner() {
                                                                                                                                                                                                                                            await this.page.locator('button').filter({ hasText: /^Yes$|^نعم$/ }).first().click();
                                                                                                                                                                                                                                                await this.page.waitForLoadState('networkidle');
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                    async verifyRankLabels(lang: 'en' | 'ar') {
                                                                                                                                                                                                                                                        if (lang === 'en') {
                                                                                                                                                                                                                                                              await expect(this.page.locator('body')).toContainText('Top 1');
                                                                                                                                                                                                                                                                    await expect(this.page.locator('body')).toContainText('Top 2');
                                                                                                                                                                                                                                                                          await expect(this.page.locator('body')).toContainText('Top 3');
                                                                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                                                                    await expect(this.page.locator('body')).toContainText('المركز الأول');
                                                                                                                                                                                                                                                                                          await expect(this.page.locator('body')).toContainText('المركز الثاني');
                                                                                                                                                                                                                                                                                                await expect(this.page.locator('body')).toContainText('المركز الثالث');
                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                        async verifyTextDirection(expectedDir: 'ltr' | 'rtl') {
                                                                                                                                                                                                                                                                                                            const dir = await this.page.locator('html').getAttribute('dir');
                                                                                                                                                                                                                                                                                                                const bodyDir = await this.page.locator('body').getAttribute('dir');
                                                                                                                                                                                                                                                                                                                    const actualDir = dir || bodyDir || 'ltr';
                                                                                                                                                                                                                                                                                                                        expect(actualDir.toLowerCase()).toBe(expectedDir);
                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                          }
