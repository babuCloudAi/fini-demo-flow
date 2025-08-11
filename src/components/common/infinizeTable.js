import React from 'react';
import {DataGrid} from '@mui/x-data-grid';

export function InfinizeTable({
    rows,
    columns,
    customClassName,
    isLoading,
    initialState,
    isRowSelectable,
    pageSizeOptions
}) {
    return (
        <DataGrid
            className={customClassName}
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            disableColumnResize
            hideFooterPagination
            loading={isLoading}
            initialState={initialState}
            isRowSelectable={isRowSelectable}
            pageSizeOptions={pageSizeOptions}
        />
    );
}
