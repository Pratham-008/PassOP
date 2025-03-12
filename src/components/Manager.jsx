import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const [Show, setShow] = useState("Show")
    const [passwordarray, setpasswordarray] = useState([])
    const [Form, setForm] = useState({ Site: "", Username: "", Password: "", Id: "" })
    const [Passtype, setPasstype] = useState("password")


    const gettingdata=async()=>{
        let res = await fetch("https://passopbackend2.onrender.com")
        let passwords=await res.json();
        console.log(passwords)
        setpasswordarray(passwords)
    }

    useEffect(() => {
        gettingdata()
        
    }, [])

    const Copydata = async (params) => {
        try {
            await navigator.clipboard.writeText(params);
            toast('Copied To ClipBoard!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast('Failed to copy to clipboard.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const Editpassword = async(id) => {
        let temp = passwordarray.filter(i => i.Id === id)
        setForm(temp[0])
        setpasswordarray(passwordarray.filter(item => item.Id !== id))
        let res = await fetch("https://passopbackend2.onrender.com/Delete", { method: "post", headers: { "Content-type": "application/json" }, body: JSON.stringify({ Id: id}) })
    }

    const Showpassword = () => {
        if (Show === "Show") {
            setShow("Hide");
            setPasstype("text")
        } else {
            setShow("Show");
            setPasstype("password")
        }
    }

    const Savepassword = async () => {
        let temp_ID=uuidv4();
        setpasswordarray([...passwordarray, { ...Form, Id: temp_ID }])
        let res = await fetch("https://passopbackend2.onrender.com/Adddata", { method: "post", headers: { "Content-type": "application/json" }, body: JSON.stringify({ ...Form, Id: temp_ID }) })
        console.log(res)
        setForm({ Site: "", Username: "", Password: "", Id: "" })
        toast('Saved Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const Deletedata = async (Iddelete) => {
        let res = await fetch("https://passopbackend2.onrender.com/Delete", { method: "post", headers: { "Content-type": "application/json" }, body: JSON.stringify({ Id: Iddelete }) })
        gettingdata();
        toast('Deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const Handlechange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="mx-auto my-14 max-w-5xl py-4 px-4 md:px-10 lg:px-40">
                <h1 className='text-4xl logo text-center font-bold'>
                    <span className='text-green-800'>&lt;</span>Pass
                    <span className='text-green-800'>OP/&gt;</span>
                </h1>
                <p className='text-xl py-2 text-center'>Your Own Password Manager</p>

                <div className='flex flex-col p-2 w-[92vw] md:w-full  md:p-4 gap-4 md:gap-8 '>
                    <input type='text' onChange={Handlechange} value={Form.Site} name='Site' placeholder='Enter Website URL' className='rounded-full border border-green-800 w-full px-4 py-1' />
                    <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                        <input type="text" name='Username' onChange={Handlechange} value={Form.Username} placeholder='Enter Username' className='rounded-full border border-green-800  w-full px-4 py-1' />
                        <div className="relative w-full">
                            <input type={Passtype} name='Password' onChange={Handlechange} value={Form.Password} placeholder='Enter Password' className='rounded-full border border-green-800 w-full md:w-full px-4 py-1' />
                            <span className='absolute right-0 pe-4 py-1 cursor-pointer' onClick={Showpassword}>{Show}</span>
                        </div>
                    </div>
                    <button onClick={Savepassword} disabled={Form.Username.length <= 3 || Form.Password.length <= 3 || Form.Site.length <= 6} className='disabled:bg-green-300 flex justify-center items-center rounded-full bg-green-500 px-6 py-2 w-fit mx-auto gap-2 hover:bg-green-400'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Add Password
                    </button>
                </div>

                <div className="Passwords">
                    <h1 className='font-bold text-2xl py-2'>Your Passwords:</h1>
                    {passwordarray.length === 0 && <div>Not Password Available</div>}
                    {passwordarray.length !== 0 && (
                        <div className="overflow-x-auto w-full flex justify-center">
                            <table className="table-auto w-full text-xs md:w-full overflow-hidden rounded-2xl border border-gray-300">
                                <thead >
                                    <tr className='bg-gray-500 text-white'>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-300 text-center'>
                                    {passwordarray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='py-2'>
                                                <a href={item.Site} target='_blank' className="text-blue-500 hover:underline">{item.Site}</a>
                                            </td>
                                            <td className='py-2'>
                                                <div className='relative'>
                                                    <span>{item.Username}</span>
                                                    <span className='absolute right-0 cursor-pointer' onClick={() => Copydata(item.Username)}>
                                                        <lord-icon className='h-5' src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover"></lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='py-2'>
                                                <div className='relative'>
                                                    <span>{item.Password}</span>
                                                    <span className='absolute right-0 cursor-pointer' onClick={() => Copydata(item.Password)}>
                                                        <lord-icon className='h-5' src="https://cdn.lordicon.com/depeqmsz.json" trigger="hover"></lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='py-2'>
                                                <span>
                                                    <lord-icon className='h-5 cursor-pointer' onClick={() => Deletedata(item.Id)} src="https://cdn.lordicon.com/skkahier.json" trigger="hover"></lord-icon>
                                                </span>
                                                <lord-icon className='h-5 cursor-pointer' onClick={() => Editpassword(item.Id)} src="https://cdn.lordicon.com/qnpnzlkk.json" trigger="hover"></lord-icon>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager;
