import { Page } from "@playwright/test";
import { userSignIn } from "../types/interfaces.ts";

class login {
  private page: Page
  constructor(page: Page) {
    this.page = page
  }
  static create(page: Page) {
    return new login(page)
  }
  public username() {
    return this.page.locator("#username");
  }
  public password() {
    return this.page.locator("#password");
  }
  public rememberMe() {
    return this.page.locator('[data-test="signin-remember-me"]');
  }
  public submitButton() {
    return this.page.locator('[data-test="signin-submit"]');
  }
  public signInErrorMsg() {
    return this.page.locator("[data-test=signin-error]");
  }
  async loginAsUser(credentials: userSignIn) {
    await this.username().fill(credentials.username);
    await this.password().fill(credentials.password);
    await this.submitButton().click();
  }
  async getErrorMessage() {
    return this.signInErrorMsg();
  }
}
export default login;
