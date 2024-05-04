import { useState } from "react";
import "./styles/AccountSettings.css"
import { IoIosLogOut } from "react-icons/io";
import { useLogout } from "../hooks/useLogout";
import { MdAccountCircle } from "react-icons/md";


const AccountSettings = () => {
    const { logout } = useLogout()

    const handleLogout = () => {
        logout()
    }

    return (
        <section className="account-settings">
            <div className="as-top-header">
                <h1>Account Settings</h1>
                <a onClick={handleLogout}>Logout<IoIosLogOut style={{ strokeWidth: '1.3rem' }}/></a>
            </div>
            <div className="as-container">
                <main className="as-container-left">
                    <h1>General Information</h1>
                    <p>Setup your account, edit your profile details, and change your password</p>
                    <div className="as-name-container">
                        <input
                            className="fn-name-container"
                            placeholder="First Name" // Change this to GET the First Name 
                            type="text" 
                            />
                        <input
                            className="ln-name-container"
                            placeholder="Last Name" // Change this to GET the Last Name 
                            type="text" 
                        />
                    </div>
                    <h1>Account Information</h1>
                    <p>Change your email and password</p>
                    <div className="as-emailpass-container">
                        <input
                            placeholder="Email" // Change this to GET the Email 
                            type="text" 
                        />
                        <a href="" className="as-a-change">CHANGE</a>
                        <input
                            placeholder="Password"
                            type="password" 
                        />
                        <input
                            placeholder="Confirm Password"
                            type="password" 
                        />
                        <a href="" className="as-a-change">CHANGE</a>
                    </div>
                </main>
                <main className="as-container-right">
                    <MdAccountCircle fontSize="15rem" className="default-acc-pic"/>
                    {/* <h3>{FullName}</h3>
                    <p>{username}</p> */}
                    <h3>TEST NAME</h3>
                    <p>TEST USERNAME</p>
                </main>
                <button className="as-save-btn">Save Changes</button>
            </div>
        </section>
    )
}

export default AccountSettings