let btnThemeChange;

window.addEventListener('load', () => {
	console.log("************** page load completed!!!!");

	btnThemeChange = document.querySelector('#changeTheme');
	btnThemeChange.addEventListener('click', (e) => {
		document.querySelector('body').classList.toggle('theme-white');
	});
});