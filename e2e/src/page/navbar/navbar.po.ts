import { by, element } from 'protractor';

export class NavbarPage {
    linkCrearLibro = element(by.id('linkCrearLibro'));
    linkListarLibro = element(by.id('linkListarLibro'));
    linkAdminPrestamo = element(by.id('linkPrestamo'));

    async clickBotonListarLibros() {
        await this.linkListarLibro.click();
    }

    async clickBotonCrearLibros() {
        await this.linkCrearLibro.click();
    }

    async clickBotonAdminPrestamo() {
        await this.linkAdminPrestamo.click();
    }
}
