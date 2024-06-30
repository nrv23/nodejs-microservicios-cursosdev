// modelo de datos 

class User {

    id: number;
    nombre: string;
    apellido: string;

    constructor(id: number, nombre: string, apellido: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}


class Address {

    id: number;
    userId: number;
    location: string;
    city: string;
    country: string;

    constructor(id: number,
        userId: number,
        location: string,
        city: string,
        country: string) {
            this.id = id;
            this.userId = userId;
            this.location = location;
            this.city = city;
            this.country = country;
    }
}
// modelo de demonio

class UserDomain  {

    id: number;
    nombre: string;
    apellido: string;
    address : AddressDomain[]

    constructor(id: number, nombre: string, apellido: string, address: AddressDomain[]) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.address = address;
    }
}



class AddressDomain {

    location: string;
    city: string;
    country: COUNTRY;

    constructor(
        location: string,
        city: string,
        country: COUNTRY) {
            this.location = location;
            this.city = city;
            this.country = country;
    }
}

enum COUNTRY {
    PE = "Pe",
    CR = "cr",
    MX = "mx"
}