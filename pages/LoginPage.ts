import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://admin.stg.alweb4tech.com');
          }

            async login(email: string, password: string) {
                await this.navigate();
                    await this.page.getByLabel(/email/i).fill(email);
                        await this.page.getByLabel(/password/i).fill(password);
                            await this.page.getByRole('button', { name: /sign in|login/i }).click();
                                await this.page.waitForLoadState('networkidle');
                                  }

                                    async setLanguage(lang: 'en' | 'ar') {
                                        const currentUrl = this.page.url();
                                            if (lang === 'en' && !currentUrl.includes('/en/')) {
                                                  const langBtn = this.page.locator('[data-lang="en"], button:has-text("EN"), button:has-text("English")').first();
                                                        if (await langBtn.isVisible()) {
                                                                await langBtn.click();
                                                                        await this.page.waitForLoadState('networkidle');
                                                                              }
                                                                                  } else if (lang === 'ar' && currentUrl.includes('/en/')) {
                                                                                        const langBtn = this.page.locator('[data-lang="ar"], button:has-text("AR"), button:has-text("Arabic"), button:has-text("عربي")').first();
                                                                                              if (await langBtn.isVisible()) {
                                                                                                      await langBtn.click();
                                                                                                              await this.page.waitForLoadState('networkidle');
                                                                                                                    }
                                                                                                                        }
                                                                                                                          }
                                                                                                                          
                                                                                                                            async verifyLoggedIn() {
                                                                                                                                await expect(this.page).not.toHaveURL(/login/i);
                                                                                                                                  }
                                                                                                                                  
                                                                                                                                    async verifyRedirectedToLogin() {
                                                                                                                                        await expect(this.page).toHaveURL(/login/i);
                                                                                                                                          }
                                                                                                                                          }
