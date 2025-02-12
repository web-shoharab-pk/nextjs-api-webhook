import Joi from 'joi';

export const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
});

export const generateSignatureSchema = Joi.object({
    payload: Joi.object({
        eventType: Joi.string().required(),
        data: Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        }).required(),
    }).required(),
});


