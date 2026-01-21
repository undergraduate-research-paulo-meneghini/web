import React from "react";

interface InputProps {
    id?: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    required?: boolean;
}

export default function Input({ ...props }: InputProps) {
    return (
        <input
            {...props}
        />
    );
}