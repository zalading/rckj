import request from '@/utils/request'

export const lowerGoodsApi = params =>request.get('/shop/area/lowPriceList',{params})