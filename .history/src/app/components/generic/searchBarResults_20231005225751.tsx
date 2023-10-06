export default function SearchBarResults({display, loading, results, fallbackMessage= "No results found.", onClick}:{
    display: boolean;
    loading: boolean;
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
                <Result text="Model X" onClick={handleClick}/>
                <Result text="Model S" onClick={handleClick}/>
                <Result text="Model Y" onClick={handleClick}/>
                <Result text="Model Roadster" onClick={handleClick}/>
            </div>
        </div>
    )
}

function Result({onClick, value = "", text}:{
    onClick: (value: string) => void;
    value?: string;
    text: string;
}){
    return(
        <div className="p-3 hover:bg-slate-900/20 cursor-pointer" onClick={() => onClick(value)}>{text}</div>
    )
}