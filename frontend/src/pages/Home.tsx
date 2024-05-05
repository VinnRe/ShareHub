import './styles/Home.css'
import { FaTools } from "react-icons/fa";
import { FaMagnifyingGlass, FaCarSide } from "react-icons/fa6";
import { MdDevices, MdOutlineDensitySmall } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import logo from '../assets/logo_big.png'
import Item from '../components/Item';
import { useState } from 'react';

interface ListedProps {
    _id: string;
    title: string;
    details: string;
    media: File;
    user: {
        _id: string;
    }
}

const Home = () => {
    const [search, setSearch] = useState('')
    const [listed, setListed] = useState<any>(null)

    const printSearch = () => {
        console.log(search)
    }

    const fetchListed = async () => {
        const response = await fetch("/api/list/fetch/approved");
        const json = await response.json();
    
        console.log(json);
        // if (response.ok) {
        //   const listingData = json.map((item: any) => {
        //     return {
        //       ...item.resourceData,
        //       ownerName: item.ownerInfo.name,
        //     };
        //   });
        //   setListed(listingData);
        // }
      }

    return (
        <div className='home-page'>
            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-texts">
                    <h4>ShareHub</h4>
                    <h1>Discover the joy of sharing</h1>
                    <h2>Borrow or share from a variety of items</h2>
                    <p>Share More, Own Less!</p>
                    {/* <button className="browse-deals">Browse Deals!</button> */}
                    <div className="search-container">
                        <input className="search-bar" type="text" placeholder="Search..." value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                        <FaMagnifyingGlass className='search-button' onClick={fetchListed}/>
                    </div>
                </div>
                <div className="hero-background">
                    <img src={logo} alt="hero_bg" />
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="content">
                <div className="categories">
                    <div className="categories-header">
                        <h2>Categories</h2>
                    </div>
                    <div className="category-sections">
                        <div className="category">
                            <MdDevices fontSize="5rem" className="category-icon" />
                            <p className="Applicances">Appliances</p>
                        </div>
                        <div className="category">
                            <FaTools fontSize="5rem" className="category-icon"  />
                            <p className="Tools">Tools</p>
                        </div>
                        <div className="category">
                            <FaCarSide fontSize="5rem" className="category-icon"  />
                            <p className="Services">Services</p>
                        </div>
                        <div className="category">
                            <GiClothes fontSize="5rem" className="category-icon"  />
                            <p className="Clothing">Clothing</p>
                        </div>
                        <div className="category">
                            <MdOutlineDensitySmall fontSize="5rem" className="category-icon"  />
                            <p className="all-categories">All Categories</p>
                        </div>
                    </div>
                </div>

                {/* FOR YOU */}
                <div className="for-you">
                    <div className="categories-header">
                        <h2>For You</h2>
                    </div>
                    <div className="listings">
                        {/* Insert the existing listings */}
                        <Item />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
