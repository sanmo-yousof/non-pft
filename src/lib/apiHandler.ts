import axiosInstance from "./api";

type params = Record<string, unknown>;

export const getApi = async <T>(
  endpoint: string,
  params?: params,
): Promise<T> => {
  return axiosInstance.get(endpoint, { params });
};

export const postApi = (url: string, data: any = {}) => {
  return axiosInstance.post(url, data);
};

export const patchApi = (url: string, data: params = {}) => {
  return axiosInstance.patch(url, data);
};

export const deleteApi = (url: string, data?: params) => {
  return axiosInstance.delete(url, { data });
};
