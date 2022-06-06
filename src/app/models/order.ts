export class Order {
    id: number;
    customerOrderNo: string;
    outputAddress: string;
    destinationAddress: string;
    quantity: number;
    quantityUnit: string;
    weight: number;
    weightUnit: string;
    itemName: string;
    status: string;
    note: string;

    constructor(id: number,
        customerOrderNo: string,
        outputAddress: string,
        destinationAddress: string,
        quantity: number,
        quantityUnit: string,
        weight: number,
        weightUnit: string,
        itemName: string,
        status: string,
        note: string) {
        this.id = id;
        this.customerOrderNo = customerOrderNo;
        this.outputAddress = outputAddress;
        this.destinationAddress = destinationAddress;
        this.quantity = quantity;
        this.quantityUnit = quantityUnit;
        this.weight = weight;
        this.weightUnit = weightUnit;
        this.itemName = itemName;
        this.note = note;
        this.status = status;
    }
}