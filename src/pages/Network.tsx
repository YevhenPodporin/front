import { Box, Tab, Tabs, } from '@mui/material';
import * as React from 'react';
import My from '../components/NetworkTabs/My';
import Requests from '../components/NetworkTabs/Requests';
import All from '../components/NetworkTabs/All';


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Network() {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <div>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="My friends" {...a11yProps(0)} />
                        <Tab label="Requests" {...a11yProps(1)} />
                        <Tab label="All users" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <My index={0} value={tabIndex}/>
                <Requests index={1} value={tabIndex}/>
                <All index={2} value={tabIndex}/>
            </Box>
        </div>
    );
}

export default Network;