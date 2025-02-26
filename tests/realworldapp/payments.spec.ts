import { test, Page } from "@playwright/test";
import userCredentials from "../../fixtures/userAccounts.ts";
import login from "../../page_objects/login.ts";
import transactions from "../../page_objects/transactions";
import helper from "../../support/helper"

test.describe("Transactions: Request Payments", async () => {
  test.beforeEach(async ({ page }: {page: Page}) => {    
    await page.goto('/');
    const credentials = userCredentials.validUser();
    await login.loginAsUser(page, credentials);
  });

  test("Request payment from random user", async ({ page }) => {    
    const randomUser = await helper.getRandomUser("Requested")
    if (!randomUser) throw new Error("No user found for Requested payment")
    await transactions.performTransaction(page, randomUser);
    await transactions.verifyConfirmationPage(page, randomUser)    
  });

  test("Make payment to random user", async ({page}) => {    
    const randomUser = await helper.getRandomUser("Payment")
    if (!randomUser) throw new Error("No user found for making payment")
    await transactions.performTransaction(page, randomUser);      
    await transactions.verifyConfirmationPage(page, randomUser)  
  })
});
