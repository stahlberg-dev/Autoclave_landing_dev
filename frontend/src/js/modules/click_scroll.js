export function clickScroll(linkAttributename) {

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

                }

                e.preventDefault();

            });

        }

    }
}