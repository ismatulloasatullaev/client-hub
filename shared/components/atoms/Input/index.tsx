import { ChangeEvent, MouseEventHandler } from "react"
import cn from "classnames"

interface InputProps {
    className?: string
    name?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string

    size?: "sm" | "md"
    hint?: string
    maxLength?: number
    type?: "text" | "email" | "number"
    value?: string
    onClick?: () => void
    readOnly?: boolean
}

export const Input = ({
    value,
    className,
    name,
    onChange,
    size = "sm",
    placeholder,
    hint,
    maxLength,
    type = "text",
    readOnly = false,
    onClick
}: InputProps) => {
    const classes = cn(
        "bg-gray-100 px-[20px] border border-gray-200 rounded-[10px] outline-none",
        "transition-all focus:bg-blue-pale focus:border-blue",
        {
            "py-[13px] text-[14px]": size === "sm",
            "py-[18px] text-[16px]": size === "md",
            "cursor-pointer": readOnly
        },
        className
    )

    return (
        <div className={"flex flex-col"}>
            {hint && (
                <span
                    className={
                        "ml-4 mb-[4px] text-[16px] text-gray-400 font-semibold"
                    }>
                    {hint}
                </span>
            )}
            <input
                readOnly={readOnly}
                onClick={onClick}
                value={value}
                type={type}
                maxLength={maxLength}
                spellCheck={false}
                placeholder={placeholder}
                className={classes}
                name={name}
                onChange={onChange}
            />
        </div>
    )
}
