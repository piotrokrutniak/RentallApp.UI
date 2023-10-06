export default function SearchBarResults({display, loading, results, fallbackMessage= "No results found."}:{
    display: boolean;
    loading: boolean;
    results?: any[];
    fallbackMessage?: string;
}){
    return(
        <div className="absolute bg-slate-500 z-20 rounded-md w-1/2 right-0 mt-2 h-44 shadow-md shadow-black/40 overflow-clip">
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
        <div className="p-3 hover:bg-sky-100/10">xd</div>
    )
}