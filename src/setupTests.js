// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

global.document.createRange = () => ({
	setStart: () => {},
	setEnd: () => {},
	commonAncestorContainer: {
		nodeName: 'BODY',
		ownerDocument: document
	}
});
