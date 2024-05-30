import {Hono} from "hono";
import {userInput} from "@9518aniket/medium-common1"

export const userRouter=new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET:string
    }
  }>();
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    const body=await c.req.json();
    const result=userInput.safeParse(body);
    if(!result.success){
      c.status(400)
      return c.json({
        error:result.error
      })
    }
    try{
      const user=await prisma.user.create({
        data:{
          email:body.email,
          password:body.password
        }
      })
      const payload = {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 50000, 
      }
    
      const token=await sign(payload,c.env.JWT_SECRET);
      c.status(200)
      return c.json({
        jwt:token
      })
    }catch(e:any){
      c.status(400)
      return c.json({
        error:"User Already Exists"
      })
    }
    
  })
  userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    
    const body=await c.req.json();
    const result=userInput.safeParse(body);
    if(!result.success){
      c.status(400)
      return c.json({
        error:result.error
      })
    }
    const user=await prisma.user.findUnique(
      {
            where:{
              email:body.email
            }
      }
    );
    
    if(user!=null){
      const payload = {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 50000, 
      }
      const token=await sign(
        payload,
        c.env.JWT_SECRET
      )
      c.status(200)
      return c.json({
        jwt:token
      })
    }else{
      c.status(400)
    return c.json({
        msg:"User Not exists"
  });
    }
    
    
  }
  )

