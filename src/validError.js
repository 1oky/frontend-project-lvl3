const validError = (input, validMessage) => {
    validMessage.textContent = 'Ссылка должна быть валидным URL';
    validMessage.classList.remove('valid-success');
    validMessage.classList.add('valid-error');
    input.classList.add('validation-error');
};
export default validError;