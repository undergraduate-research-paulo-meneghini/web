import Button from "../atoms/Button";
import RegisterForm from "../organisms/RegisterForm";
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Sign up now
                </h1>

                <div className="space-y-6">
                    <RegisterForm />


                    <Button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        children="Sign up now"
                    />

                    <p className="text-center text-sm text-gray-600">
                        Do you have an account?{' '}
                        <Button 
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            onClick={() => navigate('/')}
                            children="Sign in"
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}