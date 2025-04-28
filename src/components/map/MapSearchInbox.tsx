/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import CustomInput from "../ui/CustomInput";
import { Clinician } from "../../types/types";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiemluYW9ydGl6IiwiYSI6ImNtOXZkZjRicDBqcTIya3Bvejk1aDlvbzkifQ.aABtdwJT_F12LBEiPEHMtw";

interface LocationSearchProps {
  setClinicianInfo: React.Dispatch<
    React.SetStateAction<Partial<Clinician> | null>
  >;
  clinicianInfo: Partial<Clinician> | null;
}

const LocationSearch = ({
  setClinicianInfo,
  clinicianInfo,
}: LocationSearchProps) => {
  const [query, setQuery] = useState(clinicianInfo?.location || "");
  const [results, setResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce function to limit API calls
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch locations from Mapbox API
  const searchLocations = async (searchText: string) => {
    if (!searchText) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchText
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      setResults(data.features || []);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setResults([]);
      setShowResults(false);
    }
  };

  // Debounced version of the search function
  const debouncedSearch = debounce(searchLocations, 300);

  useEffect(() => {
    debouncedSearch(query);
    setClinicianInfo((prev: Partial<Clinician> | null) => ({
      ...prev,
      location: selectedLocation?.place_name,
      longitude: selectedLocation?.geometry?.coordinates[0],
      latitude: selectedLocation?.geometry?.coordinates[1],
    }));
    console.log(selectedLocation?.geometry?.coordinates);
    console.log(selectedLocation?.place_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
    }
  };

  const handleSelectLocation = (location: any) => {
    setSelectedLocation(location);
    setQuery(location.place_name);
    setShowResults(false);
  };

  const handleInputFocus = () => {
    if (query && results.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div ref={searchContainerRef} className="relative max-w-md">
      <CustomInput
        label="Location:"
        type="text"
        name="location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleInputFocus}
        placeholder="Search location..."
        className="bg-secondary rounded border-gray-300 focus:border-blue-500 outline-none px-3 py-2 w-full"
      />

      {showResults && results.length > 0 && (
        <ul className="absolute w-full max-h-48 overflow-y-auto mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-50">
          {results.map((location) => (
            <li
              key={location.id}
              onClick={() => handleSelectLocation(location)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
            >
              {location.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
