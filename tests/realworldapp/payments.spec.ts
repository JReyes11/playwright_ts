import { test } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import signinSupport from "../../support/signIn";
import transactionsSupport from "../../support/transactions";
import transactionLedger from "../../fixtures/transactions.json";
import dayjs from 'dayjs'

test.describe("Transactions: Request Payments", async () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/');
    await signinSupport.loginAsUser(page, users.validUser.username, users.validUser.password);
  });

  test("Request payment from another user", async ({ page }) => {
    // random transaction from fixture.
    const requests = transactionLedger.requests;
    const randomObj = requests[Math.floor(Math.random() * requests.length)];
    randomObj.amount = `${dayjs().format('ss')}` 
    randomObj.note = `Requesting Payment of $${dayjs().format('ss')}`
    await transactionsSupport.requestPayment(page, randomObj);
  });

  test("Make payment to a user", async ({page}) => {
    const payments = transactionLedger.payments;
    const randomObj = payments[Math.floor(Math.random() * payments.length)];
    randomObj.amount = `${dayjs().format('ss')}` 
    randomObj.note = `Made Payment of $${dayjs().format('ss')}`
    await transactionsSupport.makePayment(page, randomObj);        
  })
});
