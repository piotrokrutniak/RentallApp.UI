import { BsArrowClockwise } from "react-icons/bs";

export default function SearchBarResults({display, loading=false, results=[], fallbackMessage= "No results found.", onClick}:{
    display: boolean;
    loading?: boolean;
    results?: any[];
    fallbackMessage?: string;
    onClick?: (value: string) => void;
}){
    function handleClick(value: string){
        return onClick ? onClick(value) : undefined 
    }

    return(
        <div className={`${display ? "" : "hidden"} absolute bg-slate-600 z-20 rounded-md w-1/2 right-0 mt-2 h-44 shadow-md shadow-black/40 overflow-clip`}>
            <div className="overflow-y-scroll h-44">
                {loading ? 
                (<p className="flex">Loading... <BsArrowClockwise className="animate-spin h-2"/></p>):
                (results.length > 0 && !loading ? results.map(x => <Result text={x} onClick={handleClick}/>) : <p className="p-3">No results found.</p>)}
            </div>
        </div>
    )
}

function Result({onClick, value = "", text}:{
    onClick: (value: string) => void;
    value?: string;
    text: string;
}){
    value = value || text

    return(
        <div className="p-3 hover:bg-slate-900/20 cursor-pointer" onClick={() => onClick(value)}>{text}</div>
    )
}