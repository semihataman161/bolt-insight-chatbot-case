import React from "react";
import { Box } from "@mui/material";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#F0F0F0",
        color: "#000",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <footer>
        <p>© {currentYear} Bolt Insight. All rights reserved.</p>
      </footer>
    </Box>
  );
};

export default Footer;
