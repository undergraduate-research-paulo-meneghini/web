import { X, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Button from '../atoms/Button';
import type { UserCredentials } from '../types/binomio.types';

interface CredentialsModalProps {
    credentials: UserCredentials;
    onClose: () => void;
}

export default function CredentialsModal({ credentials, onClose }: CredentialsModalProps) {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

    const copyToClipboard = async (text: string, type: 'email' | 'password') => {
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'email') {
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
            } else {
                setCopiedPassword(true);
                setTimeout(() => setCopiedPassword(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        ✅ Cadastro realizado com sucesso!
                    </h2>
                    <p className="text-gray-600">
                        Suas credenciais de acesso foram geradas
                    </p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700 font-semibold">
                                ⚠️ Anote essas informações!
                            </p>
                            <p className="text-xs text-yellow-600 mt-1">
                                A senha será exibida apenas uma vez e não poderá ser recuperada depois.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📧 Email
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value={credentials.email}
                                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-mono text-sm"
                            />
                            <button
                                onClick={() => copyToClipboard(credentials.email, 'email')}
                                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                title="Copiar email"
                            >
                                {copiedEmail ? <CheckCircle size={20} /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            🔑 Senha
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value={credentials.senha}
                                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-mono text-lg font-bold"
                            />
                            <button
                                onClick={() => copyToClipboard(credentials.senha, 'password')}
                                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                title="Copiar senha"
                            >
                                {copiedPassword ? <CheckCircle size={20} /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Como usar:</strong> Use essas credenciais para fazer login no aplicativo móvel e acompanhar o desenvolvimento do seu bebê.
                    </p>
                </div>

                <div className="mt-6">
                    <Button
                        onClick={onClose}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                        Entendi, anotei as credenciais
                    </Button>
                </div>
            </div>
        </div>
    );
}
