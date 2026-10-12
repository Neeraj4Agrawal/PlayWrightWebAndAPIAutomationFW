import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  // 1. Define the private locators for the elements on the login page
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly forgottenPasswordLink: Locator;
  private readonly loginErrorMessage: Locator;

  //2. Initalize the locators in the constructor
  constructor(page: Page) {
    super(page); // Call the constructor of the BasePage class to initialize the page property
    this.emailId = page.getByRole("textbox", { name: "E-Mail Address" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.forgottenPasswordLink = page
      .getByRole("link", { name: "Forgotten Password" })
      .first();
    this.loginErrorMessage = page.locator(
      ".alert.alert-danger.alert-dismissible",
    );
  }

  async goToLoginPage(): Promise<void> {
    await this.page.goto("opencart/index.php?route=account/login");
  }
  async isForgottenPasswordLinkExist(): Promise<boolean> {
    return await this.forgottenPasswordLink.isVisible();
  }

  async doLogin(
    email: string | undefined,
    password: string | undefined,
  ): Promise<void> {
    await this.emailId.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async getLoginErrorMessage(): Promise<boolean> {
    return await this.loginErrorMessage.isVisible();
  }
}
