import { test, Page } from "@playwright/test";
import userCredentials from "../../fixtures/userAccounts.ts";
import login from "../../page_objects/login.ts";
import transactions from "../../page_objects/transactions";
import helper from "../../support/helper"

test.describe("Transactions: Request Payments", async () => {
  let signIn: login
  let payments: transactions

  test.beforeEach(async ({ page }: {page: Page}) => {    
    signIn = login.create(page)
    payments = transactions.create(page)
    await page.goto('/');
    const credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
  });

  test("Request payment from random user", async ({ page }) => {    
    const randomUser = helper.getRandomUser("Requested")
    if (!randomUser) throw new Error("No user found for Requested payment")
    await payments.performTransaction(randomUser);
    await payments.verifyConfirmationPage(randomUser)    
  });

  test("Make payment to random user", async () => {    
    const randomUser = helper.getRandomUser("Payment")
    if (!randomUser) throw new Error("No user found for making payment")
    await payments.performTransaction(randomUser);      
    await payments.verifyConfirmationPage(randomUser)  
  })
});
