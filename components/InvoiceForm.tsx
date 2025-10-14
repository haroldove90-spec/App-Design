import React from 'react';
import { InvoiceData, LineItem } from '../types';
import ItemsTable from './ItemsTable';

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  handleInputChange: (field: keyof Omit<InvoiceData, 'items' | 'anticipo'>, value: string) => void;
  handleAnticipoChange: (value: string) => void;
  handleItemChange: (id: string, field: keyof Omit<LineItem, 'id'>, value: string | number) => void;
  addItem: () => void;
  deleteItem: (id: string) => void;
  subtotal: number;
  restante: number;
  returnToDashboard: () => void;
}

const BackIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}> <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /> </svg> );

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoiceData,
  handleInputChange,
  handleAnticipoChange,
  handleItemChange,
  addItem,
  deleteItem,
  subtotal,
  restante,
  returnToDashboard
}) => {
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeout(() => {
        e.target.scrollIntoView({ behavior: 'auto', block: 'center' });
    }, 350);
  };
  
  return (
    <>
      {/* --- SCREEN VIEW --- */}
      <div className="print:hidden">
        <div className="mb-4">
          <button onClick={returnToDashboard} className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-300 transition-colors duration-200 rounded-md hover:bg-gray-800 hover:text-blue-200">
              <BackIcon className="w-4 h-4" />
              <span>Volver al Panel</span>
          </button>
        </div>
        <div id="invoice-form-screen" className="p-4 sm:p-8 bg-gray-900 shadow-lg rounded-sm max-w-4xl mx-auto font-sans text-white">
          <header className="flex flex-col sm:flex-row justify-between items-start mb-8">
            <div>
              <img src="https://appdesignmex.com/assets/images/app-desig-logo-272x122.png" alt="Logo Appdesign" className="w-48" />
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0 w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-widest">Recibo de ventas</h2>
              <div className="mt-2 text-sm">
                <div className="flex justify-start sm:justify-end">
                  <span className="font-semibold mr-2">Fecha:</span>
                  <input type="text" value={invoiceData.date} readOnly className="text-left sm:text-right bg-gray-800 focus:outline-none rounded px-1 cursor-default"/>
                </div>
                <div className="flex justify-start sm:justify-end">
                  <span className="font-semibold mr-2">Recibo:</span>
                  <input type="text" value={invoiceData.receiptNumber} readOnly className="text-left sm:text-right bg-gray-800 focus:outline-none rounded px-1 cursor-default"/>
                </div>
              </div>
            </div>
          </header>

          <section className="mb-8">
            <div className="font-semibold">Vendido A:</div>
            <input 
              type="text" 
              value={invoiceData.soldTo} 
              onChange={(e) => handleInputChange('soldTo', e.target.value)}
              onFocus={handleInputFocus}
              className="w-full sm:w-1/2 p-2 bg-gray-800 border-b-2 border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 text-sm mb-8">
            <div className="border border-gray-700 md:border-r-0">
              <div className="bg-blue-600 text-white font-bold p-2 border-b border-blue-700">Método de pago</div>
              <textarea value={invoiceData.paymentMethod} onChange={(e) => handleInputChange('paymentMethod', e.target.value)} onFocus={handleInputFocus} rows={3} className="w-full p-2 h-full resize-none bg-gray-800 focus:outline-none focus:bg-gray-700"/>
            </div>
            <div className="border border-gray-700 border-t-0 md:border-t md:border-r-0">
              <div className="bg-blue-600 text-white font-bold p-2 border-b border-blue-700">Condiciones de pago</div>
              <textarea value={invoiceData.paymentConditions} onChange={(e) => handleInputChange('paymentConditions', e.target.value)} onFocus={handleInputFocus} rows={3} className="w-full p-2 h-full resize-none bg-gray-800 focus:outline-none focus:bg-gray-700"/>
            </div>
            <div className="border border-gray-700 border-t-0 md:border-t">
              <div className="bg-blue-600 text-white font-bold p-2 border-b border-blue-700">Cuenta Bancaria</div>
              <textarea value={invoiceData.bankAccount} onChange={(e) => handleInputChange('bankAccount', e.target.value)} onFocus={handleInputFocus} rows={3} className="w-full p-2 h-full resize-none bg-gray-800 focus:outline-none focus:bg-gray-700"/>
            </div>
          </section>

          <ItemsTable items={invoiceData.items} handleItemChange={handleItemChange} deleteItem={deleteItem} addItem={addItem} />

          <section className="flex justify-end mt-8">
            <div className="w-full sm:w-1/2 text-sm">
              <div className="flex justify-between p-2">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="font-semibold">Anticipo:</span>
                <div className="flex items-center">
                  <span className="mr-1">$</span>
                  <input 
                    type="number" 
                    value={invoiceData.anticipo} 
                    onChange={(e) => handleAnticipoChange(e.target.value)}
                    onFocus={handleInputFocus}
                    className="w-28 text-right font-medium p-1 bg-gray-800 border-b border-gray-700 focus:outline-none focus:bg-gray-700" 
                  />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 mt-2 bg-red-600 text-white font-bold rounded">
                <span className="text-lg">Restante</span>
                <span className="text-lg">${restante.toFixed(2)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
