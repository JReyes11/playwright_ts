import { test } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import signinSupport from "../../support/signIn";
import transactionsSupport from "../../support/transactions";
import helper from "../../support/helper"

test.describe("Transactions: Request Payments", async () => {
  test.beforeEach(async ({ page }) => {    
    await page.goto('/');
    await signinSupport.loginAsUser(page, users.validUser.username, users.validUser.password);
  });

  test("Request payment from random user", async ({ page }) => {    
    const userObj = await helper.getRandomUser("Requested")
    await transactionsSupport.requestPayment(page, userObj);
    await transactionsSupport.verifyConfirmationPage(page, userObj)    
  });

  test("Make payment to random user", async ({page}) => {    
    const userObj = await helper.getRandomUser("Payment")
    await transactionsSupport.makePayment(page, userObj);      
    await transactionsSupport.verifyConfirmationPage(page, userObj)  
  })
});
