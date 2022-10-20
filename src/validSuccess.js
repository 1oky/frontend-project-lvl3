const validSuccess = (validMessage) => {
    validMessage.textContent = 'RSS успешно загружен';
    validMessage.removeAttribute('valid-error');
    validMessage.classList.add('valid-success');
};
export default validSuccess;