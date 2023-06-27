import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../api/hooks/redux";
import {popupSlice} from "../../store/redusers/ShowHiePopup";
import './PopupWrapper.scss';
function PopupWrapper() {
    const isShowPopup = useAppSelector(state => state.popupReducer.isShow)
    const dispatch = useAppDispatch();
    useEffect(() => {

        return () => {
            dispatch(popupSlice.actions.hidePopup())
        }
    }, [])

    const outerClick = ()=>{
        dispatch(popupSlice.actions.hidePopup())
    }

    return isShowPopup? (
        <div  className={"popup_wrapper"} onClick={(e)=>{
            e.stopPropagation();
            outerClick();
        }}>
            <div className="popup_body" onClick={(e)=>e.stopPropagation()}>
                ТУТ БУДЕТ ПОПАП
            </div>
        </div>
    ):null;
}

export default PopupWrapper;