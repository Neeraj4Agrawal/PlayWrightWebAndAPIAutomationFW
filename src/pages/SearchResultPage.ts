import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultPage extends BasePage {
  private readonly searchResults: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResults = page.locator("div.product-layout");
  }

  async getProductSearchResultsCount(): Promise<Number> {
    return await this.searchResults.count();
  }
  async selectProduct(productName: string): Promise<void> {
    console.log("Prodcut name is : " + productName);
    await this.page.getByText(productName, { exact: true }).click();
  }
}
