import QBicBaseChecker from '../base/QBicBaseChecker.js';
import QBicConfig from '../../QBicConfig.js';

export default class QBicUICheckers extends QBicBaseChecker {
	constructor(arrText, arrChecked, arrDisabled) {
		super(arrText, arrChecked, arrDisabled);

		const style = this.shadowRoot.querySelector('style');
		style.textContent += `
			:host {
				font-size: var(--font-size);
				font-weight: var(--font-weight);
				color: var(--font-color);

				display: flex;
				flex-direction: var(--host-direction);
				flex-wrap: var(--host-wrap);
				justify-content: var(--host-justify-content);
				align-items: var(--host-align-items);
				align-content: var(--host-align-content);
				gap: var(--host-gap);

				width: var(--host-width);
				height: var(--host-height);
				padding: var(--host-padding);
				margin: var(--host-margin);
				border: var(--host-border);
				background-color: var(--host-color);
			}
			
			:host .wrapper {
				display: flex;
				flex-direction: var(--wrap-direction);
				justify-content: var(--wrap-justify-content);
				align-items: var(--wrap-align-items);
				gap: var(--wrap-gap);

				width: var(--wrap-width);
				height: var(--wrap-height);
				padding: var(--wrap-padding);
				margin: var(--wrap-margin);
				border: var(--wrap-border);
				background-color: var(--wrap-color);
			}
			
			:host input {
				appearance: none;
				display: flex;
				justify-content: center;
				align-items: center;
				width: var(--input-size);
				height: var(--input-size);
				border: var(--input-border);
				border-radius: var(--input-radius);
				background-color: var(--input-color);
				transition: var(--transition);
			}
			:host input::before {
				content: '';
				width: 60%;
				height: 30%;
				border-bottom: calc(var(--input-size) / 7) solid;
				border-left: calc(var(--input-size) / 7) solid;
				border-color: transparent;
				transition: var(--transition);
			}
			:host input + label {
				width: var(--label-width);
				height: var(--label-height);
				padding: var(--label-padding);
				margin: var(--label-margin);
				border: var(--label-border);
				background-color: var(--label-color);
				transition: var(--transition);
			}

			:host input:checked {
				background-color: var(--input-color-checked);
				border-color: var(--input-color-checked);
			}
			:host input:checked::before {
				border-color: #fff;
				transform: rotate(-45deg);
				margin-left: 5%;
				margin-bottom: 24%;
			}
			:host input:checked + label {
				font-weight: var(--font-weight-checked);
				color: var(--font-color-checked);
			}

			:host input:disabled,
			:host input:disabled + label {
				filter: grayscale(100%) opacity(20%);
			}
		`;
	}

	static get observedAttributes() {
		return ['text'];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		super.attributeChangedCallback(attr, oldValue, newValue);
	}

	static get is() {
		return 'qb-ui-checkers';
	}

	static get version() {
		return '1.0.0';
	}
}

if (!document.querySelector('head #qb_ui_checkers_style')) {
	const link = document.createElement('link');
	link.id = 'qb_ui_checkers_style';
	link.rel = 'stylesheet';
	link.type ='text/css';
	link.href = QBicConfig.componentsPath + 'css/QBicUICheckers.css';

	document.querySelector('head').append(link);
}