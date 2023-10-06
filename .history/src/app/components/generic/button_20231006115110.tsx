import { MouseEventHandler } from "react";

export default function Button({ children, className, onClick, disabled=false } : { children: React.ReactNode, className: string, onClick?: undefined | MouseEventHandler<HTMLButtonElement>, disabled?: boolean }){
    return(
        <button className={`${disabled ? "bg-slate-500 cursor-not-allowed" : "bg-blue-500 hover:bg-opacity-100 cursor-pointer"} ${className} px-5 py-3 rounded-lg bg-opacity-90 active:bg-opacity-80 transition-all flex items-center gap-2 place-items-center`}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    )
}