import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setFavourites,
  removeFavourites,
} from "../redux/actions/albumsActions";

const AlbumComponent = ({ info, isFav }) => {
  console.log(info);
  const dispatch = useDispatch();

  const handleAddToFavourites = () => {
    dispatch(setFavourites(info));
  };
  const handleRemoveFavourites = () => {
    dispatch(removeFavourites(info.id));
  };

  return (
    <Card
      sx={{
        height: 300,
        width: 345,
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 150, width: 150, margin: "auto", marginTop: 1 }}
        image={info.thumbnailUrl}
        title={info.title}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {info.title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={isFav ? handleRemoveFavourites : handleAddToFavourites}
        >
          <FavoriteIcon
            sx={
              isFav
                ? {
                    color: "#FFE900",
                  }
                : {}
            }
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default AlbumComponent;
