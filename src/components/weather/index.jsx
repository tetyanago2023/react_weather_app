import Search from "../search";
import {useEffect, useState} from "react";

const Weather = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=1c1de40153423aaa0bc39f72145a849c`
            );
            const data = await response.json();
            console.log(data, "data");
            if (data) {
                setWeatherData(data,);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const handleSearch = () => {
        fetchWeatherData(search);
    }

    const getCurrentDate = () => {
        return new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    useEffect(() => {
        fetchWeatherData("London");
    }, []);

    console.log(weatherData, "weatherData");

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading ? <p>Loading...</p>
                : <div>
                    <div className="city-name">
                        <h2>
                            {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                </div>}

        </div>
    );
};

export default Weather;