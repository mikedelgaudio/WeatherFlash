export interface weatherData {
  weatherLookup: {
    id: number;
    city: string;
    location: {
      lat: number;
      long: number;
    };
  };
  errorMsg: "";
  weatherData: {
    temp: {
      current: 0;
      high: 0;
      low: 0;
      feelsLike: 0;
    };
    condition: {
      main: "N/A";
      description: "N/A";
      icon: "";
    };
    sunrise: 0;
    sunset: 0;
    wind: { speed: 0; deg: 0 };
    humidity: 0;
    visibility: 0;
    timezone: 0;
    cityName: "N/A";
    stateName: "";
    cityId: 0;
    coords: { lat: 0; long: 0 };
  };
  userSearched: false;
  loading: false;
  search: {
    results: [];
  };
}
