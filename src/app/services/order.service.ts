import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Order } from '../models/order';
import { OrderStatus } from '../models/order-status';
import { OrderUpdateStatus } from '../models/order-update-status';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiURL: string;
  constructor(private http: HttpClient) { 
    this.apiURL = 'https://localhost:7029';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(this.apiURL + '/api/Order/GetOrders')
      .pipe(retry(1), catchError(this.handleError));
  }

  getOrderStatus(): Observable<OrderStatus[]> {
    return this.http
      .get<OrderStatus[]>(this.apiURL + '/api/OrderStatus/GetOrderStatus')
      .pipe(retry(1), catchError(this.handleError));
  }

  updateOrderStatus(OrderUpdateStatus: any): Observable<OrderUpdateStatus> {
    return this.http
      .post<OrderUpdateStatus>(
        this.apiURL + '/api/Order/UpdateOrderStatus',
        JSON.stringify(OrderUpdateStatus),
        this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
