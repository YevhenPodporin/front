import './ImageWithStatus.scss';
import React from 'react';
const EmptyAvatar = require("../../assets/images/empty-ava.png")

type Image = {
    file_path?:string,
    status?:boolean,
    withoutStatus?:boolean
}

function ImageWithStatus({file_path,status, withoutStatus}:Image) {
    return (
        <div className={'image_wrapper'}>
            <img src={file_path || EmptyAvatar}/>

            {!withoutStatus && <span className={status ? 'online' : 'offline'}></span>}
        </div>
    );
}

export default ImageWithStatus;