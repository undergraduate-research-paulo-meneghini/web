import React from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    id?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    className?: string;
    required?: boolean;
    options: SelectOption[];
    placeholder?: string;
}

export default function Select({ options, placeholder, ...props }: SelectProps) {
    return (
        <select {...props}>
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
