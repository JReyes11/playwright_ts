import { Page } from "playwright/test";
import loginFields from "../page_objects/login.ts";
import {userSignIn} from "../types/interfaces.ts"

class signinSupport {
  populateUsername(page: Page) {
    return page.locator(loginFields.username());
  }
  populatePassword(page: Page) {
    return page.locator(loginFields.password());
  }
  submitButton(page: Page) {
    return page.locator(loginFields.submitButton());
  }
  getErrorMsg(page: Page) {
    return page.locator(loginFields.signInErrorMsg());
  }
  async loginAsUser(page: Page, credentials:userSignIn) {
    await this.populateUsername(page).fill(credentials.username);
    await this.populatePassword(page).fill(credentials.password);
    await this.submitButton(page).click();
  }
}

export default new signinSupport();
