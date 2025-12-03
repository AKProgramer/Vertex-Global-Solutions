'use client'
import { Lock, Mail, Eye, EyeOff, User, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const SignupPage = () => {
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhone = (phone) => {
        // UK phone number validation (flexible format)
        const phoneRegex = /^(\+44|0)?[1-9]\d{9,10}$/
        return phoneRegex.test(phone.replace(/\s/g, ''))
    }

    const validatePassword = (password) => {
        // At least 8 characters, one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
        return passwordRegex.test(password)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation checks
        if (!formData.fullName.trim()) {
            toast.error('Full name is required')
            return
        }

        if (formData.fullName.trim().length < 3) {
            toast.error('Full name must be at least 3 characters')
            return
        }

        if (!formData.email.trim()) {
            toast.error('Email is required')
            return
        }

        if (!validateEmail(formData.email)) {
            toast.error('Please enter a valid email address')
            return
        }

        if (!formData.phone.trim()) {
            toast.error('Phone number is required')
            return
        }

        if (!validatePhone(formData.phone)) {
            toast.error('Please enter a valid UK phone number')
            return
        }

        if (!formData.password) {
            toast.error('Password is required')
            return
        }

        if (!validatePassword(formData.password)) {
            toast.error('Password must be at least 8 characters with uppercase, lowercase, and number')
            return
        }

        if (!formData.confirmPassword) {
            toast.error('Please confirm your password')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (!agreedToTerms) {
            toast.error('Please agree to the Terms & Conditions')
            return
        }

        setIsLoading(true)
        const loadingToast = toast.loading('Creating your account...')

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            toast.dismiss(loadingToast)
            toast.success('Account created successfully! 🎉', {
                duration: 2000,
                icon: '✅'
            })

            // Redirect to login page after successful signup
            setTimeout(() => {
                router.push('/login')
            }, 1000)
        } catch (error) {
            toast.dismiss(loadingToast)
            toast.error('Signup failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'>
            <div className='w-full max-w-2xl'>
                {/* Logo */}
                <Link href="/" className='flex justify-center mb-8'>
                    <div className='text-4xl font-semibold text-slate-700'>
                        <span className='text-green-600'>vertex</span>global<span className='text-green-600 text-5xl leading-0'>.</span>
                    </div>
                </Link>

                {/* Signup Card */}
                <div className='bg-white rounded-2xl shadow-xl p-8 border border-slate-200'>
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-slate-800 mb-2'>Create Account</h1>
                        <p className='text-slate-600'>Join vertexglobal and start shopping</p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {/* Full Name Field */}
                            <div>
                                <label htmlFor='fullName' className='block text-sm font-medium text-slate-700 mb-2'>
                                    Full Name *
                                </label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-3.5 text-slate-400' size={18} />
                                    <input
                                        type='text'
                                        id='fullName'
                                        name='fullName'
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder='John Smith'
                                        className='w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-slate-700 mb-2'>
                                    Email Address *
                                </label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-3.5 text-slate-400' size={18} />
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='your.email@example.com'
                                        className='w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor='phone' className='block text-sm font-medium text-slate-700 mb-2'>
                                Phone Number (UK) *
                            </label>
                            <div className='relative'>
                                <Phone className='absolute left-3 top-3.5 text-slate-400' size={18} />
                                <input
                                    type='tel'
                                    id='phone'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder='+44 7700 900000'
                                    className='w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {/* Password Field */}
                            <div>
                                <label htmlFor='password' className='block text-sm font-medium text-slate-700 mb-2'>
                                    Password *
                                </label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-3.5 text-slate-400' size={18} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='Create password'
                                        className='w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition'
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className='text-xs text-slate-500 mt-1'>Min 8 chars, uppercase, lowercase, number</p>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor='confirmPassword' className='block text-sm font-medium text-slate-700 mb-2'>
                                    Confirm Password *
                                </label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-3.5 text-slate-400' size={18} />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder='Confirm password'
                                        className='w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className='absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition'
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className='flex items-start gap-2'>
                            <input 
                                type='checkbox' 
                                id='terms'
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className='w-4 h-4 mt-1 accent-green-500 rounded' 
                            />
                            <label htmlFor='terms' className='text-sm text-slate-600'>
                                I agree to the{' '}
                                <Link href='#' className='text-green-600 hover:text-green-700 font-medium'>
                                    Terms & Conditions
                                </Link>
                                {' '}and{' '}
                                <Link href='#' className='text-green-600 hover:text-green-700 font-medium'>
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Signup Button */}
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3.5 rounded-lg transition flex items-center justify-center gap-2 group'
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                            <ArrowRight size={18} className='group-hover:translate-x-1 transition' />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='relative my-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-slate-300'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-4 bg-white text-slate-500'>Or sign up with</span>
                        </div>
                    </div>

                    {/* Social Signup */}
                    <div className='grid grid-cols-2 gap-3'>
                        <button className='flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition text-sm font-medium text-slate-700'>
                            <svg className='w-5 h-5' viewBox='0 0 24 24'>
                                <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
                                <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                                <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                                <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
                            </svg>
                            Google
                        </button>
                        <button className='flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition text-sm font-medium text-slate-700'>
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z'/>
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className='text-center text-sm text-slate-600 mt-6'>
                        Already have an account?{' '}
                        <Link href='/login' className='text-green-600 hover:text-green-700 font-semibold'>
                            Login
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className='text-center mt-6'>
                    <Link href='/' className='text-sm text-slate-600 hover:text-slate-800 flex items-center justify-center gap-1'>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
