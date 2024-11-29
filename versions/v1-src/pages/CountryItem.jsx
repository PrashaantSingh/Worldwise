import PropTypes from 'prop-types'
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  console.log(country)
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

// CountryItem.propTypes=PropTypes.objectOf(PropTypes.shape(
// {  "emoji": PropTypes.symbol,
//   "country":PropTypes.string}
// ))

{/* <span className={styles.emoji}>{country.emoji}</span>
<span className={styles.country}>{country.country}</span> */}
CountryItem.propTypes = {
  country: PropTypes.shape({
    emoji: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
};