import WeatherCard from "./WeatherCard.tsx";
import DetailsArea from "./DetailsArea.tsx";
import type {CurrentWeather, GeoLocation} from "../types.ts";

type Props = {
    data: CurrentWeather;
    location: GeoLocation;
};

export default function MainArea({data, location}: Props) {
    return (<section className={"flex flex-col gap-7"}>
            <WeatherCard data={data} location={location}/>
            <DetailsArea weatherData={data}/>
        </section>
    )
}