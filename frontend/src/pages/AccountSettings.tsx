import { useEffect, useState } from "react";
import "./styles/AccountSettings.css"
import { IoIosLogOut } from "react-icons/io";
import { useLogout } from "../hooks/useLogout";
import { MdAccountCircle } from "react-icons/md";
import { useAccountUpdate } from "../hooks/useAccountUpdate";
import Receipt from "../components/Receipt";

const AccountSettings = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [displayUserName, setDisplayUserName] = useState('')
    const [displayEmail, setDisplayEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailEditable, setEmailEditable] = useState(false)
    const [passwordEditable, setPasswordEditable] = useState(false)
    const [emailChange, setEmailChange] = useState('CHANGE')
    const [passwordChange, setPasswordChange] = useState('CHANGE')
    const { updateAccount } = useAccountUpdate()
    const [showForm, setShowForm] = useState(false);

    const { logout } = useLogout()

    const toggleForm = () => {
        setShowForm(!showForm);
        console.log("CLICKS")
      };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUserDataString = localStorage.getItem("user");
                if (!storedUserDataString) {
                    console.error("No user data found in localStorage");
                    return;
                }
                
                const storedUserData = JSON.parse(storedUserDataString);
                const token = storedUserData.token;

                if (!token) {
                    console.error("No token found in localStorage");
                    return;
                }
        
                const response = await fetch("/api/user/fetch", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setDisplayUserName(userData.name);
                    setUserName(userData.name)
                    setDisplayEmail(userData.email);
                } else {
                    console.error("Error fetching user data:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };        

        fetchUser()
    }, []);

    const handleLogout = () => {
        logout()
    }

    const handleSubmit = async () => {
        try {
            if (password === confirmPassword) {
                const dataToUpdate: { name?: string; email?: string } = {};
                if (userName !== displayUserName) {
                    dataToUpdate.name = userName;
                }
                if (email !== displayEmail) {
                    dataToUpdate.email = email;
                }
                await updateAccount(dataToUpdate);
                if (dataToUpdate.name) {
                    setDisplayUserName(dataToUpdate.name);
                }
                if (dataToUpdate.email) {
                    setDisplayEmail(dataToUpdate.email);
                }
            } else {
                console.log("Passwords don't match!");
            }
            setEmail('')
            setUserName('')
            setPassword('')
            setConfirmPassword('')
        } catch (error) {
            console.error("Error updating account:", error);
        }
    }
    
    const toggleEmailEdit = () => {
        if (emailChange === "CHANGE") {
            setEmailChange("CANCEL")
        } else {
            setEmailChange("CHANGE")
        }
        setEmailEditable(!emailEditable)
    }
    
    const togglePasswordEdit = () => {
        if (passwordChange === "CHANGE") {
            setPasswordChange("CANCEL")
        } else {
            setPasswordChange("CHANGE")
        }
        setPasswordEditable(!passwordEditable)
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
                            placeholder="Username"
                            type="text" 
                            value={userName}
                            onChange={(e) => {setUserName(e.target.value)}}
                            />
                    </div>
                    <h1>Account Information</h1>
                    <p>Change your email and password</p>
                    <div className="as-emailpass-container">
                        <input
                            className={`as-email ${emailEditable ? '' : 'read-only'}`}
                            placeholder="Email"
                            type="text" 
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            readOnly={!emailEditable}
                        />
                        <a className="as-a-change" onClick={toggleEmailEdit}>{emailChange}</a>
                        <input
                            className={`as-password ${passwordEditable ? '' : 'read-only'}`}
                            placeholder="Password"
                            type="password" 
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            readOnly={!passwordEditable}
                        />
                        <input
                            className={`as-confirm-password ${passwordEditable ? '' : 'read-only'}`}
                            placeholder="Confirm Password"
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            readOnly={!passwordEditable}
                        />
                        <a className="as-a-change" onClick={togglePasswordEdit}>{passwordChange}</a>
                    </div>
                </main>
                <main className="as-container-right">
                    <button className="receipt-btn" onClick={toggleForm}>Reciepts</button>
                    {showForm && <Receipt onClose={toggleForm} />}
                    <MdAccountCircle fontSize="15rem" className="default-acc-pic"/>
                    <h3>{displayUserName}</h3>
                    <p>{displayEmail}</p>
                </main>
                <button className="as-save-btn" onClick={handleSubmit}>Save Changes</button>
            </div>
            {showForm && <div className="overlay" onClick={toggleForm}></div>}
        </section>
    )
}

export default AccountSettings