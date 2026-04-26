import DetailCard from "./DetailCard.tsx";

type Props =  {
    weatherData: {
        main: {
            humidity: number;
            pressure: number;
        };
        wind: {
            speed: number;
        };
        visibility: number;
    }
};
export default function DetailsArea({weatherData} : Props) {

    return (
        <div className="flex gap-10 text-center justify-center">
        <DetailCard title="Humidity" value={`${weatherData.main.humidity}%`} />

    <DetailCard title="Wind" value={`${(weatherData.wind.speed * 3.6).toFixed(1)} km/h`} />

    <DetailCard title="Pressure" value={`${weatherData.main.pressure} hPa`} />

    <DetailCard title="Visibility" value={`${weatherData.visibility / 1000} km`} />
        </div>
    )
}