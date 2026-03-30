import { Page, expect, Locator } from '@playwright/test';

export class VotingPage {
  private submitBtn: Locator;
    private confirmPopup: Locator;

      constructor(private page: Page) {
          this.submitBtn = page.locator('button').filter({ hasText: /^Submit$|^إرسال$/ }).first();
              this.confirmPopup = page.locator('[role="dialog"], .modal, .popup').first();
                }

                  // Pending state assertions
                    async verifyPendingText(lang: 'en' | 'ar') {
                        const text = lang === 'en'
                              ? 'The admin is currently reviewing the list of recommended names'
                                    : 'يقوم المسؤول حالياً بمراجعة قائمة الأسماء الموصى بها';
                                        await expect(this.page.locator('body')).toContainText(text);
                                          }

                                            async verifyInstructionText(lang: 'en' | 'ar') {
                                                const text = lang === 'en'
                                                      ? 'Please select 3 candidates for each award category'
                                                            : 'يرجى اختيار 3 مرشحين لكل فئة من فئات الجوائز';
                                                                await expect(this.page.locator('body')).toContainText(text);
                                                                  }

                                                                    // Admin voting pending text
                                                                      async verifyAdminPendingText(lang: 'en' | 'ar') {
                                                                          const text = lang === 'en'
                                                                                ? 'You need to submit the nominations list to the final judges'
                                                                                      : 'يجب عليك إرسال قائمة الترشيحات إلى الحكام النهائيين';
                                                                                          await expect(this.page.locator('body')).toContainText(text);
                                                                                            }

                                                                                              async verifyAdminInstructionText(lang: 'en' | 'ar') {
                                                                                                  const text = lang === 'en'
                                                                                                        ? 'This page displays a list of all refined nominee names'
                                                                                                              : 'ستعرض هذه الصفحة قائمة بجميع أسماء المرشحين النهائيين';
                                                                                                                  await expect(this.page.locator('body')).toContainText(text);
                                                                                                                    }
                                                                                                                    
                                                                                                                      // Voting actions
                                                                                                                        async selectNomineesForAward(awardName: string, nomineeNames: string[]) {
                                                                                                                            const awardSection = this.page.locator('section, div').filter({ hasText: awardName }).first();
                                                                                                                                for (const name of nomineeNames) {
                                                                                                                                      const checkbox = awardSection.locator(`input[type="checkbox"]`).filter({ hasText: name }).first()
                                                                                                                                              .or(awardSection.locator('tr, [role="row"]').filter({ hasText: name }).first().locator('input[type="checkbox"]'));
                                                                                                                                                    await checkbox.check();
                                                                                                                                                        }
                                                                                                                                                          }
                                                                                                                                                          
                                                                                                                                                            async verifySubmitBtnDisabled() {
                                                                                                                                                                await expect(this.submitBtn).toBeDisabled();
                                                                                                                                                                  }
                                                                                                                                                                  
                                                                                                                                                                    async verifySubmitBtnEnabled() {
                                                                                                                                                                        await expect(this.submitBtn).toBeEnabled();
                                                                                                                                                                          }
                                                                                                                                                                          
                                                                                                                                                                            async clickSubmit() {
                                                                                                                                                                                await this.submitBtn.click();
                                                                                                                                                                                  }
                                                                                                                                                                                  
                                                                                                                                                                                    async verifySubmitConfirmPopup(lang: 'en' | 'ar') {
                                                                                                                                                                                        const text = lang === 'en'
                                                                                                                                                                                              ? "Are you sure you want to submit? Once submitted, you won't be able to edit."
                                                                                                                                                                                                    : 'هل أنت متأكد أنك تريد الإرسال؟ بعد الإرسال لن تتمكن من التعديل.';
                                                                                                                                                                                                        await expect(this.page.locator('body')).toContainText(text);
                                                                                                                                                                                                          }
                                                                                                                                                                                                          
                                                                                                                                                                                                            async verifyAdminSubmitConfirmPopup(lang: 'en' | 'ar') {
                                                                                                                                                                                                                const text = lang === 'en'
                                                                                                                                                                                                                      ? 'Are you sure you want to submit the selected three nominee names for each award?'
                                                                                                                                                                                                                            : 'هل أنت متأكد من رغبتك في إرسال أسماء المرشحين الثلاثة المختارين لكل جائزة؟';
                                                                                                                                                                                                                                await expect(this.page.locator('body')).toContainText(text);
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                    async confirmSubmit() {
                                                                                                                                                                                                                                        await this.page.locator('button').filter({ hasText: /^Yes$|^نعم$/ }).first().click();
                                                                                                                                                                                                                                            await this.page.waitForLoadState('networkidle');
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                async cancelSubmit() {
                                                                                                                                                                                                                                                    await this.page.locator('button').filter({ hasText: /^Cancel$|^إلغاء$/ }).first().click();
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                        async verifySubmitBtnHidden() {
                                                                                                                                                                                                                                                            await expect(this.submitBtn).not.toBeVisible();
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                async verifyVotingReadOnly() {
                                                                                                                                                                                                                                                                    const checkboxes = this.page.locator('input[type="checkbox"]');
                                                                                                                                                                                                                                                                        const count = await checkboxes.count();
                                                                                                                                                                                                                                                                            for (let i = 0; i < count; i++) {
                                                                                                                                                                                                                                                                                  await expect(checkboxes.nth(i)).toBeDisabled();
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                          async verifyTextDirection(expectedDir: 'ltr' | 'rtl') {
                                                                                                                                                                                                                                                                                              const dir = await this.page.locator('html').getAttribute('dir');
                                                                                                                                                                                                                                                                                                  const bodyDir = await this.page.locator('body').getAttribute('dir');
                                                                                                                                                                                                                                                                                                      const actualDir = dir || bodyDir || 'ltr';
                                                                                                                                                                                                                                                                                                          expect(actualDir.toLowerCase()).toBe(expectedDir);
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            }
