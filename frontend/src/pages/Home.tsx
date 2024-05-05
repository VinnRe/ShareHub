import './styles/Home.css'
import { FaTools } from "react-icons/fa";
import { FaMagnifyingGlass, FaCarSide } from "react-icons/fa6";
import { MdDevices, MdOutlineDensitySmall } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import logo from '../assets/logo_big.png'
import Item from '../components/Item';
import { useEffect, useState } from 'react';
import { useListedSearch } from '../hooks/useListedSearch';

interface ListedProps {
    _id: string;
    title: string;
    details: string;
    media: File;
    creator: string;
    createdAt: Date;
    tags: string[];
    ownerName: string;
}

const Home = () => {
    const [search, setSearch] = useState('')
    const [listed, setListed] = useState<any>(null)
    const { searchListed, searchResults, isLoadingS } = useListedSearch()

    const filterResources = async (filterValue: any) => {
        const filtered = filterValue;
    
        console.log(filtered);
        if (filtered) {
          const listedData = filtered.map((item: any) => {
            return {
              ...item.listData,
              ownerName: item.ownerInfo.name,
            };
          });
          setListed(listedData);
          return listedData;
        } else {
          setListed(null);
          return null;
        }
      };

    const fetchListed = async () => {
        const response = await fetch("/api/list/fetch/approved")
        const json = await response.json()
    
        console.log(json)
        if (response.ok) {
          const listingData = json.map((item: any) => {
            console.log(item)
            return {
                ...item.listData,
                ownerName: item.ownerInfo.name
            }
          })
          setListed(listingData)
          console.log(listingData)
        }
    }

    const handleSearch = async () => {
        !isLoadingS
        try {
            if (search === "") {
              fetchListed();
            } else {
              await searchListed(search);
              const searched = await searchResults;
              filterResources(searched);
            }
          } catch (error) {
            console.error("Error searching for resources:", error);
          } finally {
            isLoadingS;
          }
    }

    useEffect(() => {
        fetchListed()
        return
    }, [])

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
                        <FaMagnifyingGlass className='search-button' onClick={handleSearch}/>
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
                        {listed &&
                            listed.map((list: ListedProps) => (
                            <Item
                                key={list._id}
                                title={list.title}
                                creator={list.ownerName}
                                createdAt={new Date(list.createdAt)}
                                details={list.details}
                                media={list.media}
                                tags={list.tags}
                            />
                            ))}
                        {!listed && <p>Loading resources...</p>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
