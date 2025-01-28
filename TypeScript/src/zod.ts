// type inference in zod

import { z } from 'zod';
import express from 'express';

const app = express();

// Define the schema for the profile update
const userProfileSchema = z.object({
    name: z.string().min(1, {message: ""}),
    email: z.string().email(),
    age: z.number().min(18).optional()
});

// this will get the type of zod schema, and will modify itself accordingly
type finalUserSchema = z.infer<typeof userProfileSchema>;

// type inference is used to export to frontend to send the proper data set to the backend, cause zod is not used in frontend

app.put("/user", (req, res) => {
    const { success } = userProfileSchema.safeParse(req.body);
    // const user = req.body; // this just doesn't have any type

    // let's use same type of userProfileSchema
    // const user: {
    //     name: string,
    //     email: string,
    //     age: number
    // } = req.body; // this is not good, as because as we change our zod schema we have to change it's type everywhere, so we need something that will infer zod schema's type.

    const user: finalUserSchema = req.body;

    if(!success) {
        res.status(411).json({});
        return;
    }

    res.json({
        message: "User updated"
    })

})