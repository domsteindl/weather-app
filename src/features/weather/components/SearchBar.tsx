import {useState} from "react";
import type { SubmitEventHandler } from "react";

{/* https://api.openweathermap.org/geo/1.0/direct?q={city}&appid=848273ef355b2f00114d6d67927fcfee */}

type Props = {
    onSearch: (city: string) => void;
};

export default function Searchbar({onSearch} : Props) {
    const [input, setInput] = useState("");

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSearch(input)
    };
    return (
        <form onSubmit={handleSubmit}>
        <input
            type="search"
        value={input}
        onChange={(e) => {setInput(e.target.value)}}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"/>


        </form>
    )


}