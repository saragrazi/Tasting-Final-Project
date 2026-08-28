import React, { useEffect } from "react";
import { func, object, string, bool, array } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import IngredientListInput from "../../forms/components/IngredientListInput";
import DynamicListInput from "../../forms/components/DynamicListInput";
import { FormControl, FormControlLabel, Checkbox, FormLabel, Grid, InputLabel, MenuItem, Select, Typography, Box, Button } from "@mui/material";
import RecipeImagesInput from "./RecipeImagesInput";
import MEASURING_CUP_OPTIONS from "../models/measuringCupOptions";
import CATEGORY_OPTIONS from "../models/categoryOptions";
import { useUser } from "../../users/providers/UserProvider";
import useUsers from "../../users/hooks/useUsers";
import { FORM_MAX_WIDTH } from "../../forms/constants";



const CardForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  onInputBlur,
  data,
  title,
  submitLabel,
  pending,
  currentImages,
  onCurrentImagesChange,
  newImages,
  onNewImagesChange,
}) => {
  const { user } = useUser();
  const { handleBecomeBusiness, businessPending } = useUsers();
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
      styles={{
        maxWidth: `${FORM_MAX_WIDTH}px`,
        display: "flex",
        flexDirection: "column",
        direction: "rtl",
        textAlign: "right",
        "& .MuiInputBase-input, & .MuiInputLabel-root, & .MuiTypography-body1, & .MuiTypography-body2": {
          fontSize: "1.05rem",
        },
      }}
      title={title}
      submitLabel={submitLabel}
      pending={pending}
      spacing={1}
    >
      <Grid item xs={12}>
        <Box sx={{ width: "100%", p: 1.5, borderRadius: 1, backgroundColor: "rgba(208,107,107,0.08)" }}>
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
                disabled={businessPending}
              >
                הפוך לעסקי - ללא עלות
              </Button>
            </>
          )}
        </Box>
      </Grid>
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
        label="תאור קצר (רשות)"
        error={errors.subtitle}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        required={false}
        multiline={true}
      />
      <Input
        name="inspiredBy"
        label="בהשראת (רשות)"
        error={errors.inspiredBy}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        required={false}
      />
      <Input
        name="prepTime"
        label="זמן הכנה בדקות (רשות)"
        type="number"
        error={errors.prepTime}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        required={false}
      />
      <Grid item xs={12}>
        <Typography
          variant="caption"
          dir="rtl"
          sx={{
            display: "block",
            mb: 0.5,
            textAlign: "right",
            color: "#d32f2f",
            visibility: errors.measuringCup || (data?.measuringCup !== null && !data?.measuringCup) ? "visible" : "hidden",
          }}
        >
          {errors.measuringCup || "שדה חובה"}
        </Typography>
        <FormControl fullWidth disabled={data?.measuringCup === null}>
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
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="caption"
          dir="rtl"
          sx={{
            display: "block",
            mb: 0.5,
            textAlign: "right",
            color: "#d32f2f",
            visibility: errors.category || !data?.category ? "visible" : "hidden",
          }}
        >
          {errors.category || "שדה חובה"}
        </Typography>
        <FormControl fullWidth>
          <InputLabel sx={{ display: "flex" }}>קטגוריה</InputLabel>
          <Select
            label="קטגוריה"
            onChange={onInputChange}
            value={data?.category ? data?.category : ""}
            name="category"
            error={Boolean(errors.category)}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <IngredientListInput
          name="ingredients"
          label="מרכיבים "
          value={data.ingredients}
          onChange={onInputChange}
          error={errors.ingredients}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <DynamicListInput
          name="cookingSteps"
          label="אופן ההכנה"
          addLabel="הוסף שלב"
          itemLabel="שלב הכנה"
          value={data.cookingSteps}
          onChange={onInputChange}
          error={errors.cookingSteps}
          required
        />
      </Grid>
      <Input
        name="tips"
        label="טיפים (רשות)"
        error={errors.tips}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        multiline={true}
        required={false}
      />
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <FormLabel sx={{ mb: 1 }}>תמונות המנה (רשות)</FormLabel>
          <RecipeImagesInput
            currentImages={currentImages}
            onCurrentImagesChange={onCurrentImagesChange}
            newImages={newImages}
            onNewImagesChange={onNewImagesChange}
          />
        </FormControl>
      </Grid>
      <Input
        name="videoLink"
        label="קישור לסרטון הכנה (רשות)"
        error={errors.videoLink}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        required={false}
      />
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Checkbox
                checked={Boolean(data?.contentPolicyAccepted)}
                onChange={(e) => {
                  onInputChange({ target: { name: "contentPolicyAccepted", value: e.target.checked } });
                }}
              />
            }
            label={
              <Typography variant="caption" sx={{ fontSize: "0.85rem", lineHeight: 1.4 }}>
                אני מאשר/ת כי התוכן והתמונות שהעליתי הם שלי או שיש לי רשות להשתמש בהם, וכי פרסומם אינו מפר זכויות של אחרים. ניתן להיעזר במתכונים קיימים כהשראה, אך אין להעתיק תוכן או תמונות.
              </Typography>
            }
          />
          {errors.contentPolicyAccepted && (
            <Typography variant="caption" color="error" dir="rtl" sx={{ display: "block", textAlign: "right" }}>
              {errors.contentPolicyAccepted}
            </Typography>
          )}
        </Box>
      </Grid>
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
  data: object.isRequired,
  title: string.isRequired,
  submitLabel: string,
  pending: bool,
  currentImages: array,
  onCurrentImagesChange: func,
  newImages: array,
  onNewImagesChange: func,
};

CardForm.defaultProps = {
  pending: false,
  currentImages: [],
  onCurrentImagesChange: () => {},
  newImages: [],
  onNewImagesChange: () => {},
};

export default React.memo(CardForm);