import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { createTheme, useMediaQuery } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { grey } from "@mui/material/colors";
import ProtectedRoute from "./components/js/ProtectedRoute";
import TipsPage from "./pages/TipsPage";
import { useMemo } from "react";
// import AnimalsList from "./components/js/AnimalsList";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import StripeProvider from "./components/js/StripeProvider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import FeaturedProducts from "./pages/FeaturedProducts";
// ----------------- ROUTES CONFIG -----------------
const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <Navigate to="/" replace /> },
  // {
  //   path: "/shop",
  //   element: <Home />,
  // children: [
  //   { path: "tipsPage", element: <TipsPage  /> },
  // ],
  // },
  // { path: "/animalsList", element: <AnimalsList /> },
  { path: "/my-account", element: <ProfilePage /> },
  { path: "/featured-products", element: <FeaturedProducts /> },
  { path: "/shopping-cart", element: <ShoppingCart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/advice", element: <TipsPage /> },
  { path: "/services", element: <h1>Services</h1> },
  { path: "/locations", element: <h1>Locations</h1> },
  { path: "/dashboard", element: <h1>Dashboard</h1> },
  { path: "/logout", element: <h1>Logout</h1> },
  { path: "/community", element: <h1>Community</h1> },
  { path: "/about-us", element: <h1>About Us</h1> },
  { path: "/contact", element: <h1>Contact</h1> },
];
// -------------------------------------------------
function App() {
  const isSmall = useMediaQuery("(max-width:600px)");
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: isSmall ? "monospace" : "sans-serif",
        },

        palette: {
          primary: {
            main: "#4CAF50",
          },
          secondary: {
            main: "#638773",
          },
          error: {
            main: "#f44336",
            dark: "#c1170bff",
          },
          success: {
            main: "#4caf50",
            dark: "#388e3c",
          },
          grey: {
            400: grey[400],
          },
          common: {
            white: "#ffffff",
            eee: "#eee",
            ddd: "#ddd",
          },
          background: {
            default: "#F0F5F2",
          },
          text: {
            primary: "#000000",
            secondary: "#555555",
          },
        },
      }),
    [isSmall]
  );

  return (
    <ThemeProvider theme={theme}>
      <StripeProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            {/* Protected Routes */}
            {protectedRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute>{element}</ProtectedRoute>}
              />
            ))}

            {/* 404 Fallback */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </div>
      </StripeProvider>
    </ThemeProvider>
  );
}

export default App;
