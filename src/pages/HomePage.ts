import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  private readonly logoutLink: Locator;
  private readonly headers: Locator;
  private readonly searchBox: Locator;
  private readonly searchIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.headers = page.getByRole("heading", { level: 2 });
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.searchIcon = page.locator("#search button");
  }

  async isLogoutLinkExist(): Promise<Boolean> {
    return await this.logoutLink.isVisible();
  }

  async getHomePageTitle(): Promise<String> {
    return await this.page.title();
  }

  async getHomePageHeaders(): Promise<String[]> {
    return await this.headers.allTextContents();
  }

  async doSearch(searchKey: string): Promise<void> {
    await this.searchBox.fill(searchKey);
    await this.searchIcon.click();
  }
}
