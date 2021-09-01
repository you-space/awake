document.querySelectorAll('.search-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const value = form.elements['search'].value

        if (!value) return

        const url = new URL(window.location.href);

        url.searchParams.set('search', value);
        url.searchParams.set('page', 1);

        window.location.replace(url.toString());
    })
})

document.querySelectorAll('.pagination').forEach(pagination => {
    pagination.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            
            e.preventDefault()
            
            const page = link.text.trim()

            const url = new URL(window.location.href);

            url.searchParams.set('page', page);
    
            window.location.replace(url.toString());

        })

    })
})