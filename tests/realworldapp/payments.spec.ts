import { test } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import { loginAsUser } from "../../support/signIn";
import { requestPayment, makePayment } from "../../support/transactions";
import transactionLedger from "../../fixtures/transactions.json";
import dayjs from 'dayjs'

test.describe("Transactions: Request Payments", async () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/');
    await loginAsUser(page, users.validUser.username, users.validUser.password);
  });

  test("Happy Path: Request payment from another user", async ({ page }) => {
    // random transaction from fixture.
    const requests = transactionLedger.requests;
    const randomObj = requests[Math.floor(Math.random() * requests.length)];
    randomObj.amount = `${dayjs().format('ss')}` 
    randomObj.note = `Requesting Payment of $${dayjs().format('ss')}`
    await requestPayment(page, randomObj);
  });

  test("Make payment to a user", async ({page}) => {
    const payments = transactionLedger.payments;
    const randomObj = payments[Math.floor(Math.random() * payments.length)];
    randomObj.amount = `${dayjs().format('ss')}` 
    randomObj.note = `Made Payment of $${dayjs().format('ss')}`
    await makePayment(page, randomObj);
  })
});
