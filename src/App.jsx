import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  {CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./pages/CityList";
import City from "./pages/City";
import CountryList from "./pages/CountryList";
import Form from "./pages/Form";


export default function App() {

  return (
    <>
    <AuthProvider> 
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
            
              <Route index element={<Navigate to="cities" replace />} />

              <Route
                path="cities"
                element={<CityList />}
              />
              <Route path="cities/:id" element={<City />} />
              <Route
                path="countries"
                element={<CountryList/>}
              />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
    </>
  );
}
