import authApi from '@/services/auth_api'
import * as stockApi from '@/services/stock_api'
export default { ...authApi, ...stockApi }
