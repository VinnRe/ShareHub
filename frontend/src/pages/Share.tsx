import './styles/Share.css'

const Share = () => {
    return (
        <div className="share-page">
            {/* FORM SECTION */}
            <h1 className="listing-header">Share Something!</h1>
            <div className="listing-container">
                <form method="post" encType="multipart/form-data">
                    <div className="form-group form-group-container">
                        <div className="form-group form-group-left">
                            <label htmlFor="item-images">Insert Picture</label><br />
                            <input type="file" className="item-images" name="item-image[]" multiple accept="image/*" />
                            <div className="image-preview"></div>
                        </div>
                        <div className="form-group form-group-right">
                            <label htmlFor="item-name">Name</label><br />
                            <input type="text" className="item-name" name="item-name" placeholder="Insert Item Name" />    
                            <label htmlFor="item-details">Details</label><br />
                            <textarea className="item-details" name="item-details" placeholder="Insert Item Description"></textarea>
    
                            <label htmlFor="item-category">Category</label><br />
                            <select className="item-category" name="item-category">
                                <option value="Appliances">Appliance</option>
                                <option value="Tools">Tool</option>
                                <option value="Service">Service</option>
                                <option value="Clothing">Clothing</option>
                            </select>
                        </div>
                    </div>
                    <input type="button" value="Create Listing" className="create-listing-button" />
                </form>
            </div>
            <div className="popup">Item Listed</div>
        </div>
    )
}

export default Share;
