import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../services/axios' 
import logo from '../assets/img/testfront.jpg'

export function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/auth/signin', { 
                username, 
                password 
            }, { 
                withCredentials: true // This ensures that cookies are sent with the request
            })

            // Store user information in localStorage (you can also decide to use cookies here if you prefer)
            localStorage.setItem('user', JSON.stringify({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                roles: response.data.roles
            }))

            // Redirect based on user role
            const roles = response.data.roles
            if (roles.includes('ROLE_ADMIN')) {
                navigate('/admin/dashboard')
            } else if (roles.includes('ROLE_ORGANIZADOR')) {
                navigate('/organizador/events')
            } else if (roles.includes('ROLE_JURADO')) {
                navigate('/jurado/evaluations')
            } else {
                // Default route for regular users
                navigate('/events')
            }
        } catch (error) {
            // More specific error handling
            if (error.response) {
                setError(error.response.data.message || 'Invalid credentials')
            } else if (error.request) {
                setError('No response from server. Please try again.')
            } else {
                setError('Error logging in. Please try again.')
            }
            console.error('Login Error:', error)
        }
    }

    const handleGoogleLogin = () => {
        // TODO: Implement Google OAuth
        alert('Google Login not implemented yet')
    }

    return (
        <>
        <section className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="bg-gray-100 flex rounded-2xl shadow-2xl max-w-4xl w-full p-8">
                <div className="sm:w-1/2 px-12 flex flex-col justify-center">
                    <h2 className="font-bold text-3xl text-sky-400 mb-4">Login</h2>
                    <p className="text-base text-gray-600 mb-6">If you are already a member, easily log in</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Username</label>
                            <input 
                                className='p-3 rounded-xl border w-full focus:outline-none focus:ring-2 focus:ring-sky-400' 
                                type='text' 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Enter your username'
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Password</label>
                            <div className='relative'> 
                                <input 
                                    className='p-3 rounded-xl border w-full focus:outline-none focus:ring-2 focus:ring-sky-400' 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Enter your password'
                                    required
                                />
                                <svg 
                                    onClick={() => setShowPassword(!showPassword)}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="20" 
                                    height="20" 
                                    fill="gray" 
                                    className="bi bi-eye absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" 
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                </svg>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className='bg-sky-400 rounded-xl text-center text-white py-3 text-base hover:bg-sky-500 transition-colors'
                        >
                            Login
                        </button>
                    </form>
                    
                    <div className='mt-8 grid grid-cols-3 items-center text-gray-500'>
                        <hr className='border-gray-500'/>
                        <p className='text-center'>OR</p>
                        <hr className='border-gray-500'/>
                    </div>

                    <button 
                        onClick={handleGoogleLogin}
                        className='bg-white border py-3 w-full rounded-xl mt-6 flex justify-center items-center hover:bg-gray-50 transition-colors'
                    >
                        <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        Login with Google
                    </button>

                    <div className='mt-6 text-center'>
                        <p className='text-gray-600'>
                            Don't have an account? 
                            <Link to="/signup" className='text-sky-400 ml-2 hover:underline'>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="w-1/2 hidden sm:flex items-center justify-center p-8">
                    <img 
                        className='object-cover w-full h-full rounded-2xl shadow-2xl' 
                        src={logo} 
                        alt='Login background'
                    />
                </div>
            </div>
        </section>
    </>
    )
}
