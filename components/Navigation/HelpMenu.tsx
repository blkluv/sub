import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const HelpMenu = () => {
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        onClick={(evt) => {
          setHelpMenuOpen(true);
          setAnchorEl(evt.currentTarget);
        }}
        variant={"text"}
        sx={{ color: "gray" }}
      >
        <HelpOutlineIcon />
        <ExpandMoreIcon fontSize={"small"} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={helpMenuOpen}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        onClose={() => setHelpMenuOpen(false)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => window.open(process.env.NEXT_PUBLIC_CANNY_DOMAIN, "_blank")}>
          <StarOutlineRoundedIcon sx={{ marginRight: 2 }} fontSize={"medium"} /> Feature Request
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HelpMenu;
