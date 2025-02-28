import { Page } from "@playwright/test";
import { userSignUp } from "../types/interfaces.ts";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

class signup {
  private page: Page; 
  constructor(page: Page) {
    this.page = page;
  }
  static create(page: Page) {
    return new signup(page)
  }
  public firstName() {
    return this.page.locator("#firstName");
  }
  public lastName() {
    return this.page.locator("#lastName");
  }
  public username() {
    return this.page.locator("#username");
  }
  public password() {
    return this.page.locator("#password");
  }
  public confirmPassword() {
    return this.page.locator("#confirmPassword");
  }
  public submitBtn() {
    return this.page.locator("[data-test=signup-submit]");
  }
  async signupAndSubmit(userObject: userSignUp) {
    await this.firstName().fill(userObject.firstName);
    await this.lastName().fill(userObject.lastName);
    await this.username().fill(userObject.username);
    await this.password().fill(userObject.password);
    await this.confirmPassword().fill(userObject.confirmPassword);
    await this.submitBtn().click();
  }
  generateUserData() {
    const name = faker.person.firstName();
    return {
      firstName: name,
      lastName: faker.person.lastName(),
      username: `${name}${dayjs().format("mmss")}`,
      password: "s3cret",
      confirmPassword: "s3cret",
    };
  }
}
export default signup;
