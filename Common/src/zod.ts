import zod from "zod";

export const userInput=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6),

})

export type userInput=zod.infer<typeof userInput>


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