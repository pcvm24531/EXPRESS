export const createUserValidationShema = {
    name: {
        isLength: {
            options: {
                min: 5,
                max: 35
            },
            errorMessage: "Name must be at least 5 characters with a max of 32 characters",
        },
        notEmpty: {
            errorMessage: "Name cannot be empty",
        },
        isString: {
            errorMessage: "Name must be a string!"
        },
    },
    lastName:{
        notEmpty: true,
    },
};