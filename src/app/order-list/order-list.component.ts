import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service'
import { Order } from '../models/order';
declare var $: any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  Orders: Order[] = [];
  selectedCustomerOrderNo: string = "";
  selectedOrderStatus: string = "";
  loading: boolean = false;
  dtOptions: DataTables.Settings = {};

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: { url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/tr.json' }
    };
  }

  loadOrders() {
    this.loading = true;
    return this.orderService.getOrders().subscribe((data: Order[]) => {
      this.Orders = data;
      this.loading = false;
    });
  }

  setCustomerOrderNo(event: any) {
    this.selectedCustomerOrderNo = event.target.value;
    this.selectedOrderStatus = this.Orders.find(x => x.customerOrderNo == this.selectedCustomerOrderNo)?.status!;
  }

  updateStatusInOrders(customerOrderNo: string, status: string) {
    var order = this.Orders.find(x => x.customerOrderNo == customerOrderNo);
    var index = this.Orders.indexOf(order!);

    this.Orders[index].status = status!;

    this.selectedCustomerOrderNo = "";
  }

  changeLoading(loading: boolean) {
    this.loading = loading;
  }

  showOrderEditModal() {
    if (this.selectedCustomerOrderNo == "") {
      window.alert("Sipariş seçimi yapılmadı.");
    }
    else {
      $('#order-edit-modal').modal('show');
    }
  }
}
