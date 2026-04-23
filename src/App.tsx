import {WEATHER_API_KEY} from "./config/env.ts";

export default function App() {
    console.log(WEATHER_API_KEY)
  return (
      <main className="min-h-screen bg-[#0b1220] text-white">

        {/* HEADER */}
        <header className="p-6">
          <h1 className="text-3xl font-semibold">Weather App</h1>
          {/* SearchBar */}
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
  );
}