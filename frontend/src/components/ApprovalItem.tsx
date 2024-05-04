import './styles/ApprovalItem.css'

const ApprovalItem = () => {
    return (
        <div className="item-container">
            <div className="image-container">
                <div className="scrollable-images">
                    {/* {listingImages(listing.images)} */}
                </div>
            </div>
            <div className="btn-container">
                <button className="prev-btn">&lt;</button>
                <button className="next-btn">&gt;</button>
            </div>
            {/* <h3>{listing.itemName}</h3>
            <p>₱ {listing.itemPrice}</p>
            <p className="item-details">{listing.itemDescription}</p> */}
            <h3>TEST ITEM</h3>
            <p className="item-details">TEST DESCRIPTION AKJSDHKAJSHDJASHDKJASHJKAHSDJKASH KJASHKJ AHSJKD HASJK HAJKSH DKJASHDK JAHSJK HASJKHDJK ASHDJKAHS</p>
            <div className="ar-btns">
                <button className='approve'>Approve</button>
                <button className='reject'>Reject</button>
            </div>
        </div>
    )
}

export default ApprovalItem