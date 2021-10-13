export const SELECTORS = {
    NAV_BAR: {
        linkCrearLibro: (): HTMLLinkElement => document.querySelector('#linkCrearLibro'),
        linkPrestamo: (): HTMLLinkElement => document.querySelector('#linkPrestamo'),
        linkListarLibro: (): HTMLLinkElement => document.querySelector('#linkListarLibro'),
        linkListaAlquilar: (): HTMLLinkElement => document.querySelector('#linkListaAlquilar'),
    },
    LOGIN: {
        inputUsername: (): HTMLInputElement => document.querySelector('#inputUsername'),
        inputUsernameError: (): HTMLSpanElement => document.querySelector('#inputUsernameError'),
        inputPassword: (): HTMLInputElement => document.querySelector('#inputPassword'),
        selectType: (): HTMLSelectElement => document.querySelector('#selectType'),
        inputPasswordError: (): HTMLDivElement => document.querySelector('#inputPasswordError'),
        btnLogin: (): HTMLButtonElement => document.querySelector('#btnLogin'),
    },
    TOOLBAR: {
        btnCerrarSesion: (): HTMLButtonElement => document.querySelector('#btnCerrarSesion'),
    },
    LIBRO: {
        inputNombre: (index: number): HTMLElement => document.querySelector(`#libroPrestamo-${index}-nombre`),
        inputURL: (index: number): HTMLImageElement => document.querySelector(`#libroPrestamo-${index}-URL`),
        inputeditorial: (index: number): HTMLSpanElement => document.querySelector(`#libroPrestamo-${index}-editorial`),
        inputcategoria: (index: number): HTMLSpanElement => document.querySelector(`#libroPrestamo-${index}-categoria`),
        inputestado: (index: number): HTMLSpanElement => document.querySelector(`#libroPrestamo-${index}-estado`),
    },
    ALQUILER: {
        inputCodigoLibro: (): HTMLInputElement => document.querySelector('#codigoLibro'),
        inputFechaInicial: (): HTMLInputElement => document.querySelector('#fechaInicial'),
        inputFechaFinal: (): HTMLInputElement => document.querySelector('#fechaFinal'),
        inputCedula: (): HTMLInputElement => document.querySelector('#cedula'),
        inputValorTotal: (): HTMLInputElement => document.querySelector('#valorTotal'),
        buttonAlquiler: (): HTMLButtonElement => document.querySelector('#botonAlquiler'),
    },
    LISTALQUILER: {
        imgURL: (index: number): HTMLImageElement => document.querySelector(`#data-${index}-URL`),
        spanEditorial: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-editorial`),
        spanCategoria: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-categoria`),
        spanFechaPubli: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-fechaPubli`),
        spanEstado: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-estado`),
        spanValor: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-valor`),
        spanFechaDevo: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-fechaDevo`),
        spanAlquiler: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-alquiler`),
        spanMulta: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-multa`),
        spanPagar: (index: number): HTMLSpanElement => document.querySelector(`#data-${index}-pagar`),
        buttonDevolver: (index: number): HTMLButtonElement => document.querySelector(`#data-${index}-devolver`),
    },
    VERPRODUCTO: {
        inputSpanEditorial: (): HTMLInputElement => document.querySelector('#spanEditorial'),
        inputSpanCategoria: (): HTMLInputElement => document.querySelector('#spanCategoria'),
        inputSpanFecha: (): HTMLInputElement => document.querySelector('#spanFechaPublicacion'),
        inputSpanEstado: (): HTMLInputElement => document.querySelector('#spanEstado'),
        inputSpanValorDia: (): HTMLInputElement => document.querySelector('#spanValorDia'),
        inputSpanCodigoLibro: (): HTMLInputElement => document.querySelector('#spanCodigoLibro'),
        buttonAlquilar: (): HTMLButtonElement => document.querySelector('#buttonAlquilar'),
    },
    LISTPRODUCTO: {
        strongNombreLibro: (index: number): HTMLElement => document.querySelector(`#strong-${index}-nombreLibro`),
        imageURL: (index: number): HTMLImageElement => document.querySelector(`#img-${index}-URL`),
        spanResumen: (index: number): HTMLSpanElement => document.querySelector(`#span-${index}-resumen`),
        strongEstado: (index: number): HTMLInputElement => document.querySelector(`#strong-${index}-estado`),
        buttonAlquilar: (index: number): HTMLButtonElement => document.querySelector(`#button-${index}-Alquilar`),
        buttonVer: (index: number): HTMLButtonElement => document.querySelector(`#div-${index}-ver`)
    }
};
