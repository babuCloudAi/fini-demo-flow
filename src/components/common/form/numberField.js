import {TextField, InputAdornment, IconButton} from '@mui/material';
import {InfinizeIcon} from '../index';

export function NumberField({name, value, onChange, placeholder}) {
    const newValue = isNaN(value) ? '' : value;
    const handleChange = e => {
        const inputValue = e.target.value;
        if (!isNaN(newValue) && Number(newValue) >= 0) {
            onChange(inputValue);
        }
    };

    return (
        <TextField
            type="text"
            name={name}
            value={newValue}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            aria-label={placeholder || name}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() =>
                                onChange(
                                    Math.max(
                                        Number(newValue || 0) - 1,
                                        0
                                    ).toString()
                                )
                            }
                            disabled={newValue === '' || Number(newValue) <= 0}
                        >
                            <InfinizeIcon
                                icon="majesticons:minus-line"
                                width={20}
                                height={20}
                            />
                        </IconButton>
                        <IconButton
                            onClick={() =>
                                onChange((Number(newValue || 0) + 1).toString())
                            }
                        >
                            <InfinizeIcon
                                icon="tabler:plus"
                                width={20}
                                height={20}
                            />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
}
