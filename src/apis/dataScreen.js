import request from '@/utils/request'

//监控链接销售额
export const linkSalesApi = params => request.get('/shop/getMonitor/linkSales', { params })


//低价销售额占比
export const lowsalesApi = params => request.get('/shop/getDistressed/sales', { params })

//低价销售额占比总销售
export const totalpriceApi = params => request.get('/shop/getAllLowPrice', { params })

//正价低价地区分布
export const linkStatisticsApi = params => request.get('/shop/area/linkStatistics', { params })

//监控链接价格对比
export const beforeApi=params=>request.get('/shop/data/before',{params})