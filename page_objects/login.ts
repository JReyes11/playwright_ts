import { Page } from "@playwright/test";
import { userSignIn } from "../types/interfaces.ts";

class login {
  public username(page: Page) {
    return page.locator("#username");
  }
  public password(page: Page) {
    return page.locator("#password");
  }
  public rememberMe(page: Page) {
    return page.locator('[data-test="signin-remember-me"]');
  }
  public submitButton(page: Page) {
    return page.locator('[data-test="signin-submit"]');
  }
  public signInErrorMsg(page: Page) {
    return page.locator("[data-test=signin-error]");
  }
  async loginAsUser(page: Page, credentials: userSignIn) {
    await this.username(page).fill(credentials.username);
    await this.password(page).fill(credentials.password);
    await this.submitButton(page).click();
  }
  async getErrorMessage(page: Page) {
    return this.signInErrorMsg(page);
  }
}
export default new login();
