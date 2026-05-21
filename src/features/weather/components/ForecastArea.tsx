import ForecastCard from "./ForecastCard.tsx";
import {getDailyForecasts} from "../utils/getDailyForecasts.ts";
import type {ForecastResponse} from "../types.ts";

type Props = {
    forecastData: ForecastResponse;
};

export default function ForecastArea({forecastData}: Props) {
    const dailyForecasts = getDailyForecasts(forecastData.list);

    return (
        <div className="flex w-full flex-wrap justify-center gap-4">
            {dailyForecasts.map((forecast, index) => (
                <ForecastCard key={`${forecast.label}-${index}`} forecast={forecast} />
            ))}
        </div>
    );
}
