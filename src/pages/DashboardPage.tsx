import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, BookOpen } from 'lucide-react';

export default function DashboardPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Header */}
            <div className="border-b border-slate-100 px-8 py-6 flex justify-between items-center max-w-6xl mx-auto">
                <h1 className="text-2xl font-extrabold text-[#1a2332]">
                    Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm"
                >
                    <LogOut size={16} />
                    Sair
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-8 pt-10">
                <h2 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-6">
                    Acesso Rápido
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Card 1: Cadastro de Binômio */}
                    <button 
                        onClick={() => navigate('/cadastro-mae')}
                        className="flex flex-col items-start p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all text-left group"
                    >
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-xl mb-6 group-hover:scale-105 transition-transform">
                            <Users size={24} />
                        </div>
                        <h3 className="text-[15px] font-bold text-slate-800 mb-2">Cadastro de Binômio</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Registre dados de mães e bebês no sistema
                        </p>
                    </button>

                    {/* Card 2: Gerenciar Conteúdo */}
                    <button 
                        onClick={() => navigate('/gerenciar-conteudo')}
                        className="flex flex-col items-start p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all text-left group"
                    >
                        <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl mb-6 group-hover:scale-105 transition-transform">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-[15px] font-bold text-slate-800 mb-2">Gerenciar Conteúdo</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Crie e publique artigos e recomendações para mães
                        </p>
                    </button>

                </div>
            </div>
        </div>
    );
}
