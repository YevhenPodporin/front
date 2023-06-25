import React from 'react';
const EmptyAvatar = require("../../assets/images/empty-ava.png")
type Image = {
    file_path?:string,
    status?:boolean
}

function ImageWithStatus({file_path,status}:Image) {
    return (
        <div className={'image_wrapper'}>
            <img src={file_path || EmptyAvatar}/>

            <span className={status?'online':'offline'}></span>
        </div>
    );
}

export default ImageWithStatus;