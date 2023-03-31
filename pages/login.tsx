import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface FormFields {
  [key: string]: string;
}

const LoginPage = () => {

  const router = useRouter()
  
  const [formState, setFormState] = useState<FormFields>({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await axios.post('/api/auth/login', formState)
    console.log(response)
    if(response.status === 200) router.push("/dashboard")
  }

  return (
    <div>
      <form action="" onSubmit={ handleSubmit }>
        <input 
          type="email" 
          placeholder='email' 
          name="email" 
          value={ formState.email } 
          onChange={ handleChange }
        />
        <input 
          type="password" 
          placeholder='password' 
          name="password" 
          value={ formState.password } 
          onChange={ handleChange }
        />
        <button>Login</button>
        <p>{ process.env.NEXT_PUBLIC_JWT_SECRET}</p>
      </form>
    </div>
  )
}

export default LoginPage