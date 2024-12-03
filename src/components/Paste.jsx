import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import {
    FacebookShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    FacebookIcon,
    WhatsappIcon,
    LinkedinIcon,
    TwitterIcon
} from 'react-share';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const filterData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))
    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId))
    }

    const [showOptions, setShowOptions] = useState(false);
    const shareUrl = window.location.href;
    const toggleOptions = () => setShowOptions(!showOptions);

    

    return (
        <div className='pl-10 item-center '>
            <input className='p-2 rounded-2xl w-[95%] mt-10 mr-10 bg-white'
                type="search" placeholder='search here'
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className='flex items-center justify-center flex-col gap-5 mt-5 '>
                {
                    filterData.length > 0 &&
                    filterData.map(
                        (paste) => {
                            const date = new Date(paste.createdAt);
                            const day = String(date.getDate()).padStart(2, '0');
                            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "Augst", "September", "October", "November", "December"];
                            const month = monthNames[date.getMonth()]; // Get month name from array
                            const year = date.getFullYear();
                        
                            return (
                                <div className='bg-white border border-gray-600 w-[80%] rounded-2xl mr-6 relative min-h-60 pb-10' key={paste?._id}>
                                    <div className='text-xl pl-2'>
                                        {paste.title}
                                    </div>
                                    <hr className='border-gray-600 border-0.5'/>
                                    <div className='pl-2 pr-20 pt-2'>
                                        {paste.content}
                                    </div>
                                    <div className='flex flex-col gap-2 absolute top-9 right-2'>
                                        
                                            <NavLink to={`/?pasteId=${paste?._id}`}><button className='text-white w-14 text-xs'>Edit </button></NavLink>
                                       
                                        
                                            <NavLink to={`/pastes/${paste?._id}`}> <button className='text-white w-14 text-xs text-center'>View</button></NavLink>
                                        
                                        <button className='w-14 h-8 text-xs  text-center' onClick={() => handleDelete(paste?._id)}>
                                            Delete
                                        </button>
                                        <button className=' w-14 h-8 text-xs  text-center' onClick={() => {
                                            navigator.clipboard.writeText(paste?.content),
                                            toast.success("Copied")

                                        }}>
                                            Copy
                                        </button>
                                        <button className='w-14 text-xs text-center' onClick={toggleOptions}>
                                            Share
                                        </button>


                                        {showOptions && (
                                            <div style={{
                                                position: 'absolute',
                                                width:'10%',
                                                padding:'1%',
                                                height:'auto',
                                                top: '1%',
                                                left: '100px',
                                                marginTop: '8px',
                                                
                                                
                                                
                                                zIndex: 1000,

                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}>
                                                {/* WhatsApp */}
                                                <WhatsappShareButton url={shareUrl} style={{ marginBottom: '15px' }}>
                                                    <WhatsappIcon size={32} round={true} />
                                                </WhatsappShareButton>

                                                {/* Facebook */}
                                                <FacebookShareButton url={shareUrl} style={{ marginBottom: '15px' }}>
                                                    <FacebookIcon size={32} round={true} /> 
                                                </FacebookShareButton>

                                                {/* LinkedIn */}
                                                <LinkedinShareButton url={shareUrl} style={{ marginBottom: '15px' }}>
                                                    <LinkedinIcon size={32} round={true} />
                                                </LinkedinShareButton>

                                                {/* Twitter */}
                                                <TwitterShareButton url={shareUrl} style={{ marginBottom: '15px' }}>
                                                    <TwitterIcon size={32} round={true} /> 
                                                </TwitterShareButton>
                                            </div>)}


                            </div>
                                    <div className='absolute bottom-2 left-2'>
                                        {day} {month} {year}
                                    </div>

                                </div>
                            )
                        }
                    )
                }
            </div>

        </div>
    )
}

export default Paste
