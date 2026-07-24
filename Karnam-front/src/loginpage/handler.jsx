



const loginVerify=async (username,password)=>{
  
  
  const auth=await fetch("https://mypc.tail10621d.ts.net/login",{
    method:"POST",
    header:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    body:new  URLSearchParams({
      username:username, 
      password:password
    })
    
  });
  
  await console.log(auth.status);
  let serverMessage= await auth.text();
  console.log(serverMessage);
}

export default loginVerify
