import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
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
        {/* <MenuItem onClick={() => window.open('https://medium.com/pinata', '_blank')}>
                    <SchoolOutlinedIcon sx={{ marginRight: 2 }} fontSize={'medium'} /> Tutorials
                </MenuItem> */}
        <MenuItem onClick={() => window.open("https://pinata.canny.io/feature-requests", "_blank")}>
          <StarOutlineRoundedIcon sx={{ marginRight: 2 }} fontSize={"medium"} /> Feature Request
        </MenuItem>
        <MenuItem
          onClick={() => window.open("https://docs.pinata.cloud/pinata-submarine-api", "_blank")}
        >
          <AutoStoriesOutlinedIcon sx={{ marginRight: 2 }} fontSize={"small"} />
          Documentation
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HelpMenu;
