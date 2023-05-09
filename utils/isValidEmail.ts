import jwt, { JwtPayload } from 'jsonwebtoken'


export const validator = {
    
    isValidEmail: (email: string): boolean => {
  
    const match = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          return !!match;
      },
      
      isEmail: (email: string): string | undefined => {
        return validator.isValidEmail(email) 
          ? undefined
          : 'Email is not valid';
      },
      
      isValidToken: async (token: string): Promise<string> => {
        if( ! process.env.JWT_SECRET ) throw new Error('JWT_SECRET not found');
        
        if(token.length <= 10) return Promise.reject('Invalid JWT token');
        
        return new Promise((resolve, reject) => {
            try {
                jwt.verify(token, process.env.JWT_SECRET || '', (err, payload) => {
                    if(err) reject(err)
                    const { _id } = payload as JwtPayload
                    resolve(_id)
                })
            } catch (error) {
                reject(error)
            }
        })
    },

    signToken: (_id: string, email: string) => {
      if( ! process.env.JWT_SECRET ) throw new Error('JWT_SECRET not found')
        
        return jwt.sign(
            
            { _id, email }, 
            
            process.env.JWT_SECRET,
            
            { expiresIn: '1d' }
        )
    },
  }