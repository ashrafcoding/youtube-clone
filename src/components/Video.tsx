import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function Video() {
  return (
      <Card >
        <CardMedia
          component="img"
          image="https://i.ytimg.com/vi/jS4aFq5-91M/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB50w2V-HQdXmTHv1n9UpT3_6uAJQ"
        />
        <CardContent sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ height: 30, width: 30 }}>
            <CardMedia
              sx={{ borderRadius: "50%" }}
              component="img"
              image="https://yt3.ggpht.com/ytc/AKedOLRyPFojwY3CXV5ks5TwPrt2VifQn-nYNfkgLvVPkw=s68-c-k-c0x00ffffff-no-rj"
            />
          </Box>
          <Box>
            <Typography>Javascript Full Course</Typography>
            <Typography component="h6">freeCodeCamp.org</Typography>
            <Typography variant="caption">3m views . 5 days ago</Typography>
          </Box>
        </CardContent>
      </Card>
  );
}

export default Video;
