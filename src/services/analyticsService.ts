import api from "@/lib/axios";


export interface MetricsResponse {
    "total_revenue": number,
    "total_revenue_change": number,
    "sales": number,
    "sales_change": number,
    "active_users": number,
    "active_users_change": number
}
export interface RevenueResponse {
    "month": string,
    "revenue": number,
    "growth": number,
}
export interface DeviceUsageResponse  {
    "device":string,
    "percentage": number,
}
export interface ProductDataResponse  {
    "product":string,
    "sales": number,
    "revenue":number,
}

export const getMetrics = async () : Promise<Array<MetricsResponse>> => {
    const res = await api.get("/user/analytics/overall-metrics");
    return res.data;
};

export const getRevenue = async () : Promise<Array<RevenueResponse>> => {
    const res = await api.get("/user/analytics/revenue");
    return res.data;
};

export const getDeviceUsage = async () : Promise<Array<DeviceUsageResponse>> => {
    const res = await api.get("/user/analytics/device-usage");
    return res.data;
};

export const getProductData = async () : Promise<Array<ProductDataResponse>> => {
    const res = await api.get("/user/analytics/product-performance");
    return res.data;
};
