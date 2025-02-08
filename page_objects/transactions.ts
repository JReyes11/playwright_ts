export default class transactionPageObjects {
  static moneyIcon(page) {
    return page.locator("[data-testid=AttachMoneyIcon]");
  }
  static searchBar(page) {
    return page.locator("[data-test=user-list-search-input]");
  }
  static amountField(page) {
    return page.locator("#amount");
  }
  static notesField(page) {
    return page.locator("#transaction-create-description-input");
  }
  static requestButton(page) {
    return page.locator("[data-test=transaction-create-submit-request]");
  }
  static payButton(page) {
    return page.locator("[data-test=transaction-create-submit-payment]");
  }
  static mineTab(page) {
    return page.locator('[data-test=nav-personal-tab]')
  }
  static friendsTab(page) {
    return page.locator('[data-test="nav-contacts-tab"]')
  }
}
