import {useState} from "react";
import type { SubmitEventHandler } from "react";
import {useQuery} from "@tanstack/react-query";
import {WEATHER_API_KEY} from "../../../config/env.ts";
import type {GeoLocation} from "../types.ts";

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
        <form onSubmit={handleSubmit}>
            <div className="relative">
            <input
                type="search"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                    setIsOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"/>

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
                                {place.local_names?.de || place.name}, {place.country}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </form>
    )


}