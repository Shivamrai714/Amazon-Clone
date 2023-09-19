import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Option({deletedata,get}) {


  const removedata = async (deletedata) => {
    try {
        const res = await fetch(`remove/${deletedata}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

        if (res.status === 400 || !data) {
            console.log("error aai remove time pr");
        } else {
            
            get();
            toast.success("Item removed!", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log(error);
    }

}



  return (
    <div className="add_remove_select">
    <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
    <p onClick={() => removedata(deletedata)} style={{ cursor: "pointer" }}>Delete</p><span>|</span>
    <p className="forremovemedia">Save Or Pay later</p><span>|</span>
    <p className="forremovemedia">See More like this</p>
    
</div>
  )
}

export default Option
