import { v4 as uuidv } from 'uuid';

export enum TCountry {
    CO = "CO",
    PE = "PE",
    MX = "MX"
};

export interface AppointmentEssentials {
    readonly name: string;
    readonly lastname: string;
    readonly email: string;
    readonly date: string;
    readonly medicId: number;
    readonly specialtyId: number;
    readonly centerId: number;
    readonly isoCountryCode: TCountry;
}

export type AppointmentProps = AppointmentEssentials;

export class Appointment {
    private readonly id: string;
    private readonly name: string;
    private readonly lastname: string;
    private readonly email: string;
    private readonly date: string;
    private readonly medicId: number;
    private readonly specialtyId: number;
    private readonly centerId: number;
    private readonly isoCountryCode: TCountry;

    constructor(props: AppointmentProps) {

        if (props.name.length < 3) throw new Error("Invalid name");
        if (props.lastname.length < 3) throw new Error("Invalid lastaname");
        if (props.email.length < 3) throw new Error("Invalid email");
        if (!props.date) throw new Error("Invalid date");
        if (!props.medicId || isNaN(props.medicId)) throw new Error("Invalid medicId");
        if (!props.centerId || isNaN(props.centerId)) throw new Error("Invalid centerId");
        if (!props.specialtyId || isNaN(props.specialtyId)) throw new Error("Invalid specialtyId");

        Object.assign(this, props);
        this.id = uuidv()

    }

    get properties() {
        return {
            id: this.id,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            date: this.date,
            medicId: this.medicId,
            specialtyId: this.specialtyId,
            centerId: this.centerId,
            isoCountryCode: this.isoCountryCode,
        }
    }
} 