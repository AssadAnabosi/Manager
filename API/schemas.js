import BaseJoi from "joi";
// import sanitizeHtml from "sanitize-html";

// const extension = (joi) => ({
// 	type: 'string',
// 	base: joi.string(),
// 	messages: {
// 		'string.escapeHTML': '{{#label}} must not include HTML!'
// 	},
// 	rules: {
// 		escapeHTML: {
// 			validate(value, helpers) {
// 				const clean = sanitizeHtml(value, {
// 					allowedTags: [],
// 					allowedAttributes: {},
// 					disallowedTagsMode: 'escape'
// 				});
// 				if (clean !== value) return helpers.error('string.escapeHTML', { value })
// 				return clean;
// 			}
// 		}
// 	}
// });

// const Joi = BaseJoi.extend(extension);
const Joi = BaseJoi;


export const billSchema = new Joi.object({
	bill: Joi.object({
		date: Joi.date().required(),
		value: Joi.number().required(),
		description: Joi.string().required(),
		extraNotes: Joi.string().allow('')
	}).required()
});

export const userSchema = new Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().allow(''),
	phoneNumber: Joi.string().allow('')
});

export const logSchema = new Joi.object({
	log: Joi.object({
		date: Joi.required(),
		worker: Joi.required(),
		isAbsence: Joi.allow(),
		startingTime: Joi.string().allow(''),
		finishingTime: Joi.string().allow(''),
		OTV: Joi.number(),
		payment: Joi.number(),
		extraNotes: Joi.string().allow('')
	}).required()
});

export const payeeSchema = new Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().allow(''),
	phoneNumber: Joi.string().allow(''),
	extraNotes: Joi.string().allow(''),
});

export const chequeSchema = new Joi.object({
	cheque: Joi.object({
		serial: Joi.number().min(0),
		dueDate: Joi.date().required(),
		value: Joi.number().min(0),
		description: Joi.string().allow(''),
		payee: Joi.allow(),
		isCancelled: Joi.allow(),
	}).required()
});