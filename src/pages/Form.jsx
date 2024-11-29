// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import BackButton from "./BackButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect } from "react";

import { useCities } from "../contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [ lat, lng ] = useUrlPosition();
  const {createCity,isLoading}=useCities();
  const navigate= useNavigate()
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  async function handleSubmit(e){
e.preventDefault();
if (!cityName || !date )return;
const newCity = {
  cityName,
  country,
  emoji,
  date,
  notes,
  position: {
    lat,
    lng
  }
};

await createCity(newCity)
navigate('/app/cities')

  }

 

  useEffect(() => {
    async function fetchCityData() {
      if(!lat&&!lng)return;
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
     
        if(!data.countryCode)throw new Error("That doesn't seem to be a country 🙄. Please click to a valid position!!")
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      
      }
    }
    if (lat && lng) {
      fetchCityData();
    }
  }, [lat, lng]);

  if(!lat&&!lng)return <Message message='start by clicking somewhere on the map'/>;
  if (isLoadingGeocoding)return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form className={`${styles.form} ${isLoading?styles.loading:''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
       < DatePicker id='date' selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
