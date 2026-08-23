import { FormControl, InputLabel, MenuItem,Select } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category';
import CATEGORY_OPTIONS from "../cards/models/categoryOptions";

import { memo } from "react"

const FilterComp = ({handleOnChange, sortBy}) => {

    return (
        <FormControl fullWidth>
<InputLabel color="success" sx={{ right: 16, left: 'auto', transformOrigin: 'top right', display: 'flex', alignItems: 'center', gap: 1 }}>
  <CategoryIcon />
  בחר קטגוריה לסינון
</InputLabel>
            <Select
                value={sortBy}
                defaultValue={""}
                label="קטגוריה"
                variant="filled"
                onChange={handleOnChange}
            >
                <MenuItem value={""}>כל המתכונים</MenuItem>
                {CATEGORY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}

            </Select>
        </FormControl>
    )
}

export default memo(FilterComp)