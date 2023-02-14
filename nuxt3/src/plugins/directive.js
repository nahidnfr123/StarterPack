const options = {
    root: null,
    rootMargin: '0px 0px -20px 0px',
    threshold: 0,
    delay: 200
}

function observe(el) {
    const scrollObserver = new IntersectionObserver((entries, scrollObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const animateClass = entry.target.getAttribute('data-anim')
                // const to = entry.target.getAttribute('data-anim-to')
                const delay = entry.target.getAttribute('data-anim-delay') || '200'
                // const delay = entry.target.getAttribute('data-delay')

                entry.target.classList.add(animateClass || 'fade-down')
                // entry.target.classList.add(...to.split(" "))
                if (delay !== '000') entry.target.style.animationDelay = delay + 'ms'
                scrollObserver.unobserve(entry.target)
            }
        })
    }, options)

    scrollObserver.observe(el)
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("motion", (el, binding) => {
        el.classList.add('shouldAnimate')
        if (process.server) return
        observe(el)
        // created(el, binding) {
        // el.id = binding.value;
        // const from = el.getAttribute('data-anim-from')
        // el.classList.add(...from.split(" "))
        // },
    });
});
