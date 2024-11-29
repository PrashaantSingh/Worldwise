import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoaing: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState();

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const data = await fetch("http://localhost:5000/cities");
        const result = await data.json();
        // setCities(result);
        dispatch({ type: "cities/loaded", payload: result });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities data",
        });
      }
      // finally {
      //   setIsLoading(false);
      // }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`http://localhost:5000/cities/${id}`);
      const result = await response.json();

      dispatch({ type: "city/loaded", payload: result });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city data",
      });
    }

  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {

      const response = await fetch(`http://localhost:5000/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      const result = await response.json();
 

      dispatch({ type: "city/created", payload: result });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city",
      });
    }

  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
   
      await fetch(`http://localhost:5000/cities/${id}`, {
        method: "DELETE",
      });

   
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(CitiesContext);
  return value;
}
export { useCities, CitiesProvider };

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
