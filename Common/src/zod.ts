import zod from "zod";

export const signupInput=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6),
    name:zod.string().optional(),
})

export type userInput=zod.infer<typeof signupInput>

export const loginInput=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})

export type loginInput=zod.infer<typeof loginInput>

export const postInput=zod.object({
    title:zod.string(),
    content:zod.string()
})

export type postInput=zod.infer<typeof postInput>

export const updateBlog = zod.object({
    title:zod.string(),
    content:zod.string()
})
export type updateBlog=zod.infer<typeof updateBlog>