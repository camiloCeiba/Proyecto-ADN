export const SELECTORS = {
    NAV_BAR: {
        linkCrearLibro: (): HTMLLinkElement => document.querySelector('#linkCrearLibro'),
        linkBorrarLibro: (): HTMLLinkElement => document.querySelector('#linkBorrarLibro'),
        linkListarLibro: (): HTMLLinkElement => document.querySelector('#linkListarLibro'),
    },
    LOGIN: {
        inputUsername: (): HTMLInputElement => document.querySelector('#inputUsername'),
        inputUsernameError: (): HTMLSpanElement => document.querySelector('#inputUsernameError'),
        inputPassword: (): HTMLInputElement => document.querySelector('#inputPassword'),
        inputPasswordError: (): HTMLDivElement => document.querySelector('#inputPasswordError'),
        btnLogin: (): HTMLButtonElement => document.querySelector('#btnLogin'),
    },
    TOOLBAR:{
        btnCerrarSesion: (): HTMLButtonElement => document.querySelector('#btnCerrarSesion'),
    }
}