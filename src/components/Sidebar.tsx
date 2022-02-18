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

interface Props {
  responsive?: boolean;
}

function Sidebar(props: Props) {
  return (
    <Box sx={{ color: "white" }}>
      <List>
        {data.map((item) => {
          return (
            <ListItem disablePadding key={item.text}>
              <ListItemButton>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                {props.responsive ? (
                  <ListItemText primary={item.text} sx={{ color: "black" }} />
                ) : (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: "black",
                      display: { xs: "none", lg: "block" },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Sidebar;
