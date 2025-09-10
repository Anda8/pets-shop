import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PetsIcon from "@mui/icons-material/Pets";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FilterButtons from "../components/js/FilterButtons";
import CardProduct from "../components/js/CardProduct";

export default function ProfilePage() {
  const theme = useTheme();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [displayedType, setDisplayedType] = useState("account-details");

  const location = useLocation();
  useEffect(() => {
    if (location.state?.displayedType) {
      setDisplayedType(location.state.displayedType);
    }
  }, [location.state]);

  const changeDisplayedType = (event, newValue) => {
    if (newValue !== null) {
      console.log(newValue);

      setDisplayedType(newValue);
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const navbarPages = [
    { label: "Shop", icon: <LocalMallIcon /> },
    { label: "Services", icon: <PetsIcon /> },
    { label: "Locations", icon: <LocationPinIcon /> },
    { label: "My Account", icon: <PersonIcon /> },
    { label: "Cart", icon: <ShoppingCartIcon /> },
  ];
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(savedUser);
    if (savedUser) {
      setUser({
        id: savedUser.id,
        username: savedUser.username || "",
        email: savedUser.email || "",
        phoneNumber: savedUser.phoneNumber || "",
        address: savedUser.address || "",
        city: savedUser.city || "",
        state: savedUser.state || "",
        zipCode: savedUser.zipCode || "",
      });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSave = () => {
    // 1. Update currentUser
    localStorage.setItem("currentUser", JSON.stringify(user));

    // 2. Get all users
    const users = JSON.parse(localStorage.getItem("data")) || [];

    // 3. Replace the current user inside users array
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, ...user } : u
    );

    // 4. Save the updated array back
    localStorage.setItem("data", JSON.stringify(updatedUsers));
  };
  /////   order history
  const orders = [
    {
      id: "ORD12345",
      date: "2025-09-01",
      items: ["Dog Food", "Chew Toy"],
      total: "$45.00",
      status: "Delivered",
    },
    {
      id: "ORD12346",
      date: "2025-09-05",
      items: ["Cat Food"],
      total: "$25.00",
      status: "Pending",
    },
  ];
  const [selectedOrder, setSelectedOrder] = useState(null);
  ////  favorites
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return (
    <Container maxWidth="lg">
      {/* Drawer Mobile */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
        >
          <MenuIcon />
        </IconButton>
        {/* Top Drawer */}
        <Drawer
          anchor="left"
          open={anchorElNav}
          onClose={() => setAnchorElNav(false)}
          PaperProps={{
            sx: {
              p: 2,
            },
          }}
        >
          {/* Profile avatar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
              pr: 2,
            }}
          >
            <Avatar alt="Remy Sharp" src="/images/avatars/2.png" />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Remy Sharp
            </Typography>
          </Box>

          {/* Pages */}
          <List>
            {navbarPages.map((page) => (
              <ListItem key={page} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/${page.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText primary={page.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      {/* Desktop Sidebar */}
      <Box sx={{ display: "flex", gap: 4, minHeight: "100vh" }}>
        {/* Sidebar */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            width: 250,
            borderRight: `1px solid ${theme.palette.divider}`,
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 4,
            }}
          >
            <Avatar alt="Remy Sharp" src="/images/avatars/2.png" />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {user.username}
            </Typography>
          </Box>

          <List>
            {navbarPages.map((page) => (
              <ListItem key={page.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={
                    page.label === "Cart"
                      ? "/shopping-cart"
                      : `/${page.label.toLowerCase().replace(/\s+/g, "-")}`
                  }
                  sx={{backgroundColor:
                    page.label === "My Account"
                      ? "rgba(0, 0, 0, 0.04)"
                      : "transparent",}}
                >
                  <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText primary={page.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Content */}
        <Box flexGrow={1}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "start" }}
          >
            My Account
          </Typography>

          {/* ======== FILTER BUTTONS =======  */}
          <FilterButtons
            value={displayedType}
            options={["account-details", "order-history", "favorites"]}
            onChange={changeDisplayedType}
          />
          {/* ======== FILTER BUTTONS =======  */}

          {/* CONTENT details*/}
          <Box sx={{ mt: 4 }}>
            {displayedType === "account-details" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  width: "50%",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={500}
                  sx={{ textAlign: "start" }}
                >
                  Personal Information
                </Typography>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel sx={{ textAlign: "start" }}>Username</FormLabel>
                  <TextField
                    type="text"
                    fullWidth
                    value={user.username}
                    onChange={handleChange}
                    name="username"
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel sx={{ textAlign: "start" }}>Email</FormLabel>
                  <TextField
                    type="email"
                    fullWidth
                    value={user.email}
                    onChange={handleChange}
                    name="email"
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel sx={{ textAlign: "start" }}>
                    Phone Number
                  </FormLabel>
                  <TextField
                    type="tel"
                    fullWidth
                    value={user.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                  />
                </FormControl>
                <Typography
                  variant="h5"
                  fontWeight={500}
                  sx={{ mt: 2, textAlign: "start" }}
                >
                  Address
                </Typography>
                <FormControl sx={{ width: "100%", alignSelf: "flex-start" }}>
                  <FormLabel fontWeight={500} sx={{ textAlign: "start" }}>
                    Street Address
                  </FormLabel>
                  <TextField
                    type="text"
                    fullWidth
                    value={user.address}
                    onChange={handleChange}
                    name="address"
                  />
                </FormControl>
                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <FormControl>
                    <FormLabel sx={{ textAlign: "start" }} fontWeight={500}>
                      City
                    </FormLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={user.city}
                      onChange={handleChange}
                      name="city"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel sx={{ textAlign: "start" }} fontWeight={600}>
                      State
                    </FormLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={user.state}
                      onChange={handleChange}
                      name="state"
                    />
                  </FormControl>
                </Box>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel sx={{ textAlign: "start" }}>Zip Code</FormLabel>
                  <TextField
                    type="text"
                    fullWidth
                    value={user.zipCode}
                    onChange={handleChange}
                    name="zipCode"
                  />
                </FormControl>

                <Button
                  variant="contained"
                  sx={{ alignSelf: "flex-start" }}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Box>
            )}
            {displayedType === "order-history" && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Order ID</b>
                      </TableCell>
                      <TableCell>
                        <b>Date</b>
                      </TableCell>
                      <TableCell>
                        <b>Items</b>
                      </TableCell>
                      <TableCell>
                        <b>Total</b>
                      </TableCell>
                      <TableCell>
                        <b>Status</b>
                      </TableCell>
                      <TableCell>
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          {order.items[0]}{" "}
                          {order.items.length > 1 &&
                            `+${order.items.length - 1} more`}
                        </TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View
                          </Button>
                          <Dialog
                            open={!!selectedOrder}
                            onClose={() => setSelectedOrder(null)}
                          >
                            <DialogTitle>
                              Order Details - {selectedOrder?.id}
                            </DialogTitle>
                            <DialogContent>
                              <Typography>
                                Date: {selectedOrder?.date}
                              </Typography>
                              <Typography>
                                Status: {selectedOrder?.status}
                              </Typography>
                              <Typography>
                                Total: {selectedOrder?.total}
                              </Typography>

                              <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                                Items:
                              </Typography>
                              <List>
                                {selectedOrder?.items.map((item, i) => (
                                  <ListItem key={i}>
                                    <ListItemText primary={item} />
                                  </ListItem>
                                ))}
                              </List>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => setSelectedOrder(null)}>
                                Close
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {displayedType === "favorites" && (
              <div>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", textAlign: "start", mb: 4}}
                >
                  My Favorites
                </Typography>
                {favorites.length === 0 ? (
                  <p>
                    You don’t have any favorite items yet.
                    <Link to="/shop">Shop Now</Link>
                  </p>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap",
                      justifyContent: { xs: "center", md: "flex-start" },
                    }}
                  >
                    {favorites.map((item) => (
                      <CardProduct product={item} />
                    ))}
                  </Box>
                )}
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
