
document.querySelectorAll('.search-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const value = form.elements['search'].value

        if (!value) return

        const url = new URL(window.location.href);

        url.searchParams.set('search', value);

        window.location.replace(url.toString());
    })
})