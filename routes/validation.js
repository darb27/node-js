const joi=require('joi');
const { joiPassword } = require('joi-password');

function registerValidation(data){
    const schema= joi.object({
        user_name: joi.string()
                    .min(3)
                    .max(30)
                    .required(),
        email: joi.string().required().email(),
        password: joiPassword.string()
                            .min(8)
                            .minOfSpecialCharacters(1)
                            .minOfUppercase(1)
                            .minOfNumeric(1)
                            .noWhiteSpaces()
                            .required()
    })

    return schema.validate(data)
}

function loginValidation(data){
    const schema= joi.object({
        email: joi.string().required().email(),
        password: joiPassword.string()
                            .min(8)
                            .minOfSpecialCharacters(1)
                            .minOfUppercase(1)
                            .minOfNumeric(1)
                            .noWhiteSpaces()
                            .required()
    })

    return schema.validate(data)
}

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;