import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '../../providers/ThemeProvider';
import useTableCreator from '../hooks/useTableCreator';
import { array } from 'prop-types';


export default function CardsTable({ cards }) {
  const {isDark} = useTheme()
  const {columns, rows}= useTableCreator(cards)

  return (
    <Box mt={3} style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          boxShadow: isDark ? "1px 1px 5px 1px #78A75A" : "1px 1px 5px 1px #d4e8b9",
          border: 1,
          borderColor: '#457127',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.light',
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{field: 'likes', sort: 'desc'}]
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      // checkboxSelection
      />
    </Box>
  );
}

CardsTable.prototype = {
  cards:array.isRequired,
}