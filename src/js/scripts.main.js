import $ from "jquery"
window.jQuery = $

$(document).ready(function () {

	$("#text").animate({ opacity: 0 }, 400, function () {
		$(this).html("Gulp create app =)").animate({ opacity: 1 }, 400)
	})
	
})
