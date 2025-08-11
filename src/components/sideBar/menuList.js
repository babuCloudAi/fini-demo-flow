import {List} from '@mui/material';
import MenuItem from './menuItem';

export default function MenuList({isOpen, tabActive}) {
    return (
        <List>
            <MenuItem
                title="Dashboard"
                icon="mage:dashboard-fill"
                tabRoute="/"
                isOpen={isOpen}
                isActive={tabActive === '' || tabActive === 'home'}
            />
            <MenuItem
                title="Admin Panel"
                icon="material-symbols:admin-panel-settings-rounded"
                tabRoute="/admin"
                isOpen={isOpen}
                isActive={tabActive === 'admin'}
            />
            <MenuItem
                title="My Students"
                icon="flowbite:user-graduate-solid"
                tabRoute="/students"
                isOpen={isOpen}
                isActive={tabActive === 'students'}
            />
            <MenuItem
                title="Search"
                icon="mingcute:user-search-fill"
                tabRoute="/search"
                isOpen={isOpen}
                isActive={tabActive === 'search'}
            />
            <MenuItem
                title="Settings"
                icon="streamline:ai-settings-spark-solid"
                tabRoute="/settings"
                isOpen={isOpen}
                isActive={tabActive === 'settings'}
            />
            <MenuItem
                title="Help"
                icon="healthicons:contact-support"
                tabRoute="/help"
                isOpen={isOpen}
                isActive={tabActive === 'help'}
            />
        </List>
    );
}
