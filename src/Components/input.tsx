import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export function Input({ label, id, ...rest }: InputProps) {
  return (
    <div className="block relative">
      <label
        htmlFor={id}
        className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
        {...rest} // A mágica para tornar o input flexível!
      />
    </div>
  );
}
