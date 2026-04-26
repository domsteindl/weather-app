import {useQuery} from '@tanstack/react-query'
import {WEATHER_API_KEY} from "./config/env.ts";
import Searchbar from "./features/weather/components/SearchBar.tsx";
import {useState} from "react";
import DetailsArea from "./features/weather/components/DetailsArea.tsx";


export default function App() {
    const [city, setCity] = useState("Berlin");
    const {isPending, error, data} = useQuery({
        queryKey: ['city', city],
        queryFn: async () => fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`).then((res) => {
           return res.json()
        }), enabled: !!city
    })

    const lat = data?.[0]?.lat;
    const lon = data?.[0]?.lon;

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

    {/* Mehrere Tage voraussagen https://api.openweathermap.org/data/2.5/forecast?lat=48.7784485&lon=9.1800132&cnt=5&appid=848273ef355b2f00114d6d67927fcfee&units=metric
        Heutiger Tag             https://api.openweathermap.org/data/2.5/weather?lat=48.7784485&lon=9.1800132&appid=848273ef355b2f00114d6d67927fcfee

       icon https://openweathermap.org/img/wn/{icon_code}@2x.png
    */}
    const icon = weatherData?.weather?.[0]?.icon;
    const now = new Date();
   const date = now.toLocaleDateString("de-DE", {
    weekday: "long",
       day: "2-digit",
       month: "long",
       year: "numeric"
   })

    const time = now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
    })
  return (



      <main className="min-h-screen bg-[#0b1220] text-white ">

        {/* HEADER */}
        <header className="p-6">

          <h1 className="text-3xl font-semibold">Weather App</h1>
            <h4>Get real-time weather updates</h4>
          {/* SearchBar */}
            {!city && <p>Stadt suchen...</p>}


            <Searchbar onSearch={setCity} />
            {city && isPending && <p>Loading...</p>}

            {error && <p>Error: {error.message}</p>}

        </header>

        {/* MAIN CONTENT */}
        <section className="p-6">

            <p>City Data</p>
            {weatherData && (
                <div>
                <p>{data[0].name + ", " + data[0].country}</p>
                <p>{date + " - " + time}</p>

          <p>weatherData</p>
          <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather icon"
          />
        <DetailsArea weatherData={weatherData}/>
                </div> )}


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