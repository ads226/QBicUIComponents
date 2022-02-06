import QBicBaseRadios from '../base/QBicBaseRadios.js';
import QBicConfig from '../../QBicConfig.js';

export default class QBicUISegments extends QBicBaseRadios {
	constructor(arrText, numChecked, arrDisabled) {
		super(arrText, numChecked, arrDisabled);
		
		const style = this.shadowRoot.querySelector('style');
		style.textContent += `
			:host {
				
			}
			:host .wrapper {
				
			}
			
			:host input {
				display: none;
			}
			:host input + label {}
			
			:host input:checked + label {}

			:host input:disabled + label {}
		`;
	}

	static get observedAttributes() {
		return ['text'];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		super.attributeChangedCallback(attr, oldValue, newValue);
	}

	static get is() {
		return 'qb-ui-segments';
	}

	static get version() {
		return '1.0.0';
	}
}

if (!document.querySelector('head #qb_ui_segments_style')) {
	const link = document.createElement('link');
	link.id = 'qb_ui_segments_style';
	link.rel = 'stylesheet';
	link.type ='text/css';
	link.href = QBicConfig.componentsPath + 'css/QBicUISegments.css';

	document.querySelector('head').append(link);
}