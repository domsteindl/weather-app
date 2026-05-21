export type GeoLocation = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    local_names?: {
        de?: string;
    };
};

export type CurrentWeather = {
    weather: Array<{
        icon: string;
        description: string;
    }>;
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    wind: {
        speed: number;
    };
    visibility: number;
};

export type ForecastItem = {
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        feels_like: number;
    };
    weather: Array<{
        icon: string;
    }>;
};

export type ForecastResponse = {
    list: ForecastItem[];
};

export type DailyForecast = {
    label: string;
    temp: number;
    feelsLike: number;
    icon: string;
};
