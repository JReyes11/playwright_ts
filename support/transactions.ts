import { Page, expect } from "@playwright/test";
import transactionPageObjects from "../page_objects/transactions";
import { transaction } from "../types/interfaces.ts";

class transactionsSupport {
  newTransactionButton(page: Page) {
    return page.locator(transactionPageObjects.moneyIcon())
  }
  searchField(page: Page) {
    return page.locator(transactionPageObjects.searchBar())
  }
  finderUserInSearchResults(page: Page, username: string) {
    return page.locator("span", { hasText: username }).first();
  }
  amountField(page: Page) {
    return page.locator(transactionPageObjects.amountField())
  }
  notesField(page: Page) {
    return page.locator(transactionPageObjects.notesField())
  }
  requestPaymentButton(page: Page) {
    return page.locator(transactionPageObjects.requestButton())
  }
  paymentButton(page: Page) {
    return page.locator(transactionPageObjects.payButton())
  }
  friendsTab(page) {
    return page.locator(transactionPageObjects.friendsTab())
  }
  mineTab(page) {
    return page.locator(transactionPageObjects.mineTab())
  }
  async performTransaction(page, dataObject: transaction) {
    await this.newTransactionButton(page).click();
    await this.searchField(page).fill(dataObject.firstName);
    await this.finderUserInSearchResults(page, dataObject.username).click();
    await this.amountField(page).fill(dataObject.amount);
    await this.notesField(page).fill(dataObject.note);
    if (dataObject.type == "Requested") {
      await this.requestPaymentButton(page).click();
    } else {
      await this.paymentButton(page).click();
    }    
  }
  async verifyConfirmationPage(page, dataObject: transaction) {    
    const contactName = `${dataObject.firstName} ${dataObject.lastName}`
    const confirmContact = await this.confirmationPageText(page, contactName)
    await confirmContact.innerText().then((value) => {
      expect(value).toContain(contactName)
    })
  }
  async confirmationPageText(page, value: string) {
    return page.locator('h2', {hasText: value})
  }
}

export default new transactionsSupport();
