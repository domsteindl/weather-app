import WeatherCard from "./WeatherCard.tsx";
import DetailsArea from "./DetailsArea.tsx";

export default function MainArea({data, location}) {
    return (<section className={"flex flex-col gap-7"}>
            <WeatherCard data={data} location={location}/>
            <DetailsArea weatherData={data}/>
        </section>
    )
}