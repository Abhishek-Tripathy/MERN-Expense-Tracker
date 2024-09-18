export const getTokenFromHeader = (req) => {
   
   
   const headerObj = req.headers
   const token = headerObj["authorization"].split(" ")[1];
   
   
   if(token !== undefined){
      return token
   }else{
      return {
         status: false,
         message: 'No token attached to header'
      }
   }
}