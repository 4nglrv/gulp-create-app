import $ from "jquery"
window.jQuery = $	
import main from "./_main"
import about from "./_about"

const pathname = window.location.pathname

$(document).ready(function() {
	switch(pathname) {
		case '/main.html':
			main()
			break
		case '/about.html':
			about()
			break
		default:
			return true
	}
})
