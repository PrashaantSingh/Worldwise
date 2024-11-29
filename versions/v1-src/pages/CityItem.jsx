import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import PropTypes from 'prop-types'; 


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
   
  }).format(new Date(date));



export default function CityItem({city}) {
  return (
    <li>
     <Link to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`} className={styles.cityItem}>
      <span className={styles.emoji}>{city.emoji}</span>
      <h3 className={styles.name}>{city.cityName}</h3>
      <time className={styles.date}>{formatDate(city.date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
      </Link>
      </li>
  )
}



CityItem.propTypes = {
  city: PropTypes.shape({
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
  }).isRequired
};

