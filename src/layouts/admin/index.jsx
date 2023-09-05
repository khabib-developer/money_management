import React, {useEffect, useRef, useState} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import {useAuthHook} from "../../hooks/auth.hook";
import {useAppStore} from "../../store/index.store";
import {useWalletHook} from "../../hooks/wallet.hook";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  const {check} = useAuthHook()

  const {getCurrencyRate} = useWalletHook()

  const { permission, full, setFull} = useAppStore()

  const {logout} = useAuthHook()

  // useEffect(() => {
  //   let lastActivityTimestamp = Date.now();
  //
  //   const handleInactivity = () => {
  //     lastActivityTimestamp = Date.now();
  //   };
  //
  //   const checkInactivity = () => {
  //     const currentTime = Date.now();
  //     if (currentTime - lastActivityTimestamp >= 300000) {
  //       logout().then(() => console.log('logout'));
  //     }
  //   };
  //
  //   document.addEventListener("click", handleInactivity, {passive:true});
  //
  //   const interval = setInterval(checkInactivity, 60000); // Check every minute
  //
  //   return () => {
  //     document.removeEventListener("click", handleInactivity);
  //     clearInterval(interval);
  //   };
  // }, [])

  useEffect(() => {
    (async function(){
       await Promise.all([await getCurrencyRate(), await check(true)])
    })()

    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    getActiveRoute(routes);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  if(!permission) return <></>

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="min-h-screen w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] flex-none transition-all md:pr-2 ${!full?"xl:ml-[313px]":"xl:ml-[77px]"} `}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Money management"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5 mx-auto mb-auto p-2 md:pr-2 flexible__height">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
