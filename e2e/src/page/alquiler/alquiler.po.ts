import { by, element } from 'protractor';

export class AlquilerPage {
    private inputFechaInicial = element(by.id('fechaInicial'));
    private inputFechaFinal = element(by.id('fechaFinal'));
    private inputCedula = element(by.id('cedula'));
    private buttonAlquiler = element(by.css('app-alquiler-libro button'));
    private linkCrearProducto = element(by.id('linkCrearProducto'));

    async clickBotonCrearProductos() {
        await this.linkCrearProducto.click();
    }

    async ingresarFechaInicial(fechaInicial) {
        await this.inputFechaInicial.sendKeys(fechaInicial);
    }
    async ingresarFechaFinal(codigoLibro) {
        await this.inputFechaFinal.sendKeys(codigoLibro);
    }
    async ingresarCedula(cedula) {
        await this.inputCedula.sendKeys(cedula);
    }

    async clickBotonAlquiler() {
        await this.buttonAlquiler.click();
    }
}
