import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceService } from '../services/invoice.service';
import { CreateInvoiceRequest, InvoiceResponse } from '../types/invoice.types';

interface UseInvoicesParams {
  pageNum: number;
  pageSize: number;
  keyword?: string;
  sortBy?: string;
  ordering?: 'ASCENDING' | 'DESCENDING';
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export const useInvoices = (params: UseInvoicesParams) => {
  return useQuery<InvoiceResponse>({
    queryKey: ['invoices', params],
    queryFn: () => invoiceService.getInvoices(params),
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvoiceRequest) => invoiceService.createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};