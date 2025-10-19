import React from 'react';
import { InvoiceData } from '../types';
import ItemsTable from './ItemsTable';
import Logo from './Logo';

interface PrintableInvoiceProps {
  invoiceData: InvoiceData;
  subtotal: number;
  restante: number;
}

const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({ invoiceData, subtotal, restante }) => {
  return (
    // Using A4-like dimensions for better standard fitting, but inside an 8.5x14 container for legal format.
    // The font is changed to a more classic 'serif' font for official documents.
    <div id="invoice-to-print" className="bg-white text-black font-serif w-[8.5in] min-h-[14in] p-12 flex flex-col">
      <header className="flex justify-between items-start pb-8 border-b-2 border-gray-200">
        <div className="flex items-start gap-6">
          <Logo className="w-40" />
          <div className="text-xs text-gray-600">
            <p className="font-bold text-base text-black">App Design</p>
            <p>Álamo No. 8,</p>
            <p>Los Reyes Iztacala, Tlalnepantla,</p>
            <p>Edo. de México.</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-4xl font-light text-gray-800 tracking-wider">RECIBO</h1>
          <div className="mt-4 text-sm text-gray-700">
            <p><span className="font-semibold text-gray-800">Fecha:</span> {invoiceData.date}</p>
            <p><span className="font-semibold text-gray-800">Recibo #:</span> {invoiceData.receiptNumber}</p>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-8">
          <section className="mb-10 grid grid-cols-2">
            <div>
              <p className="text-sm text-gray-600 font-semibold">VENDIDO A:</p>
              <p className="text-black font-bold text-lg">{invoiceData.soldTo || 'N/A'}</p>
            </div>
          </section>

          {/* Using a more modern layout for payment details, cleaner than the 3-column table */}
          <section className="grid grid-cols-3 gap-4 mb-8 text-sm border-t border-b border-gray-200 py-4">
            <div>
              <h3 className="font-bold text-gray-700 mb-1">Método de pago</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{invoiceData.paymentMethod}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 mb-1">Condiciones de pago</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{invoiceData.paymentConditions}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 mb-1">Cuenta Bancaria</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{invoiceData.bankAccount}</p>
            </div>
          </section>

          <ItemsTable items={invoiceData.items} handleItemChange={() => {}} deleteItem={() => {}} addItem={() => {}} isPrintVersion={true} />
          
          <section className="flex justify-end mt-8">
            <div className="w-full max-w-sm text-sm text-gray-700">
              <div className="flex justify-between p-2">
                  <span className="font-semibold text-gray-800">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50">
                <span className="font-semibold text-gray-800">Anticipo:</span>
                <span>${invoiceData.anticipo.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-600 text-white p-3 font-bold text-base rounded-md mt-2">
                <span>RESTANTE A PAGAR:</span>
                <span>${restante.toFixed(2)}</span>
              </div>
            </div>
          </section>
      </main>

      <footer className="text-center text-gray-500 text-xs mt-auto pt-8 border-t border-gray-200">
        <p className="font-semibold">Gracias por su confianza.</p>
        <p>Si tiene alguna pregunta sobre este recibo, por favor contáctenos.</p>
      </footer>
    </div>
  );
};

export default PrintableInvoice;
