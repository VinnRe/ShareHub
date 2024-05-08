import { useState, useEffect } from 'react';
import './styles/Share.css'
import { useCreate } from '../hooks/useCreateList';

const Share = () => {
    const [category, setCategory] = useState('Appliances')
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [media, setMedia] = useState<any>('TEST')
    const { createList, isLoading } = useCreate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMedia("test.jpeg")
        await createList(category, name, details, media)
    }

    return (
        <div className="share-page">
            {/* FORM SECTION */}
            <h1 className="listing-header">Share Something!</h1>
            <div className="listing-container">
                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="form-group form-group-container">
                        <div className="form-group form-group-left">
                            <label htmlFor="item-images">Insert Picture</label><br />
                            <input type="file" className="item-images" name="item-image[]" multiple accept="image/*" />
                            <div className="image-preview"></div>
                        </div>
                        <div className="form-group form-group-right">
                            <label htmlFor="item-name">Name</label><br />
                            <input 
                                type="text" 
                                className="item-name" 
                                placeholder="Insert Item Name" 
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                            />    
                            <label htmlFor="item-details">Details</label><br />
                            <textarea 
                                className="item-details"  
                                placeholder="Insert Item Description"
                                value={details}
                                onChange={(e) => {setDetails(e.target.value)}}
                            ></textarea>
    
                            <label htmlFor="item-category">Category</label><br />
                            <select className="item-category" value={category} onChange={(e) => {setCategory(e.target.value)}}>
                                <option value="Appliances">Appliance</option>
                                <option value="Tools">Tool</option>
                                <option value="Service">Service</option>
                                <option value="Clothing">Clothing</option>
                            </select>
                        </div>
                    </div>
                    <button className="create-listing-button">Create Listing</button>
                </form>
            </div>
            <div className="popup">Item Listed</div>
        </div>
    )
}

export default Share;
