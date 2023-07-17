$(document).ready(function(){

	var baseUri = APP.url_base;
	var page = window.location.href.toString().replace( baseUri, '' );

	var $menu = $('a[href="' + page + '"');

	if ( $menu.length ) {
		$menu.parent().addClass('active');

		if ( $menu.parent().parent().attr('class') === 'dropdown-menu' ) {
			$menu.parent().parent().parent().addClass('active');
		}
	}
});