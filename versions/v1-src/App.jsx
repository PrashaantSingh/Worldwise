import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./pages/CityList";
import City from "./pages/City";
import CountryList from './pages/CountryList'
import Form from './pages/Form'

export default function App() {
  const[cities,setCities]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  useEffect(function(){
    async function fetchCities(){
try{
  setIsLoading(true)
  const data=await fetch("http://localhost:5000/cities");
const result= await data.json();
setCities(result)}
    catch{
      alert('There was an error loading cities data')
    }finally{setIsLoading(false)}
  }
    fetchCities()
  },[])
  return (
    <>
      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            {/* <Route index element={<CityList cities={cities} isLoading={isLoading}/>} /> */}
            <Route index element={<Navigate to='cities' replace/>} />

            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
            <Route path='cities/:id' element={<City/>}/>
            <Route path="countries" element={<CountryList cities={cities} isLoading=
            {isLoading}/>} />
            <Route path="form" element={<Form/>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
