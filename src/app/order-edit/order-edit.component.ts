import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../services/order.service'
import { OrderStatus } from '../models/order-status';
import { OrderUpdateStatus } from '../models/order-update-status';
declare var $: any;

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  OrderStatus: OrderStatus[] = [];
  statusId: number = 0;
  constructor(private orderService: OrderService) { }

  @Input() selectedCustomerOrderNo: string = "";
  @Input() selectedOrderStatus: string = "";
  @Output() loading = new EventEmitter<boolean>();
  @Output() updateStatus = new EventEmitter<{ customerOrderNo: string, status: string }>();

  ngOnInit(): void {
    this.loadOrderStatus();
  }

  loadOrderStatus() {
    return this.orderService.getOrderStatus().subscribe((data: OrderStatus[]) => {
      this.OrderStatus = data;
    });
  }

  changeStatusId(event: any) {
    this.statusId = event.target.value;
  }

  updateOrderStatus() {
    var orderUpdateStatus = new OrderUpdateStatus(this.selectedCustomerOrderNo, this.statusId);
    var status = this.OrderStatus.find(x => x.id == this.statusId)?.name!;

    if (this.statusId === 0) {
      window.alert("Statü değiştirmediniz.");
      return;
    }

    $('#order-edit-modal').modal('hide');

    setTimeout(() => {
      this.loading.emit(true);
      this.orderService.updateOrderStatus(orderUpdateStatus).subscribe((data: {}) => {
        this.updateStatus.emit({ customerOrderNo: this.selectedCustomerOrderNo, status: status! });
        this.statusId = 0;
        this.loading.emit(false);
      });
    }, 500);
  }
}
