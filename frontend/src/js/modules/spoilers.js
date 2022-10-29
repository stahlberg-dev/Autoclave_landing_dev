export class spoilers {

    constructor(config) {
        this.spoilerClassName = config.spoilerClassName;
        this.spoilerBlockClassName = config.spoilerBlockClassName;
        this.spoilerActiveBlockClassName = config.spoilerActiveBlockClassName;
        this.hideTime = config.hideTime;
    }

    onClick(spoilerClassName, spoilerBlockClassName, spoilerActiveBlockClassName, hideTime) {

        document.addEventListener("click", function(event) {

            const mediaQueryHover = window.matchMedia('(any-hover: none)');
            
            if (!mediaQueryHover.matches) return;

            const activeBlocks = document.querySelectorAll(spoilerActiveBlockClassName);
            const closestBlock = event.target.closest(spoilerBlockClassName);
            const isActive = closestBlock?.classList.contains( spoilerActiveBlockClassName.slice(1) );

            activeBlocks.forEach(item => {

                item.classList.remove( spoilerActiveBlockClassName.slice(1) );
    
                setTimeout(() => {
                    item.querySelector(spoilerClassName).style.visibility = '';
                }, hideTime);

            });

            if (closestBlock && !isActive) {

                closestBlock.classList.add( spoilerActiveBlockClassName.slice(1) );
                closestBlock.querySelector(spoilerClassName).style.visibility = 'visible';

            } 
        
        });

    }

    init() {

        const spoilerClassName = this.spoilerClassName;
        const spoilerBlockClassName = this.spoilerBlockClassName;
        const spoilerActiveBlockClassName = this.spoilerActiveBlockClassName;
        const hideTime = this.hideTime;

        this.onClick(spoilerClassName, spoilerBlockClassName, spoilerActiveBlockClassName, hideTime);

    }
}