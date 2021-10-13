import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { browser } from 'protractor';
import { AdminPrestamoPage } from '../page/adminPrestamo/prestamo.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let prestamo: AdminPrestamoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        prestamo = new AdminPrestamoPage();
    });

    it('Deberia listar los prestamos totales', async () => {
        page.navigateTo();
        navBar.clickBotonAdminPrestamo();
        browser.sleep(1000);
        expect(4).toBe(prestamo.contarProductos());
    });
});
