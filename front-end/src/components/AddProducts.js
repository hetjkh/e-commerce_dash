import React ,{useState ,useEffect } from 'react';


const AddProduct = ()=>{

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error , setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const addProduct = async () =>{

        console.warn(!name)
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }


        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method:"POST",
            body:JSON.stringify({userId, name, price, category, company}),
            headers:{ "Content-Type": "application/json", authorization:`bearer ${JSON.parse(localStorage.getItem('token'))} ` },

        })
        result = await result.json();
        console.warn(result);
        setSuccessMessage("Product added successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 5000); // Hide the success message after 5 seconds

        return () => clearTimeout(timer);
    }, [successMessage]);

    


    return(
        
        <div className='product' >
            <h1>Add hehehProduct</h1>

            <input type="text" placeholder='Enter product name' className='inputBox' 
            value={name} onChange={(e)=>setName(e.target.value)}/>

            {error && !name && <span className='invalid-input'> Enter valid name </span>}

            <input type="text" placeholder='Enter product Price' className='inputBox' 
             value={price} onChange={(e)=>setPrice(e.target.value)}/>

{error && !price && <span className='invalid-input'> Enter valid Price </span>}

            <input type="text" placeholder='Enter product category' className='inputBox' 
             value={category} onChange={(e)=>setCategory(e.target.value)}/>

{error && !category && <span className='invalid-input'> Enter valid category </span>}

            <input type="text" placeholder='Enter product company' className='inputBox' 
             value={company} onChange={(e)=>setCompany(e.target.value)}/>

{error && !company && <span className='invalid-input'> Enter valid company </span>}

            <button className='appButton'  onClick={addProduct}>Add Product</button>
            {successMessage && <span className='success-message'>{successMessage}</span>}
        </div>
    )
}

export default AddProduct;