import * as yup from 'yup';

const regExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/gi
export const urlValidationSchema = yup.object().shape({
    websiteLink: yup.string().required().matches(regExp),
})