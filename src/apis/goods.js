import request from '@/utils/request'

//获取所有商品列表
export const AllGoodsApi=params =>request.get('/shop/shopList',{params})

//搜索商品关键词和平台
// export const searchGoodApi=params=>request.get('/shop/Product',{params})

//监控上下架情况
export const updataGoodApi=params=>request.get('/shop/upData/detail',{params})