window.addEventListener('load', (e) => {
	console.log("++++++++++++++++ page load completed!!");

	let inputs = document.querySelector('qb-ui-checkers');
	inputs.addEventListener('onChanged', (e) => {
		console.log("inputs onChanged", e.target.changed);
	})
	
});