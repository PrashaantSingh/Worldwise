
import PropTypes from 'prop-types';
import CountryItem from './CountryItem'; 
import Message from './Message'
import styles from "./CityList.module.css";

function CountryList({ cities }) {
   if(!cities.length)return <Message message="Add your first city by clicking on the map"/>
   const countries=cities.reduce((arr,city)=>{
    if(!arr.map(el=>el.country).includes(city.country))
        return [...arr,{country:city.country,emoji:city.emoji}]
    else return arr;
   },[])
  return (
    <ul className={styles.countryList}>
      {countries?.map(country => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}


CountryList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired
  })).isRequired
};

export default CountryList;