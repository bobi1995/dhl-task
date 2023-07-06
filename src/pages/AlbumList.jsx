import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlbums } from "../redux/actions/albumsActions";
import axios from "axios";
import AlbumComponent from "../components/AlbumComponent";
import LoadingComponent from "../components/LoadingComponent";
import Paginator from "../components/Pagination";
import { Box, Autocomplete, TextField } from "@mui/material";
import { setPage } from "../redux/actions/pageActions";

const renderAlbums = (albumArray, favourites) => {
  return albumArray.map((album) => (
    <Box
      key={album.id}
      sx={{
        margin: 1,
      }}
    >
      <AlbumComponent
        info={album}
        isFav={favourites.some((item) => (item.id === album.id ? true : false))}
      />
    </Box>
  ));
};

const AlbumList = () => {
  const [loading, setLoading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const albums = useSelector((state) => state.albums.albums);
  const currentPage = useSelector((state) => state.page.currentPage);
  const favourites = useSelector((state) => state.albums.favourites);
  const dispatch = useDispatch();

  const fetchAlbums = async () => {
    setLoading(true);
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .catch((err) => {
        console.log(err);
      });

    //Grouping the albums as per albumId
    const groupedAlbums = Object.values(
      response.data.reduce((grouped, album) => {
        const { albumId } = album;
        if (!grouped[albumId]) {
          grouped[albumId] = { albumId, albums: [] };
        }
        grouped[albumId].albums.push(album);
        return grouped;
      }, {})
    );

    //Adding the "Favourite" album in front of others (at the top of the list so it can be easy to select)
    groupedAlbums.unshift({
      albumId: "Favourites",
      albums: favourites,
    });

    dispatch(setAlbums(groupedAlbums));
    setLoading(false);
  };

  const handleAlbumChange = (event, value) => {
    setSelectedAlbum(value);
    //adding this so when new album is selected to be able to see everything from page 1
    dispatch(setPage(1));
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  //slicing the array of items so it can be up to 10 per page - it is my decision to be 10
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const slicedAlbums = selectedAlbum
    ? selectedAlbum.albums.slice(startIndex, endIndex)
    : [];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 3,
          position: "relative",
        }}
      >
        {loading ? (
          <LoadingComponent />
        ) : albums && albums.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              marginBottom: 5,
            }}
          >
            <Autocomplete
              sx={{
                width: 300,
              }}
              options={albums}
              getOptionLabel={(option) => `Album ${option.albumId}`}
              onChange={handleAlbumChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Album"
                  variant="outlined"
                />
              )}
            />
          </Box>
        ) : null}

        {selectedAlbum ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {selectedAlbum.albumId === "Favourites"
              ? renderAlbums(favourites, favourites)
              : renderAlbums(slicedAlbums, favourites)}
          </Box>
        ) : null}
        <Paginator
          totalItems={selectedAlbum ? selectedAlbum.albums.length : 0}
          itemsPerPage={10}
        />
      </Box>
    </Box>
  );
};

export default AlbumList;
