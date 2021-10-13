import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ProductoPage } from '../page/producto/producto.po';
import { browser } from 'protractor';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let producto: ProductoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        producto = new ProductoPage();
    });

    it('Deberia listar libros', async () => {
        page.navigateTo();
        navBar.clickBotonListarLibros();
        browser.sleep(1000);
        expect(9).toBe(producto.contarProductos());
    });

    it('Deberia crear un libro', async () => {
        const nombreLibro = 'Prueba test';
        const editorial = 'Editarial ytest';
        const URL = 'URL test';
        const estado = 'Disponible';
        const valorDia = 100;
        const resumen = 'resumen test';
        const categoria = 'categoria test';
        const fechaPublicacion = '2020-05-07';
        page.navigateTo();
        navBar.clickBotonCrearLibros();
        expect(page.getParagraphText('app-crear-producto', 'h3')).toEqual('Registrar Libro');
        producto.ingresarNombreLibro(nombreLibro);
        producto.ingresarEditorial(editorial);
        producto.ingresarURL(URL);
        producto.ingresarEstado(estado);
        producto.ingresarValorDia(valorDia);
        producto.ingresarResumen(resumen);
        producto.ingresarCategoria(categoria);
        producto.ingresarFechaPublicacion(fechaPublicacion);
        await producto.clickCrearLibro();
        browser.sleep(1000);
        expect(page.getParagraphText('app-listar-producto', 'h3')).toEqual('Listado de libros');
    });

    it('Deberia ver el detalle de un libro', async () => {
        page.navigateTo();
        navBar.clickBotonListarLibros();
        expect(page.getParagraphText('app-listar-producto', 'h3')).toEqual('Listado de libros');
        await producto.clickBotonVerLibro();
        browser.sleep(1000);
        expect(page.getIdText('tituloLibro')).toEqual('Arsène Lupin - La Aguja Hueca');
    });

});
