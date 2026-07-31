import { FormControl, InputLabel, MenuItem,Select } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category';

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
    )
}

export default memo(FilterComp)