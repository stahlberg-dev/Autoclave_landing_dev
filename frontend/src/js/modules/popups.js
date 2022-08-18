import * as flsFunctions from "./functions.js";

export function popupsLauncher(popupLinksClassName, 
                               popupsClassName, 
                               popupCloseButtonsClassName, 
                               lockPaddingElementsClassName, 
                               timeout) {

    const popupLinks = document.querySelectorAll(`.${popupLinksClassName}`);
    const popups = document.querySelectorAll(`.${popupsClassName}`);
    const popupCloseButtons = document.querySelectorAll(`.${popupCloseButtonsClassName}`);

    if (popupLinks.length > 0) {
        for (let popupLink of popupLinks) {

            popupLink.addEventListener("click", function(e) {
                const popupName = popupLink.dataset.popup;
                const currentPopup = document.querySelector(`[data-popup-name="${popupName}"]`);
                popupOpen(currentPopup, lockPaddingElementsClassName, timeout);
            });

        }
    }

    if (popupCloseButtons.length > 0) {
        for (let popupCloseButton of popupCloseButtons) {

            popupCloseButton.addEventListener('click', function(e) {
                popupClose(popupCloseButton.closest(`.${popupsClassName}`), lockPaddingElementsClassName, timeout);
            });

        }
    }

    if (popups.length > 0) {
        for (let popup of popups) {

            popup.addEventListener('click', function(e) {

                if (!e.target.closest(`.${popupsClassName}__content`)) {
                    popupClose(e.target.closest(`.${popupsClassName}`), lockPaddingElementsClassName, timeout);
                }

            });

        }
    }

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup_opened');
            popupClose(popupActive, lockPaddingElementsClassName, timeout);
        }
    });

}

export function getPopup (name) {
    return document.querySelector(`[data-popup-name="${name}"]`);
}

export function popupOpen (currentPopup, lockPaddingElementsClassName, timeout) {

    const lockPaddingElements = document.querySelectorAll(`.${lockPaddingElementsClassName}`);

    if (typeof currentPopup === 'string') {
        currentPopup = getPopup(currentPopup);
    }

    if (currentPopup) {

        const popupActive = document.querySelector('.popup_opened');

        if (popupActive) {

            popupClose(popupActive, lockPaddingElementsClassName, timeout, false);

        } else {

            flsFunctions.lockBody(lockPaddingElements, timeout);
            
        }

        currentPopup.classList.add('popup_opened');

        if (currentPopup.dataset.popupName == 'perfectionVideo' &&
            !currentPopup.querySelector('video')) {

            const mp4Source = document.createElement('source');
            mp4Source.setAttribute('src', "https://zagt.ru/video/hyggelig/perfection.mp4");
            mp4Source.setAttribute('type', "video/mp4");

            const ogvSource = document.createElement('source');
            ogvSource.setAttribute('src', "https://zagt.ru/video/hyggelig/perfection.ogv");
            ogvSource.setAttribute('type', "video/ogg");

            const videoFrame = document.createElement('video');
            videoFrame.className = "perfection-popup__video";
            videoFrame.setAttribute('autoplay', 'autoplay');
            videoFrame.setAttribute('controls', 'controls');

            videoFrame.append(mp4Source);
            videoFrame.append(ogvSource);
            currentPopup.querySelector('.popup__content').append(videoFrame);

        }

        if (currentPopup.dataset.popupName == 'workVideo' &&
            !currentPopup.querySelector('video')) {

            const mp4Source = document.createElement('source');
            mp4Source.setAttribute('src', "video/work.mp4");
            mp4Source.setAttribute('type', "video/mp4");

            const ogvSource = document.createElement('source');
            ogvSource.setAttribute('src', "video/work.ogv");
            ogvSource.setAttribute('type', "video/ogg");

            const videoFrame = document.createElement('video');
            videoFrame.className = "work-popup__video";
            videoFrame.setAttribute('autoplay', 'autoplay');
            videoFrame.setAttribute('controls', 'controls');

            videoFrame.append(mp4Source);
            videoFrame.append(ogvSource);
            currentPopup.querySelector('.popup__content').append(videoFrame);

        }

    }
}

export function popupClose(popupActive, lockPaddingElementsClassName, timeout, doUnlock = true) {

    const lockPaddingElements = document.querySelectorAll(`.${lockPaddingElementsClassName}`);
    const videoFrame = popupActive.querySelector('video');

    if (videoFrame) {
        setTimeout(() => {
            videoFrame.pause();
        }, timeout);
    }

    if (popupActive.dataset.popupName == 'consultation') {

        setTimeout(() => {
            popupActive.querySelectorAll('input[type=text]').forEach(element => element.value = '');
        }, timeout);

    }

    popupActive.classList.remove('popup_opened');

    if (doUnlock) {
        flsFunctions.unlockBody(lockPaddingElements, timeout);
    }

}
