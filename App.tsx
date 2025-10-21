import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { InvoiceData, LineItem, HistoryItem } from './types';
import InvoiceForm from './components/InvoiceForm';
import History from './components/History';
import PrintableInvoice from './components/PrintableInvoice';
import InstallPwaPrompt from './components/InstallPwaPrompt';

// --- ICONS ---
const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /> </svg> );
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}> <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /> </svg> );
const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /> </svg> );
const WebIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}> <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /> </svg> );
const StoreIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}> <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75-.75zM13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21" /> <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125h-17.25A1.125 1.125 0 012.25 10.125V6.75z" /> </svg> );
const MiscIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}> <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.47 2.118 2.25 2.25 0 0 0-2.47-2.118c-.113.028-.227.051-.344.075m6.238-9.422c.042-.02.082-.041.122-.061a6 6 0 0 1 7.42 0a6 6 0 0 0 7.42 0c.04.02.08.041.122.061M3 12c0-1.148.645-2.166 1.6-2.67M21 12a9.753 9.753 0 0 0-4.592-4.592M3 12a9.753 9.753 0 0 1 4.592-4.592m13.816 4.592c.321.124.63.26.927.401M3 12a9.75 9.75 0 0 1 .927-.401" /> </svg> );
const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> );

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string,
  }>;
  prompt(): Promise<void>;
}

type TemplateData = Omit<InvoiceData, 'date' | 'receiptNumber' | 'anticipo'>;
const getCurrentDate = () => { const today = new Date(); const day = String(today.getDate()).padStart(2, '0'); const month = String(today.getMonth() + 1).padStart(2, '0'); const year = String(today.getFullYear()).slice(-2); return `${day}/${month}/${year}`; };
const getCurrentFolio = () => { const savedFolio = localStorage.getItem('invoiceFolio'); return savedFolio ? parseInt(savedFolio, 10) : 3000; };

const newBankAccountInfo = 'Banorte\nClabe: 072580011951023424\nTarjeta: 4915 6695 2338 7353\nHarold Anguiano Morales';

