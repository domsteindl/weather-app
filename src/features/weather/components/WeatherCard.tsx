import type { CurrentWeather, GeoLocation } from "../types.ts";

type Props = {
    data: CurrentWeather;
    location: GeoLocation;
};

export default function WeatherCard({ data, location }: Props) {

    const displayName = location.local_names?.de || location.name;

    const locationLabel = [
        displayName,
        location.state,
        location.country
    ].filter(Boolean).join(", ");

    const icon = data.weather?.[0]?.icon;

    const now = new Date();

    const date = now.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const temp = Math.round(data.main.temp);
    const feels = Math.round(data.main.feels_like);

    return (
        <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-xl backdrop-blur-md">

            {/* LOCATION */}
            <p className="text-xl font-semibold">{locationLabel}</p>
            <p className="mt-1 text-sm text-white/60">{date} • {time}</p>

            {/* ICON + TEMP */}
            <div className="mt-6 flex flex-col items-center">
                <img
                    className="h-28 w-28 drop-shadow-lg"
                    src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt="weather icon"
                />

                <p className="mt-2 text-5xl font-bold tracking-tight">
                    {temp}°C
                </p>

                <p className="text-white/70">
                    Gefühlt {feels}°C
                </p>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 text-lg capitalize text-white/80">
                {data.weather[0].description}
            </p>
        </div>
    );
}