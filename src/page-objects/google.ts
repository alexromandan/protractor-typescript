
import { browser, element, by, $, $$ } from 'protractor';

const googleURL = 'https://www.google.com';

export class GooglePage {

     private searchField = $('input[name="q"]');
     private morePlacesButton = element(by.cssContainingText('span', 'Meer plaatsen'));
     private morePlacesButton2 = element(by.cssContainingText('span', 'More places'));
     private companyElement = $$('a[role="link"]');

     getNumberOfCompanies() {
          return this.companyElement.count();
     }

     async getComapniesElementText(position: number) {
          return await this.companyElement.get(position).getText();
     }

     async goTo() {
          await browser.get(googleURL);
     }

     async searchCity(city: String) {
          await this.searchField.clear();
          await this.searchField.sendKeys(`Empresas de logistica ${city}\n`);
     }

     async search(string: string) {
          await this.searchField.clear();
          await this.searchField.sendKeys(string);
     }

     async morePlaces() {
          let isPresent = false, i = 0, isPresent2 = false;

          while (!isPresent) {
               if (i > 10) break;
               try {
                    await browser.executeScript('window.scrollBy(0,30);');
                    await browser.sleep(500);
                    isPresent = await this.morePlacesButton.isPresent();
                    isPresent2 = await this.morePlacesButton2.isPresent();
                    if (isPresent) break;
                    if (isPresent2) break;
               } catch (e) {
                    await browser.executeScript('window.scrollBy(0,30);');
                    await browser.sleep(500);
                    isPresent = false;
                    isPresent2 = false;
               }
               i++;
          }

          if (isPresent) await this.morePlacesButton.click();
          if (isPresent2) await this.morePlacesButton2.click();
     }
}