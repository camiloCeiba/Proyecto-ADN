import { by, element } from 'protractor';

export class LoginPage {
    private inputUsername = element(by.id('inputUsername'));
    private inputPassword = element(by.id('inputPassword'));
    private selectType = element(by.id('selectType'));
    private btnLogin = element(by.id('btnLogin'));

    async ingresarUsername(username) {
        await this.inputUsername.sendKeys(username);
    }

    async ingresarPassword(password) {
        await this.inputPassword.sendKeys(password);

    }
    async ingresarType(type) {
        await this.selectType.sendKeys(type);
    }

    async clickBotonLoguearse() {
        await this.btnLogin.click();
    }
}
