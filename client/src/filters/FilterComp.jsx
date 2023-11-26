import { FormControl, InputLabel, MenuItem,Select } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category';

import { memo } from "react"

const FilterComp = ({handleOnChange, sortBy}) => {

    return (
        <FormControl fullWidth>
            <InputLabel sx={{display:"flex", alignItems:"center"}} color={"success"} variant="filled"><CategoryIcon />Choose Category to filter </InputLabel>
            <Select
                value={sortBy}
                defaultValue={""}
                label="Category"
                variant="filled"
                onChange={handleOnChange}
            >
                <MenuItem value={""}>All Recipes</MenuItem>
                <MenuItem value={"meat-meal"}>Meat-Meal</MenuItem>
                <MenuItem value={"milky-meal"}>Milky-Meal</MenuItem>
                <MenuItem value={"fish"}>Fish</MenuItem>
                <MenuItem value={"salads"}>Salads</MenuItem>
                <MenuItem value={"desserts"}>Desserts</MenuItem>
                <MenuItem value={"cakes-and-cookies"}>Cakes-And-Cookies</MenuItem>
                <MenuItem value={"pies"}>Pies</MenuItem>
                
            </Select>
        </FormControl>
    )
}

export default memo(FilterComp)