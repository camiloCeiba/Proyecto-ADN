import { AppPage } from '../app.po';
import { LoginPage } from '../page/navbar/login/login.po';
import { browser } from 'protractor';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let login: LoginPage;

    beforeEach(() => {
        page = new AppPage();
        login = new LoginPage();
    });

    it('Deberia iniciar sesion', () => {
        const username = 'Daniel';
        const password = 'Daniel1025';
        const type = 'login_admin';
        page.navigateTo();
        login.ingresarUsername(username);
        login.ingresarPassword(password);
        login.ingresarType(type);
        login.clickBotonLoguearse();
        console.log(browser.baseUrl);
        // expect(browser.baseUrl)
    });
});
