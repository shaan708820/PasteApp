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
        <div className='pl-10'>
            <input className='p-2 rounded-2xl min-w-[600px] mt-5'
                type="search" placeholder='search here'
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className='flex flex-col gap-5 mt-5 pl'>
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
                                <div className='border' key={paste?._id}>
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                    <div className='flex flex-row gap-4 place-content-evenly'>
                                        
                                            <NavLink to={`/?pasteId=${paste?._id}`}><button className='text-white'>Edit </button></NavLink>
                                       
                                        
                                            <NavLink to={`/pastes/${paste?._id}`}> <button className='text-white'>View</button></NavLink>
                                        
                                        <button onClick={() => handleDelete(paste?._id)}>
                                            Delete
                                        </button>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(paste?.content),
                                            toast.success("Copied")

                                        }}>
                                            Copy
                                        </button>
                                        <button onClick={toggleOptions}>
                                            Share
                                        </button>


                                        {showOptions && (
                                            <div style={{
                                                position: 'absolute',
                                                width:'10%',
                                                padding:'1%',
                                                height:'auto',
                                                top: '23%',
                                                left: '6px',
                                                marginTop: '8px',
                                                backgroundColor: '#242424',
                                                
                                                
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
                                    <div>
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
