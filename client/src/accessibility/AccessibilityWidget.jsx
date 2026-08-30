import React, { useCallback, useEffect, useMemo, useState } from "react";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AccessibleIcon from "@mui/icons-material/Accessible";
import CloseIcon from "@mui/icons-material/Close";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useContactModal } from "../contact/providers/ContactModalProvider";

import "./accessibility.css";

const STORAGE_KEY = "a11y-settings";
const MIN_FONT_SCALE = 80;
const MAX_FONT_SCALE = 160;
const FONT_STEP = 10;

const DEFAULT_SETTINGS = {
  fontScale: 100,
  contrast: false,
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
  stopAnimations: false,
  bigCursor: false,
  focusHighlight: false,
};

const loadSettings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...DEFAULT_SETTINGS, ...saved } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const TOGGLES = [
  { key: "contrast", label: "ניגודיות גבוהה" },
  { key: "grayscale", label: "גווני אפור" },
  { key: "underlineLinks", label: "הדגשת קישורים" },
  { key: "readableFont", label: "גופן קריא" },
  { key: "stopAnimations", label: "עצירת אנימציות" },
  { key: "bigCursor", label: "סמן עכבר מוגדל" },
  { key: "focusHighlight", label: "הדגשת ניווט מקלדת" },
];

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(loadSettings);
  const { openContactModal } = useContactModal();

  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize = `${settings.fontScale}%`;
    html.setAttribute("data-a11y-contrast", String(settings.contrast));
    html.setAttribute("data-a11y-grayscale", String(settings.grayscale));
    html.setAttribute("data-a11y-underline-links", String(settings.underlineLinks));
    html.setAttribute("data-a11y-readable-font", String(settings.readableFont));
    html.setAttribute("data-a11y-stop-animations", String(settings.stopAnimations));
    html.setAttribute("data-a11y-big-cursor", String(settings.bigCursor));
    html.setAttribute("data-a11y-focus-highlight", String(settings.focusHighlight));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggle = useCallback((key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const changeFontScale = useCallback((direction) => {
    setSettings((prev) => {
      const next = prev.fontScale + direction * FONT_STEP;
      return { ...prev, fontScale: Math.min(MAX_FONT_SCALE, Math.max(MIN_FONT_SCALE, next)) };
    });
  }, []);

  const resetSettings = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  const drawerWidth = useMemo(() => ({ xs: "100%", sm: 360 }), []);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 96, sm: 104 },
          left: { xs: 12, sm: 20 },
          zIndex: (theme) => theme.zIndex.drawer + 10,
        }}
      >
        <Tooltip title="נגישות" placement="left">
          <Fab
            size="small"
            aria-label="פתיחת תפריט נגישות"
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "scale(1.08)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
              },
            }}
          >
            <AccessibleIcon />
          </Fab>
        </Tooltip>

        {open && (
          <Tooltip title="סגירת תפריט נגישות" placement="top">
            <IconButton
              aria-label="סגירת תפריט נגישות"
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 30,
                height: 30,
                minHeight: 0,
                padding: 0,
                backgroundColor: "#fff",
                border: "1px solid rgba(0,0,0,0.15)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                zIndex: 1,
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <CloseIcon sx={{ fontSize: 18, color: "text.primary" }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        transitionDuration={0}
        PaperProps={{
          sx: {
            width: drawerWidth,
            p: 0,
            direction: "rtl",
            borderTopRightRadius: { xs: 0, sm: 20 },
            borderBottomRightRadius: { xs: 0, sm: 20 },
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            gap: 1,
            position: "sticky",
            top: 0,
            zIndex: 2,
            backgroundColor: "background.paper",
            px: 2.5,
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" component="h2">
            התאמות נגישות
          </Typography>
          <IconButton
            aria-label="סגירת תפריט נגישות"
            onClick={() => setOpen(false)}
            sx={{ flexShrink: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Box sx={{ px: 2.5, pt: 2, pb: 2.5 }}>
        <Typography variant="subtitle2" gutterBottom>
          גודל טקסט ({settings.fontScale}%)
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Tooltip title="הקטן טקסט">
            <span>
              <IconButton
                aria-label="הקטנת טקסט"
                onClick={() => changeFontScale(-1)}
                disabled={settings.fontScale <= MIN_FONT_SCALE}
              >
                <TextDecreaseIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="הגדל טקסט">
            <span>
              <IconButton
                aria-label="הגדלת טקסט"
                onClick={() => changeFontScale(1)}
                disabled={settings.fontScale >= MAX_FONT_SCALE}
              >
                <TextIncreaseIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        <Stack spacing={0.5}>
          {TOGGLES.map(({ key, label }) => (
            <FormControlLabel
              key={key}
              control={
                <Switch checked={settings[key]} onChange={() => toggle(key)} />
              }
              label={label}
              sx={{
                justifyContent: "space-between",
                ml: 0,
                borderRadius: 2,
                px: 1,
                transition: "background-color 0.15s ease",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            />
          ))}
        </Stack>

        <Button
          startIcon={<RestartAltIcon />}
          onClick={resetSettings}
          sx={{ mt: 2, gap: 1 }}
          fullWidth
          variant="outlined"
        >
          איפוס הגדרות נגישות
        </Button>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          במידה ונתקלתם בבעיית נגישות באתר, נשמח שתפנו אלינו ונטפל בפנייתכם
          בהקדם.
        </Typography>
        <Button
          startIcon={<MailOutlineIcon />}
          onClick={openContactModal}
          variant="text"
          fullWidth
          sx={{ gap: 1 }}
        >
          פנייה בנושא נגישות
        </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default AccessibilityWidget;
