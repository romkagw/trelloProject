const addElementByPressingEnter = (e: React.KeyboardEvent<HTMLInputElement>, addElement: () => void) => {
	if (e.key === 'Enter') {
		addElement();
	}
};

export default addElementByPressingEnter;
