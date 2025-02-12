export default class transactionPageObjects {
  static moneyIcon() {
    return "[data-testid=AttachMoneyIcon]"
  }
  static searchBar() {
    return"[data-test=user-list-search-input]"
  }
  static amountField() {
    return "#amount"
  }
  static notesField() {
    return "#transaction-create-description-input"
  }
  static requestButton() {
    return "[data-test=transaction-create-submit-request]"
  }
  static payButton() {
    return "[data-test=transaction-create-submit-payment]"
  }
  static mineTab() {
    return '[data-test=nav-personal-tab]'
  }
  static friendsTab() {
    return '[data-test="nav-contacts-tab"]'
  }  
}
