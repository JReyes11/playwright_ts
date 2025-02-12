import { test } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import signinSupport from "../../support/signIn";
import transactionsSupport from "../../support/transactions";
import transactionLedger from "../../fixtures/transactions.json";

test.describe("Transactions: Request Payments", async () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/');
    await signinSupport.loginAsUser(page, users.validUser.username, users.validUser.password);
  });

  test("Request payment from another user", async ({ page }) => {
    // random transaction from fixture.
    const contactList = transactionLedger.users;
    const randomObj = contactList[Math.floor(Math.random() * contactList.length)];
    const randomNumber = Math.floor(Math.random() * 99)
    randomObj.amount = `${randomNumber}`
    randomObj.note = `${randomObj.id}`
    randomObj.type = "Requested"
    await transactionsSupport.requestPayment(page, randomObj);
    await transactionsSupport.verifyConfirmationPage(page, randomObj)    
  });

  test("Make payment to a user", async ({page}) => {
    const contactList = transactionLedger.users;
    const randomObj = contactList[Math.floor(Math.random() * contactList.length)];
    const randomNumber = Math.floor(Math.random() * 99)
    randomObj.amount = `${randomNumber}`
    randomObj.note = `${randomObj.id}`
    randomObj.type = "Payment"
    await transactionsSupport.makePayment(page, randomObj);      
    await transactionsSupport.verifyConfirmationPage(page, randomObj)  
  })
});
