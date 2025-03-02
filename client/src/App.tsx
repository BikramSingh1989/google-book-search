import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apolloClient.ts"; 
import "./App.css"; 
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import SearchBooks from "./pages/SearchBooks.tsx";
import SavedBooks from "./pages/SavedBooks.tsx";
import LoginSignup from "./pages/LoginSignup.tsx";
import Auth from "./utils/auth.ts";


function App() {
  return (
    <ApolloProvider client={client}> 
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchBooks />} />
            <Route path="/saved" element={Auth.loggedIn() ? <SavedBooks /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={<LoginSignup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
