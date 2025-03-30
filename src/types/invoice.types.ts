interface Address {
  // Add address
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
}

interface Merchant {
  id: string;
  name?: string;
  addresses: Address[];
}

interface Status {
  key: string;
  value: boolean;
}

interface CustomField {
  key: string;
  value: string;
}

export interface Invoice {
  createdAt: string;
  createdBy: string;
  currency: string;
  currencySymbol: string;
  customer?: Customer;
  description: string;
  dueDate: string;
  invoiceDate: string;
  invoiceId: string;
  invoiceNumber: string;
  invoiceSubTotal: number;
  totalAmount: number;
  totalPaid: number;
  balanceAmount: number;
  merchant: Merchant;
  status: Status[];
  subStatus: Status[];
  type: string;
  customFields: CustomField[];
  totalTax: number;
}

export interface InvoiceResponse {
  data: Invoice[];
  paging: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
  };
}

export interface CreateInvoiceItem {
  itemName: string;
  quantity: number;
  rate: number;
  itemReference: string;
}

export interface CreateInvoiceCustomer {
  firstName: string;
  lastName: string;
  contact: {
    email: string;
    mobileNumber: string;
  };
}

export interface CreateInvoiceData {
  customer: CreateInvoiceCustomer;
  currency: string;
  invoiceDate: string;
  dueDate: string;
  items: CreateInvoiceItem[];
}

export interface CreateInvoiceRequest {
  invoices: CreateInvoiceData[];
}

export interface InvoiceFilter {
  status: string;
  sortBy: string;
  ordering: 'ASCENDING' | 'DESCENDING';
  keyword: string;
  fromDate: string;
  toDate: string;
}