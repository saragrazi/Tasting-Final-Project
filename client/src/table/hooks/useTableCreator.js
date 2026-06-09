import { Button, Typography } from "@mui/material";
import ForwardIcon from '@mui/icons-material/Forward';
import ROUTES from "../../routes/routesModel";
import { useHref, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useUser } from "../../users/providers/UserProvider";



const useTableCreator = (cards) => {
  const navigate = useNavigate()
  const {user} = useUser()
  const currHref = useHref()
  let columns = []

  if(user?.isAdmin && currHref === "/admin-panel") {
    columns = [
      {
        field: 'likes',
        headerName: '# likes',
        width: 80,
        numeric: true,
        renderCell: (params) => {
          return (
            <Typography>{params.row.likes}</Typography>
          )
        }
      },
      { field: 'title', headerName: 'Recipe Name', width: 180 },
      { field: 'subtitle', headerName: 'Subtitle', width: 200 },
      { field: 'category', headerName: 'Category', width: 100 },
      {
        field: 'image',
        headerName: 'Image',
        width: 220,
        height:500,
        renderCell: (params) => {
          return <img height={"200px"} width={"200px"} src={params.value} alt='wow'></img>
        }
      },
      {
        field: 'id',
        headerName: 'Go To',
        width: 80,
        renderCell: (params) => {
          return (
            <Button
              onClick={() => navigate(`${ROUTES.CARD_INFO}/${params.value}`)}
              size='small'
              variant='contained'
              sx={{ width: "20px", backgroundColor: "transparent", "&:hover": { backgroundColor: "#00A99D" } }}
            >
              <ForwardIcon sx={{ color: "#568338" }} />
            </Button>
          )
        }
      },
    ];
  } else {
    columns = [
      { field: 'title', headerName: 'Recipe Name', width: 180 },
      { field: 'subtitle', headerName: 'Subtitle', width: 200 },
      { field: 'category', headerName: 'Category', width: 100 },
      {
        field: 'image',
        headerName: 'Image',
        width: 250,
        renderCell: (params) => {
          return <img height={"200px"} width={"200px"} src={params.value} alt='wow'></img>
        }
      },
      {
        field: 'id',
        headerName: 'Go To',
        width: 80,
        renderCell: (params) => {
          return (
            <Button
              onClick={() => navigate(`${ROUTES.CARD_INFO}/${params.value}`)}
              size='small'
              variant='contained'
              sx={{ width: "20px", backgroundColor: "transparent", "&:hover": { backgroundColor: "#00A99D" } }}
            >
              <ForwardIcon sx={{ color: "#568338" }} />
            </Button>
          )
        }
      },
    ];
  }

  const rows = useMemo(() => {
    const rows = cards.map((card, index) => {
      return ({ id: `${card._id}/${card.title}/${card.image?.url.split("/")[2]}`, title: card.title, subtitle: card.subtitle, category: card.category, image: card.image?.url, likes: card.likes.length })
    })
    return rows
  }, [cards])

  return {
    rows,
    columns,
  }
}

export default useTableCreator