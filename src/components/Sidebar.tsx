import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

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
import { logOut } from "../redux/actions/authAction";

const data = [
  { icon: Home, text: "Home" },
  { icon: Explore, text: "Explore" },
  { icon: Subscriptions, text: "Subscriptions" },
  { icon: VideoLibrary, text: "Library" },
  { icon: ThumbUpOffAlt, text: "Liked Videos" },
  { icon: History, text: "History" },
];

interface Props {
  responsive?: boolean;
}

function Sidebar(props: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <Box sx={{ color: "white" }}>
      <List >
        {data.map((item) => {
          return (
            <ListItem disablePadding key={item.text}>
              <Link
              style={{ textDecoration: "none" }}
                to={`${item.text === "Home" ? "/" : "/"+item.text.toLowerCase()}`}            
              >
                <ListItemButton >
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
              </Link>
            </ListItem>
          );
        })}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
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
