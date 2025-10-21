import React, { useEffect } from 'react';
import { InvoiceData } from '../types';
import ItemsTable from './ItemsTable';

interface PrintableInvoiceProps {
  invoiceData: InvoiceData;
  restante: number;
  onRendered?: () => void;
}

const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({ invoiceData, restante, onRendered }) => {
  useEffect(() => {
    if (onRendered) {
      const handle = setTimeout(onRendered, 50);
      return () => clearTimeout(handle);
    }
  }, [onRendered]);

  return (
    <div id="invoice-to-print" className="bg-white text-black font-sans w-[8.5in] h-[11in] p-8 flex flex-col text-sm">
      <header className="flex justify-between items-start mb-4">
        <div>
          <svg width="160" viewBox="0 0 500 230" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(160,30)">
                  <circle cx="0" cy="0" r="8" fill="#a0aec0"/><circle cx="30" cy="0" r="8" fill="#a0aec0"/><circle cx="60" cy="0" r="8" fill="#a0aec0"/><circle cx="90" cy="0" r="8" fill="#a0aec0"/><circle cx="120" cy="0" r="8" fill="#a0aec0"/><circle cx="150" cy="0" r="8" fill="#a0aec0"/>
                  <circle cx="0" cy="25" r="8" fill="#a0aec0"/><circle cx="30" cy="25" r="8" fill="#a0aec0"/><circle cx="60" cy="25" r="8" fill="#a0aec0"/><circle cx="90" cy="25" r="8" fill="#a0aec0"/><circle cx="120" cy="25" r="8" fill="#a0aec0"/><circle cx="150" cy="25" r="8" fill="#a0aec0"/>
              </g>
              <text x="50%" y="185" textAnchor="middle" fill="#a0aec0" fontSize="100" fontFamily="sans-serif" fontWeight="300" letterSpacing="2">appdesign</text>
          </svg>
          <div className="mt-4 ml-1">
              <p>Vendido a: <span className="font-semibold">{invoiceData.soldTo || 'N/A'}</span></p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-light text-gray-700">Recibo de ventas</h2>
          <div className="mt-2 text-sm space-y-1">
              <p><span className="font-semibold">Fecha:</span> {invoiceData.date}</p>
              <p><span className="font-semibold">Recibo:</span> {invoiceData.receiptNumber}</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-3 text-center text-white font-bold" style={{ backgroundColor: '#3275B2' }}>
        <div className="p-1">Método de pago</div>
        <div className="p-1 border-l border-r border-white">Condiciones de pago</div>
        <div className="p-1">Cuenta Bancaria</div>
      </section>
      <section className="grid grid-cols-3 text-center border-l border-r border-b border-gray-300 min-h-[4rem] items-center">
         <div className="p-2">{invoiceData.paymentMethod}</div>
         <div className="p-2 border-l border-r border-gray-300">{invoiceData.paymentConditions}</div>
         <div className="p-2 whitespace-pre-line">{invoiceData.bankAccount}</div>
      </section>

      <main className="flex-grow mt-4">
          <ItemsTable items={invoiceData.items} handleItemChange={() => {}} deleteItem={() => {}} addItem={() => {}} isPrintVersion={true} />
      </main>

      <section className="flex justify-end mt-4">
        <div className="w-64">
            <div className="flex justify-between items-center py-1 px-2">
                <span>Anticipo</span>
                <span className="font-semibold">$ {invoiceData.anticipo > 0 ? invoiceData.anticipo.toLocaleString('es-MX', {minimumFractionDigits: 0, maximumFractionDigits: 0}) : '0'}</span>
            </div>
            <div className="flex justify-between items-center py-1 px-2 mt-1" style={{ backgroundColor: '#e0e0e0'}}>
                <span className="font-bold">Total restante</span>
                <span className="font-bold">$ {restante.toLocaleString('es-MX', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
            </div>
        </div>
      </section>

      <footer className="mt-auto pt-4 text-center text-xs text-gray-500">
        <p className="font-bold">Gracias por su confianza.</p>
        <p>Álamo No. 8, Los Reyes Iztacala, Tlalnepantla, Edo. de México., C.P. 54070 Tel. 55 7579 3453 – Cel. 56 2422 2449</p>
      </footer>
    </div>
  );
};

export default PrintableInvoice;
