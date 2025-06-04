    import Joi from 'joi';

    export const createNoteSchema = Joi.object({
    title: Joi.string().min(1).required().messages({
        'string.base': 'Titel måste vara en sträng',
        'string.empty': 'Titel får inte vara tom',
        'any.required': 'Titel krävs',
    }),
    content: Joi.string().allow('', null).messages({
        'string.base': 'Innehåll måste vara en sträng',
    }),
    });

    export const updateNoteSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'ID måste vara ett nummer',
        'any.required': 'ID krävs för uppdatering',
    }),
    title: Joi.string().min(1).required().messages({
        'string.base': 'Titel måste vara en sträng',
        'string.empty': 'Titel får inte vara tom',
        'any.required': 'Titel krävs',
    }),
    content: Joi.string().allow('', null).messages({
        'string.base': 'Innehåll måste vara en sträng',
    }),
    });


    export const deleteNoteSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'ID måste vara ett nummer',
        'any.required': 'ID krävs för att ta bort',
    }),
    });


    export const searchNoteSchema = Joi.object({
    query: Joi.string().min(1).required().messages({
        'string.base': 'Sökord måste vara en sträng',
        'string.empty': 'Sökord får inte vara tomt',
        'any.required': 'Sökord krävs',
    }),
    });
