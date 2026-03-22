import React from 'react';
import { Check } from 'lucide-react';

interface Step {
    number: number;
    title: string;
}

interface FormStepIndicatorProps {
    currentStep: number;
    steps: Step[];
}

export default function FormStepIndicator({ currentStep, steps }: FormStepIndicatorProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center flex-1">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${step.number < currentStep
                                        ? 'bg-green-500 text-white'
                                        : step.number === currentStep
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {step.number < currentStep ? (
                                    <Check size={20} />
                                ) : (
                                    step.number
                                )}
                            </div>
                            <span
                                className={`mt-2 text-xs text-center font-medium ${step.number === currentStep
                                        ? 'text-blue-600'
                                        : step.number < currentStep
                                            ? 'text-green-600'
                                            : 'text-gray-500'
                                    }`}
                            >
                                {step.title}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`h-1 flex-1 mx-2 transition-colors ${step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
