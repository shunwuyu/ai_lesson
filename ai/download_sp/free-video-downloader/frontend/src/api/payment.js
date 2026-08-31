import axios from 'axios'
import { getToken } from './auth'

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function createCheckoutSession(planType = 'monthly') {
  const res = await axios.post(
    '/api/payment/create-checkout',
    { plan_type: planType },
    { headers: authHeaders() }
  )
  return res.data.data
}

export async function getOrders() {
  const res = await axios.get('/api/payment/orders', { headers: authHeaders() })
  return res.data.data
}
