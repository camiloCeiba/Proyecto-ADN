import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-toolbar h1')).getText() as Promise<string>;
  }

  getParagraphText(elemento, type) {
    return element(by.css(`${elemento} ${type}`)).getText() as Promise<string>;
  }

  getIdText(elemento) {
    return element(by.id(`${elemento}`)).getText() as Promise<string>;
  }
}
