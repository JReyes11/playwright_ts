import { test, expect, Page } from "@playwright/test";
import signinSupport from "../../support/signIn";
import users from "../../fixtures/userAccounts.json";
import transactionsSupport from "../../support/transactions";

test.describe("Intercept and validate expected payload responses", async () => {
  test.beforeEach(async ({ page }: {page: Page}) => {
    await page.goto("/signin");
    await signinSupport.loginAsUser(page,users.validUser);
  });

  test("[Login] Assert username in response", async ({ page }: {page: Page}) => {
    const response = await page.waitForResponse("**/login");
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(users.validUser.username);
  });

  test("[Friends Tab] Assert Sender / Receiver not null", async ({ page }: {page: Page}) => {
    // click on the Friends Tab, Asser sender and receiver names not null or undefined.
    await transactionsSupport.friendsTab(page).click();
    const res = await page.waitForResponse("**/contacts");
    const body = await res.json();    
    const receiverNames = body.results.map((e) => e.receiverName);
    receiverNames.forEach((element) => {
      expect(element).not.toBe(null);
      expect(element).not.toBe(undefined);
    });
    const senderNames = body.results.map((e) => e.senderName);
    senderNames.forEach((element) => {
      expect(element).not.toBe(null);
      expect(element).not.toBe(undefined);
    });
  });
});
