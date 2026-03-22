import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface FormFieldProps {
    htmlForLabel?: string;
    classNameLabel?: string;
    childrenLabel?: React.ReactNode;
    idInput?: string;
    typeInput?: string;
    placeholderInput?: string;
    valueInput?: string | number;
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
    classNameInput?: string;
    typeButton?: "submit" | "reset" | "button";
    onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
    classNameButton?: string;
    childrenButton?: React.ReactNode;
    isPasswordField?: boolean;
    required?: boolean;
}

export default function FormField({
    htmlForLabel,
    classNameLabel,
    childrenLabel,
    idInput,
    typeInput,
    placeholderInput,
    valueInput,
    onChangeInput,
    classNameInput,
    typeButton,
    onClickButton,
    classNameButton,
    childrenButton,
    isPasswordField = false,
    required = false
}: FormFieldProps) {

    return (
        <div>
            <Label htmlFor={htmlForLabel} className={classNameLabel}>
                {childrenLabel}
            </Label>
            <div className="relative">
                <Input
                    id={idInput}
                    type={typeInput}
                    placeholder={placeholderInput}
                    value={valueInput}
                    onChange={onChangeInput}
                    className={classNameInput}
                    required={required}
                />
                {isPasswordField && (
                    <Button
                        type={typeButton}
                        onClick={onClickButton}
                        className={classNameButton}
                    >
                        {childrenButton}
                    </Button>
                )}
            </div>
        </div>
    );
}