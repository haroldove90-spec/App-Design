export interface LineItem {
  id: string;
  quantity: number;
  articleNumber: string;
  description: string;
  unitPrice: number;
  discount: number;
  isEditable?: boolean;
  isDescriptionEditable?: boolean;
  isPriceEditable?: boolean;
}

export interface InvoiceData {
  soldTo: string;
  date: string;
  receiptNumber: string;
  paymentMethod: string;
  paymentConditions: string;
  bankAccount: string;
  items: LineItem[];
  anticipo: number;
}

export interface HistoryItem extends InvoiceData {
    total: number;
}