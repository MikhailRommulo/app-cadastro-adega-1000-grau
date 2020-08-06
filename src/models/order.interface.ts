import { ClientModel } from "./client.interface";

export interface OrderModel {
    id: number;
    value: number;
    dateOfOrder: Date;
    client: ClientModel;
}