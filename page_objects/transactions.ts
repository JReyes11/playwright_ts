import {expect, Page} from '@playwright/test'
import { transaction } from "../types/interfaces.ts";

class transactions {
  private page: Page
  constructor(page: Page) {
    this.page = page;
  }
  static create(page: Page) {
    return new transactions(page)
  }
  public moneyIcon() {
    return this.page.locator("[data-testid=AttachMoneyIcon]");
  }
  public searchBar() {
    return this.page.locator("[data-test=user-list-search-input]");
  }
  public finderUserInSearchResults(username: string) {
    return this.page.locator("span", { hasText: username }).first();
  }
  public amountField() {
    return this.page.locator("#amount");
  }
  public notesField() {
    return this.page.locator("#transaction-create-description-input");
  }
  public requestButton() {
    return this.page.locator("[data-test=transaction-create-submit-request]");
  }
  public payButton() {
    return this.page.locator("[data-test=transaction-create-submit-payment]");
  }
  public mineTab() {
    return this.page.locator("[data-test=nav-personal-tab]");
  }
  public friendsTab() {
    return this.page.locator('[data-test="nav-contacts-tab"]');
  }
  async performTransaction(dataObject: transaction) {
    await this.moneyIcon().click();
    await this.searchBar().fill(dataObject.firstName);
    await this.finderUserInSearchResults(dataObject.username).click();
    await this.amountField().fill(dataObject.amount);
    await this.notesField().fill(dataObject.note);
    if (dataObject.type == "Requested") {
      await this.requestButton().click();
    } else {
      await this.payButton().click();
    }
  }
  async verifyConfirmationPage(dataObject: transaction) {
    const contactName = `${dataObject.firstName} ${dataObject.lastName}`;
    const confirmContact = await this.confirmationPageText(contactName);
    await confirmContact.innerText().then((value) => {
      expect(value).toContain(contactName);
    });
  }
  async confirmationPageText(value: string) {
    return this.page.locator("h2", { hasText: value });
  }
}

export default transactions;