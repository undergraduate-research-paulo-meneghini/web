import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

export default function HomePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    const handleMotherRegistration = () => {
        navigate('/cadastro-mae');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
                            {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Bem-vindo!
                    </h1>

                    <p className="text-xl text-gray-700 mb-8">
                        {user?.name || user?.email?.split('@')[0] || 'Usuário'}
                    </p>

                    <div className="space-y-3">
                        <Button
                            onClick={handleMotherRegistration}
                            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                        >
                            Cadastro de Mãe
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                        >
                            Sair
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
