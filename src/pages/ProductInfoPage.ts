import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
  private readonly header: Locator;
  private readonly productImages: Locator;
  private readonly productMetaData: Locator;
  private readonly productPricing: Locator;
  private productInfoMap: Map<string, string | number>;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { level: 1 });
    this.productImages = page.locator("div#content li img");
    this.productMetaData = page.locator(
      "div #content ul.list-unstyled:nth-of-type(1) li",
    );
    this.productPricing = page.locator(
      "div #content ul.list-unstyled:nth-of-type(2) li",
    );
    this.productInfoMap = new Map<string, string | number>();
  }
  async getProductHeader(): Promise<String> {
    return await this.header.innerText();
  }
  async getProductImagesCount(): Promise<Number> {
    await this.productImages.first().waitFor({ state: "visible" });
    return await this.productImages.count();
  }

  async getProductMetaData(): Promise<void> {
    let metaData = await this.productMetaData.allInnerTexts();
    for (let data of metaData) {
      let meta = data.split(":");
      let key = meta[0].trim();
      let value = meta[1].trim();
      this.productInfoMap.set(key, value);
    }
  }
  async getProductPricingData(): Promise<void> {
    let metaData = await this.productPricing.allInnerTexts();
    let productPrice = metaData[0].trim();
    let exTaxPrice = metaData[1].split(":")[1].trim();
    this.productInfoMap.set("productPrice", productPrice);
    this.productInfoMap.set("exTaxPrice", exTaxPrice);
  }

  async getprodcutInfo(): Promise<Map<string, string | number>> {
    this.productInfoMap.set("ProductHeader", await this.getProductHeader());
    this.productInfoMap.set(
      "ProductImagesCount",
      await this.getProductImagesCount(),
    );
    await this.getProductMetaData();
    await this.getProductPricingData();
    return this.productInfoMap;
  }
}
