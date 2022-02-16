import {
  Home,
  Subscriptions,
  ThumbUpOffAlt,
  History,
  Explore,
  VideoLibrary,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

const data = [
  { icon: Home, text: "Home" },
  { icon: Explore, text: "Explore" },
  { icon: Subscriptions, text: "Subscriptions" },
  { icon: VideoLibrary, text: "Library" },
  { icon: History, text: "History" },
  { icon: ThumbUpOffAlt, text: "Liked Videos" },
];

function Sidebar() {
  return (
    <Box sx={{ color: "white" }}>
      <List>
        {data.map((item) => {
          return (
            <ListItem disablePadding key={item.text}>
              <ListItemButton>
                <ListItemIcon>
                  <item.icon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Sidebar;
