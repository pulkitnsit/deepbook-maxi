import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

export default function Lend() {
    const renderButtons = (params) => {
        return (
            <Stack spacing={3}>
                <strong>
                    <Button
                        variant="contained"
                        color="info"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            // parseName(params.row.col6)
                            console.log(params.row)
                        }}
                    >
                        Deposit
                    </Button>
                </strong>
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            // parseName(params.row.col6)
                            console.log(params.row)
                        }}
                    >
                        Withdraw
                    </Button>
                </strong>
            </Stack>
        )
    }

    const columns = [
        { field: 'pool', headerName: 'Pool', minWidth: 100, flex: 1, disableClickEventBubbling: true },
        { field: 'apy', headerName: 'APY', type: 'number', minWidth: 150, align: "left", headerAlign: "left", flex: 3, disableClickEventBubbling: true },
        { field: 'lastName', headerName: 'Last name', minWidth: 150, flex: 3, disableClickEventBubbling: true },
        { field: 'age', headerName: 'Age', type: 'number', minWidth: 120, align: "left", headerAlign: "left", flex: 2, disableClickEventBubbling: true},
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          minWidth: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
          flex: 4, 
          disableClickEventBubbling: true
        },
        { field: 'deposit', headerName: '', minWidth: 100, flex: 2, renderCell: renderButtons, sortable: false, disableClickEventBubbling: true}
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null }
      ];

    function FilterToolbar() {
    return (
        <GridToolbarContainer sx={{ minHeight: 50 }}>
        <Grid container>
            <Grid item xs={6}> 
                <Typography variant='h5' sx={{ marginBottom: 2, marginLeft: 5, marginTop: 3 }}>
                Lending Pools
                </Typography>
            </Grid>
            <Grid item xs={6}> 
            <Stack direction="row" justifyContent="end" sx={{ marginBottom: 2, marginRight: 2, marginTop: 2 }}>
                <GridToolbarQuickFilter />
            </Stack>
            </Grid>
        </Grid>
        {/* <GridToolbarQuickFilter /> */}
        {/* <GridToolbarQuickFilter /> */}
        </GridToolbarContainer>
    );
    }

    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                onCellClick={(event)=> event.stopPropagation}
                sx={{ "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                    outline: "none !important"} }}
                rows={rows}
                columns={columns}
                autoHeight={true}
                rowHeight={100}
                pageSize={25}
                rowsPerPageOptions={[25]}
                // checkboxSelection
                // disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableSelectionOnClick
                components={{ Toolbar: FilterToolbar }}
                componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
        }} />
        </div>
    )
}