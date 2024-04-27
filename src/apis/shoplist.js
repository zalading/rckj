import request from '@/utils/request'

export const statApi = params => request.get('/shop/detail/stat', { params })
