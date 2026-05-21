import type {CurrentWeather, GeoLocation} from "../types.ts";

type Props = {
    data: CurrentWeather;
    location: GeoLocation;
};

export default function WeatherCard({data, location}: Props) {    const displayName =
        location.local_names?.de || location.name;
    const icon = data?.weather?.[0]?.icon;
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
    return(
        <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-xl font-semibold">{displayName + ", " + location.country}</p>
            <p className="mt-1 text-white/70">{date + " - " + time}</p>
            <img
                className="mx-auto mt-4"
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Wetter-Symbol"
            />
            <p className="mt-2 capitalize">{data.weather[0].description}</p>
            <p className="mt-1 text-3xl font-semibold">{Math.round(data.main.temp)}°C</p>
            <p className="mt-1 text-white/70">Gefühlt {Math.round(data.main.feels_like)}°C</p>
        </div>
    )
}
