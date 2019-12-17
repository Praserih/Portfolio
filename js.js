$(window).scroll(function () {
	var scroll = $(window).scrollTop();
	var height = $(document).height() - $(window).height() - 100;

	if (scroll >= 250) {
		$(".toggle").addClass("is-hidden");
	} else {
		$(".toggle").removeClass("is-hidden");
	};

	if (scroll >= height) {
		$(".box").addClass("is-hidden");
		$(".contact").addClass("is-hidden");
		$(".x").addClass("kill");

	} else {
		$(".box").removeClass("is-hidden");
		$(".contact").removeClass("is-hidden");
		$(".x").removeClass("kill");
	};
	
	if (scroll < height) {
		$("#about").css({"visibility":"hidden"});

	} else {
		$("#about").css({"visibility":"visible"});

	};
	
});
