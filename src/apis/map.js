import request from '@/utils/request'

//全网最低价商品排序
export const lowerGoodsApi = params =>request.get('/shop/area/lowPriceList',{params})

//地图数据获取
export const maplistApi=params=>request.get('/shop/area/map',{params})

//获取折线图商品详情
export const linetuApi = () => request.get('/shop/getNumId/count')

//获取价格变化折线图
export const lineDataApi = params => request.get('/shop/getPrice/change', { params })

//获取商品详情监控链接
export const linkDetailApi=()=>request.get('/shop/getLink/detail')