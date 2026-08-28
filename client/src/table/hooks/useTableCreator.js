import { Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import formatPrepTime from "../../cards/helpers/formatPrepTime";
import { getCardPath } from "../../cards/helpers/cardUrl";
import { getCategoryLabel } from "../../cards/models/categoryOptions";

const columnAlign = { headerAlign: "center", align: "center" };

const useTableCreator = (cards) => {
  const navigate = useNavigate();

  const columns = [
    { field: "title", headerName: "שם המתכון", width: 200, ...columnAlign },
    {
      field: "subtitle",
      headerName: "תאור קצר",
      width: 160,
      ...columnAlign,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            fontSize: "0.85rem",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "rating",
      headerName: "דירוג",
      width: 130,
      ...columnAlign,
      renderCell: (params) => (
        <Rating value={params.value || 0} precision={0.5} readOnly size="small" />
      ),
    },
    { field: "category", headerName: "קטגוריה", width: 130, ...columnAlign },
    {
      field: "prepTime",
      headerName: "זמן הכנה",
      width: 130,
      ...columnAlign,
      renderCell: (params) => <Typography>{formatPrepTime(params.value)}</Typography>,
    },
    { field: "authorName", headerName: "נכתב על ידי", width: 150, ...columnAlign },
    {
      field: "image",
      headerName: "תמונה",
      width: 160,
      sortable: false,
      ...columnAlign,
      renderCell: (params) => (
        <img
          style={{ height: "120px", width: "120px", objectFit: "cover", borderRadius: 8 }}
          src={params.value}
          alt="תמונת מתכון"
        />
      ),
    },
  ];

  const rows = useMemo(() => {
    return cards.map((card) => ({
      id: card._id,
      title: card.title,
      subtitle: card.subtitle,
      category: getCategoryLabel(card.category),
      image: card.images?.[0]?.url || card.image?.url,
      rating: card.averageRating || 0,
      prepTime: card.prepTime,
      authorName: card.authorName,
    }));
  }, [cards]);

  const onRowClick = (params) => {
    navigate(getCardPath({ _id: params.row.id, title: params.row.title }));
  };

  return {
    rows,
    columns,
    onRowClick,
  };
};

export default useTableCreator;
