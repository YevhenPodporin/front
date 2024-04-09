import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {setupStore} from "../../src/store/store";
import {Provider} from "react-redux";
import {useAuth} from "../../src/api/hooks/useAuth";

type WithWrapperProps = {
    component: React.ReactNode,
}

const WithWrapper = ({component, ...routerProps}: WithWrapperProps) => {
    const store = setupStore();

    return (
        <Provider store={store}>
            <BrowserRouter {...routerProps}>{component}</BrowserRouter>
        </Provider>
    );
};

export default WithWrapper;