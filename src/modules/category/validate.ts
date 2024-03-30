import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string().min(3).max(250).required()
});

export const validateCategory = async (requestBody: unknown): Promise<Joi.ValidationResult<any>> => {
    return categorySchema.validate(requestBody);
}