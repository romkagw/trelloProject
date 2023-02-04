export const nameHandler = (
	e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
	setNameError: (value: React.SetStateAction<string>) => void,
	setNameElement: (value: React.SetStateAction<string>) => void
) => {
	setNameElement(e.target.value);
	const re = /^[А-я\w\s-.іїєґ]*$/;
	if (!re.test(e.target.value)) {
		setNameError('Введены заприщающиеся символы');
	} else {
		setNameError('');
	}
};
