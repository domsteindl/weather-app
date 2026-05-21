import { useQuery } from '@tanstack/react-query';
import { WEATHER_API_KEY } from "./config/env.ts";
import Searchbar from "./features/weather/components/SearchBar.tsx";
import { useState } from "react";
import MainArea from "./features/weather/components/MainArea.tsx";
import ForecastArea from "./features/weather/components/ForecastArea.tsx";
import type {
    CurrentWeather,
    ForecastResponse,
    GeoLocation
} from "./features/weather/types.ts";

export default function App() {

    // ✅ ONLY SOURCE OF TRUTH
    const [location, setLocation] = useState<GeoLocation>({
        name: "Berlin",
        country: "DE",
        lat: 52.52,
        lon: 13.405,
    });

    // WEATHER
    const { data: weatherData, isPending, error } = useQuery<CurrentWeather>({
        queryKey: ["weather", location?.lat, location?.lon],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${location!.lat}&lon=${location!.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=de`
            );
            return res.json() as Promise<CurrentWeather>;
        },
        enabled: !!location?.lat && !!location?.lon,
    });

    // FORECAST
    const { data: forecastData } = useQuery<ForecastResponse>({
        queryKey: ["forecast", location?.lat, location?.lon],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${location!.lat}&lon=${location!.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=de`
            );
            return res.json() as Promise<ForecastResponse>;
        },
        enabled: !!location?.lat && !!location?.lon,
    });

    return (
        <main className="min-h-screen bg-[#0b1220] text-white">
            <div className="mx-auto w-full max-w-6xl px-6">

                {/* HEADER */}
                <header className="flex flex-col items-center p-6 text-center">
                    <h1 className="text-3xl font-semibold">Weather</h1>
                    <h4 className="mt-1 text-white/70">
                        Get real-time weather updates
                    </h4>

                    <div className="mt-6 w-full max-w-md">

                        {!location && (
                            <p className="mb-2 text-white/60">
                                Stadt suchen...
                            </p>
                        )}

                        {/* ✅ ONLY THIS SETS LOCATION */}
                        <Searchbar onSearch={setLocation} />

                        {location && isPending && (
                            <p className="mt-2">Loading...</p>
                        )}

                        {error && (
                            <p className="mt-2">
                                Error: {error.message}
                            </p>
                        )}
                    </div>
                </header>

                {/* MAIN */}
                <section className="flex flex-col items-center p-6">
                    {weatherData && location && (
                        <MainArea
                            data={weatherData}
                            location={location}
                        />
                    )}
                </section>

                {/* FORECAST */}
                {forecastData && (
                    <section className="flex flex-col items-center p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            5-Tage-Vorhersage
                        </h2>
                        <ForecastArea forecastData={forecastData} />
                    </section>
                )}

                {/* FOOTER */}
                <footer className="p-6 text-sm text-white/50">
                    <span>
                        Data provided by{" "}
                        <a
                            href="https://openweathermap.org/"
                            className="underline hover:text-white"
                        >
                            OpenWeather
                        </a>
                    </span>
                </footer>

            </div>
        </main>
    );
}