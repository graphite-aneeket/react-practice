import { useReducer } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { BASE_URL } from "../utils/constants";
import { useCallback } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setIsLoading":
      return { ...state, isLoading: action.payload };
    case "setCities":
      return { ...state, cities: action.payload };
    case "setCurrentCity":
      return { ...state, currentCity: action.payload };
    case "createCity":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "removeCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    default:
      throw new Error("No such action found");
  }
};

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: "setIsLoading", payload: true });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "setCities", payload: data });
      } catch (err) {
        console.error(err.message);
      } finally {
        dispatch({ type: "setIsLoading", payload: false });
      }
    };
    fetchCities();
  }, []);

  const fetchCityData = useCallback(
    async (id) => {
      if (currentCity.id === Number(id)) return;
      try {
        dispatch({ type: "setIsLoading", payload: true });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "setCurrentCity", payload: data });
      } catch (err) {
        console.error(err.message());
      } finally {
        dispatch({ type: "setIsLoading", payload: false });
      }
    },
    [currentCity.id]
  );

  const createCity = async (newCity) => {
    try {
      dispatch({ type: "setIsLoading", payload: true });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "createCity", payload: data });
    } catch (err) {
      console.error(err.message());
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }
  };

  const removeCity = async (cityId) => {
    try {
      dispatch({ type: "setIsLoading", payload: true });
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      dispatch({ type: "removeCity", payload: cityId });
    } catch (err) {
      console.error(err.message());
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCityData,
        createCity,
        removeCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("Using CitiesContext outside of CitiesProvider");
  return value;
}

export { CitiesProvider, useCities };
