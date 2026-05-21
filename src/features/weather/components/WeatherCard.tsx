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
        <div className={"border rounded-lg max-w-2xl"}>
            <p>{displayName + ", " + location.country}</p>
            <p>{date + " - " + time}</p>
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather icon"
            />
            <p>{data.weather[0].description}</p>
            <p>{`Feels like  ${Math.floor(data.main.feels_like)}°C`}</p>
        </div>
    )
}
