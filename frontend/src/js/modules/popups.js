import * as flsFunctions from "./functions.js";

let unlock = true;
let lockPaddingElements;
let timeout;

export function start(popupLinks, popupCloseButtons, _lockPaddingElements, _timeout) {

    lockPaddingElements = _lockPaddingElements;
    timeout = _timeout;

    if (popupLinks.length > 0) {
        for (let popupLink of popupLinks) {

            popupLink.addEventListener("click", function(e) {
                const popupName = popupLink.dataset.popup;
                const currentPopup = document.querySelector(`[data-popup-name="${popupName}"]`);
                popupOpen(currentPopup);
            });

        }
    }

    if (popupCloseButtons.length > 0) {
        for (let popupCloseButton of popupCloseButtons) {

            popupCloseButton.addEventListener('click', function(e) {
                popupClose(popupCloseButton.closest('.popup'));
            });

        }
    }
}

export function getPopup (name) {
    return document.querySelector(`[data-popup-name="${name}"]`);
}

export function popupOpen (currentPopup) {

    if (typeof currentPopup === 'string') {
        currentPopup = getPopup(currentPopup);
    }

    if (currentPopup && unlock) {

        const popupActive = document.querySelector('.popup_opened');

        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }

        currentPopup.classList.add('popup_opened');

        currentPopup.addEventListener("click", pastClickHandler);

        if (currentPopup.dataset.popupName == 'perfectionVideo' &&
            !currentPopup.querySelector('video')) {

            const mp4Source = document.createElement('source');
            mp4Source.setAttribute('src', "video/work.mp4");
            mp4Source.setAttribute('type', "video/mp4");

            const ogvSource = document.createElement('source');
            ogvSource.setAttribute('src', "video/work.ogv");
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

export function popupClose(popupActive, doUnlock = true) {
    if (unlock) {

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

        popupActive.removeEventListener("click", pastClickHandler);
        popupActive.classList.remove('popup_opened');

        if (doUnlock) {
            bodyUnLock();
        }

    }
}

function pastClickHandler(e) {
    if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    document.body.classList.add('locked');
    flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);

    let scroller = document.createElement('div');
    scroller.className = "scroller";
    document.body.append(scroller);

    unlock = false;

    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {

    setTimeout(function() {

        document.body.classList.remove('locked');
        flsFunctions.LockUnlockPadding ('0px', lockPaddingElements);

        if (document.querySelector('.scroller')) {
            document.querySelector('.scroller').remove();
        }

    }, timeout);

    unlock = false;

    setTimeout(function() {
        unlock = true;
    }, timeout);

}
