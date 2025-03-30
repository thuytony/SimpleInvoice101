import { mainAxios } from '../api/axiosInstances';
import { CreateInvoiceRequest, InvoiceResponse } from '../types/invoice.types';

type InvoiceParams = {
  pageNum: number;
  pageSize: number;
  keyword?: string;
  sortBy?: string;
  ordering?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
};

const removeEmptyParams = (params: InvoiceParams) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};

export const invoiceService = {
  getInvoices: async (params: InvoiceParams) => {
    const response = await mainAxios.get<InvoiceResponse>('/invoice-service/1.0.0/invoices', {
      params: removeEmptyParams(params)
    });
    return response.data;
  },

  createInvoice: async (data: CreateInvoiceRequest) => {
    const response = await mainAxios.post('/invoice-service/1.0.0/invoices', data, {
      headers: {
        'Operation-Mode': 'SYNC',
      },
    });
    return response.data;
  },
};