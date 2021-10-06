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
        inputPasswordError: (): HTMLDivElement => document.querySelector('#inputPasswordError'),
        btnLogin: (): HTMLButtonElement => document.querySelector('#btnLogin'),
    },
    TOOLBAR: {
        btnCerrarSesion: (): HTMLButtonElement => document.querySelector('#btnCerrarSesion'),
    }
};
