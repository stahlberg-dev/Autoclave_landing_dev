export class scrollObserver {

    constructor(config) {
        this.elementClassName = config.elementClassName;
        this.scrolledClassName = config.scrolledClassName;
    }

    onScroll(element, scrolledClass) {

        const callback = function(entries, observer) {
            if (entries[0].isIntersecting) {
                element.classList.remove(scrolledClass);
            } else {
                element.classList.add(scrolledClass);
            }
        };

        const elementObserver = new IntersectionObserver(callback);
        elementObserver.observe(element);

    }

    init() {

        const element = document.querySelector(this.elementClassName);
        const scrolledClass = this.scrolledClassName.slice(1);

        if (element) {

            this.onScroll(element, scrolledClass);

        }

    }
}