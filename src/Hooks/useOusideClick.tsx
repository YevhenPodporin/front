import { createRef, RefObject, useEffect, useRef } from "react";


import React from 'react';

function UseOutsideClick(showHideBlock:boolean,setShowHideBlock:(e:boolean)=>void) {
    const refPopup = useRef<any>(null);
    const clickOutsideListener = (e:any) => {
        if(refPopup !==null && refPopup !== undefined){
            if(refPopup.current && !refPopup.current.contains(e.target)){
                setShowHideBlock(false)
            }else{
                setShowHideBlock(true)
            }
        }
    }
    useEffect(()=>{
        if(showHideBlock){
            document.addEventListener("click",clickOutsideListener)
        }else{
            document.removeEventListener('click',clickOutsideListener)
        }
        return ()=>document.removeEventListener('click',clickOutsideListener)
    },[showHideBlock])

    return refPopup;
}

export default UseOutsideClick;