const resizeTextarea = (ref: React.RefObject<HTMLTextAreaElement>) => {
	const textarea = ref.current;
	setTimeout(() => {
		if (textarea) {
			textarea.style.cssText = 'height:auto';
			textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
		}
	}, 1);
};

export default resizeTextarea;
