import { test, expect } from "@playwright/test";
import login from "../../page_objects/login";
import userCredentials from "../../fixtures/userAccounts";
import transactions from "../../page_objects/transactions";
import { contacts, userSignIn } from "../../types/interfaces";

test.describe("Intercept and validate expected payload responses", async () => {
  let payments: transactions
  let signIn: login
  let credentials: userSignIn;

  test.beforeEach(async ({ page }) => {
    payments = transactions.create(page)
    signIn = login.create(page)
    await page.goto("/signin");
    credentials = userCredentials.validUser();
    await signIn.loginAsUser(credentials);
  });

  test("[Login] Assert username in response", async ({ page }) => {
    const response = await page.waitForResponse("**/login");
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(credentials.username);
  });

  test("[Friends Tab] Assert Sender / Receiver not null", async ({ page }) => {
    // click on the Friends Tab, Assert sender and receiver names not null or undefined.
    await payments.friendsTab().click();
    const res = await page.waitForResponse("**/contacts");
    const body = await res.json();
    const receiverNames = body.results.map((e: contacts) => e.receiverName);
    receiverNames.forEach((element: string) => {
      expect(element).not.toBe(null);
      expect(element).not.toBe(undefined);
    });
    const senderNames = body.results.map((e: contacts) => e.senderName);
    senderNames.forEach((element: string) => {
      expect(element).not.toBe(null);
      expect(element).not.toBe(undefined);
    });
  });
});
