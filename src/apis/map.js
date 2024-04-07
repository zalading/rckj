import request from '@/utils/request'

//全网最低价商品排序
export const lowerGoodsApi = params =>request.get('/shop/area/lowPriceList',{params})

//地图数据获取
export const maplistApi=params=>request.get('/shop/area/map',{params})

//获取折线图商品详情
export const linetuApi = params => request.get('/shop/getNumId/count',{params})

//获取价格变化折线图
export const lineDataApi = params => request.get('/shop/getPrice/change', { params })

//获取商品详情监控链接
export const linkDetailApi = params => request.get('/shop/getLink/detail',{params})

//获取最低价
export const getPriceApi = params => request.get('/shop/area/getPrice', { params })

//离开页面存地图数据
export const updataPriceApi = params => request.get('/shop/area/updataPrice', { params })

//监控商家信息
export const storeInfoApi=()=>request.get('/shop/area/storeInfo')