import { AxiosInstance } from 'axios'
import {ProductsAPI} from "@/api/products";
import {OrdersAPI} from "@/api/orders";
import {OrderDetailsAPI} from "@/api/orderDetails";
import {PaymentsAPI} from "@/api/payments";
import {DashboardsAPI} from "@/api/dashboard";

export class Api<T extends unknown> {
  public readonly products: ProductsAPI
  public readonly orders: OrdersAPI
  public readonly orderDetails: OrderDetailsAPI
  public readonly payments: PaymentsAPI
  public readonly dashboards: DashboardsAPI

  constructor(axios: AxiosInstance) {
    this.products = new ProductsAPI(axios)
    this.orders = new OrdersAPI(axios)
    this.orderDetails = new OrderDetailsAPI(axios)
    this.payments = new PaymentsAPI(axios)
    this.dashboards = new DashboardsAPI(axios)
  }
}
