import React from 'react';
import {Pagination} from '@mui/material';
import classes from './common.module.css';

export function InfinizePagination({onPageChange, page, count}) {
    return (
        <Pagination
            count={count}
            page={page}
            onChange={onPageChange}
            variant="outlined"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
            showFirstButton={false}
            showLastButton={false}
            className={classes.infinize__pagination}
        />
    );
}
