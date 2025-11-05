import * as Yup from 'yup';

export const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-\d]+\.)+[a-z]{2,}))$/i;

export const EmailValidation = {
  required: (message) =>
    Yup.string()
      .trim()
      .matches(validEmailRegex, 'Invalid email address')
      .required(message),
};

//  ex. Test@123
export const StrictPasswordValidation = {
  required: (message) =>
    Yup.string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .matches(
        /[^a-z\d]/i,
        'Password must contain at least one special character'
      )
      .required(message),
};

export const MobileNumberValidation = {
  required: (message) =>
    Yup.string()
      .matches(/^\d{10}$/, 'Please enter a valid phone number')
      .required(message),
};

/*  All are valida URL
  http://google.com
  https://www.google.com
  www.google.com
  google.com
*/

export const WebsiteValidation = {
  required: (message) =>
    Yup.string()
      .trim()
      .test('is-valid-url', 'Enter a valid URL', (value) => {
        if (!value) return false; // Required case already handled
        const urlPattern =
          /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9#?&%=.-]*)?$/;
        return urlPattern.test(value);
      })
      .required(message),
};
