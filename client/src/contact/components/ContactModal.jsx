import React, { useEffect } from "react";
import { bool, func } from "prop-types";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { useTheme } from "../../providers/ThemeProvider";
import { useUser } from "../../users/providers/UserProvider";
import { useSnack } from "../../providers/SnackbarProvider";
import useForm from "../../forms/hooks/useForm";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import initialContactForm from "../helpers/initialContactForm";
import { contactSchema } from "../models/joi-schema/contactSchema";
import { sendContactMessage } from "../services/contactService";
import { getUser } from "../../users/services/usersApiService";

const ContactModal = ({ open, onClose }) => {
  const { isDark } = useTheme();
  const { user } = useUser();
  const { setSnack } = useSnack();

  const handleSend = async (data) => {
    try {
      await sendContactMessage(data);
      setSnack("success", "הפנייה נשלחה בהצלחה! נחזור אליך בהקדם.");
      rest.handleReset();
      onClose();
    } catch (error) {
      setSnack("error", error || "שליחת הפנייה נכשלה, נסה שוב מאוחר יותר");
    }
  };

  const { value, ...rest } = useForm(initialContactForm, contactSchema, handleSend);

  useEffect(() => {
    if (!open || !user) return;
    getUser(user._id)
      .then((profile) => {
        rest.setData((prev) => ({
          ...prev,
          name: `${profile.name?.first || ""} ${profile.name?.last || ""}`.trim(),
          email: profile.email || prev.email,
        }));
      })
      .catch(() => {});
    // eslint-disable-next-line
  }, [open, user]);

  const handleClose = () => {
    rest.handleReset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            outline: "none",
            borderRadius: "20px",
            p: 4,
            maxWidth: "450px",
            width: "100%",
            backgroundColor: isDark ? "#2b2b2b" : "#fff",
            color: isDark ? "#f0f0f0" : "#000",
            boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          }}
        >
          <Form
            onSubmit={rest.onSubmit}
            onReset={rest.handleReset}
            onChange={rest.validateForm}
            title="יצירת קשר"
            submitLabel="שלח"
            pending={rest.pending}
            styles={{ maxWidth: "100%", direction: "rtl", textAlign: "right" }}
          >
            <Input
              name="name"
              label="שם מלא"
              error={value.errors.name}
              onChange={rest.handleChange}
              onBlur={rest.handleBlur}
              data={value.data}
            />
            <Input
              name="email"
              label="אימייל לתגובה"
              type="email"
              error={value.errors.email}
              onChange={rest.handleChange}
              onBlur={rest.handleBlur}
              data={value.data}
            />
            <Input
              name="subject"
              label="נושא הפנייה"
              error={value.errors.subject}
              onChange={rest.handleChange}
              onBlur={rest.handleBlur}
              data={value.data}
              multiline
            />
            <Input
              name="message"
              label="תיאור הפנייה"
              error={value.errors.message}
              onChange={rest.handleChange}
              onBlur={rest.handleBlur}
              data={value.data}
              multiline
            />
          </Form>
        </Box>
      </Fade>
    </Modal>
  );
};

ContactModal.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
};

export default ContactModal;
