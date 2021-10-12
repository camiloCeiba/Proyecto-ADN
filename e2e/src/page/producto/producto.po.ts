import { by, element } from 'protractor';

export class ProductoPage {
    private linkCrearProducto = element(by.id('linkCrearProducto'));
    private linkListarProductos = element(by.id('linkListarProducto'));
    private inputNombreLibro = element(by.id('nombreLibro'));
    private inputEditorial = element(by.id('editorial'));
    private inputURL = element(by.id('URL'));
    private inputEstado = element(by.id('estado'));
    private inputValorDia = element(by.id('valorDia'));
    private inputResumen = element(by.id('resumen'));
    private inputCategoria = element(by.id('categoria'));
    private inputFechaPublicacion= element(by.id('fechaPublicacion'));
    private inputCodigoLibro= element(by.id('codigoLibro'));
    private buttonCrearLibro= element(by.id('button-crear-libro'));
    private listaProductos = element.all(by.css('app-listar-producto .card'));
    private buttonVerLibro= element(by.id('div-1-ver'));
    private buttonAlquilarLibro= element(by.id('button-1-Alquilar'));
    private buttonVerAlquilarLibro= element(by.id('buttonAlquilar'));
    
    async clickBotonCrearProductos() {
        await this.linkCrearProducto.click();
    }

    async clickBotonVerLibro() {
        await this.buttonVerLibro.click();
    }

    async clickBotonAlquilar() {
        await this.buttonAlquilarLibro.click();
    }

    async clickBotonVerAlquilar() {
        await this.buttonVerAlquilarLibro.click();
    }

    async clickCrearLibro() {
        await this.buttonCrearLibro.click();
    }

    async clickBotonListarProductos() {
        await this.linkListarProductos.click();
    }

    async ingresarNombreLibro(nombreLibro) {
        await this.inputNombreLibro.sendKeys(nombreLibro);
    }
    async ingresarEditorial(editorial) {
        await this.inputEditorial.sendKeys(editorial);
    }
    async ingresarURL(URL) {
        await this.inputURL.sendKeys(URL);
    }
    async ingresarEstado(estado) {
        await this.inputEstado.sendKeys(estado);
    }
    async ingresarValorDia(valorDia) {
        await this.inputValorDia.sendKeys(valorDia);
    }
    async ingresarResumen(resumen) {
        await this.inputResumen.sendKeys(resumen);
    }
    async ingresarCategoria(categoria) {
        await this.inputCategoria.sendKeys(categoria);
    }
    async ingresarFechaPublicacion(fechaPublicacion) {
        await this.inputFechaPublicacion.sendKeys(fechaPublicacion);
    }
    async ingresarCodigoLibro(codigoLibro) {
        await this.inputCodigoLibro.sendKeys(codigoLibro);
    }

    async contarProductos() {
        return this.listaProductos.count();
    }
}
