import { Router } from "express";
import { query, validationResult, checkSchema } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationShema } from "../utils/validationSchemas.mjs";

const router = Router();

router.get(
    "/api/users",
    query("filter")
        .isString()
        .notEmpty()
        .withMessage("Must not be empty")
        .isLength({min:3, max:10})
        .withMessage("Must be at least 3-10 characters"),
    (request, response)=>{
        const result = validationResult(request);
        console.log(result);
        const{
            query: { filter, value },
        } = request;

        if( filter && value ) return response.status(200).send( mockUsers.filter( (user)=>user[filter].includes(value) ) );

        return response.send(mockUsers);
    },
);
export {router};