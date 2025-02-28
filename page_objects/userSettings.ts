import { Page } from "@playwright/test";

class userSettings {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  static create(page: Page) {
    return new userSettings(page)
  }
  public userFirstName() {
    return this.page.locator("[data-test=user-settings-firstName-input]");
  }
  public userLastName() {
    return this.page.locator("[data-test=user-settings-lastName-input]");
  }
  public userEmail() {
    return this.page.locator("[data-test=user-settings-email-input]");
  }
  public phoneNumber() {
    return this.page.locator("[data-test=user-settings-phoneNumber-input]");
  }
  public saveButton() {
    return this.page.locator("[data-test=user-settings-submit]");
  }
  async updatePhoneNumber(phoneNumber: string) {
    const field = this.phoneNumber();
    field.clear();
    field.fill(phoneNumber);
  }
}

export default userSettings;
