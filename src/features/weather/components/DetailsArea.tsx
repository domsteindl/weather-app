import DetailCard from "./DetailCard.tsx";
import type {CurrentWeather} from "../types.ts";

type Props = {
    weatherData: CurrentWeather;
};
export default function DetailsArea({weatherData} : Props) {

    return (
        <div className="flex w-full max-w-md flex-wrap justify-center gap-4 text-center">
        <DetailCard title="Humidity" value={`${weatherData.main.humidity}%`} />

    <DetailCard title="Wind" value={`${(weatherData.wind.speed * 3.6).toFixed(1)} km/h`} />

    <DetailCard title="Pressure" value={`${weatherData.main.pressure} hPa`} />

    <DetailCard title="Visibility" value={`${weatherData.visibility / 1000} km`} />
        </div>
    )
}