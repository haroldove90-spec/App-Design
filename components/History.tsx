import React from 'react';
import { HistoryItem } from '../types';

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a2.25 2.25 0 00-1.933 2.15l.16 1.605h12.278l.16-1.605a2.25 2.25 0 00-1.933-2.15c-.785-.248-1.57-.391-2.365-.468v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 4.25a.75.75 0 01.75.75v.01c0 .414-.336.75-.75.75a.75.75 0 01-.75-.75v-.01c0-.414.336.75.75.75zM10 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
      <path d="M3 9.055l.187 1.874A2.25 2.25 0 005.41 13h9.18a2.25 2.25 0 002.223-2.071L17 9.055V9h-1.009l-.17.005a.75.75 0 01-.734-.842l.092-.916a2.25 2.25 0 00-2.14-1.992C11.385 5.16 10.72 5 10 5s-1.385.16-2.039.21a2.25 2.25 0 00-2.14 1.992l.092.916a.75.75 0 01-.734.842l-.17-.005H3v.055z" />
    </svg>
);

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M13 4.5a2.5 2.5 0 11.75.916l-3.5 2.042a2.5 2.5 0 010 3.084l3.5 2.042A2.5 2.5 0 1113 15.5a2.5 2.5 0 01-.3-.02l-3.5-2.042a2.5 2.5 0 110-4.874l3.5-2.042A2.5 2.5 0 0113 4.5z" />
    </svg>
);

interface HistoryProps {
  history: HistoryItem[];
  loadInvoice: (receiptNumber: string) => void;
  deleteInvoice: (receiptNumber: string) => void;
  shareInvoice: (receiptNumber: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, loadInvoice, deleteInvoice, shareInvoice }) => {
  if (history.length === 0) {
    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-gray-800 rounded-lg text-center text-gray-400 print:hidden">
            No hay órdenes de compra guardadas en el historial.
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 print:hidden">
      <h2 className="text-xl font-bold text-gray-200 mb-4">Órdenes de Compra Generadas</h2>
      
      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-white uppercase bg-blue-600">
            <tr>
              <th scope="col" className="px-6 py-3">Folio</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Fecha</th>
              <th scope="col" className="px-6 py-3 text-right">Total</th>
              <th scope="col" className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {history.map((invoice, index) => (
              <tr key={invoice.receiptNumber} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                <td className="px-6 py-4 font-medium whitespace-nowrap">{invoice.receiptNumber}</td>
                <td className="px-6 py-4">{invoice.soldTo}</td>
                <td className="px-6 py-4">{invoice.date}</td>
                <td className="px-6 py-4 text-right font-mono">${invoice.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-center space-x-4">
                  <button onClick={() => loadInvoice(invoice.receiptNumber)} className="font-medium text-blue-400 hover:underline">Cargar</button>
                  <button onClick={() => shareInvoice(invoice.receiptNumber)} className="font-medium text-green-400 hover:underline inline-flex items-center gap-1">
                    <ShareIcon className="w-4 h-4" /> Compartir
                  </button>
                  <button onClick={() => deleteInvoice(invoice.receiptNumber)} className="text-red-500 hover:text-red-400 p-1" aria-label={`Borrar orden de compra ${invoice.receiptNumber}`}>
                    <TrashIcon className="w-5 h-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {history.map(invoice => (
            <div key={invoice.receiptNumber} className="bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-white">Folio: {invoice.receiptNumber}</p>
                        <p className="text-sm text-gray-300">{invoice.soldTo}</p>
                    </div>
                    <p className="text-lg font-bold text-white font-mono">${invoice.total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-400">Fecha: {invoice.date}</p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => loadInvoice(invoice.receiptNumber)} className="font-medium text-blue-400 hover:underline px-2">Cargar</button>
                        <button onClick={() => shareInvoice(invoice.receiptNumber)} className="p-1 text-green-400 hover:text-green-300" aria-label={`Compartir orden de compra ${invoice.receiptNumber}`}>
                           <ShareIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => deleteInvoice(invoice.receiptNumber)} className="text-red-500 hover:text-red-400 p-1" aria-label={`Borrar orden de compra ${invoice.receiptNumber}`}>
                             <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default History;