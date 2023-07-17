$(document).ready(function(){
	$('iframe[src^="https://www.google.com/maps"').each( function() {
		var $this = $(this);
		$this.attr('width', '100%');
		$this.attr('height', '170');
	});
});