const webPageTemplateData: TemplateData = { soldTo: '', paymentMethod: 'Transferencia', paymentConditions: '50% de Anticipo. Restante el dia de la entrega.', bankAccount: newBankAccountInfo, items: [ { id: '', quantity: 1, articleNumber: 'WEB-01', description: 'Diseño de página web', unitPrice: 2900, discount: 0, isEditable: false, isPriceEditable: true }, { id: '', quantity: 1, articleNumber: 'WEB-02', description: 'Dominio:', unitPrice: 0, discount: 0, isEditable: false, isDescriptionEditable: true }, { id: '', quantity: 1, articleNumber: '', description: 'Hospedaje web 1 año', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Cuenta de correo corporativo sin límite', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'SSL Certificado de seguridad', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Botón flotante WhatsApp', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Botón flotante teléfono', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Formulario de contacto', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Integración a redes sociales', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Alta de página web en Google', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Actualizaciones menores 1 año', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Soporte técnico 1 año', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Renovación al año $1950 (Incluye por 1 año más todos los conceptos mencionados anteriormente)', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: '', unitPrice: 0, discount: 0, isEditable: true } ] };
const onlineStoreTemplateData: TemplateData = { soldTo: '', paymentMethod: 'Transferencia', paymentConditions: '50% de Anticipo. Restante el dia de la entrega.', bankAccount: newBankAccountInfo, items: [ { id: '', quantity: 1, articleNumber: 'ECOMM-01', description: 'Tienda en línea ( Portal )', unitPrice: 3900, discount: 0, isEditable: false, isPriceEditable: true }, { id: '', quantity: 1, articleNumber: 'WEB-02', description: 'Dominio:', unitPrice: 0, discount: 0, isEditable: false, isDescriptionEditable: true }, { id: '', quantity: 1, articleNumber: '', description: 'Hospedaje web 1 año', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Cuenta de correo corporativo sin límite', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'SSL Certificado de seguridad', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Botón flotante WhatsApp', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Botón flotante teléfono', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Formulario de contacto', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Integración a redes sociales', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Alta de página web en Google', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Actualizaciones menores 1 año', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Soporte técnico 1 año', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Carrito de compras', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Plataforma de cobro (PayPal, Mercadopago, Stripe - Otros)', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Panel de administración', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Capacitación (Tutoriales, Videotutoriales, etc)', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: 'Renovación al año $1950 (Incluye por 1 año más todos los conceptos mencionados anteriormente)', unitPrice: 0, discount: 0, isEditable: false }, { id: '', quantity: 1, articleNumber: '', description: '', unitPrice: 0, discount: 0, isEditable: true } ] };
const miscellaneousTemplateData: TemplateData = { soldTo: '', paymentMethod: 'Transferencia', paymentConditions: '50% de Anticipo. Restante el dia de la entrega.', bankAccount: newBankAccountInfo, items: [ { id: '', quantity: 1, articleNumber: '', description: '', unitPrice: 0, discount: 0, isEditable: true }, { id: '', quantity: 1, articleNumber: '', description: '', unitPrice: 0, discount: 0, isEditable: true }, { id: '', quantity: 1, articleNumber: '', description: '', unitPrice: 0, discount: 0, isEditable: true } ] };

const createInvoiceFromTemplate = (template: TemplateData, folio: number): InvoiceData => {
    return { ...template, items: template.items.map(item => ({ ...item, id: crypto.randomUUID() })), date: getCurrentDate(), receiptNumber: folio.toString(), anticipo: 0 };
}

const parseDate = (dateStr: string) => { const [day, month, year] = dateStr.split('/').map(Number); return new Date(2000 + year, month - 1, day); };

// --- DASHBOARD COMPONENT ---
const Dashboard: React.FC<{ history: HistoryItem[]; onNewInvoice: (template: TemplateData) => void }> = ({ history, onNewInvoice }) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfToday.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const salesToday = history.filter(h => parseDate(h.date) >= startOfToday).reduce((sum, h) => sum + h.total, 0);
    const salesThisWeek = history.filter(h => parseDate(h.date) >= startOfWeek).reduce((sum, h) => sum + h.total, 0);
    const salesThisMonth = history.filter(h => parseDate(h.date) >= startOfMonth).reduce((sum, h) => sum + h.total, 0);
    const salesThisYear = history.filter(h => parseDate(h.date) >= startOfYear).reduce((sum, h) => sum + h.total, 0);

    const monthlySalesData = useMemo(() => {
        const data = Array(6).fill(0);
        const monthLabels: string[] = [];
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(currentYear, currentMonth - i, 1);
            const month = date.getMonth();
            const year = date.getFullYear();
            monthLabels.push(date.toLocaleString('es-MX', { month: 'short' }).replace('.', ''));
            
            const monthSales = history
                .filter(h => {
                    const invoiceDate = parseDate(h.date);
                    return invoiceDate.getMonth() === month && invoiceDate.getFullYear() === year;
                })
                .reduce((sum, h) => sum + h.total, 0);
            data[5 - i] = monthSales;
        }
        return { labels: monthLabels, values: data };
    }, [history]);

    const maxSale = Math.max(...monthlySalesData.values, 1);

    const StatCard: React.FC<{ title: string; amount: number }> = ({ title, amount }) => (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex-1 min-w-[120px]">
            <h3 className="text-sm text-gray-400 font-medium">{title}</h3>
            <p className="text-2xl font-bold text-white mt-1">${amount.toLocaleString('es-MX')}</p>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-200 w-full text-center mb-6">Panel de Ventas</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard title="Hoy" amount={salesToday} />
                <StatCard title="Esta Semana" amount={salesThisWeek} />
                <StatCard title="Este Mes" amount={salesThisMonth} />
                <StatCard title="Este Año" amount={salesThisYear} />
            </div>
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">Resumen de Ventas (Últimos 6 meses)</h2>
                <div className="h-64 w-full">
                    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                        <g className="graph-grid">
                            {[0, 0.25, 0.5, 0.75, 1].map(v => (
                                <line key={v} x1="25" x2="400" y1={180 - v * 170} stroke="#4A5568" strokeWidth="0.5" strokeDasharray="2,2" />
                            ))}
                        </g>
                        {monthlySalesData.values.map((value, index) => {
                            const barHeight = (value / maxSale) * 170;
                            return (
                                <rect key={index} x={35 + index * (360 / 6)} y={180 - barHeight} width="30" height={barHeight} fill="#2563EB" className="transition-all duration-300 hover:fill-blue-400" />
                            );
                        })}
                        {monthlySalesData.labels.map((label, index) => (
                             <text key={label} x={50 + index * (360 / 6)} y="195" fill="#A0AEC0" fontSize="10" textAnchor="middle" className="capitalize">{label}</text>
                        ))}
                        <line x1="25" x2="25" y1="10" y2="180" stroke="#4A5568" strokeWidth="1" />
                        <line x1="25" x2="400" y1="180" y2="180" stroke="#4A5568" strokeWidth="1" />
                    </svg>
                </div>
            </div>
            <div className="mb-8 p-4 bg-gray-900 rounded-xl print:hidden">
                <h2 className="text-lg font-semibold text-white mb-4 text-center">Crear Nuevo Recibo de Ventas</h2>
                <div className="flex flex-wrap justify-center gap-2" role="group">
                    <button onClick={() => onNewInvoice(webPageTemplateData)} className="transition-all duration-200 text-gray-300 hover:bg-gray-700 bg-gray-800 hover:text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 w-full sm:w-auto flex-grow"><WebIcon className="w-5 h-5" />Página Web</button>
                    <button onClick={() => onNewInvoice(onlineStoreTemplateData)} className="transition-all duration-200 text-gray-300 hover:bg-gray-700 bg-gray-800 hover:text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 w-full sm:w-auto flex-grow"><StoreIcon className="w-5 h-5" />Tienda en Línea</button>
                    <button onClick={() => onNewInvoice(miscellaneousTemplateData)} className="transition-all duration-200 text-gray-300 hover:bg-gray-700 bg-gray-800 hover:text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 w-full sm:w-auto flex-grow"><MiscIcon className="w-5 h-5" />Varios</button>
                </div>
            </div>
        </div>
    );
}

// --- MAIN APP COMPONENT ---
function App() {
  const [folio, setFolio] = useState(getCurrentFolio);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(() => createInvoiceFromTemplate(miscellaneousTemplateData, folio));
  const [history, setHistory] = useState<HistoryItem[]>(() => { const savedHistory = localStorage.getItem('invoiceHistory'); return savedHistory ? JSON.parse(savedHistory) : []; });
  const [currentView, setCurrentView] = useState<'dashboard' | 'form'>('dashboard');
  const [generatedPdfFile, setGeneratedPdfFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    if (window.matchMedia('(display-mode: standalone)').matches) {
        return;
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        setInstallPrompt(null);
    });
  };

  const handleDismissInstall = () => {
    setInstallPrompt(null);
  };

  useEffect(() => { localStorage.setItem('invoiceHistory', JSON.stringify(history)); }, [history]);
  
  useEffect(() => {
    if (currentView === 'form') {
      window.scrollTo(0, 0);
    }
  }, [currentView]);

  const subtotal = useMemo(() => { return invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice) - item.discount, 0); }, [invoiceData.items]);
  const [restante, setRestante] = useState(0);

  useEffect(() => {
    if (invoiceData.anticipo <= 0) {
      setRestante(subtotal);
    }
  }, [subtotal]);

  const handleInputChange = (field: keyof Omit<InvoiceData, 'items' | 'anticipo'>, value: string) => { setInvoiceData(prev => ({ ...prev, [field]: value })); };
  
  const handleAnticipoChange = (value: string) => {
    const numValue = parseFloat(value);
    const newAnticipo = isNaN(numValue) ? 0 : numValue;
    setInvoiceData(prev => ({ ...prev, anticipo: newAnticipo }));
    setRestante(subtotal - newAnticipo);
  };

  const handleRestanteChange = (value: string) => {
    const numValue = parseFloat(value);
    setRestante(isNaN(numValue) ? 0 : numValue);
  };

  const handleItemChange = (id: string, field: keyof Omit<LineItem, 'id'>, value: string | number) => { setInvoiceData(prev => ({ ...prev, items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item), })); };
  const addItem = () => { const newItem: LineItem = { id: crypto.randomUUID(), quantity: 1, articleNumber: '', description: '', unitPrice: 0, discount: 0, isEditable: true }; setInvoiceData(prev => ({ ...prev, items: [...prev.items, newItem] })); };
  const deleteItem = (id: string) => { setInvoiceData(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id), })); };
  
  const updateHistory = (currentInvoice: InvoiceData, total: number, restante: number) => {
    setHistory(prevHistory => {
        const existingIndex = prevHistory.findIndex(inv => inv.receiptNumber === currentInvoice.receiptNumber);
        const newHistoryItem: HistoryItem = { ...currentInvoice, total, restante };
        if (existingIndex > -1) {
            const updatedHistory = [...prevHistory]; updatedHistory[existingIndex] = newHistoryItem; return updatedHistory;
        }
        return [...prevHistory, newHistoryItem].sort((a, b) => parseInt(b.receiptNumber, 10) - parseInt(a.receiptNumber, 10));
    });
  };

  const handleNewInvoice = (template: TemplateData) => {
      const newInvoice = createInvoiceFromTemplate(template, folio);
      setInvoiceData(newInvoice);
      setGeneratedPdfFile(null);
      setCurrentView('form');
  };
  
  const generateAndPreparePdf = (targetInvoiceData: InvoiceData, restanteForPdf: number): Promise<File | null> => {
    return new Promise((resolvePromise) => {
      const printContainer = document.createElement('div');
      printContainer.style.position = 'absolute';
      printContainer.style.left = '-9999px';
      printContainer.style.top = '0';
      document.body.appendChild(printContainer);

      const root = ReactDOM.createRoot(printContainer);

      const cleanUp = () => {
        root.unmount();
        if (document.body.contains(printContainer)) {
            document.body.removeChild(printContainer);
        }
      };
      
      const generate = async () => {
        const elementToRender = printContainer.firstElementChild;
        if (!elementToRender) {
          cleanUp();
          resolvePromise(null);
          return;
        }

        const sanitizedClientName = targetInvoiceData.soldTo.trim().replace(/\s+/g, '_').replace(/[^\w-]/g, '');
        const clientNameForFile = sanitizedClientName || 'Cliente';
        const fileName = `ReciboDeVentas-${clientNameForFile}-${targetInvoiceData.receiptNumber}.pdf`;
        
        const opt = { 
            margin: 0, 
            filename: fileName, 
            image: { type: 'jpeg', quality: 0.98 }, 
            html2canvas:  { scale: 2, useCORS: true }, 
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } 
        };

        try {
            // @ts-ignore
            const pdfBlob = await html2pdf().set(opt).from(elementToRender).output('blob');
            const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
            resolvePromise(file);
        } catch (error) {
            console.error("PDF Generation failed", error);
            resolvePromise(null);
        } finally {
            cleanUp();
        }
      };

      root.render(
        <PrintableInvoice 
          invoiceData={targetInvoiceData} 
          restante={restanteForPdf}
          onRendered={generate}
        />
      );
    });
  };

  const handleGeneratePdf = async () => {
      setIsGenerating(true);
      const file = await generateAndPreparePdf(invoiceData, restante);
      if (file) {
          setGeneratedPdfFile(file);
          
          const link = document.createElement('a');
          const url = URL.createObjectURL(file);
          link.href = url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          updateHistory(invoiceData, subtotal, restante);
          const nextFolio = folio + 1;
          setFolio(nextFolio);
          localStorage.setItem('invoiceFolio', nextFolio.toString());
      }
      setIsGenerating(false);
  };

  const handleShare = async () => {
      if (!generatedPdfFile) return;
      const shareData = { files: [generatedPdfFile], title: `Recibo de Ventas ${invoiceData.receiptNumber}`, text: `Aquí está el recibo de ventas para ${invoiceData.soldTo}.` };
      if (navigator.canShare && navigator.canShare(shareData)) {
          try {
              await navigator.share(shareData);
          } catch (error) {
              console.error("Sharing failed", error);
          }
      } else {
          alert('Tu navegador no soporta la función de compartir archivos.');
      }
  };

  const shareInvoiceFromHistory = async (receiptNumber: string) => {
      setIsGenerating(true);
      const invoiceToShare = history.find(inv => inv.receiptNumber === receiptNumber);

      if (!invoiceToShare) {
          setIsGenerating(false);
          return;
      }
      
      const subtotalForHistoryItem = invoiceToShare.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice) - item.discount, 0);
      const restanteForHistoryItem = invoiceToShare.restante !== undefined ? invoiceToShare.restante : (subtotalForHistoryItem - invoiceToShare.anticipo);
      
      const file = await generateAndPreparePdf(invoiceToShare, restanteForHistoryItem);
      
      if (file) {
          try {
              const shareData = { files: [file], title: `Recibo de Ventas ${invoiceToShare.receiptNumber}`, text: `Aquí está el recibo de ventas para ${invoiceToShare.soldTo}.` };
              if (navigator.canShare && navigator.canShare(shareData)) {
                  await navigator.share(shareData);
              } else {
                  alert('Tu navegador no soporta la función de compartir archivos.');
              }
          } catch (error) { console.error("Sharing from history failed", error); }
      }
      setIsGenerating(false);
  };


  const loadFromHistory = (receiptNumber: string) => {
    const invoiceToLoad = history.find(inv => inv.receiptNumber === receiptNumber);
    if (invoiceToLoad) { 
        const { total, restante: loadedRestante, ...invoiceState } = invoiceToLoad; 
        setInvoiceData(invoiceState);
        const loadedSubtotal = invoiceState.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice) - item.discount, 0);
        setRestante(loadedRestante !== undefined ? loadedRestante : (loadedSubtotal - invoiceState.anticipo));
        setGeneratedPdfFile(null);
        setCurrentView('form');
    }
  };

  const deleteFromHistory = (receiptNumber: string) => { if (window.confirm(`¿Estás seguro que quieres borrar el recibo ${receiptNumber}?`)) { setHistory(prev => prev.filter(inv => inv.receiptNumber !== receiptNumber)); } };
  
  const returnToDashboard = () => { 
      setGeneratedPdfFile(null);
      setCurrentView('dashboard'); 
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white p-4 sm:p-8 print:p-0 pb-32">
          <div className="max-w-4xl mx-auto">
            {currentView === 'dashboard' ? (
                <>
                  <Dashboard history={history} onNewInvoice={handleNewInvoice} />
                  <History history={history} loadInvoice={loadFromHistory} deleteInvoice={deleteFromHistory} shareInvoice={shareInvoiceFromHistory} />
                </>
            ) : (
              <InvoiceForm 
                  invoiceData={invoiceData}
                  handleInputChange={handleInputChange}
                  handleAnticipoChange={handleAnticipoChange}
                  handleRestanteChange={handleRestanteChange}
                  handleItemChange={handleItemChange}
                  addItem={addItem}
                  deleteItem={deleteItem}
                  restante={restante}
                  returnToDashboard={returnToDashboard}
              />
            )}
          </div>
          
          {currentView === 'form' && (
            <footer className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-2 print:hidden z-50">
                <div className="max-w-4xl mx-auto flex justify-around items-center gap-2">
                    <button onClick={returnToDashboard} className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-200 text-xs w-20 h-16 justify-center rounded-lg hover:bg-gray-700">
                        <DashboardIcon className="w-6 h-6 mb-1"/>
                        <span>Panel</span>
                    </button>
                    
                    {!generatedPdfFile ? (
                        <button onClick={handleGeneratePdf} disabled={isGenerating} className="flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-transform duration-200 hover:scale-105 flex-grow sm:flex-grow-0 disabled:bg-green-800 disabled:cursor-not-allowed">
                            {isGenerating ? <SpinnerIcon className="animate-spin w-6 h-6" /> : <DownloadIcon className="w-6 h-6"/>}
                            <span>Generar PDF</span>
                        </button>
                    ) : (
                        <button onClick={handleShare} className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform duration-200 hover:scale-105 flex-grow sm:flex-grow-0">
                            <ShareIcon className="w-6 h-6"/>
                            <span>Compartir</span>
                        </button>
                    )}

                    <div className="w-20"></div>

                </div>
            </footer>
          )}

          {isGenerating && currentView === 'dashboard' && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
                <SpinnerIcon className="animate-spin w-12 h-12 text-white mb-4" />
                <p className="text-white text-lg">Generando PDF para compartir...</p>
            </div>
          )}
          
          {installPrompt && (
              <InstallPwaPrompt 
                  onInstall={handleInstall}
                  onDismiss={handleDismissInstall}
              />
          )}
      </div>
      <style>
        {` @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .print\\:hidden { display: none; } .print\\:p-0 { padding: 0; } @page { size: letter; margin: 0; } } `}
      </style>
    </>
  );
}

export default App;