class userSettings {
  public userFirstName(page) {
    return page.locator("[data-test=user-settings-firstName-input]");
  }
  public userLastName(page) {
    return page.locator("[data-test=user-settings-lastName-input]");
  }
  public userEmail(page) {
    return page.locator("[data-test=user-settings-email-input]");
  }
  public phoneNumber(page) {
    return page.locator("[data-test=user-settings-phoneNumber-input]");
  }
  public saveButton(page) {
    return page.locator("[data-test=user-settings-submit]");
  }
  async updatePhoneNumber(page, phoneNumber: string) {
    const field = this.phoneNumber(page);
    field.clear();
    field.fill(phoneNumber);
  }
}

export default new userSettings();
