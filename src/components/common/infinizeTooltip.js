import {Tooltip} from '@mui/material';

export function InfinizeTooltip({children, title}) {
    return (
        <Tooltip
            title={title}
            arrow
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: 'primary.main',
                        color: '#fff'
                    }
                },
                arrow: {
                    sx: {
                        color: 'primary.main'
                    }
                }
            }}
        >
            {children}
        </Tooltip>
    );
}
