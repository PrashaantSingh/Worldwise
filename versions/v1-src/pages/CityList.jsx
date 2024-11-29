// import CityItem from "./CityItem";
// import PropTypes from 'prop-types';
// import styles from "./CityList.module.css";
// export default function CityList({ cities }) {
//   return (
//     <ul className={styles.CityList}>
//       {cities.map((city) => (
//         <CityItem city={city} key={city.id} />
//       ))}
//       <p>city item</p>
//     </ul>
//   );
// }
// PropTypes.arrayOf(PropTypes.shape({
//     cityName: PropTypes.string.isRequired,
//     country: PropTypes.string.isRequired,
//     emoji: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     notes: PropTypes.string.isRequired,
//     position: PropTypes.shape({
//       lat: PropTypes.number.isRequired,
//       lng: PropTypes.number.isRequired
//     }).isRequired,
//     id: PropTypes.number.isRequired
//   })).isRequired



import PropTypes from 'prop-types';
import CityItem from './CityItem'; 
import Message from './Message'
import styles from "./CityList.module.css";

function CityList({ cities }) {
   if(!cities.length)return <Message message="Add your first city by clicking on the map"/>
  return (
    <ul className={styles.cityList}>
      {cities?.map(city => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

// Step 2: Define propTypes for CityList
CityList.propTypes = {
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
    id: PropTypes.string.isRequired
  })).isRequired
};

export default CityList;