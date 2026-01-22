import MotherRegistrationForm from '../organisms/MotherRegistrationForm';

export default function MotherRegistrationPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Cadastro de Mãe e Bebê
                    </h1>
                    <p className="text-gray-600">
                        Preencha as informações abaixo para realizar o cadastro do binômio mãe-bebê.
                    </p>
                </div>

                <MotherRegistrationForm />
            </div>
        </div>
    );
}
