import { useQuery } from "@tanstack/react-query";

export type TemperatureHistory = {
  time: string;
  temperature: number;
};

type HourlyData = {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
};

const OPEN_METEO_API_URL = "https://archive-api.open-meteo.com/v1/era5?";

const fetchWeatherData = async (
  latitude: number | undefined,
  longitude: number | undefined,
  startDate: string,
  endDate: string
) => {
  if (latitude == null || longitude == null) {
    return undefined;
  }
  const url = new URL(OPEN_METEO_API_URL);
  url.searchParams.append("latitude", String(latitude));
  url.searchParams.append("longitude", String(longitude));
  url.searchParams.append("start_date", startDate);
  url.searchParams.append("end_date", endDate);
  url.searchParams.append("hourly", "temperature_2m");

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const useWeatherData = (
  latitude: number | undefined,
  longitude: number | undefined,
  startDate: Date,
  endDate: Date
) => {
  const start = startDate.toISOString().slice(0, 10);
  const end = endDate.toISOString().slice(0, 10);
  return useQuery({
    queryKey: ["weather", latitude, longitude, start, end],
    queryFn: () => fetchWeatherData(latitude, longitude, start, end),
    select: (data: HourlyData): TemperatureHistory[] => {
      if (data?.hourly == null) return [];
      const { time, temperature_2m } = data.hourly;
      const minLength = Math.min(time.length, temperature_2m.length);
      const history: TemperatureHistory[] = [];
      for (let i = 0; i < minLength; i++) {
        history.push({ time: time[i], temperature: temperature_2m[i] });
      }
      return history;
    },
    staleTime: Infinity,
  });
};
