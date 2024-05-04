import './styles/Home.css'
import { FaMagnifyingGlass } from "react-icons/fa6";

const Home = () => {
    return (
        <div>
            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-texts">
                    <h4>Browse with ease</h4>
                    <h2>Great deals provided</h2>
                    <h1>Vast options to choose from</h1>
                    <p>Find a great deal for you today!</p>
                    {/* <button className="browse-deals">Browse Deals!</button> */}
                    <div className="search-container">
                        <input className="search-bar" type="text" placeholder="Search..." />
                        <FaMagnifyingGlass className='search-button'/>
                    </div>
                </div>
                <div className="hero-background">
                    {/* <img src="/assets/imgs/hero_bg.png" alt="hero_bg" /> */}
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
                            <a href=""><img src="/assets/categories/electronics_512.png" alt="Electronics" /></a>
                            <p className="Electronics">Electronics</p>
                        </div>
                        <div className="category">
                            <a href=""><img src="/assets/categories/vehicles_512.png" alt="Vehicles" /></a>
                            <p className="Vehicles">Vehicles</p>
                        </div>
                        <div className="category">
                            <a href=""><img src="/assets/categories/all_categories.png" alt="All" /></a>
                            <p className="all-categories">All Categories</p>
                        </div>
                        <div className="category">
                            <a href=""><img src="/assets/categories/tools_and_equip_512.png" alt="ToolsAndEquipments" /></a>
                            <p className="Tools-and-Equipment">Tools and Equipments</p>
                        </div>
                        <div className="category">
                            <a href=""><img src="/assets/categories/properties_512.png" alt="properties" /></a>
                            <p className="Properties">Properties</p>
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
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
