import { useAuth } from "../contexts/AuthContext";
import Button from "../atoms/Button";

export default function DashboardPage() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <Button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Welcome back!
                    </h2>
                    {user && (
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                <span className="font-medium">Email:</span> {user.email}
                            </p>
                            {user.name && (
                                <p className="text-gray-600">
                                    <span className="font-medium">Name:</span> {user.name}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
