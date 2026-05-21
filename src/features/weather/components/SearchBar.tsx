import {useState} from "react";
import type { SubmitEventHandler } from "react";
import {useQuery} from "@tanstack/react-query";
import {WEATHER_API_KEY} from "../../../config/env.ts";
import type {GeoLocation} from "../types.ts";
import { Search } from "lucide-react";


{/* https://api.openweathermap.org/geo/1.0/direct?q={city}&appid=848273ef355b2f00114d6d67927fcfee */}

type Props = {
    onSearch: (city: string) => void;
};

export default function Searchbar({onSearch} : Props) {
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { data: suggestions } = useQuery<GeoLocation[]>({
        queryKey: ["suggestions", input],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${WEATHER_API_KEY}`
            );

            return res.json() as Promise<GeoLocation[]>;
        },
        enabled: input.length >= 3,
    });

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSearch(input)
    };
    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative w-full">
        <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
    />

            <input
                type="search"
                placeholder="Stadt suchen..."
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                    setIsOpen(true);
                }}
                className="
            w-full
            rounded-lg
            border
            border-white/20
            bg-white/10
            py-2
            pl-10
            pr-4
            text-white
            placeholder:text-white/50
            focus:outline-none
            focus:ring-2
            focus:ring-white/20
        "/>

                {isOpen && suggestions && suggestions.length > 0 && (
                    <div
                        className="absolute top-full left-0 w-full bg-[#1a1a2e] border border-white/10 rounded-lg mt-1 z-50">
                        {suggestions.map((place) => (
                            <button
                                type="button"
                                key={`${place.lat}-${place.lon}`}
                                onClick={() => {
                                    onSearch(place.name); // oder besser: location speichern
                                    setIsOpen(false);
                                    setInput(place.name);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-white/10"
                            >
                                {place.name}
                                {place.state ? `, ${place.state}` : ""}, {place.country}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </form>
    )


}