import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 鸡群相关API
export const chickenApi = {
  getChickens: () => apiClient.get('/chickens'),
  getChickenHealth: (id: number) => apiClient.get(`/health/${id}`)
};

// 统计数据相关API
export const statsApi = {
  getStats: () => apiClient.get('/stats')
};

// 情绪状态相关API
export const emotionsApi = {
  getEmotions: () => apiClient.get('/emotions')
};

// 警报相关API
export const alertsApi = {
  getAlerts: () => apiClient.get('/alerts')
};

export default {
  ...chickenApi,
  ...statsApi,
  ...emotionsApi,
  ...alertsApi
};