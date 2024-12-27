import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    SECRET_JWT: string;
}

//Validador de schema
const envsSchema = joi.object({
    PORT: joi.number().required(),
    SECRET_JWT: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Error ${error}`);
}

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    SECRET_JWT: envVars.SECRET_JWT,
}