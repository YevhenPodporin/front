import React, {Component} from 'react';

function AuthProvider(children:Component) {

    return (
        <>{children}</>
    );
}

export default AuthProvider;