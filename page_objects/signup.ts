import { userSignUp } from "../types/interfaces.ts";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

class signup {
  public firstName(page) {
    return page.locator("#firstName");
  }
  public lastName(page) {
    return page.locator("#lastName");
  }
  public username(page) {
    return page.locator("#username");
  }
  public password(page) {
    return page.locator("#password");
  }
  public confirmPassword(page) {
    return page.locator("#confirmPassword");
  }
  public submitBtn(page) {
    return page.locator("[data-test=signup-submit]");
  }
  async signupAndSubmit(page, userObject: userSignUp) {
    await this.firstName(page).fill(userObject.firstName);
    await this.lastName(page).fill(userObject.lastName);
    await this.username(page).fill(userObject.username);
    await this.password(page).fill(userObject.password);
    await this.confirmPassword(page).fill(userObject.confirmPassword);
    await this.submitBtn(page).click();
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
export default new signup();
