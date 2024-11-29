import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();


  
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const data = await fetch("http://localhost:5000/cities");
        const result = await data.json();
        setCities(result);
      } catch (error) {
        alert("There was an error loading cities data");
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  
  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/cities/${id}`);
      const result = await response.json();
      setCurrentCity(result);
    } catch (error) {
      alert("There was an error loading city data");
      console.error("Error fetching city:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity,getCity }}>
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
