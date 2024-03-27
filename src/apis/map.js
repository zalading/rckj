import request from '@/utils/request'

//全网最低价商品排序
export const lowerGoodsApi = params =>request.get('/shop/area/lowPriceList',{params})

//地图数据获取
export const maplistApi=params=>request.get('/shop/area/map',{params})