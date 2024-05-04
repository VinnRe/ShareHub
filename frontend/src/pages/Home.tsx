import './styles/Home.css'
import { FaTools } from "react-icons/fa";
import { FaMagnifyingGlass, FaCarSide } from "react-icons/fa6";
import { MdDevices, MdOutlineDensitySmall } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import logo from '../assets/logo_big.png'
import Item from '../components/Item';

const purpleColor = "#7C66EF"

const Home = () => {
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
                        <input className="search-bar" type="text" placeholder="Search..." />
                        <FaMagnifyingGlass className='search-button'/>
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
