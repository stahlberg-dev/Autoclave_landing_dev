export function spoilers(spoilerClassName, spoilerBlockClassName, hideTime) {

    document.addEventListener("click", function(e) {

        const mediaQueryHover = window.matchMedia('(any-hover: none)');
        
        if (mediaQueryHover.matches) {
            
            const activeBlocks = document.querySelectorAll(`.${spoilerBlockClassName}_active`);
            
            if (activeBlocks.length > 0 && !e.target.closest(`.${spoilerBlockClassName}_active`)) {
                for (let item of activeBlocks) {
                    item.classList.remove(`${spoilerBlockClassName}_active`);
    
                    setTimeout(() => {
                        item.querySelector(`.${spoilerClassName}`).style.visibility = '';
                    }, hideTime);
                }
            }
            
            const closestBlock = e.target.closest(`.${spoilerBlockClassName}`);
    
            if (closestBlock) {
                if (closestBlock.classList.contains(`${spoilerBlockClassName}_active`)) {
    
                    closestBlock.classList.remove(`${spoilerBlockClassName}_active`);
    
                    setTimeout(() => {
                        closestBlock.querySelector(`.${spoilerClassName}`).style.visibility = '';
                    }, hideTime);
    
                } else {
    
                    closestBlock.classList.add(`${spoilerBlockClassName}_active`);
                    closestBlock.querySelector(`.${spoilerClassName}`).style.visibility = 'visible';
    
                }
            }
        }
    
    });

}