import React, {useEffect, useRef, useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ChakraProvider } from '@chakra-ui/react'
import {Toast} from "./components/toast";
import {Loader} from "./components/loader";
const App = () => {

  return (
      <ChakraProvider>
         <Loader />
         <Toast />
         <Routes>
            <Route path="auth/*" element={<AuthLayout />} />
            <Route path="admin/*" element={<AdminLayout />} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
         </Routes>
      </ChakraProvider>
  );
};

export default App;
