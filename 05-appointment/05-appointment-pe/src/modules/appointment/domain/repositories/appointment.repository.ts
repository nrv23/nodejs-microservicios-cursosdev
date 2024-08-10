import { AppointmentResult } from "../../infrastructure/appointment.infrastructure";
import { Appointment } from "../appointment";

export interface AppointmentRepository {
  receive(consumer: ((message: any) => void)): Promise<void>;
  sendToQueueMessageConfirm(id: string, state: string): Promise<void>;
}