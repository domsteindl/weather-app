import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

import {WEATHER_API_KEY} from "./config/env.ts";
import Searchbar from "./features/weather/components/SearchBar.tsx";
import {useState} from "react";
const queryClient = new QueryClient()

export default function App() {
    const [city, setCity] = useState("");
    const {isPending, error, data} = useQuery({
        queryKey: ['city', city],
        queryFn: () => fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`).then((res) => {
           return res.json()
        }), enabled: !!city
    })

    if (isPending) { return 'Loading'}
    if(error) { return 'Error' + error.message + data}

  return (
      <QueryClientProvider client={queryClient}>


      <main className="min-h-screen bg-[#0b1220] text-white">

        {/* HEADER */}
        <header className="p-6">
          <h1 className="text-3xl font-semibold">Weather App</h1>
          {/* SearchBar */}
            <Searchbar onSearch={setCity} />
        </header>

        {/* MAIN CONTENT */}
        <section className="p-6">
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
      </QueryClientProvider>
  );
}