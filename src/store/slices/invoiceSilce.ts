import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { invoiceService } from '../../services/invoice.service';
import { Invoice, CreateInvoiceRequest } from '../../types/invoice.types';

interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

export const fetchInvoices = createAsyncThunk(
  'invoice/fetchInvoices',
  async (params: { pageNum: number; pageSize: number }) => {
    const response = await invoiceService.getInvoices(params);
    return response;
  }
);

export const createInvoice = createAsyncThunk(
  'invoice/createInvoice',
  async (data: CreateInvoiceRequest) => {
    const response = await invoiceService.createInvoice(data);
    return response;
  }
);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload.data;
        state.totalPages = action.payload.paging.totalRecords;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch invoices';
      });
  },
});

export default invoiceSlice.reducer;