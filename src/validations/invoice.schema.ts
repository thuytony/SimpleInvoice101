import * as yup from 'yup';

const invoiceItemSchema = yup.object({
  itemName: yup.string().required('Item name is required'),
  quantity: yup.number().required('Quantity is required').min(1, 'Minimum quantity is 1'),
  rate: yup.number().required('Rate is required').min(0, 'Rate must be positive'),
  itemReference: yup.string().required('Item reference is required')
});

export const invoiceDataSchema = yup.object({
  customer: yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    contact: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      mobileNumber: yup.string().required('Mobile number is required')
    })
  }).required(),
  currency: yup.string().required('Currency is required'),
  invoiceDate: yup.string().required('Invoice date is required'),
  dueDate: yup.string().required('Due date is required'),
  items: yup.array().of(invoiceItemSchema)
    .required('Items are required')
    .min(1, 'At least one item is required')
});

export const createInvoiceSchema = yup.object({
  invoices: yup.array().of(invoiceDataSchema)
    .required('Invoices are required')
    .min(1, 'At least one invoice is required')
}); 