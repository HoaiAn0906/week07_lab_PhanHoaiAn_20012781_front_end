import { BaseApi } from '@/api/base'

export class PaymentsAPI extends BaseApi {
    createPayment(params: any): Promise<any> {
        return this.get('/payments', { params })
    }
}
