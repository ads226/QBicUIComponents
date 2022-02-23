function show(target) {
	target.classList.remove('hide');
}

function hide(target) {
	target.classList.add('hide');
}

Element.prototype.toggle = function(name, condition) {

	this.classList.toggle(name, condition);

	console.log(arguments)
}