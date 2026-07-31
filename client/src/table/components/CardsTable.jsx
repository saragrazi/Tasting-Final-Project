import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { heIL } from '@mui/x-data-grid/locales';
import { useTheme } from '../../providers/ThemeProvider';
import useTableCreator from '../hooks/useTableCreator';
import { array } from 'prop-types';

const dataGridHebrewText = heIL.components.MuiDataGrid.defaultProps.localeText;

export default function CardsTable({ cards }) {
  const {isDark} = useTheme()
  const {columns, rows, onRowClick}= useTableCreator(cards)

  return (
    <Box mt={3} style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={150}
        onRowClick={onRowClick}
        localeText={dataGridHebrewText}
        sx={{
          boxShadow: isDark ? "1px 1px 5px 1px #78A75A" : "1px 1px 5px 1px #d4e8b9",
          border: 1,
          borderColor: '#457127',
          '& .MuiDataGrid-cell': {
            py: 1.5,
            alignItems: 'center',
          },
          '& .MuiDataGrid-row': {
            minHeight: 150,
            cursor: 'pointer',
          },
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.light',
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{field: 'rating', sort: 'desc'}]
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        pageSizeOptions={[6, 10]}
        disableRowSelectionOnClick
      // checkboxSelection
      />
    </Box>
  );
}

CardsTable.prototype = {
  cards:array.isRequired,
}
