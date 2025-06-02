import Joi from 'joi';

export const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Användarnamn måste vara en sträng',
    'string.empty': 'Användarnamn får inte vara tomt',
    'string.min': 'Användarnamn måste vara minst 3 tecken',
    'any.required': 'Användarnamn krävs',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Lösenord måste vara en sträng',
        'string.min': 'Lösenord måste vara minst 6 tecken',
        'any.required': 'Lösenord krävs',
    }),
});


export const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.base': 'Användarnamn måste vara en sträng',
        'any.required': 'Användarnamn krävs',
    }),
    password: Joi.string().required().messages({
        'string.base': 'Lösenord måste vara en sträng',
        'any.required': 'Lösenord krävs',
    }),
});
