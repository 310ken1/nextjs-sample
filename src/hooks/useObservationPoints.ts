import { useQuery } from "@tanstack/react-query";

/**
 * 観測地点.
 * @property name 名前.
 * @property latitude 緯度.
 * @property longitude 経度.
 */
type ObservationPoint = {
  name: string;
  latitude: number;
  longitude: number;
};

/**
 * 観測地点リストの取得
 * @returns 観測地点リスト
 */
const fetchObservationPoints = async (): Promise<ObservationPoint[]> => {
  const response = await fetch("http://localhost:4010/weather/points");
  if (!response.ok) {
    throw new Error("Failed to fetch observation points");
  }
  return response.json();
};

/**
 * 観測地点の取得フック.
 * @returns 観測地点
 */
export const useObservationPoints = () => {
  return useQuery({
    queryKey: ["observationPoints"],
    queryFn: fetchObservationPoints,
  });
};
