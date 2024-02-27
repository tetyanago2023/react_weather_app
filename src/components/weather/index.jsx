import Search from "../search";
import {useState} from "react";

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
            if (data) {
                setWeatherData(data);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    async function handleSearch() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=YOUR_API_KEY`);
        const data = await response.json();
        console.log(data);

    }

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            <h2>Weather</h2>

        </div>
    );
};

export default Weather;