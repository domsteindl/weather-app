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
        value={input}
        onChange={(e) => {setInput(e.target.value)}} />

        </form>
    )


}