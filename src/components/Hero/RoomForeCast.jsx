export function WeatherForecast() {
  const forecast = [
    { day: "Fri", date: "11 Mar", icon: "☀️", temp: 26, humidity: 63 },
    { day: "Sat", date: "12 Mar", icon: "🌤️", temp: 18, humidity: 80 },
    { day: "Sun", date: "13 Mar", icon: "🌧️", temp: 16, humidity: 90 },
    { day: "Mon", date: "14 Mar", icon: "☀️", temp: 20, humidity: 56 },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-white">Daily Analysis</h3>
      <div className="flex justify-between overflow-x-auto">
        {forecast.map((day) => (
          <div key={day.date} className="text-center flex-shrink-0 px-2">
            <div className="font-medium   text-white">{day.day}</div>
            <div className="text-xs text-muted-foreground text-white">
              {day.date}
            </div>
            <div className="text-2xl my-1 text-white">{day.icon}</div>
            <div className="font-medium text-white">{day.temp}°</div>
            <div className="text-xs text-muted-foreground text-white">
              {day.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
