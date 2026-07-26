import { FormControl, InputLabel, MenuItem,Select } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category';

import { memo } from "react"

const FilterComp = ({handleOnChange, sortBy}) => {

    return (
        <FormControl fullWidth>
            <InputLabel sx={{display:"flex", alignItems:"center"}} color={"success"} variant="filled"><CategoryIcon />בחר קטגוריה לסינון</InputLabel>
            <Select
                value={sortBy}
                defaultValue={""}
                label="קטגוריה"
                variant="filled"
                onChange={handleOnChange}
            >
                <MenuItem value={""}>כל המתכונים</MenuItem>
                <MenuItem value={"meat-meal"}>ארוחות בשר</MenuItem>
                <MenuItem value={"milky-meal"}>ארוחות חלביות</MenuItem>
                <MenuItem value={"fish"}>דגים</MenuItem>
                <MenuItem value={"salads"}>סלטים</MenuItem>
                <MenuItem value={"desserts"}>קינוחים</MenuItem>
                <MenuItem value={"cakes-and-cookies"}>עוגות ועוגיות</MenuItem>
                <MenuItem value={"pies"}>פשטידות</MenuItem>
                
            </Select>
        </FormControl>
    )
}

export default memo(FilterComp)