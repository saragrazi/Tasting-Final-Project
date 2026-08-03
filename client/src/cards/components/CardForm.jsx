import React, { useEffect } from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import DynamicListInput from "../../forms/components/DynamicListInput";
import IngredientListInput from "../../forms/components/IngredientListInput";
import { FormControl, FormControlLabel, Checkbox, FormLabel, InputLabel, MenuItem, Select, Typography, Box, Button } from "@mui/material";
import FileInput from "../../forms/components/FileInput";
import MEASURING_CUP_OPTIONS from "../models/measuringCupOptions";
import { useUser } from "../../users/providers/UserProvider";
import useUsers from "../../users/hooks/useUsers";



const CardForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  onInputBlur,
  handleFileUpload,
  data,
  title,
}) => {
  const { user } = useUser();
  const { handleBecomeBusiness } = useUsers();
  const isBusiness = Boolean(user?.isBusiness);

  useEffect(() => {
    if (!isBusiness && data.isPrivate !== true) {
      onInputChange({ target: { name: "isPrivate", value: true } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBusiness]);

  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      errors={errors}
      onChange={onFormChange}
      styles={{ maxWidth: "400px", display: "flex", flexDirection: "column", direction: "rtl", textAlign: "right" }}
      title={title}
    >
      <Input
        name="title"
        label="שם המתכון"
        error={errors.title}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
      />


      <Input
        name="subtitle"
        label="תאור קצר"
        error={errors.subtitle}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
      />
      <IngredientListInput
        name="ingredients"
        label="מרכיבים "
        value={data.ingredients}
        onChange={onInputChange}
        error={errors.ingredients}
      />
      <DynamicListInput
        name="cookingSteps"
        label="אופן ההכנה"
        addLabel="הוסף שלב"
        value={data.cookingSteps}
        onChange={onInputChange}
        error={errors.cookingSteps}
      />
        <FormControl sx={{ marginLeft: "8px", marginTop: "15px" }} fullWidth>
          <InputLabel sx={{ display: "flex" }}>קטגוריה</InputLabel>
          <Select
            label="קטגוריה"
            onChange={onInputChange}
            value={data?.category ? data?.category : ""}
            name="category"
          >
            <MenuItem value={"ארוחות בשר"}>ארוחות בשר</MenuItem>
            <MenuItem value={"ארוחות חלביות"}>ארוחות חלביות</MenuItem>
            <MenuItem value={"דגים"}>דגים</MenuItem>
            <MenuItem value={"סלטים"}>סלטים</MenuItem>
            <MenuItem value={"קינוחים"}>קינוחים</MenuItem>
            <MenuItem value={"עוגות ועוגיות"}>עוגות ועוגיות</MenuItem>
            <MenuItem value={"פשטידות"}>פשטידות</MenuItem>
            <MenuItem value={"לחמים"}>לחמים</MenuItem>
          </Select>
        </FormControl>
      <Input
        name="prepTime"
        label="זמן הכנה (בדקות)"
        type="number"
        error={errors.prepTime}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
      />
      <FormControl sx={{ marginLeft: "8px", marginTop: "15px" }} fullWidth disabled={data?.measuringCup === null}>
        <InputLabel sx={{ display: "flex" }}>כוס מדידה</InputLabel>
        <Select
          label="כוס מדידה"
          onChange={onInputChange}
          value={data?.measuringCup ? data?.measuringCup : ""}
          name="measuringCup"
          error={Boolean(errors.measuringCup)}
        >
          {MEASURING_CUP_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        sx={{ mr: 0 }}
        control={
          <Checkbox
            checked={data?.measuringCup === null}
            onChange={(e) => {
              const checked = e.target.checked;
              onInputChange({ target: { name: "measuringCup", value: checked ? null : "" } });
            }}
          />
        }
        label={<Typography variant="body2">לא השתמשתי בכוס מדידה במתכון זה</Typography>}
      />
      <Box sx={{ width: "100%", mt: 2, p: 1.5, borderRadius: 1, backgroundColor: "rgba(208,107,107,0.08)" }}>
        <FormControlLabel
          sx={{ mr: 0 }}
          control={
            <Checkbox
              checked={Boolean(data?.isPrivate)}
              disabled={!isBusiness}
              onChange={(e) => {
                onInputChange({ target: { name: "isPrivate", value: e.target.checked } });
              }}
            />
          }
          label={<Typography variant="body2" sx={{ fontWeight: 600 }}>פרטי - לא לפרסום</Typography>}
        />
        {isBusiness ? (
          <Typography variant="caption" color="text.secondary" display="block">
            אם תסמנו, המתכון יופיע רק אצלכם ב"המתכונים שלי" ולא יוצג לאף אחד אחר. אם לא, כולם יוכלו לראות אותו.
          </Typography>
        ) : (
          <>
            <Typography variant="caption" color="text.secondary" display="block">
              מתכונים של משתמשים רגילים תמיד נשארים פרטיים ונראים רק אצלכם. כדי לפרסם מתכון לכולם, צריך חשבון עסקי.
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              sx={{ mt: 1 }}
              onClick={handleBecomeBusiness}
            >
              הפוך לחשבון עסקי
            </Button>
          </>
        )}
      </Box>
      <Input
        name="tips"
        label="טיפים"
        error={errors.tips}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        multiline={true}
      />
      <Input
        name="videoLink"
        label="קישור לסרטון הכנה"
        error={errors.videoLink}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        required={false}
      />
      <FormControl sx={{ marginLeft: "8px", marginTop: "5px", width: "100%" }}>
        <FormLabel>
          {title === "ערוך מתכון" ? "החלפת תמונת מנה (רשות)" : "העלאת תמונת מנה (רשות)"}
        </FormLabel>
        <FileInput
          name="dishImage"
          label=""
          onChange={handleFileUpload}
          type="file"
          accept="image/*"
          error={errors.dishImage}
          data={data}
          required={false}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          {title === "ערוך מתכון"
            ? "ניתן להעלות קובץ תמונה בלבד. אם לא תעלו תמונה חדשה, התמונה הקיימת תישאר."
            : "ניתן להעלות קובץ תמונה בלבד. אם לא תעלו תמונה, תוצג תמונת ברירת מחדל."}
        </Typography>
      </FormControl>
    </Form>
  );
};

CardForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  onInputBlur: func,
  onFileChange: func,
  data: object.isRequired,
  title: string.isRequired,
};

export default React.memo(CardForm);