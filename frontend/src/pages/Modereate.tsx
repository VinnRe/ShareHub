import './styles/Moderate.css'
import ApprovalItem from '../components/ApprovalItem'
import { useState, useEffect } from 'react'

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

const Moderate = () => {
    const [listed, setListed] = useState<any>(null)

    const fetchListed = async () => {
        const response = await fetch("/api/list/fetch/unapproved")
        const json = await response.json()

        console.log(json)
    
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

    useEffect(() => {
        fetchListed()
        return
    }, [])

    return (
        <section className="moderate-page">
            <main className="approval-section">
                <div className='header-text'>
                    {/* <img src="" alt="ShareHub" /> */}
                    <h1>Moderate</h1>
                </div>
                <div className="tb-approved">
                    <div className="approval-list">
                        {listed ? (
                            listed.map((list: ListedProps) => (
                                <ApprovalItem
                                    key={list._id}
                                    itemID={list._id}
                                    title={list.title}
                                    creator={list.ownerName}
                                    createdAt={new Date(list.createdAt)}
                                    details={list.details}
                                    media={list.media}
                                    tags={list.tags}
                                />
                            ))
                        ) : (
                            <p>Loading resources...</p>
                        )}
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Moderate