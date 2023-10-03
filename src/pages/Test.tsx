import * as React from 'react';
import { useAppSelector } from '../api/hooks/redux';

export default function BasicTabs() {
    // const users = useAppSelector(state => state.networkSlice.list.all);

    return (
        <div className="App">
            <h1>RTK Query infinite scroll</h1>
            <h2>Scroll down to automatically trigger the fetch of more data.</h2>

        </div>
    )
};
