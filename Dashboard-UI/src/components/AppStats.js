import React, { useEffect, useState } from 'react'
import '../App.css';

export default function AppStats() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [stats, setStats] = useState({});
    const [error, setError] = useState(null)

	const getStats = () => {
	
        fetch(`http://<Cloud DNS>/processor/stats`)
            .then(res => res.json())
            .then((result)=>{
				console.log("Received Stats")
                setStats(result);
                setIsLoaded(true);
            },(error) =>{
                setError(error)
                setIsLoaded(true);
            })
    }
    useEffect(() => {
		const interval = setInterval(() => getStats(), 2000); // Update every 2 seconds
		return() => clearInterval(interval);
    }, [getStats]);

    if (error){
        return (<div className={"error"}>Error found when fetching from API</div>)
    } else if (isLoaded === false){
        return(<div>Loading...</div>)
    } else if (isLoaded === true){
        return(
            <div>
                <h1>Latest Stats</h1>
                <table className={"StatsTable"}>
					<tbody>
						<tr>
							<th>Weather</th>
							<th>Soil</th>
						</tr>
						<tr>
							<td># Weather Readings: {stats['num_weather_readings']}</td>
							<td># Soil Readings: {stats['num_soil_readings']}</td>
						</tr>
						<tr>
							<td colspan="2">Max Weather Temp AVG: {stats['max_weather_temp_avg']}</td>
						</tr>
						<tr>
							<td colspan="2">Max Soil PH: {stats['max_soil_ph_reading']}</td>
						</tr>
						<tr>
							<td colspan="2">Max Soil Saturation: {stats['max_soil_saturation_reading']}</td>
						</tr>
					</tbody>
                </table>
                <h3>Last Updated: {stats['last_updated']}</h3>

            </div>
        )
    }
}
