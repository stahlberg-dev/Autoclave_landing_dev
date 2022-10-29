import {popups} from "./popups.js";

export const popupsMaker = new popups({
    linkAttributeName: 'data-popup',
    popupAttributeName: 'data-popup-name',
    popupContentClassName: '.popup__content',
    openedPopupClassName: '.popup_opened',
    popupCloseButtonClassName: '.close-popup',
    lockPaddingElementClassName: '.lock-padding',
    showHideTime: 300,
    video: [
        {
            popupName: 'perfectionVideo',
            videoClassName: '.perfection-popup__video',
            mp4Path: 'https://zagt.ru/video/hyggelig/perfection.mp4',
            ogvPath: 'https://zagt.ru/video/hyggelig/perfection.ogv',
        },

        {
            popupName: 'workVideo',
            videoClassName: '.work-popup__video',
            mp4Path: 'video/work.mp4',
            ogvPath: 'video/work.ogv',
        },
        
    ]
});