import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../images/logo.png";

const Navbar = ({ handleOpenPopup }) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="white"
          elevation={1}
          sx={{
            borderRadius: "35px",
            height: "50px",
            width: "60%",
            justifyContent: "center",
            position: "fixed",
            left: "20%",
            marginTop: "15px",
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: "30px", width: "30px" }}
              />
            </IconButton>

            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              Find Jobs
            </Typography>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              Find Talents
            </Typography>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              About Us
            </Typography>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
              Testimonials
            </Typography>
            <Button
              onClick={handleOpenPopup}
              variant="contained"
              sx={{
                borderRadius: "25px",
                backgroundColor: "#6100AD",
                "&:hover": { backgroundColor: "#A128FF" },
                textTransform: "none",
              }}
            >
              Create Jobs
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
