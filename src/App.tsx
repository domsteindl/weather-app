import {useQuery} from '@tanstack/react-query'
import {WEATHER_API_KEY} from "./config/env.ts";
import Searchbar from "./features/weather/components/SearchBar.tsx";
import {useState} from "react";
import MainArea from "./features/weather/components/MainArea.tsx";


export default function App() {
    const [city, setCity] = useState("Berlin");
    const {isPending, error, data} = useQuery({
        queryKey: ['city', city],
        queryFn: async () => fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`).then((res) => {
           return res.json()
        }), enabled: !!city
    })



    const location =  data?.[0];
    const lat = location?.lat;
    const lon = location?.lon;

    const { data: weatherData } = useQuery({
        queryKey: ["weather", lat, lon],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            return res.json();
        },
        enabled: !!lat && !!lon,
    });

    { /*
    const { data: forecastData } = useQuery({
        queryKey: ["forecast", lat, lon],
        queryFn: async () => {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            return res.json();
        },
        enabled: !!lat && !!lon,
    });
    */ }

  return (



      <main className="min-h-screen bg-[#0b1220] text-white ">

        {/* HEADER */}
        <header className="p-6">

          <h1 className="text-3xl font-semibold">Weather</h1>
            <h4>Get real-time weather updates</h4>
          {/* SearchBar */}
            {!city && <p>Stadt suchen...</p>}



            <Searchbar onSearch={setCity} />
            {city && isPending && <p>Loading...</p>}

            {error && <p>Error: {error.message}</p>}
            {data && data.length === 0 && !isPending && (
                <p>Keine Stadt gefunden.</p>
            )}

        </header>

        {/* MAIN CONTENT */}
        <section className="p-6">
            {weatherData &&  location && (
                <>
                    <MainArea data={weatherData} location={location} />
                </> )}


            {/* WeatherCard */}
        </section>

        <section className="p-6">
          {/* Forecast */}
        </section>

        {/* FOOTER */}
        <footer className="p-6 text-white/50 text-sm">
          Data provided by OpenWeather
        </footer>
      </main>
  );
}