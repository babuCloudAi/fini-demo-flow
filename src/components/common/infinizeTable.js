import React from 'react';
import {DataGrid} from '@mui/x-data-grid';

export function InfinizeTable({
    rows,
    columns,
    customClassName,
    isLoading,
    initialState,
    isRowSelectable,
    pageSizeOptions,
    getRowId,
    checkboxSelection = false,
    onRowSelectionModelChange
}) {
    return (
        <DataGrid
            className={customClassName}
            checkboxSelection={checkboxSelection}
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            disableColumnResize
            hideFooterPagination
            loading={isLoading}
            initialState={initialState}
            isRowSelectable={isRowSelectable}
            pageSizeOptions={pageSizeOptions}
            getRowId={getRowId}
            onRowSelectionModelChange={onRowSelectionModelChange}
        />
    );
}
