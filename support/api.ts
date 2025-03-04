import { Page } from "@playwright/test";
import { intercept } from "../types/api.ts";

class requests {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  static create(page: Page) {
    return new requests(page);
  }
  async waitForRoute(params: intercept) {
    return await this.page.route(params.endpoint, async (route) => {
      return await route.fulfill({
        status: params.expectedStatus,
        contentType: params.contentType,
        body: JSON.stringify(params.objName),
      });
    });
  }
}

export default requests;
