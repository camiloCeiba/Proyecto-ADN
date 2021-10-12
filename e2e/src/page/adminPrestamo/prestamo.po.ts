import { by, element } from 'protractor';

export class AdminPrestamoPage {
    private listaProductos = element.all(by.css('app-list-prestamos .card'));

    async contarProductos() {
        return this.listaProductos.count();
    }
}
