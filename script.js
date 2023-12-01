const weatherApiKey = '6bd0618d51199c5a4d442e825ca25125';
const unsplashApiKey = 'xynYcGkMZj4TAFXzTBJ3WCAgQMMLZZoJfavd7eivWFU';
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

// Function to fetch weather data
async function getWeatherData(city) {
    const fullApiUrl = `${weatherApiUrl}?q=${city}&appid=${weatherApiKey}`;

    try {
        const response = await fetch(fullApiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
    
        const data = await response.json();
        console.log(data); // Log the API response to the console
    
        // Display relevant weather information
        const weatherInfo = `
            <p>City: ${data.name}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    
        document.getElementById('weather-data').innerHTML = weatherInfo;

        // Call function to fetch and display weather-related image
        getWeatherImage(data.weather[0].main);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-data').innerHTML = '<p>Error fetching weather data</p>';
    }
}

// Function to fetch weather-related image
async function getWeatherImage(weatherCondition) {
    const fullUnsplashApiUrl = `${unsplashApiUrl}?query=${weatherCondition}&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(fullUnsplashApiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch image data');
        }

        const imageData = await response.json();
        console.log(imageData); // Log the Unsplash API response to the console

        // Display the image
        const imageElement = document.createElement('img');
        imageElement.src = imageData.urls.small;
        document.getElementById('weather-image').innerHTML = '';
        document.getElementById('weather-image').appendChild(imageElement);
    } catch (error) {
        console.error('Error fetching image data:', error);
        document.getElementById('weather-image').innerHTML = '<p>Error fetching image data</p>';
    }
}

// Call the function to get weather data for a specific city
document.addEventListener('DOMContentLoaded', function () {
    const defaultCity = 'Toronto'; // Change to the desired default city
    getWeatherData(defaultCity);
});
