import {Hono} from "hono";
import { postInput } from "@9518aniket/medium-common1"

export const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET:string
    },
    Variables:{
        userId:any;
    }
  }>();
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


blogRouter.use('/*',async(c,next)=>{
    try {
    const header=c.req.header('Authorization')||"";
    const token=header.split(" ")[1];
    const user=await verify(token,c.env.JWT_SECRET);
    if(user){
      c.set('userId',user.id)
      await next()
    }else{
        c.status(403)
        return c.json({
         error:"Unauthorized"
        });
    }
    } catch (error:any) {
        c.status(403)
        return c.json({
         error:error.message
        });
    }
    
  })

  blogRouter.post('/',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
   const body=await c.req.json();
    const result=postInput.safeParse(body);
    if(!result.success){
      c.status(400)
      return c.json({
        error:result.error
      })
    }
   const userId=c.get('userId');
     const post =await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }

     })
      if(post!=null){
         c.status(200)
         return c.json({
            id:post.id,
            msg:"Created"
         })
      }else{
        c.status(400)
        return c.json({
            
            msg:"Error!"
        })
      }

    
  })

  blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body=await c.req.json();
     const blog=await prisma.post.update({
         where:{
              id:body.id
         },
         data:{
              title:body.title,
               content:body.content,
         }
     })
     if(blog!=null){
        c.status(200)
        return c.json({
           id:blog.id,
           msg:"Updated"
        })
     }else{
       c.status(400)
       return c.json({
           
           msg:"Error!"
       })
     }
  })
  blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
     try {
        const posts =await prisma.post.findMany(
          {
            select:{
              content:true,
              title:true,
              id:true,
              author:{
                select:{
                  name:true
                } 
              },
            
            }
          }
        );
    c.status(200)
    return c.json({
        posts
    })
     } catch (error:any) {
        c.status(400)
         return c.json({
             error:"Error"
         })
     }
  })


  blogRouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
     try{
        const id=c.req.param('id')||"";
        const post =await prisma.post.findFirst({
            where:{
                id:id
            },
            select:{
              id:true,
              title:true,
              content:true,
              author:{
                select:{
                  name:true
                  
                }
              }
            }
        })
        c.status(200)
        return c.json({
            post
        })
     }catch(e:any){
         c.status(400)
         return c.json({
             error:"Error"
         })
     }

  })

  
 