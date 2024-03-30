import Joi from "joi";

const productSchema = Joi.object({
    title: Joi.string().min(3).max(250).required(),
    description: Joi.string().min(3).max(250).required(),
    image_url: Joi.string().min(3).max(250).uri({
        scheme: ['http', 'https']
    }).required()
});

export const validateProduct = async (requestBody: unknown): Promise<Joi.ValidationResult<any>> => {
    return productSchema.validate(requestBody);
}