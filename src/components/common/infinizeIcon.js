import {Icon} from '@iconify-icon/react';

export const InfinizeIcon = props => {
    return (
        <Icon
            icon={props.icon}
            width={props.width ?? '26px'}
            height={props.height ?? '26px'}
            {...props}
        />
    );
};
