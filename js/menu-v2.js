$(document).ready(function () {
    var menuActivated = false;
    var $headerOptions = $('.js-subMenu-option');
    var $menuSubHeaders = $('.js-subheader');

    $menuSubHeaders.hide();

    // Si hay una alerta por login, mostrar el popup de login.
    if ($('#login .alert').length >= 1) {
        $('#login').siblings('.dropdown-toggle').trigger('click');
    }

    $headerOptions.on('click', function (ev) {
        ev.preventDefault();
        var activeMenu = '.' + $(this).data('active-submenu');

        $menuSubHeaders.hide();

        if (menuActivated !== activeMenu) {
            $menuSubHeaders.filter(activeMenu).show();
            menuActivated = activeMenu;
        } else {
            menuActivated = false;
        }
    });
});