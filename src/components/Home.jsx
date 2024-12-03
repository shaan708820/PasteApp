import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes)

    useEffect(() => {
        if(pasteId){
            const paste=allPastes.find((p)=>p._id===pasteId)
            setTitle(paste.title)
            setValue(paste.content)
        }
      
    }, [pasteId])

    function createPaste() {
        // alert("clicked")
        if(!title.trim() || !value.trim())return; 
        const paste = {
            title: title.trim(),
            content: value.trim(),
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            // paste id available, need to update
            dispatch(updateToPastes(paste))
        }
        else {
            // paste id not available, need to create paste
            dispatch(addToPastes(paste))
        }
        setTitle("")
        setValue("")
        setSearchParams({})
    }
    
    

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-1 rounded-2xl mt-10 w-[74%] pl-4 ml-10 bg-white'
                    type="text"
                    placeholder='Enter your title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button 
                    onClick={createPaste}
                    className='p-1 rounded-2xl mt-10 mr-10 hover:bg-blue-900'>
                    {
                        pasteId ? "Update my paste" : "Create my paste"
                    }
                </button>
            </div>
            <div className='mt-8'>
                <textarea
                    className='rounded-2xl mt-4 w-[94%] p-4 bg-white ml-10'
                    value={value}
                    placeholder='Enter your content'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default Home
