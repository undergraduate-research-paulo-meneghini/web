import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import LoginForm from "../organisms/LoginForm";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();
    const [error, setError] = useState<string>('');

    const handleLogin = async (email: string, password: string) => {
        try {
            setError('');
            await login(email, password);
            // Redirect to home after successful login
            navigate('/');
        } catch (err: any) {
            // Handle login errors
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Failed to login. Please check your credentials.';
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Nice to see you again
                </h1>

                <div className="space-y-6">
                    <LoginForm
                        onSubmit={handleLogin}
                        error={error}
                    />

                    <div className="flex items-center justify-between">
                        <Button
                            className="text-sm text-blue-600 hover:text-blue-700"
                            children="Forgot password?"
                        />
                    </div>

                    <Button
                        type="submit"
                        form="login-form"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Button
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            onClick={() => navigate('/register')}
                            children="Sign up now"
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}