const checkLengthText = (word: string, nameError: React.Dispatch<React.SetStateAction<string>>): boolean => {
	if (word.trim().length === 0) {
		nameError('Строка не может быть пустой');
		return false;
	}
	return true;
};
export default checkLengthText;
