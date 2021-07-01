function show(hash) {
    $('.active').removeClass('active').addClass('inactive');
    $(hash).removeClass('inactive').addClass('active');
}

window.addEventListener('hashchange',() => show(window.location.hash));