import type {DailyForecast, ForecastItem} from "../types.ts";

function formatDayLabel(date: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const forecastDay = new Date(date);
    forecastDay.setHours(0, 0, 0, 0);

    if (forecastDay.getTime() === today.getTime()) {
        return "Heute";
    }

    return date.toLocaleDateString("de-DE", {weekday: "long"});
}

function pickNoonForecast(items: ForecastItem[]): ForecastItem {
    return items.reduce((best, item) => {
        const hour = Number.parseInt(item.dt_txt.split(" ")[1].split(":")[0], 10);
        const bestHour = Number.parseInt(best.dt_txt.split(" ")[1].split(":")[0], 10);
        return Math.abs(hour - 12) < Math.abs(bestHour - 12) ? item : best;
    });
}

export function getDailyForecasts(list: ForecastItem[]): DailyForecast[] {
    const byDay = new Map<string, ForecastItem[]>();

    for (const item of list) {
        const day = item.dt_txt.split(" ")[0];
        const entries = byDay.get(day) ?? [];
        entries.push(item);
        byDay.set(day, entries);
    }

    return Array.from(byDay.values())
        .slice(0, 5)
        .map((items) => {
            const forecast = pickNoonForecast(items);
            const date = new Date(forecast.dt * 1000);

            return {
                label: formatDayLabel(date),
                temp: forecast.main.temp,
                feelsLike: forecast.main.feels_like,
                icon: forecast.weather[0].icon,
            };
        });
}
