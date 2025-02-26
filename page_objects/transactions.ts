import {expect} from '@playwright/test'
import { transaction } from "../types/interfaces.ts";

class transactions {
  public moneyIcon(page) {
    return page.locator("[data-testid=AttachMoneyIcon]");
  }
  public searchBar(page) {
    return page.locator("[data-test=user-list-search-input]");
  }
  public finderUserInSearchResults(page, username: string) {
    return page.locator("span", { hasText: username }).first();
  }
  public amountField(page) {
    return page.locator("#amount");
  }
  public notesField(page) {
    return page.locator("#transaction-create-description-input");
  }
  public requestButton(page) {
    return page.locator("[data-test=transaction-create-submit-request]");
  }
  public payButton(page) {
    return page.locator("[data-test=transaction-create-submit-payment]");
  }
  public mineTab(page) {
    return page.locator("[data-test=nav-personal-tab]");
  }
  public friendsTab(page) {
    return page.locator('[data-test="nav-contacts-tab"]');
  }
  async performTransaction(page, dataObject: transaction) {
    await this.moneyIcon(page).click();
    await this.searchBar(page).fill(dataObject.firstName);
    await this.finderUserInSearchResults(page, dataObject.username).click();
    await this.amountField(page).fill(dataObject.amount);
    await this.notesField(page).fill(dataObject.note);
    if (dataObject.type == "Requested") {
      await this.requestButton(page).click();
    } else {
      await this.payButton(page).click();
    }
  }
  async verifyConfirmationPage(page, dataObject: transaction) {
    const contactName = `${dataObject.firstName} ${dataObject.lastName}`;
    const confirmContact = await this.confirmationPageText(page, contactName);
    await confirmContact.innerText().then((value) => {
      expect(value).toContain(contactName);
    });
  }
  async confirmationPageText(page, value: string) {
    return page.locator("h2", { hasText: value });
  }
}

export default new transactions();