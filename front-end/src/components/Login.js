import  React,{useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = () =>{
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const handleLogin= async ()=>{
        console.warn(email,password)
        let result = await fetch('http://localhost:5000/login',{
            method:"post",
            body:JSON.stringify({email,password}),
             headers:{
                'content-Type':'application/json'
            },
        })
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token",JSON.stringify(result.auth))

            navigate("/")
        }else{
            alert("please correct details")
        }
    }

        return(
            <div className='login' >
                <h1>Login</h1>
                <input className='inputBox' type='text'  value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='enter Email' />
                <input className='inputBox' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='enter Password' />
            <button  className='appButton' onClick={handleLogin}  type='button'>Login</button>
            
            </div>
        )

}
export default Login;