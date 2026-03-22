import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff } from 'lucide-react';
import FormField from "../molecules/Field";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
    error?: string;
}

export default function LoginForm({ onSubmit, error }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            <FormField
                htmlForLabel="email"
                classNameLabel="block text-sm font-medium text-gray-700 mb-2"
                childrenLabel="Login"
                idInput="email"
                typeInput="email"
                placeholderInput="Email"
                valueInput={email}
                onChangeInput={(e) => setEmail(e.target.value)}
                classNameInput="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <FormField
                htmlForLabel="password"
                classNameLabel="block text-sm font-medium text-gray-700 mb-2"
                childrenLabel="Password"
                idInput="password"
                typeInput={showPassword ? 'text' : 'password'}
                placeholderInput="Enter password"
                valueInput={password}
                onChangeInput={(e) => setPassword(e.target.value)}
                classNameInput="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                typeButton="button"
                onClickButton={() => setShowPassword(!showPassword)}
                classNameButton="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                childrenButton={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                isPasswordField={true}
                required
            />
        </form>
    );
}