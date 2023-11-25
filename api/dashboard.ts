import { BaseApi } from '@/api/base'

export class DashboardsAPI extends BaseApi {
    getOrderByMonth(year: number): Promise<any> {
        return this.get(`/dashboard/orders_by_month/${year}`)
    }
}