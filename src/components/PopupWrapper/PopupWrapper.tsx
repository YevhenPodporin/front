import React, {Component, createRef, JSX, ReactComponentElement, ReactNode, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../api/hooks/redux";
import {popupSlice} from "../../store/redusers/ShowHiePopup";
import './PopupWrapper.scss';

type Props = {
    children:JSX.Element | JSX.Element[]
}


function PopupWrapper({children}:Props) {
    const isShowPopup = useAppSelector(state => state.popupReducer.isShow)
    const dispatch = useAppDispatch();
    const refPopup = createRef<HTMLDivElement>();

    useEffect(() => {
        const refPopupCurrent = refPopup.current;

        if(isShowPopup && refPopupCurrent && !refPopupCurrent.classList.value.includes('hide')){
                refPopup.current.classList.add('show')
            } else if (!isShowPopup && refPopupCurrent && refPopupCurrent.classList.value.includes('show')){
                refPopupCurrent.classList.remove('show')
                refPopupCurrent.classList.add('hide')
            }
    }, [isShowPopup])

    const outerClick = ()=>{
        dispatch(popupSlice.actions.hidePopup())
    }
    const transitionEndHandler = () => {
        if(!isShowPopup){
            refPopup.current?.classList.remove('hide')
        }
    }
    return  (
        <div
            onTransitionEnd={()=>transitionEndHandler()}
            ref={refPopup}
            className={"popup_wrapper"}
            onClick={(e)=>{
            e.stopPropagation();
            outerClick();
        }}>
            <div className="popup_body" onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default PopupWrapper;