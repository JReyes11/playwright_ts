import { Page } from "@playwright/test";
import signUpObjects from "../page_objects/signup.ts";
import { userSignUp } from "../types/interfaces.ts";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

class signupSupport {
  firstNameField(page: Page) {
    return page.locator(signUpObjects.firstName());
  }
  lastNameField(page: Page) {
    return page.locator(signUpObjects.lastName());
  }
  usernameField(page: Page) {
    return page.locator(signUpObjects.username());
  }
  passwordField(page: Page) {
    return page.locator(signUpObjects.password());
  }
  confirmPasswordField(page: Page) {
    return page.locator(signUpObjects.confirmPassword());
  }
  submitButton(page: Page) {
    return page.locator(signUpObjects.submitBtn());
  }
  async signupAndSubmit(page: Page, userObject: userSignUp) {
    await this.firstNameField(page).fill(userObject.firstName);
    await this.lastNameField(page).fill(userObject.lastName);
    await this.usernameField(page).fill(userObject.username);
    await this.passwordField(page).fill(userObject.password);
    await this.confirmPasswordField(page).fill(userObject.confirmPassword);
    await this.submitButton(page).click();
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

export default new signupSupport();
