import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

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
                            fetch('http://localhost:3001/strategy', {
                                method: 'GET'
                            })
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                              console.log(error)
                            });
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
                            fetch('http://localhost:3001/cancel', {
                                method: 'GET'
                            })
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                              console.log(error)
                            });
                        }}
                    >
                        Cancel
                    </Button>
                </strong>
            </Stack>
        )
    }

    const percFormatter = (params) => {
        const valueFormatted = Number(params.value * 100).toLocaleString();

        return `${valueFormatted}%`;
    }

    const columns = [
        { 
            field: 'vault', 
            headerName: 'Vault', 
            minWidth: 225, 
            flex: 3, 
            disableClickEventBubbling: true ,
            renderCell: (params) => (
                <Stack direction='row' spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img alt={params.value.name} src={params.value.image} width={35} height={35} layout='fixed' />
                    </Box>
                    <Stack>
                        {/* <Typography>{params.value.name} Delta (1.8x)</Typography> */}
                        <Typography color="textSecondary">{params.value.poolName}</Typography>
                    </Stack>
                </Stack>
            )
        },
        { 
            field: 'tvl', 
            headerName: 'TVL', 
            type: 'number', 
            minWidth: 120, 
            align: "left", 
            headerAlign: "left", 
            flex: 1, 
            disableClickEventBubbling: true,
        },
        { 
            field: 'apy', 
            headerName: 'APY', 
            type: 'number', 
            minWidth: 120, 
            align: "left", 
            headerAlign: "left", 
            flex: 1, 
            disableClickEventBubbling: true,
            valueFormatter: percFormatter,
        },
        { 
            field: 'balance', 
            headerName: 'Your Balance', 
            minWidth: 150, 
            align: "left", 
            headerAlign: "left", 
            flex: 2, 
            disableClickEventBubbling: true 
        },
        { 
            field: 'deposit', 
            headerName: '', 
            minWidth: 150, 
            flex: 2, 
            renderCell: renderButtons, 
            sortable: false, 
            disableClickEventBubbling: true
        }
      ];
      
    const rows = [
        { id: 1, vault: {"name": "USDC-USDT", "poolName": "USDC-USDT", "image": '/images/crypto/usdc.png'}, tvl: "$10k", apy: 0.08, balance: "0" },
        { id: 2, vault: {"name": "ETH-USDC", "poolName": "ETH-USDC", "image": '/images/crypto/eth.png'}, tvl: "$5k", apy: 0.25, balance: "0" },
    ];

    function FilterToolbar() {
    return (
        <GridToolbarContainer sx={{ minHeight: 50 }}>
        <Grid container>
            <Grid item xs={6}> 
                <Typography variant='h5' sx={{ marginBottom: 2, marginLeft: 5, marginTop: 3 }}>
                Available Vaults
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
        // <RainbowWallet>
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
        // </RainbowWallet>
    )
}