import './styles/Moderate.css'
import ApprovalItem from '../components/ApprovalItem'

const Moderate = () => {
    return (
        <section className="moderate-page">
            <main className="approval-section">
                <div className='header-text'>
                    {/* <img src="" alt="ShareHub" /> */}
                    <h1>Moderate</h1>
                </div>
                <div className="tb-approved">
                    <div className="approval-list">
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                        <ApprovalItem />
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Moderate