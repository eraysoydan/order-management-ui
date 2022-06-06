export class OrderUpdateStatus {
    customerOrderNo: string;
    statusId: number;

    constructor(customerOrderNo: string, statusId: number)
    {
        this.customerOrderNo = customerOrderNo;
        this.statusId = statusId;
    }
}