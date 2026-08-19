import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import PageHeader from "../components/PageHeader";
import { useContactModal } from "../contact/providers/ContactModalProvider";

const SectionTitle = ({ children }) => (
  <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "bold", color: "#d06b6b" }}>
    {children}
  </Typography>
);

const Bullet = ({ children }) => (
  <Typography component="li" sx={{ mb: 0.5 }}>
    {children}
  </Typography>
);

const TermsPage = () => {
  const { openContactModal } = useContactModal();

  return (
    <Container maxWidth="md" sx={{ direction: "rtl", textAlign: "right", pb: 4 }}>
      <PageHeader title="תנאי שימוש – Tasting" subtitle="עדכון אחרון: אוגוסט 2026" />

      <Typography paragraph>
        ברוכים הבאים ל־Tasting – אתר לשיתוף, גילוי וניהול מתכונים (להלן: "האתר"). השימוש באתר
        ובשירותים המוצעים בו כפוף לתנאי שימוש אלה.
      </Typography>

      <SectionTitle>1. הסכמה לתנאים</SectionTitle>
      <Typography paragraph>
        השימוש באתר, לרבות יצירת חשבון, העלאת מתכונים, תמונות או כל תוכן אחר, מהווה הסכמה לתנאי
        שימוש אלה.
      </Typography>
      <Typography paragraph>אם אינך מסכים/ה לתנאים אלה, אין לעשות שימוש בשירותי האתר.</Typography>

      <SectionTitle>2. חשבון משתמש</SectionTitle>
      <Typography paragraph>
        המשתמש אחראי למסירת פרטים נכונים ומדויקים בעת יצירת החשבון ולשמירה על פרטי ההתחברות שלו.
      </Typography>
      <Typography paragraph>
        המשתמש אחראי לכל פעילות המתבצעת באמצעות חשבונו ועליו להודיע לאתר במקרה של שימוש בלתי
        מורשה בחשבון.
      </Typography>

      <SectionTitle>3. העלאת מתכונים ותוכן</SectionTitle>
      <Typography paragraph>
        המשתמש רשאי להעלות לאתר מתכונים, תמונות ותוכן נוסף, בכפוף לתנאים אלה.
      </Typography>
      <Typography paragraph>בעת פרסום מתכון, המשתמש מצהיר ומאשר כי:</Typography>
      <Typography component="ul" sx={{ pr: 3 }}>
        <Bullet>המתכון נוסח על ידו.</Bullet>
        <Bullet>התמונות שהעלה צולמו על ידו.</Bullet>
        <Bullet>
          התוכן אינו מפר זכויות יוצרים, זכויות קניין רוחני, זכויות פרטיות או זכויות אחרות של צד
          שלישי.
        </Bullet>
        <Bullet>
          התוכן אינו כולל חומר שהועתק מאתר, ספר, בלוג, רשת חברתית או מקור אחר ללא הרשאה מתאימה.
        </Bullet>
        <Bullet>התוכן אינו כולל מידע מטעה, בלתי חוקי או תוכן הפוגע באדם אחר.</Bullet>
      </Typography>
      <Typography paragraph sx={{ mt: 1 }}>
        המשתמש אחראי באופן מלא לתוכן שהוא מעלה לאתר.
      </Typography>

      <SectionTitle>4. זכויות בתוכן שהועלה</SectionTitle>
      <Typography paragraph>
        הזכויות בתוכן שהמשתמש יצר והעלה לאתר נשארות בבעלותו, בכפוף לרישיון המוענק ל־Tasting
        בהתאם לתנאים אלה.
      </Typography>
      <Typography paragraph>
        בעת העלאת תוכן לאתר, המשתמש מעניק ל־Tasting רישיון לא בלעדי להציג, לאחסן, לשכפל ולהפיץ
        את התוכן במסגרת הפעלת האתר והשירותים הניתנים באמצעותו.
      </Typography>
      <Typography paragraph>
        רישיון זה נדרש כדי לאפשר ל־Tasting להציג את המתכונים והתמונות למשתמשים אחרים באתר.
      </Typography>

      <SectionTitle>5. זכויות יוצרים וקניין רוחני</SectionTitle>
      <Typography paragraph>
        אין להעלות לאתר תוכן או תמונות השייכים לאחרים ללא הרשאה מתאימה.
      </Typography>
      <Typography paragraph>
        אין להעתיק, לשכפל, להפיץ או לעשות שימוש בתוכן המופיע באתר ללא הרשאה, למעט שימושים
        המותרים על פי דין.
      </Typography>
      <Typography paragraph>
        Tasting מכבד את זכויות הקניין הרוחני של אחרים. במקרה שבו תתקבל פנייה בנוגע לתוכן שלכאורה
        מפר זכויות, האתר רשאי לבדוק את הפנייה ולהסיר או להגביל את הגישה לתוכן הרלוונטי.
      </Typography>

      <SectionTitle>6. הסרת תוכן</SectionTitle>
      <Typography paragraph>
        Tasting רשאי להסיר, להסתיר או להגביל גישה לתוכן שהועלה לאתר, בין היתר במקרה של:
      </Typography>
      <Typography component="ul" sx={{ pr: 3 }}>
        <Bullet>חשד להפרת זכויות יוצרים או זכויות אחרות.</Bullet>
        <Bullet>הפרת תנאי השימוש.</Bullet>
        <Bullet>קבלת תלונה או דרישה מבעל זכויות.</Bullet>
        <Bullet>תוכן בלתי חוקי או פוגעני.</Bullet>
        <Bullet>תוכן שאינו מתאים למטרות האתר.</Bullet>
      </Typography>
      <Typography paragraph sx={{ mt: 1 }}>
        האתר רשאי גם להסיר תוכן מטעמים טכניים, תפעוליים או לפי שיקול דעתו.
      </Typography>

      <SectionTitle>7. דיווח על תוכן</SectionTitle>
      <Typography paragraph>
        משתמש או בעל זכויות הסבור כי תוכן המופיע באתר מפר את זכויותיו רשאי לפנות ל־Tasting
        ולמסור פרטים בנוגע לתוכן ולזכויות הנטענות.
      </Typography>
      <Typography paragraph>
        Tasting רשאי לבקש מידע או מסמכים נוספים לצורך בדיקת הפנייה.
      </Typography>

      <SectionTitle>8. שימוש אסור באתר</SectionTitle>
      <Typography paragraph>אין להשתמש באתר לצורך:</Typography>
      <Typography component="ul" sx={{ pr: 3 }}>
        <Bullet>העלאת תוכן המפר זכויות של אחרים.</Bullet>
        <Bullet>התחזות לאדם אחר.</Bullet>
        <Bullet>הפצת תוכן בלתי חוקי.</Bullet>
        <Bullet>פגיעה באתר, במערכותיו או במשתמשים אחרים.</Bullet>
        <Bullet>ניסיון להשיג גישה בלתי מורשית למידע או לחשבונות.</Bullet>
        <Bullet>שימוש אוטומטי או מסחרי באתר ללא אישור.</Bullet>
      </Typography>

      <SectionTitle>9. תוכן האתר</SectionTitle>
      <Typography paragraph>
        העיצוב, המיתוג, הקוד, הגרפיקה, הלוגו ותכנים אחרים השייכים ל־Tasting הם רכוש האתר או
        ניתנים לו ברישיון, ואין להעתיקם או לעשות בהם שימוש ללא הרשאה.
      </Typography>

      <SectionTitle>10. אחריות לתוכן</SectionTitle>
      <Typography paragraph>
        המתכונים והתכנים המועלים על ידי משתמשים משקפים את דעתם ואחריותם של המשתמשים שהעלו אותם.
      </Typography>
      <Typography paragraph>
        Tasting אינו אחראי לנכונות, שלמות או התאמת מתכון מסוים לצרכיו של משתמש כלשהו.
      </Typography>

      <SectionTitle>11. זמינות האתר</SectionTitle>
      <Typography paragraph>
        Tasting עושה מאמצים לשמור על פעילות תקינה וזמינה של האתר, אך אינו מתחייב שהאתר יהיה זמין
        בכל עת או שהשירות יהיה נקי מתקלות או הפרעות.
      </Typography>

      <SectionTitle>12. שינויים באתר ובתנאי השימוש</SectionTitle>
      <Typography paragraph>
        Tasting רשאי לעדכן מעת לעת את האתר ואת תנאי השימוש. הגרסה המעודכנת של התנאים תפורסם
        באתר ותהיה בתוקף ממועד פרסומה, אלא אם צוין אחרת.
      </Typography>

      <SectionTitle>13. פרטיות</SectionTitle>
      <Typography paragraph>
        השימוש במידע אישי הנאסף במסגרת השימוש באתר נעשה בהתאם למדיניות הפרטיות של Tasting.
      </Typography>

      <SectionTitle>14. דין וסמכות שיפוט</SectionTitle>
      <Typography paragraph>על תנאי שימוש אלה יחולו דיני מדינת ישראל.</Typography>
      <Typography paragraph>
        כל מחלוקת הנוגעת לשימוש באתר תידון בהתאם לדין ולסמכות השיפוט המוסמכת בישראל.
      </Typography>

      <SectionTitle>15. יצירת קשר</SectionTitle>
      <Typography paragraph>
        לשאלות, דיווחים בנוגע לתוכן או פניות בנושא זכויות יוצרים ניתן ליצור קשר עם Tasting{" "}
        <Link component="button" type="button" onClick={openContactModal} sx={{ cursor: "pointer" }}>
          כאן
        </Link>
        .
      </Typography>

      <Typography paragraph sx={{ mt: 3, fontWeight: "bold" }}>
        השימוש באתר מהווה אישור כי המשתמש קרא את תנאי השימוש והסכים להם.
      </Typography>
    </Container>
  );
};

export default TermsPage;
