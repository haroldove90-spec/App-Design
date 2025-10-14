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
    <div id="invoice-to-print" className="bg-white text-black font-sans w-[8.5in] min-h-[14in] p-8 flex flex-col">
      <header className="flex justify-between items-start mb-8">
        <Logo className="w-48" />
        <div className="text-right">
          <h1 className="text-4xl font-light text-black tracking-wider">RECIBO DE VENTAS</h1>
          <div className="mt-4 text-sm text-black">
            <p><span className="font-semibold">Fecha:</span> {invoiceData.date}</p>
            <p><span className="font-semibold">Recibo:</span> {invoiceData.receiptNumber}</p>
          </div>
        </div>
      </header>

      <main className="flex-grow">
          <section className="mb-10">
            <p className="text-black">Vendido a: <span className="text-black font-semibold">{invoiceData.soldTo}</span></p>
          </section>

          <section className="grid grid-cols-3 gap-px bg-gray-300 border border-gray-300 mb-8 text-sm">
            <div className="bg-[#2d577b] text-white p-2 font-bold">Método de pago</div>
            <div className="bg-[#2d577b] text-white p-2 font-bold">Condiciones de pago</div>
            <div className="bg-[#2d577b] text-white p-2 font-bold">Cuenta Bancaria</div>
            <div className="bg-gray-100 p-2 text-xs h-full whitespace-pre-wrap text-black">{invoiceData.paymentMethod}</div>
            <div className="bg-gray-100 p-2 text-xs h-full whitespace-pre-wrap text-black">{invoiceData.paymentConditions}</div>
            <div className="bg-gray-100 p-2 text-xs h-full whitespace-pre-wrap text-black">{invoiceData.bankAccount}</div>
          </section>

          <ItemsTable items={invoiceData.items} handleItemChange={() => {}} deleteItem={() => {}} addItem={() => {}} isPrintVersion={true} />
          
          <section className="flex justify-end mt-4">
            <div className="w-[40%] text-sm text-black">
              <div className="flex justify-between bg-white p-2 border-b border-gray-300">
                  <span className="font-semibold">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between bg-gray-100 p-2">
                <span className="font-semibold">Anticipo</span>
                <span>${invoiceData.anticipo.toFixed(2)}</span>
              </div>
              <div className="flex justify-between bg-gray-200 p-2 font-bold">
                <span>Restante</span>
                <span>${restante.toFixed(2)}</span>
              </div>
            </div>
          </section>
      </main>

      <footer className="text-center text-black text-xs mt-auto pt-4">
        <p className="font-semibold">Gracias por su confianza.</p>
        <p>Álamo No. 8, Los Reyes Iztacala, Tlalnepantla, Edo. de México.,</p>
      </footer>
    </div>
  );
};

export default PrintableInvoice;