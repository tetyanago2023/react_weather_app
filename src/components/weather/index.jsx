import Search from "../search";
import {useEffect, useState} from "react";

const Weather = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async (param) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&units=metric&appid=1c1de40153423aaa0bc39f72145a849c`
            );
            const data = await response.json();
            if (data) {
                setWeatherData(data);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };


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

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    // Round the temperature to 1 decimal place
    const roundedTemperature = weatherData.main.temp.toFixed(0);
    const roundedWindSpeed = weatherData.wind.speed.toFixed(0);

    // Check if weatherData and weather description are available
    const description =
        weatherData &&
        weatherData.weather &&
        weatherData.weather[0] &&
        weatherData.weather[0].description
            ? weatherData.weather[0].description
            : "";

    // Capitalize the first letter of the description
    const capitalizedDescription =
        description.charAt(0).toUpperCase() + description.slice(1);


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
                    <div className="temp">
                        <p>Temperature</p>
                        {roundedTemperature} °C
                    </div>
                    <p className="description">
                        {capitalizedDescription}
                    </p>
                    <div className="weather-info">
                        <div className="column">
                            <div>
                                <p>Wind Speed</p>
                                <p className="wind">{roundedWindSpeed} m/c</p>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <p>Humidity</p>
                                <p className="humidity">{weatherData?.main?.humidity}%</p>
                            </div>
                        </div>
                    </div>
                </div>}

        </div>
    );
};

export default Weather;