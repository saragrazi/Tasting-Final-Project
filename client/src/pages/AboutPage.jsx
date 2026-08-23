import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Typography, Box, Button, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ROUTES from "../routes/routesModel";
import { useUser } from "../users/providers/UserProvider";

const SectionTitle = ({ icon, children }) => (
  <Box sx={{ mt: 3, mb: 1, display: "flex", alignItems: "center", gap: 1, fontWeight: "bold" }}>
    {icon}
    {children}
  </Box>
);

const AboutPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
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
            מסתכלים, או מחפשים רעיון לארוחה הערב - תרגישו בבית. אין כאן מילים מסובכות, רק מתכונים
            טובים ואנשים שאוהבים לבשל.
          </Typography>

          <SectionTitle icon={<MenuBookIcon sx={{ color: "#d06b6b" }} />}>
            מתכונים ברורים ופשוטים
          </SectionTitle>
          <Typography align="right" paragraph>
            בכל מתכון תמצאו רשימת מרכיבים עם כמויות, שלבי הכנה ממוספרים, וזמן הכנה משוער כדי
            שתדעו לתכנן קדימה. יש גם טיפ קטן מהיוצר, ולפעמים גם קישור לסרטון הכנה - למי שאוהב
            לראות ולא רק לקרוא. חיפוש מהיר וסינון לפי קטגוריה עוזרים למצוא בדיוק את מה שמתחשק לכם.
          </Typography>

          <SectionTitle icon={<StarRateIcon sx={{ color: "#d06b6b" }} />}>
            דרגו ותכתבו
          </SectionTitle>
          <Typography align="right" paragraph>
            אהבתם מתכון? תנו לו כוכב. בא לכם להגיד משהו? תכתבו תגובה - ואפשר גם להגיב לתגובה של
            מישהו אחר, כמו שיחה קטנה סביב האוכל.
          </Typography>

          <SectionTitle icon={<AddCircleOutlineIcon sx={{ color: "#d06b6b" }} />}>
            יוצרים מתכון משלכם
          </SectionTitle>
          <Typography align="right" paragraph>
            יש לכם מתכון שאתם גאים בו? בואו תספרו עליו לעולם. אחרי הרשמה או התחברות תוכלו ליצור
            אותו בעצמכם, בלחיצת כפתור. באפשרותכם לבחור האם לשמור את המתכון פרטי אצלכם, או שכולם
            יהנו ממנו. חשבונות רגילים יכולים לשמור מתכונים פרטיים בלבד; כדי לפרסם מתכון לכולם צריך
            לשדרג בחינם לחשבון עסקי, מעמוד הפרופיל.
          </Typography>

          <SectionTitle icon={<FavoriteIcon sx={{ color: "#d06b6b" }} />}>
            המועדפים שלכם
          </SectionTitle>
          <Typography align="right" paragraph>
            מצאתם משהו שאתם יודעים שתרצו לבשל שוב? שמרו אותו במועדפים בלחיצת כפתור, וכך תמצאו
            אותו שוב במקום אחד - בלי לחפש מחדש בין כל המתכונים.
          </Typography>

          <Typography className="welcome1" align="right" sx={{ mt: 2, fontWeight: "bold" }}>
            אז מה מבשלים היום? בואו נגלה ביחד!
          </Typography>

          <Typography className="welcome1" align="right" sx={{ mt: 2, fontWeight: "bold" }}>
            בתיאבון!
          </Typography>

          <Typography variant="caption" color="text.secondary" align="right" display="block" sx={{ mt: 2 }}>
            השימוש באתר מהווה אישור כי המשתמש קרא את{" "}
            <Link component={RouterLink} to={ROUTES.TERMS}>
              תנאי השימוש
            </Link>{" "}
            והסכים להם.
          </Typography>

          {!user && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 1,
                backgroundColor: "rgba(208,107,107,0.08)",
                textAlign: "center",
              }}
            >
              <Typography sx={{ mb: 2 }}>
                עדיין לא איתנו? מחכים לכם!
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#d06b6b", "&:hover": { backgroundColor: "#b5585a" } }}
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  התחברות
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#d06b6b", borderColor: "#d06b6b" }}
                  onClick={() => navigate(ROUTES.SIGNUP)}
                >
                  הרשמה
                </Button>
              </Box>
            </Box>
          )}
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
