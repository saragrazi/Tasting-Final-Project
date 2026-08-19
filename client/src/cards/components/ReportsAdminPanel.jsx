import React from "react";
import { array, func } from "prop-types";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useTheme } from "../../providers/ThemeProvider";
import { useSnack } from "../../providers/SnackbarProvider";
import { getCardPath } from "../helpers/cardUrl";
import { deleteReport } from "../services/cardService";

const ReportsAdminPanel = ({ cards, setCards }) => {
  const { isDark } = useTheme();
  const { setSnack } = useSnack();
  const navigate = useNavigate();

  const reports = (cards || [])
    .flatMap((card) => (card.reports || []).map((report) => ({ ...report, card })))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleResolve = async (report) => {
    try {
      await deleteReport(report.card._id, report._id);
      setCards((prev) =>
        prev.map((c) =>
          c._id === report.card._id
            ? { ...c, reports: (c.reports || []).filter((r) => r._id !== report._id) }
            : c
        )
      );
    } catch (error) {
      setSnack("error", error || "לא ניתן היה לסמן את הדיווח כמטופל כרגע");
    }
  };

  if (reports.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        אין דיווחים חדשים.
      </Typography>
    );
  }

  return (
    <Box>
      {reports.map((report) => (
        <Box
          key={report._id}
          mb={2}
          p={2}
          sx={{
            backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{report.card.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                דווח על ידי: {report.reporterName || "משתמש לא ידוע"} · {report.reporterEmail || "-"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(report.createdAt).toLocaleString("he-IL")}
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigate(getCardPath(report.card))}
                sx={{
                  color: "#d06b6b",
                  borderColor: "#d06b6b",
                  "&:hover": { backgroundColor: "rgba(208,107,107,0.08)", borderColor: "#b5585a" },
                }}
              >
                מעבר למתכון
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleResolve(report)}
                sx={{
                  backgroundColor: "#457127",
                  "&:hover": { backgroundColor: "#365a1e" },
                }}
              >
                טופל
              </Button>
            </Box>
          </Box>
          {report.reason && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {report.reason}
              </Typography>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

ReportsAdminPanel.propTypes = {
  cards: array,
  setCards: func.isRequired,
};

ReportsAdminPanel.defaultProps = {
  cards: [],
};

export default ReportsAdminPanel;
