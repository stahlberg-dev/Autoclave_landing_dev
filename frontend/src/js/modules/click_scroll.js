export function clickScroll(linkAttributename, ...callbacks) {

    const scrollLinks = document.querySelectorAll(`[${linkAttributename}]`);

    if (scrollLinks.length > 0) {

        for (let scrollLink of scrollLinks) {

            scrollLink.addEventListener("click", function(e) {
                
                const gotoBlockName = scrollLink.getAttribute(linkAttributename);
                const gotoBlock = document.querySelector(gotoBlockName);

                if (gotoBlock) {

                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + 
                                        pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 20;

                    window.scrollTo({
                        top: gotoBlockValue,
                        behavior: "smooth"
                    });

                    for (let callback of callbacks) {

                        callback(gotoBlock);

                    }

                }

                e.preventDefault();

            });

        }

    }
}

export function sectionLock(sectionName) {

    return function(gotoBlock) {

        const section = document.querySelector(`.${sectionName}`);
            
        if (!gotoBlock.classList.contains(sectionName) && section) {

            section.classList.add(`${sectionName}_locked`);

            setTimeout(() => {
                section.classList.remove(`${sectionName}_locked`);
            }, 1000);

        }

    };

}

export function equipmentVideoLock(gotoBlock) {

    const equipmentVideo = document.querySelector('.complectation');
        
    if (equipmentVideo) {

        if (!gotoBlock.classList.contains('equipment')) {

            equipmentVideo.classList.add('equipment__body-content_locked');

        } else {

            if (!equipmentVideo.classList.contains('equipment__body-content_active')) {

                equipmentVideo.classList.add('equipment__body-content_locked');

            }

        }

        setTimeout(() => {
            equipmentVideo.classList.remove('equipment__body-content_locked');
        }, 1000);

    }

}