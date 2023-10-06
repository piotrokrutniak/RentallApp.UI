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
                <Result/>
                <Result/>
                <Result/>
                <Result/>
                <Result/>
                <Result/>
                <Result/>
                <Result/>
            </div>
        </div>
    )
}

function Result(){
    return(
        <div className="p-3 hover:bg-slate-900/20 cursor-pointer">xd</div>
    )
}