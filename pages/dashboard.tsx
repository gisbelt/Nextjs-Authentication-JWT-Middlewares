import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Dashborard = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        email: '',
        username: ''
    })

    const handleProfile = async () => {
        const response = await axios.get('/api/profile')
        setUser(response.data)
        console.log(response);
    }

    const logout = async () => {
        const response = await axios.post('/api/auth/logout')
        if(response.status === 200) router.push("/login")
    }
    useEffect(() => {
        // handleProfile()
    }, [])   

    return (
        <div className='dashboard'>
            <h1>Dashborard</h1>
            <pre>
                {
                   JSON.stringify(user, null, 2) //convertilo en json
                }
            </pre>

            <button onClick={ handleProfile }>
                get profile 
            </button>       

             <button onClick={ logout }>
                Logout 
            </button>   
        </div>
    )
}

export default Dashborard