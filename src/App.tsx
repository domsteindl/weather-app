import {useQuery} from '@tanstack/react-query'
import {WEATHER_API_KEY} from "./config/env.ts";
import Searchbar from "./features/weather/components/SearchBar.tsx";
import {useState} from "react";
import MainArea from "./features/weather/components/MainArea.tsx";
import ForecastArea from "./features/weather/components/ForecastArea.tsx";
import type {CurrentWeather, ForecastResponse, GeoLocation} from "./features/weather/types.ts";


export default function App() {
    const [city, setCity] = useState("Berlin");
    const {isPending, error, data} = useQuery<GeoLocation[]>({
        queryKey: ['city', city],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`
            );
            return res.json() as Promise<GeoLocation[]>;
        },
        enabled: !!city,
    })



    const location =  data?.[0];
    const lat = location?.lat;
    const lon = location?.lon;

    const { data: weatherData } = useQuery<CurrentWeather>({
        queryKey: ["weather", lat, lon],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            return res.json() as Promise<CurrentWeather>;
        },
        enabled: !!lat && !!lon,
    });

    const {data: forecastData} = useQuery<ForecastResponse>({
        queryKey: ["forecast", lat, lon],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            return res.json() as Promise<ForecastResponse>;
        },
        enabled: !!lat && !!lon,
    });

  return (



      <main className="min-h-screen bg-[#0b1220] text-white">
    <div className="mx-auto max-w-3xl">
        {/* HEADER */}
        <header className="flex flex-col items-center p-6 text-center">

          <h1 className="text-3xl font-semibold">Weather</h1>
            <h4 className="mt-1 text-white/70">Get real-time weather updates</h4>

            <div className="mt-6 w-full max-w-md">
            {!city && <p className="mb-2">Stadt suchen...</p>}

            <Searchbar onSearch={setCity} />
            {city && isPending && <p className="mt-2">Loading...</p>}

            {error && <p className="mt-2">Error: {error.message}</p>}
            {data && data.length === 0 && !isPending && (
                <p className="mt-2">Keine Stadt gefunden.</p>
            )}
            </div>

        </header>

        {/* MAIN CONTENT */}
        <section className="flex flex-col items-center p-6">
            {weatherData &&  location && (
                <MainArea data={weatherData} location={location} />
            )}


            {/* WeatherCard */}
        </section>

        {forecastData && (
            <section className="flex flex-col items-center p-6">
                <h2 className="mb-4 text-lg font-semibold">5-Tage-Vorhersage</h2>
                <ForecastArea forecastData={forecastData} />
            </section>
        )}

        {/* FOOTER */}
        <footer className="p-6 text-white/50 text-sm">
            <span>Data provided by <a href={"https://openweathermap.org/"}>OpenWeather</a></span>
        </footer>
    </div>
      </main>
  );
}