import type {DailyForecast} from "../types.ts";

type Props = {
    forecast: DailyForecast;
};

export default function ForecastCard({forecast}: Props) {
    return (
        <div className="flex min-w-[140px] flex-1 flex-col items-center rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="font-medium">{forecast.label}</p>
            <img
                className="mt-2"
                src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                alt=""
            />
            <p className="mt-2 text-xl font-semibold">{Math.round(forecast.temp)}°</p>
            <p className="mt-1 text-sm text-white/70">
                Gefühlt {Math.round(forecast.feelsLike)}°
            </p>
        </div>
    );
}
