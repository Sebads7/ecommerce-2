"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;

  disabled?: boolean;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register?.(id, { required })}
        placeholder=""
        className={`
        peer 
        w-full 
        p-4 
        pt-6 
        max-h-[150px]
        min-h-[150px]
        outline-none 
        bg-white 
        font-light 
        border-2 
        rounded-md 
        transition 
        disabled:opacity-70 
        disabled:cursor-not-allowed" 
        ${errors[id] ? "border-red-500" : "border-slate-300"}
        ${errors[id] ? "text-red-400" : "focus:border-slate-300"}`}
      />
      <label
        htmlFor={id}
        className={`
        absolute 
        cursor-text 
        duration-150 
        transform -translate-y-4
        top-5 
        z-10 
        origin-[0] 
        left-4 
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 
        peer-focus:-translate-y-4

       ${errors[id] ? "border-red-500" : "text-slate-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
