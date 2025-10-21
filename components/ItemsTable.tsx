import React from 'react';
import { LineItem } from '../types';

interface ItemsTableProps {
  items: LineItem[];
  handleItemChange: (id: string, field: keyof Omit<LineItem, 'id'>, value: string | number) => void;
  deleteItem: (id: string) => void;
  addItem: () => void;
  isPrintVersion?: boolean;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a2.25 2.25 0 00-1.933 2.15l.16 1.605h12.278l.16-1.605a2.25 2.25 0 00-1.933-2.15c-.785-.248-1.57-.391-2.365-.468v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 4.25a.75.75 0 01.75.75v.01c0 .414-.336.75-.75.75a.75.75 0 01-.75-.75v-.01c0-.414.336.75.75.75zM10 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    <path d="M3 9.055l.187 1.874A2.25 2.25 0 005.41 13h9.18a2.25 2.25 0 002.223-2.071L17 9.055V9h-1.009l-.17.005a.75.75 0 01-.734-.842l.092-.916a2.25 2.25 0 00-2.14-1.992C11.385 5.16 10.72 5 10 5s-1.385.16-2.039.21a2.25 2.25 0 00-2.14 1.992l.092.916a.75.75 0 01-.734.842l-.17-.005H3v.055z" />
  </svg>
);

