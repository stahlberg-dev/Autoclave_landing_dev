export function headerScroll(headerClassName, scrolledHeaderClassName) {

    const headerElement = document.querySelector(`.${headerClassName}`);

    const callback = function(entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove(scrolledHeaderClassName);
        } else {
            headerElement.classList.add(scrolledHeaderClassName);
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);

}