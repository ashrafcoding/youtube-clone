import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Button,
  Collapse,
  CardActions,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import moment from "moment";
import numeral from "numeral";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function VideoMeta() {
  const [expand, setExpand] = useState(false);

  const handleExpandClick = () => {
    setExpand(!expand);
  };

  return (
    <Box ml={2}>
      <Typography variant="h5">VIDEO TITLE</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        <Typography variant="body2">
          {`${numeral(1000).format("0,a")} Views . ${moment(
            "2020-06-5"
          ).fromNow()}`}{" "}
          views
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box component="span">
            <ThumbUpOffAltIcon fontSize="small" />
            {numeral(10000).format("0,a")}
          </Box>
          <Box component="span">
            <ThumbDownOffAltIcon fontSize="small" />
            {numeral(10000).format("0,a")}
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://images.unsplash.com/photo-1593642647962-b7e7a8f8f8f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          <Box sx={{ ml: 1 }}>
            <Typography component="h4">USER NAME</Typography>
            <Typography variant="body2">
              {numeral(1000).format("0,a")} Subscriber
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" sx={{ background: "red" }}>
          SUBSCRIBE
        </Button>
      </Box>
      <Divider />
      <Typography variant="body2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
        obcaecati, magnam doloremque quae non vitae optio facere totam ea nobis,
        est atque animi vel accusantium placeat provident vero neque nemo!
      </Typography>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expand}
          onClick={handleExpandClick}
          aria-expanded={expand}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <Typography paragraph>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, alias.
          Aut eos deleniti cum quas aliquam quibusdam? Rerum expedita optio
          quibusdam iusto id nisi. Laborum laudantium dolor ab pariatur
          consequuntur cumque, quasi perferendis magnam repellendus, incidunt
          amet architecto itaque modi quidem tempore. Repellat voluptates
          voluptatum tempora illum sit voluptatibus fugiat!
        </Typography>
      </Collapse>
    </Box>
  );
}

export default VideoMeta;
