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
