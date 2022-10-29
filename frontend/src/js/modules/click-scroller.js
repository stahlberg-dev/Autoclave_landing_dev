export function lockEquipmentVideo(gotoBlock) {

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

export class clickScroller {

    constructor(config) {
        this.linkAttributeName = config.linkAttributeName;
        this.lockedSections = config.lockedSections;
        this.callbacks = config.callbacks;
    }

    lockSection(gotoBlock, sectionClassName, unlockDelay) {
    
        const section = document.querySelector(sectionClassName);
            
        if (!gotoBlock.classList.contains( sectionClassName.slice(1) ) && section) {

            section.classList.add( `${sectionClassName}_locked`.slice(1) );

            setTimeout(() => {
                section.classList.remove( `${sectionClassName}_locked`.slice(1) );
            }, unlockDelay);

        }
    
    }

    onClick(linkAttributeName, lockedSections, callbacks) {

        document.addEventListener("click", event => {
    
            const scrollLink = event.target.closest(`[${linkAttributeName}]`);
    
            if(!scrollLink) return;
    
            const gotoBlockName = scrollLink.getAttribute(linkAttributeName);
            const gotoBlock = document.querySelector(gotoBlockName);

            if (gotoBlock) {

                const gotoBlockValue = gotoBlock.getBoundingClientRect().top - 
                                        document.querySelector('.header__wrapper').offsetHeight - 20;

                window.scrollBy({
                    top: gotoBlockValue,
                    behavior: "smooth",
                });

                lockedSections.forEach( item => this.lockSection(gotoBlock, item.sectionClassName, item.unlockDelay ?? 0));
                callbacks.forEach(item => item(gotoBlock));

            }

            event.preventDefault();
    
        });

    }

    init() {

        const linkAttributeName = this.linkAttributeName;
        const lockedSections = this.lockedSections ?? [];
        const callbacks = this.callbacks ?? [];

        this.onClick(linkAttributeName, lockedSections, callbacks);

    }
}