import React from "react";

interface CheckboxProps {
    id?: string;
    checked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    label?: string;
    value?: string;
}

export default function Checkbox({ label, ...props }: CheckboxProps) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" {...props} className={`rounded ${props.className || ''}`} />
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
}
