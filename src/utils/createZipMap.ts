interface Location {
  city: string;
  latitude: number;
  county: string;
  state: string;
  zip_code: string;
  longitude: number;
}

export const createZipMap = (locations: Location[] = []) => {
  const locationMap: { [key: string]: Location } = {};
  if (!locations.length) return locationMap;
  locations.forEach(location => {
    locationMap[location.zip_code] = location;
  });

  return locationMap;
};
