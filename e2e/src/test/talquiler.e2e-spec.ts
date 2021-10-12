import { AppPage } from '../app.po';
import { browser } from 'protractor';
import { ProductoPage } from '../page/producto/producto.po';
import { AlquilerPage } from '../page/alquiler/alquiler.po';

describe('workspace-project alquiler', () => {
    let page: AppPage;
    let producto: ProductoPage;
    let alquiler: AlquilerPage;

    beforeEach(() => {
        page = new AppPage();
        producto = new ProductoPage();
        alquiler = new AlquilerPage();
    });

    xit('Deberia alquilar un libro', async () => {
        const fechaInicial =  '10-01-2021';
        const fechaFinal = '10-01-2021';
        const cedula = 1023009725;
        await producto.clickBotonVerAlquilar();

        await alquiler.ingresarFechaInicial(fechaInicial);
        await alquiler.ingresarFechaFinal(fechaFinal);
        alquiler.ingresarCedula(cedula);
        await alquiler.clickBotonAlquiler();
        browser.sleep(1000);
        expect(page.getParagraphText('app-listar-producto', 'h3')).toEqual('Listado de libros');
    });
});
