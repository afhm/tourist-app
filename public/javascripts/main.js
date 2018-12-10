//sidenav
const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

//slider
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
	indicators: false,
	height: 500,
	transition: 500,
	interval: 6000
});

//Autocomplete
const ac = document.querySelector('.autocomplete');
M.Autocomplete.init(ac, {
	data: {
		"Mangalore": null,
		"Manasa": null,
		"Pilikula": null,
		"Panambur beach": null,
		"Kapu": null,
		"Malpe": null,
		"Mangaladevi": null,
		"Sultan Battery" : null
	}
});

//Material Boxed
const mb = document.querySelectorAll('.materialboxed');
M.Materialbox.init(mb, {});

//Scrollspy
const ss = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(ss, {
    fullWidth: true
});

//error
$(document).ready(function() {
	$('.card-alert > button').on('click', function(){
		$(this).closest('div.card-alert').fadeOut('slow');
	})
})

//parallax
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems, {});
  });