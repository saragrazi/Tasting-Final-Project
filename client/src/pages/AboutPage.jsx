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
import GroupsIcon from "@mui/icons-material/Groups";

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
            ברוכים הבאים ל-Tasting - המקום שבו מתכונים הופכים לחוויה. בין אם אתם מחפשים השראה
            לארוחת ערב, רוצים לשתף את המתכון המשפחתי שלכם, או פשוט אוהבים לגלוש בין מנות טעימות -
            כאן זה הבית שלכם.
          </Typography>

          <SectionTitle icon={<MenuBookIcon sx={{ color: "#d06b6b" }} />}>
            מתכונים מפורטים כמו ספר בישול אמיתי
          </SectionTitle>
          <Typography align="right" paragraph>
            כל מתכון ב-Tasting בנוי בקפידה: רשימת מרכיבים עם כמות מדויקת לכל מוצר, שלבי הכנה
            ברורים וממוספרים, זמן הכנה משוער, התייחסות לגודל כוס המידה שבה משתמשים, וטיפים
            אישיים מהיוצר שיעזרו לכם להצליח בפעם הראשונה. יש גם אפשרות לצרף קישור לסרטון הכנה,
            למי שאוהב לראות ולא רק לקרוא.
          </Typography>

          <SectionTitle icon={<StarRateIcon sx={{ color: "#d06b6b" }} />}>
            דרגו, ושוחחו על המתכון
          </SectionTitle>
          <Typography align="right" paragraph>
            אהבתם מתכון? תנו לו דירוג כוכבים - פעם אחת לכל מתכון. בנוסף, כל אחד יכול להשאיר
            תגובה אישית משלו על המתכון. כל תגובה נפתחת לשרשור אמיתי - כל אחד יכול להצטרף ולהגיב
            בתוכה, כך שנוצרת שיחה חיה סביב כל מנה, בדיוק כמו לדבר עם חברים על אוכל.
          </Typography>

          <SectionTitle icon={<ViewModuleIcon sx={{ color: "#d06b6b" }} />}>
            התאימו את התצוגה לעצמכם
          </SectionTitle>
          <Typography align="right" paragraph>
            בחרו בין תצוגת כרטיסים נעימה לגלישה, לבין תצוגת טבלה מסודרת להשוואה מהירה בין
            מתכונים - כולל דירוג, זמן הכנה וקטגוריה במבט אחד. יש גם חיפוש מהיר, סינון לפי
            קטגוריה, ומצב כהה לעיניים שלכם בשעות הערב.
          </Typography>

          <SectionTitle icon={<FavoriteIcon sx={{ color: "#d06b6b" }} />}>
            המועדפים שלכם, תמיד בהישג יד
          </SectionTitle>
          <Typography align="right" paragraph>
            מצאתם מתכון שאתם יודעים שתחזרו אליו? שמרו אותו במועדפים בלחיצת כפתור, וכך תוכלו
            למצוא אותו שוב במקום אחד, בלי לחפש בין כל המתכונים.
          </Typography>

          <SectionTitle icon={<ForumIcon sx={{ color: "#d06b6b" }} />}>
            הוסיפו, ערכו, שתפו
          </SectionTitle>
          <Typography align="right" paragraph>
            נרשמתם כעסק? תוכלו להוסיף מתכונים משלכם עם תמונה משלכם (או תמונת ברירת מחדל אם
            אין לכם אחת כרגע), לערוך אותם בכל עת, ולעקוב אחרי המתכונים שלכם בעמוד "המתכונים שלי".
          </Typography>

          <SectionTitle icon={<GroupsIcon sx={{ color: "#d06b6b" }} />}>
            הצטרפו לקהילת Tasting
          </SectionTitle>
          <Typography align="right" paragraph>
            בין אם אתם שפים מנוסים או רק מתחילים במטבח, Tasting כאן כדי להפוך כל ארוחה
            להרפתקה קולינרית קטנה. הצטרפו אלינו, גלו מתכון חדש, ותנו לו לספר לכם סיפור.
          </Typography>

          <Typography className="welcome1" align="right" sx={{ mt: 2, fontWeight: "bold" }}>
            בתיאבון, ובהצלחה בהרפתקאות הקולינריות שלכם ב-Tasting!
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
