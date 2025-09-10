import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchBar from "./SearchBar";
import LogoutDialog from "./LogoutDialog";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar({
  pages = [],
  showSearchIcon = true,
  showFavoriteIcon = true,
  showCartIcon = true,
  showProfile = true,
  cartItems = null,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    console.log(event);
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.common.white }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo Image */}
          <Box
            component="img"
            src="/images/pets-icon.svg"
            alt="Pets Logo"
            sx={{ display: { xs: "none", md: "flex" }, height: 30, mr: 4 }}
          />
          {/* Mobile Menu Button */}
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
                  width: "50%",
                },
              }}
            >
              {/* Logo */}
              <Box
                component="img"
                src="/images/pets-icon.svg"
                alt="Pets Logo"
                sx={{
                  display: "block",
                  mx: "auto",
                  my: 2,
                  width: 100,
                }}
              />
              {/* Divider */}
              <Box>
                <hr
                  style={{
                    border: "none",
                    borderTop: `1px solid ${theme.palette.common.eee}`,
                  }}
                />
              </Box>
              {/* Pages */}
              <List sx={{ flex: "0 0 65%" }}>
                {pages.map((page) => (
                  <ListItem key={page} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={`/${page.toLowerCase()}`}
                      onClick={() => setAnchorElNav(false)}
                    >
                      <ListItemText primary={page} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              {/* Divider */}
              <Box sx={{ my: 2 }}>
                <hr
                  style={{
                    border: "none",
                    borderTop: `1px solid ${theme.palette.common.ddd}`,
                  }}
                />
              </Box>

              {/* Search + Favorite + Cart */}
              {(showFavoriteIcon || showCartIcon || showSearchIcon) && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                    flex: "0 0 10%",
                  }}
                >
                  {(showFavoriteIcon || showCartIcon) && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        width: "80%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {showFavoriteIcon && (
                        <Box
                          component={Link}
                          to="/my-account"
                          state={{ displayedType: "favorites" }}
                          sx={{
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.secondary.main,
                            borderRadius: "10px",
                            py: 0.7,
                            px: 1,
                            width: "40%",
                            "&:hover": {
                              color: theme.palette.error.main,
                            },
                          }}
                        >
                          <FavoriteBorderIcon />
                        </Box>
                      )}
                      {showCartIcon && (
                        <Box
                          component={Link}
                          to="shopping-cart"
                          state={{ displayedType: "favorites" }}
                          sx={{
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.secondary.main,
                            borderRadius: "10px",
                            py: 0.7,
                            px: 1,
                            width: "40%",
                            "&:hover": {
                              color: theme.palette.error.main,
                            },
                          }}
                        >
                          <AddShoppingCartIcon />
                        </Box>
                      )}
                    </Box>
                  )}
                  {showSearchIcon && <SearchBar text="Search" />}
                </Box>
              )}
            </Drawer>
            {/*responsive Logo Image */}
            <Box
              component="img"
              src="/images/pets-icon.svg"
              alt="Pets Logo"
              sx={{
                display: {
                  xs: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                  md: "none",
                },
                ml: 0.5,
              }}
            ></Box>
          </Box>
          {/* pages */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  textTransform: "capitalize",
                  fontSize: "20px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Search + Favorite + Cart icons */}
          {(showFavoriteIcon || showCartIcon || showSearchIcon) && (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              {showSearchIcon && (
                <SearchBar text="Search" />
                // <Box
                //   sx={{
                //     backgroundColor: theme.palette.background.default,
                //     color: theme.palette.secondary.main,
                //     borderRadius: "10px",
                //     display: "flex",
                //     alignItems: "center",
                //     px: 1,
                //     py: 0.5,
                //     mr: 2,
                //   }}
                // >
                //   <SearchIcon />
                //   <TextField
                //     variant="standard"
                //     InputProps={{
                //       disableUnderline: true,
                //       sx: {
                //         paddingLeft: "5px",
                //         fontWeight: 500,
                //         color: theme.palette.secondary.main,
                //       },
                //     }}
                //     sx={{
                //       border: "none",
                //       outline: "none",
                //       width: "100%",
                //       "&::placeholder": {
                //         color: theme.palette.secondary.main,
                //         opacity: 1,
                //       },
                //     }}
                //     placeholder="Search"
                //   />
                // </Box>
              )}
              {(showFavoriteIcon || showCartIcon) && (
                <Box
                  sx={{ gap: 1, display: "flex", alignItems: "center", mr: 2 }}
                >
                  {showFavoriteIcon && (
                    <Box
                      component={Link}
                      to="/my-account"
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.secondary.main,
                        borderRadius: "10px",
                        px: 1,
                        py: 0.5,
                        "&:hover": {
                          color: theme.palette.error.main,
                        },
                      }}
                    >
                      <FavoriteBorderIcon />
                    </Box>
                  )}
                  {showCartIcon && (
                    <Box
                      component={Link}
                      to="shopping-cart"
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.secondary.main,
                        borderRadius: "10px",
                        px: 1,
                        py: 0.5,
                        "&:hover": {
                          color: theme.palette.error.main,
                        },
                      }}
                    >
                      <AddShoppingCartIcon />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
          {/* cart Items */}
          {cartItems && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
                p: 1,
                mx: 1,
              }}
            >
              Cart ({cartItems})
            </Button>
          )}
          {/* Profile avatar */}
          {showProfile && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/images/avatars/2.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    component={Link}
                    to={
                      setting === "Account"
                        ? "/my-account"
                        : setting === "Logout"
                        ? ""
                        : `/${setting.toLowerCase()}`
                    }
                    onClick={
                      setting === "Logout"
                        ? () => setOpenLogoutDialog(true) // هنا بيشغل الـ Logout
                        : handleCloseUserMenu
                    }
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        color:
                          setting === "Logout"
                            ? theme.palette.error.main
                            : theme.palette.text.primary,
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <LogoutDialog
            open={openLogoutDialog}
            onClose={() => setOpenLogoutDialog(false)}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
