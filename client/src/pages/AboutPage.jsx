import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Typography, Box } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ direction: "rtl", textAlign: "right" }}>
       <PageHeader
        title="אודות"
        subtitle="כאן תוכל למצוא הסברים על השימוש באפליקציה"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignItems="center" sx={{ direction: "rtl", textAlign: "right" }}>
          <Typography className="welcome" align="right" paragraph>
              שלום וברוכים הבאים ל-Tasting, המקום שלך לכל מה שקשור לאוכל טעים! ב-Tasting אנחנו
              דואגים שהחוויה שלך במטבח תהיה מהנה וקלה.
          </Typography>
          <Box sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>גלה מתכונים מדהימים</Box>
          <Typography align="right" paragraph>
            גלה מגוון גדול של מתכונים שמתאימים לכל טעם ולכל רמה. מארוחות מלאות ועד קינוחים מתוקים,
            Tasting היא הכתובת שלך להשראה קולינרית.
          </Typography>
          <Box sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>המטבח שלך, הכללים שלך</Box>
          <Typography align="right" paragraph>
            הצטרף לקהילת Tasting דרך הרשמה. אחרי ההתחברות תוכל לשתף את המתכונים האהובים עליך,
            לערוך אותם לפי הטעם שלך, ולבנות אוסף אישי של מנות שחובה לנסות.
          </Typography>
          <Box sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>הוסף, ערוך, מחק</Box>
          <Typography align="right" paragraph>
            תרגיש כמו שף על ידי הוספת המתכונים שלך לאוסף שלנו. תוכל לערוך אותם בכל עת
            כדי להתאים לסגנון הבישול המשתנה שלך. המטבח שלך, הכללים שלך – תן ליצירתיות שלך
            לזרוח!
          </Typography>
          <Box sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>שמור את המועדפים שלך</Box>
          <Typography align="right" paragraph>
            אהבת מתכון? שמור אותו במועדפים! כך תוכל לחזור בקלות למנות שהכי אהבת בלי
            לגלול באוסף כולו.
          </Typography>
          <Box sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>בחר את תצוגת המתכונים</Box>
          <Typography align="right" paragraph>
            Tasting מבין שלכל אחד יש דרך שונה לגלוש. בחר בין טבלת מתכונים מסודרת או תצוגת
            כרטיסים נוחה כדי לגלות מתכונים – הכל תלוי במה שנוח לך.
          </Typography>
          <Box sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>עיצוב פשוט ויפה</Box>
          <Typography align="right" paragraph>
            Tasting לא רק פרקטי, הוא גם יפה! תהנה מעיצוב נקי וידידותי שמעצים את חוויית הבישול שלך.
          </Typography>
          <Box sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>הצטרף אלינו ל-Tasting</Box>
          <Typography align="right" paragraph>
            בין אם אתה שף מנוסה או רק מתחיל, Tasting כאן כדי להפוך את המסע הקולינרי שלך
            למרגש וטעים. הצטרף אלינו ובוא נעשה כל ארוחה לחוויה.
          </Typography>
          <Typography className="welcome1" align="right">
            בהצלחה בהרפתקאות הקולינריות שלך ב-Tasting!
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
