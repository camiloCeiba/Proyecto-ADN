import { AppPage } from '../app.po';
import { LoginPage } from '../page/login/login.po';
import { browser } from 'protractor';

describe('workspace-project login', () => {
    let page: AppPage;
    let login: LoginPage;

    beforeEach(() => {
        page = new AppPage();
        login = new LoginPage();
    });

    it('Deberia iniciar sesion', async () => {
        const username = 'Daniel';
        const password = 'Daniel1025';
        const type = 2;
        page.navigateTo();
        login.ingresarUsername(username);
        login.ingresarPassword(password);
        login.ingresarType(type);
        await login.clickBotonLoguearse();
        browser.sleep(1000);
        expect(page.getParagraphText('app-listar-producto', 'h3')).toEqual('Listado de libros');
    });
});