const ItemsTable: React.FC<ItemsTableProps> = ({ items, handleItemChange, deleteItem, addItem, isPrintVersion = false }) => {

  if (isPrintVersion) {
    // --- PRINT TABLE ---
    const totalRows = 13;
    const itemsToRender = [...items];
    while (itemsToRender.length < totalRows) {
        itemsToRender.push({ id: `ph-${itemsToRender.length}`, quantity: 0, articleNumber: '', description: '', unitPrice: 0, discount: 0 });
    }

    return (
      <div className="block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-white" style={{ backgroundColor: '#384954' }}>
              <th className="py-1 px-2 text-left font-semibold w-[8%]">Cant.</th>
              <th className="py-1 px-2 text-left font-semibold w-[15%]">N.° de artículo</th>
              <th className="py-1 px-2 text-left font-semibold">Descripción</th>
              <th className="py-1 px-2 text-right font-semibold w-[15%]">Precio por unidad</th>
              <th className="py-1 px-2 text-right font-semibold w-[12%]">Descuento</th>
              <th className="py-1 px-2 text-right font-semibold w-[15%]">Total</th>
            </tr>
          </thead>
          <tbody>
            {itemsToRender.map((item, index) => {
                const total = (item.quantity * item.unitPrice) - item.discount;
                const isEmptyRow = item.id.startsWith('ph-');
                return (
                  <tr key={item.id} className="border-b border-gray-200" style={{ backgroundColor: index % 2 === 1 ? '#F3F4F6' : '#FFFFFF', height: '1.7rem' }}>
                    <td className="py-1 px-2 text-center align-top">{isEmptyRow ? '' : item.quantity}</td>
                    <td className="py-1 px-2 align-top">{item.articleNumber}</td>
                    <td className="py-1 px-2 align-top whitespace-pre-line">{item.description}</td>
                    <td className="py-1 px-2 text-right align-top">{!isEmptyRow && item.unitPrice > 0 ? `$ ${item.unitPrice.toLocaleString('es-MX', {minimumFractionDigits: 0, maximumFractionDigits: 0})}` : ''}</td>
                    <td className="py-1 px-2 text-right align-top">{!isEmptyRow && item.discount > 0 ? `$ ${item.discount.toLocaleString('es-MX', {minimumFractionDigits: 0, maximumFractionDigits: 0})}` : ''}</td>
                    <td className="py-1 px-2 text-right align-top font-semibold">{!isEmptyRow && total > 0 ? `$ ${total.toLocaleString('es-MX', {minimumFractionDigits: 0, maximumFractionDigits: 0})}` : ''}</td>
                  </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    );
  }


  // --- SCREEN VIEW ---
  const handleNumericChange = <T extends keyof Omit<LineItem, 'id' | 'description' | 'articleNumber'>>(id: string, field: T, value: string) => {
    const numValue = parseFloat(value);
    handleItemChange(id, field, isNaN(numValue) ? 0 : numValue);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeout(() => {
        e.target.scrollIntoView({ behavior: 'auto', block: 'center' });
    }, 350);
  };

  return (
    <div className="mt-6 print:mt-0">
      <div className="print:hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2 text-left font-bold border border-blue-700 w-12">Cant.</th>
                <th className="p-2 text-left font-bold border border-blue-700 w-28">Nº de artículo</th>
                <th className="p-2 text-left font-bold border border-blue-700">Descripción</th>
                <th className="p-2 text-left font-bold border border-blue-700 w-32">Precio por unidad</th>
                <th className="p-2 text-left font-bold border border-blue-700 w-28">Descuento</th>
                <th className="p-2 text-left font-bold border border-blue-700 w-32">Total</th>
                <th className="p-2 text-center font-bold border border-blue-700 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const total = (item.quantity * item.unitPrice) - item.discount;
                const isRowEditable = item.isEditable !== false;
                const isDescriptionEditable = item.isDescriptionEditable ?? isRowEditable;
                const isPriceEditable = item.isPriceEditable ?? isRowEditable;
                const isDeletable = item.isEditable !== false;
                const inputClass = "w-full p-2 bg-transparent focus:outline-none focus:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed";
                const priceInputClass = `${inputClass} pl-6 text-right`;
                
                return (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`}>
                    <td className="p-0 border border-gray-700"><input type="number" value={item.quantity || ''} onChange={(e) => handleNumericChange(item.id, 'quantity', e.target.value)} onFocus={handleInputFocus} className={inputClass} disabled={!isPriceEditable} /></td>
                    <td className="p-0 border border-gray-700"><input type="text" value={item.articleNumber} onChange={(e) => handleItemChange(item.id, 'articleNumber', e.target.value)} onFocus={handleInputFocus} className={inputClass} disabled={!isDescriptionEditable} /></td>
                    <td className="p-0 border border-gray-700"><input type="text" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} onFocus={handleInputFocus} className={inputClass} disabled={!isDescriptionEditable} /></td>
                    <td className="p-0 border border-gray-700">
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">$</span>
                        <input type="number" step="any" value={item.unitPrice || ''} onChange={(e) => handleNumericChange(item.id, 'unitPrice', e.target.value)} onFocus={handleInputFocus} className={priceInputClass} disabled={!isPriceEditable} />
                      </div>
                    </td>
                    <td className="p-0 border border-gray-700">
                      <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">$</span>
                          <input type="number" step="any" value={item.discount || ''} onChange={(e) => handleNumericChange(item.id, 'discount', e.target.value)} onFocus={handleInputFocus} className={priceInputClass} disabled={!isPriceEditable} />
                      </div>
                    </td>
                    <td className="p-2 border border-gray-700 text-right font-medium">${total.toFixed(2)}</td>
                    <td className="p-1 border border-gray-700 text-center">
                      {isDeletable && (
                        <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700 p-1">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {[...Array(Math.max(0, 18 - items.length))].map((_, i) => (
                <tr key={`placeholder-${i}`} className={`${(items.length + i) % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`} >
                    <td className="p-2 border border-gray-700 h-10">&nbsp;</td>
                    <td className="p-2 border border-gray-700"></td>
                    <td className="p-2 border border-gray-700"></td>
                    <td className="p-2 border border-gray-700"></td>
                    <td className="p-2 border border-gray-700"></td>
                    <td className="p-2 border border-gray-700"></td>
                    <td className="p-2 border border-gray-700"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {items.map((item) => {
            const total = (item.quantity * item.unitPrice) - item.discount;
            const isRowEditable = item.isEditable !== false;
            const isDescriptionEditable = item.isDescriptionEditable ?? isRowEditable;
            const isPriceEditable = item.isPriceEditable ?? isRowEditable;
            const isDeletable = item.isEditable !== false;
            const inputClass = "w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:bg-gray-600 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed";
            const priceInputClass = `${inputClass} pl-7`;

            return (
              <div key={item.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <input type="text" placeholder="Descripción" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} onFocus={handleInputFocus} className="w-full font-semibold text-white p-1 -ml-1 border-b border-gray-600 bg-transparent focus:outline-none focus:bg-gray-700 disabled:bg-transparent disabled:border-gray-800 disabled:text-gray-300" disabled={!isDescriptionEditable}/>
                    {isDeletable && ( <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700 p-1 ml-2 flex-shrink-0"><TrashIcon className="w-5 h-5" /></button>)}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div><label className="block text-gray-400 font-medium text-xs">Nº de artículo</label><input type="text" value={item.articleNumber} onChange={(e) => handleItemChange(item.id, 'articleNumber', e.target.value)} onFocus={handleInputFocus} className={inputClass} disabled={!isDescriptionEditable} /></div>
                    <div><label className="block text-gray-400 font-medium text-xs">Cant.</label><input type="number" value={item.quantity || ''} onChange={(e) => handleNumericChange(item.id, 'quantity', e.target.value)} onFocus={handleInputFocus} className={inputClass} disabled={!isPriceEditable} /></div>
                    <div><label className="block text-gray-400 font-medium text-xs">Precio unitario</label><div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span><input type="number" step="any" value={item.unitPrice || ''} onChange={(e) => handleNumericChange(item.id, 'unitPrice', e.target.value)} onFocus={handleInputFocus} className={priceInputClass} disabled={!isPriceEditable} /></div></div>
                    <div><label className="block text-gray-400 font-medium text-xs">Descuento</label><div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">$</span><input type="number" step="any" value={item.discount || ''} onChange={(e) => handleNumericChange(item.id, 'discount', e.target.value)} onFocus={handleInputFocus} className={priceInputClass} disabled={!isPriceEditable} /></div></div>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-700 text-right"><span className="text-gray-300">Total: </span><span className="font-bold text-lg text-white">${total.toFixed(2)}</span></div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={addItem} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors print:hidden">
        Añadir Fila
      </button>
    </div>
  );
};

export default ItemsTable;