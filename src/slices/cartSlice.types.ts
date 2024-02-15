import { CartItem } from '../shared.types'

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}