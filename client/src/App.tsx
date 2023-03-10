import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AppLoader from "./hooks/AppLoader/AppLoader";
import { Footer, Header, Main, MarketPlace, AdminPanel } from "./layouts/";
import CoffeeAdminCard from "./pages/AdminPanel/CoffeeCardPage/CoffeeAdminCard";
import CreateCoffeeItem from "./pages/AdminPanel/CreateCoffeeItem/CreateCoffeeItem";
import CreateTeaItem from "./pages/AdminPanel/CreateTeaItem/CreateTeaItem";
import EditCoffeeItem from "./pages/AdminPanel/EditCoffeeItem/EditCoffeeItem";
import EditTeaItem from "./pages/AdminPanel/EditTeaItem/EditTeaItem";
import TeaAdminCard from "./pages/AdminPanel/TeaCardPage/TeaAdminCard";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLoader>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/market/:store" element={<MarketPlace />} />
            <Route path="/adminPanel/:store" element={<AdminPanel />} />
            <Route
              path="/adminPanel/coffee/create"
              element={<CreateCoffeeItem />}
            />
            <Route path="/adminPanel/tea/create" element={<CreateTeaItem />} />
            <Route
              path="/adminPanel/coffee/:itemId"
              element={<CoffeeAdminCard />}
            />
            <Route
              path="/adminPanel/coffee/:itemId/edit"
              element={<EditCoffeeItem />}
            />
            <Route path="/adminPanel/tea/:itemId" element={<TeaAdminCard />} />
            <Route
              path="/adminPanel/tea/:itemId/edit"
              element={<EditTeaItem />}
            />
          </Routes>
          <Footer />
        </AppLoader>
      </BrowserRouter>
    </>
  );
}

export default App;
