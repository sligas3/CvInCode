// NAVBAR FIXED
let num = 50;

$(window).bind('scroll', () => {
	if ($(window).scrollTop() > num) {
		$('#navH').removeClass('bg-transparent', 0, 'swing');
	} else {
		$('#navH').addClass('bg-transparent', 100, 'swing');
	}
});
