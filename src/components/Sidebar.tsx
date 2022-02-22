import { useDispatch } from "react-redux";
import {
  Home,
  Subscriptions,
  ThumbUpOffAlt,
  History,
  Explore,
  VideoLibrary,
  ExitToApp,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { logOut } from "../redux/authAction";

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
  const dispatch = useDispatch();

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
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(logOut())}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            {props.responsive ? (
              <ListItemText primary="Sign Out" sx={{ color: "black" }} />
            ) : (
              <ListItemText
                primary="Sign Out"
                sx={{
                  color: "black",
                  display: { xs: "none", lg: "block" },
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
