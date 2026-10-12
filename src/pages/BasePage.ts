import type { Page, Locator } from "@playwright/test";

export class BasePage {
  //protected mean onyl child class can access base class properties
  protected readonly page: Page;

  //common locatera across all pages
  protected readonly logo: Locator;
  protected readonly searchBox: Locator;
  protected readonly searchIcon: Locator;
  protected readonly footerlinks: Locator;
  protected readonly currency: Locator;
  protected readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole("img", { name: "naveenopencart" });
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.searchIcon = page.locator("fa fa-search");
    this.currency = page.locator("#form-currency");
    this.footerlinks = page.locator("footer a");
    this.cartButton = page.locator("div#cart button");
  }

  //loater specific generaic method ?
  async isLogoVsisble(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async isSearchBoxVisible(): Promise<Boolean> {
    return await this.searchBox.isVisible();
  }
  async isCurrencyVisible(): Promise<Boolean> {
    return await this.currency.isVisible();
  }
  async isCartButtonVisible(): Promise<Boolean> {
    return await this.cartButton.isVisible();
  }

  async getPageFooterCount(): Promise<number> {
    return await this.footerlinks.count();
  }
  async getPageFooters(): Promise<string[]> {
    return await this.footerlinks.allInnerTexts();
  }

  // page specific generic methods
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
  getPageCurrentURL(): string {
    return this.page.url();
  }

  async waitForPageLoad() {
    return await this.page.waitForLoadState("load");
  }

  async takeScreenShot(name: string) {
    return await this.page.screenshot({
      fullPage: true,
      path: `report/screenshot/${name}.png`,
    });
  }
}
