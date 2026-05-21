import DetailCard from "./DetailCard.tsx";
import type {CurrentWeather} from "../types.ts";

type Props = {
    weatherData: CurrentWeather;
};
export default function DetailsArea({weatherData} : Props) {

    return (
        <div className="flex w-full max-w-md flex-wrap justify-center gap-4 text-center">
        <DetailCard title="Luftfeuchtigkeit" value={`${weatherData.main.humidity} %`} />

        <DetailCard title="Wind" value={`${(weatherData.wind.speed * 3.6).toFixed(1)} km/h`} />

        <DetailCard title="Luftdruck" value={`${weatherData.main.pressure} hPa`} />

        <DetailCard title="Sichtweite" value={`${(weatherData.visibility / 1000).toFixed(1)} km`} />
        </div>
    )
}