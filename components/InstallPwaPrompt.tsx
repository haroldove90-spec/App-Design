
import React from 'react';
import Logo from './Logo';

interface InstallPwaPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

const InstallPwaPrompt: React.FC<InstallPwaPromptProps> = ({ onInstall, onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 m-4 max-w-sm w-full text-center transform transition-all animate-slide-up">
        <div className="mx-auto mb-6 flex justify-center">
            <Logo className="h-20 rounded-lg shadow-inner" />
        </div>
        <h2 id="install-title" className="text-2xl font-bold text-white mb-2">Instalar App Design</h2>
        <p className="text-gray-300 mb-6">
          Añade App Design a tu pantalla de inicio para un acceso rápido y sin conexión.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onInstall}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 transform hover:scale-105"
          >
            Instalar
          </button>
          <button
            onClick={onDismiss}
            className="w-full bg-gray-700 text-gray-200 font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-colors duration-200"
          >
            Más tarde
          </button>
        </div>
      </div>
       <style>
        {`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slide-up {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
        `}
       </style>
    </div>
  );
};

export default InstallPwaPrompt;
