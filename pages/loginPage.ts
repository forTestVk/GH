import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly submitBtn: Locator;
  static loginField: any;
  static passwordField: any;

  constructor(page: Page) {
    this.page = page;
    this.loginField = page.getByLabel("Username or email address");
    this.passwordField = page.getByLabel("Password");
    this.submitBtn = page.getByRole("button", { name: "Sign in", exact: true });

  }
  async goto() {
    await this.page.goto("https://github.com/login");
  }
  async login(username: string, password: string) {
    await this.loginField.fill(username);
    await this.passwordField.fill(password);
    await this.submitBtn.click();
  }
}
