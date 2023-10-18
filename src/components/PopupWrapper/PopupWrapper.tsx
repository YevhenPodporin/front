import { createRef, JSX, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../api/hooks/redux";
import { popupSlice } from "../../store/redusers/ShowHidePopupSlice";
import './PopupWrapper.scss';

type Props = {
    children: JSX.Element | JSX.Element[]
}


function PopupWrapper({children}: Props) {
    const isShowPopup = useAppSelector(state => state.popupReducer.isShow)
    const dispatch = useAppDispatch();
    const refPopup = createRef<HTMLDivElement>();
    const [isTransitionEnd, setIsTransitionEnd] = useState(false);
    useEffect(() => {
        const refPopupCurrent = refPopup.current;
        setIsTransitionEnd(false);
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

    const outerClick = () => {
        dispatch(popupSlice.actions.hidePopup())
    }
    const transitionEndHandler = () => {
        // setIsTransitionEnd(true);
        // if (!isShowPopup) {
        //     refPopup.current?.classList.remove('hide')
        // }
    }
    return (
        <div
            ref={refPopup}
            className={"popup_wrapper"}
            onClick={(e) => {
                e.stopPropagation();
                outerClick();
            }}>
            <div className="popup_body"
                 onTransitionEnd={() => transitionEndHandler()}
            >
                <div className={'popup_content'} onClick={(e)=>e.stopPropagation()}>{children}</div>
            </div>
        </div>
    )
}

export default PopupWrapper;