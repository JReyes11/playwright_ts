import { test, Page } from "@playwright/test";
import users from "../../fixtures/userAccounts.json";
import signinSupport from "../../support/signIn";
import transactionsSupport from "../../support/transactions";
import helper from "../../support/helper"

test.describe("Transactions: Request Payments", async () => {
  test.beforeEach(async ({ page }: {page: Page}) => {    
    await page.goto('/');
    await signinSupport.loginAsUser(page, users.validUser);
  });

  test("Request payment from random user", async ({ page }: {page: Page}) => {    
    const randomUser = await helper.getRandomUser("Requested")
    if (!randomUser) throw new Error("No user found for Requested payment")
    await transactionsSupport.performTransaction(page, randomUser);
    await transactionsSupport.verifyConfirmationPage(page, randomUser)    
  });

  test("Make payment to random user", async ({page}: {page: Page}) => {    
    const randomUser = await helper.getRandomUser("Payment")
    if (!randomUser) throw new Error("No user found for making payment")
    await transactionsSupport.performTransaction(page, randomUser);      
    await transactionsSupport.verifyConfirmationPage(page, randomUser)  
  })
});
