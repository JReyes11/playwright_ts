class userSettingsPage {
  userFirstName() {
    return "[data-test=user-settings-firstName-input]";
  }
  userLastName() {
    return "[data-test=user-settings-lastName-input]";
  }
  userEmail() {
    return "[data-test=user-settings-email-input]";
  }
  phoneNumber() {
    return "[data-test=user-settings-phoneNumber-input]";
  }
  saveButton() {
    return "[data-test=user-settings-submit]";
  }
}

export default new userSettingsPage();
