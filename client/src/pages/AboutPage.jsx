import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Typography, Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarRateIcon from "@mui/icons-material/StarRate";
import ForumIcon from "@mui/icons-material/Forum";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SectionTitle = ({ icon, children }) => (
  <Box sx={{ mt: 3, mb: 1, display: "flex", alignItems: "center", gap: 1, fontWeight: "bold" }}>
    {icon}
    {children}
  </Box>
);

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ direction: "rtl", textAlign: "right" }}>
      <PageHeader
        title="אודות"
        subtitle="כל מה שרציתם לדעת על Tasting"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignItems="center" sx={{ direction: "rtl", textAlign: "right" }}>
          <Typography className="welcome" align="right" paragraph>
            ברוכים הבאים ל-Tasting - מקום קטן וחמים לכל מי שאוהב אוכל. בין אם אתם מבשלים, סתם
            מסתכלים, או מחפשים רעיון לארוחה הערב - תרגישו בבית.
          </Typography>

          <SectionTitle icon={<MenuBookIcon sx={{ color: "#d06b6b" }} />}>
            מתכונים ברורים ופשוטים
          </SectionTitle>
          <Typography align="right" paragraph>
            מרכיבים, שלבי הכנה, וטיפ קטן מהיוצר - הכל מסודר ונעים לעין.
          </Typography>

          <SectionTitle icon={<StarRateIcon sx={{ color: "#d06b6b" }} />}>
            דרגו ותכתבו
          </SectionTitle>
          <Typography align="right" paragraph>
            אהבתם מתכון? תנו לו כוכב. בא לכם להגיד משהו? תכתבו תגובה. פשוט ככה.
          </Typography>

          <SectionTitle icon={<ViewModuleIcon sx={{ color: "#d06b6b" }} />}>
            איך שנוח לכם
          </SectionTitle>
          <Typography align="right" paragraph>
            חיפוש, סינון לפי קטגוריה, ומצב כהה לשעות הערב - הכל כדי שתרגישו נוח.
          </Typography>

          <SectionTitle icon={<FavoriteIcon sx={{ color: "#d06b6b" }} />}>
            המועדפים שלכם
          </SectionTitle>
          <Typography align="right" paragraph>
            מצאתם משהו שאתם יודעים שתרצו לבשל שוב? שמרו אותו במועדפים, ותמצאו אותו בקלות.
          </Typography>

          <SectionTitle icon={<ForumIcon sx={{ color: "#d06b6b" }} />}>
            יש לכם עסק?
          </SectionTitle>
          <Typography align="right" paragraph>
            אפשר להעלות מתכונים משלכם, עם תמונה, ולערוך אותם מתי שבא לכם.
          </Typography>

          <Typography className="welcome1" align="right" sx={{ mt: 2, fontWeight: "bold" }}>
            בתיאבון!
          </Typography>
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <img src="/assets/images/avatar2.png" alt="אווטאר" width="70%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
