import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import FormField from "../molecules/Field";

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);

    return (
        <>
            <FormField 
                htmlForLabel="email"
                classNameLabel="block text-sm font-medium text-gray-700 mb-2"
                childrenLabel="Email"
                idInput="email"
                typeInput="text"
                placeholderInput="Email"
                valueInput={email}
                onChangeInput={(e) => setEmail(e.target.value)}
                classNameInput="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            />

            <FormField 
                htmlForLabel="password"
                classNameLabel="block text-sm font-medium text-gray-700 mb-2"
                childrenLabel="Confirm password"
                idInput="confirmPassword"
                typeInput={showConfirmPassword ? 'text' : 'password'}
                placeholderInput="Enter confirm password"
                valueInput={confirmPassword}
                onChangeInput={(e) => setConfirmPassword(e.target.value)}
                classNameInput="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                typeButton="button"
                onClickButton={() => setConfirmShowPassword(!showConfirmPassword)}
                classNameButton="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                childrenButton={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                isPasswordField={true}
            />
        </>
    );
}