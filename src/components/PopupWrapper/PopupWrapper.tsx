import { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../api/hooks/redux";
import { popupSlice } from "../../store/redusers/ShowHidePopupSlice";
import './PopupWrapper.scss';
import UseOutsideClick from '../../Hooks/useOutsideClick';

type Props = {
    children: JSX.Element | JSX.Element[]
}


function PopupWrapper({children}: Props) {
    const isShowPopup = useAppSelector(state => state.popupReducer.isShow)
    const dispatch = useAppDispatch();

    const refPopup = UseOutsideClick(isShowPopup, showHideBlock)


    useEffect(() => {
        const refPopupCurrent = refPopup.current;
        if (isShowPopup && refPopupCurrent ) {
            document.body.style.overflowY = 'hidden';
            refPopupCurrent.classList.remove('hide')
            refPopup.current.classList.add('show');
        } else if (!isShowPopup && refPopupCurrent ) {
            refPopupCurrent.classList.remove('show')
            refPopupCurrent.classList.add('hide')
            document.body.style.overflowY = '';
        }

    }, [isShowPopup])

    function showHideBlock (e:boolean){
        if(e){
            dispatch(popupSlice.actions.hidePopup())
        }else{
            dispatch(popupSlice.actions.showPopup())
        }
    }

    return (
        <div
            className={"popup_wrapper"}
            ref={refPopup}
        >
            <div className="popup_body"
            >
                <div className={'popup_content'}
                     onClick={(e)=>e.stopPropagation()}>
                    {children}</div>
            </div>
        </div>
    )
}

export default PopupWrapper;