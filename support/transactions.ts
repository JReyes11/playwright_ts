import { Page } from "@playwright/test";
import transactionPageObjects from "../page_objects/transactions";
import { transaction } from "../types/interfaces.ts";

class transactionsSupport {
  newTransactionButton(page: Page) {
    return transactionPageObjects.moneyIcon(page);
  }
  searchField(page: Page) {
    return transactionPageObjects.searchBar(page);
  }
  finderUserInSearchResults(page: Page, username: string) {
    return page.locator("span", { hasText: username }).first();
  }
  amountField(page: Page) {
    return transactionPageObjects.amountField(page);
  }
  notesField(page: Page) {
    return transactionPageObjects.notesField(page);
  }
  requestPaymentButton(page: Page) {
    return transactionPageObjects.requestButton(page);
  }
  paymentButton(page: Page) {
    return transactionPageObjects.payButton(page);
  }
  async requestPayment(page, dataObject: transaction) {
    await this.newTransactionButton(page).click();
    await this.searchField(page).fill(dataObject.name);
    await this.finderUserInSearchResults(page, dataObject.username).click();
    await this.amountField(page).fill(dataObject.amount);
    await this.notesField(page).fill(dataObject.note);
    await this.requestPaymentButton(page).click();
  }
  async makePayment(page, dataObject: transaction) {
    await this.newTransactionButton(page).click();
    await this.searchField(page).fill(dataObject.name);
    await this.finderUserInSearchResults(page, dataObject.username).click();
    await this.amountField(page).fill(dataObject.amount);
    await this.notesField(page).fill(dataObject.note);
    await this.paymentButton(page).click();
  }
}

export default new transactionsSupport();
