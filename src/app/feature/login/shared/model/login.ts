export class LoginSesion {
    nombrePersona: string;
    cedula: number;
    rol: string;
    user: string;
    clave: string;
    token: string;
    constructor(nombrePersona: string, cedula: number, rol: string, user: string, clave: string, token: string) {
        this.nombrePersona = nombrePersona;
        this.cedula = cedula;
        this.rol = rol;
        this.user = user;
        this.clave = clave;
        this.token = token;
    }
}

export class Body {
    username: string;
    password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
