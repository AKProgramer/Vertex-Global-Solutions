'use client'
import Title from '@/components/Title'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import React, { useState } from 'react'

const ContactPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Form submitted:', formData)
        alert('Thank you for contacting us! We will get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            details: ['+44-778-227-7004'],
            accent: '#22C55E'
        },
        {
            icon: Mail,
            title: 'Email',
            details: ['gateway.consultisor@gmail.com'],
            accent: '#3B82F6'
        },
        {
            icon: MapPin,
            title: 'Address',
            details: ['SUITE C153 4 - 6, GREATOREX STREET', 'LONDON, E1 5NF', 'UNITED KINGDOM'],
            accent: '#F59E0B'
        }
    ]

    return (
        <div className='min-h-screen'>
            {/* Hero Section */}
            <div className='mx-6'>
                <div className='max-w-7xl mx-auto my-10'>
                    <div className='relative flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-16 overflow-hidden text-center'>
                        <div className='inline-flex items-center gap-3 bg-indigo-200 text-indigo-600 px-4 py-2 rounded-full text-xs sm:text-sm mb-6'>
                            <span className='bg-indigo-600 px-3 py-1 rounded-full text-white text-xs'>CONTACT US</span>
                            We're Here to Help
                        </div>
                        <h1 className='text-4xl sm:text-6xl leading-[1.2] font-semibold bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent mb-6'>
                            Get in Touch
                        </h1>
                        <p className='text-slate-600 text-lg max-w-2xl'>
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Info Cards */}
            <div className='px-6 my-20 max-w-6xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {contactInfo.map((info, index) => {
                        return (
                            <div 
                                className='relative h-auto min-h-[180px] px-6 py-8 flex flex-col items-center justify-center w-full text-center border rounded-xl group hover:shadow-lg transition-all' 
                                style={{ backgroundColor: info.accent + '10', borderColor: info.accent + '30' }} 
                                key={index}
                            >
                                <div 
                                    className='text-white size-14 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition shadow-md' 
                                    style={{ backgroundColor: info.accent }}
                                >
                                    <info.icon size={28} />
                                </div>
                                <h3 className='text-slate-800 font-semibold text-lg mb-2'>{info.title}</h3>
                                <div className='text-sm text-slate-600 space-y-1'>
                                    {info.details.map((detail, i) => (
                                        <p key={i}>{detail}</p>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Contact Form and Map Section */}
            <div className='px-6 my-20 max-w-6xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    {/* Contact Form */}
                    <div>
                        <Title 
                            visibleButton={false} 
                            title='Send us a Message' 
                            description='Fill out the form below and we will get back to you shortly.' 
                        />
                        
                        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
                            <div>
                                <label htmlFor='name' className='block text-sm font-medium text-slate-700 mb-2'>
                                    Full Name *
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition'
                                    placeholder='John Doe'
                                />
                            </div>

                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-slate-700 mb-2'>
                                    Email Address *
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition'
                                    placeholder='john@example.com'
                                />
                            </div>

                            <div>
                                <label htmlFor='subject' className='block text-sm font-medium text-slate-700 mb-2'>
                                    Subject *
                                </label>
                                <input
                                    type='text'
                                    id='subject'
                                    name='subject'
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition'
                                    placeholder='How can we help?'
                                />
                            </div>

                            <div>
                                <label htmlFor='message' className='block text-sm font-medium text-slate-700 mb-2'>
                                    Message *
                                </label>
                                <textarea
                                    id='message'
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none'
                                    placeholder='Tell us more about your inquiry...'
                                />
                            </div>

                            <button
                                type='submit'
                                className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3.5 px-6 rounded-lg transition flex items-center justify-center gap-2 group'
                            >
                                <Send size={18} className='group-hover:translate-x-1 transition' />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Map and Additional Info */}
                    <div>
                        <Title 
                            visibleButton={false} 
                            title='Visit Our Location' 
                            description='Find us at our office or reach out through any channel.' 
                        />
                        
                        {/* Map Placeholder */}
                        <div className='mt-8 w-full h-[400px] bg-slate-200 rounded-xl overflow-hidden border border-slate-300'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.6934447477764!2d-0.06892!3d51.51867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb3f8e7f21d%3A0x1f2b9c7b4e8f0c1a!2sGreatorex%20St%2C%20London%20E1%205NF%2C%20UK!5e0!3m2!1sen!2s!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Business Hours */}
                        <div className='mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6'>
                            <h3 className='text-lg font-semibold text-slate-800 mb-4'>Business Hours</h3>
                            <div className='space-y-2 text-sm text-slate-600'>
                                <div className='flex justify-between'>
                                    <span>Monday - Friday:</span>
                                    <span className='font-medium text-slate-800'>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Saturday:</span>
                                    <span className='font-medium text-slate-800'>10:00 AM - 4:00 PM</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Sunday:</span>
                                    <span className='font-medium text-slate-800'>Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className='px-6 my-20 max-w-6xl mx-auto'>
                <Title 
                    visibleButton={false} 
                    title='Frequently Asked Questions' 
                    description='Quick answers to common questions.' 
                />
                
                <div className='mt-10 space-y-4'>
                    <div className='bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition'>
                        <h4 className='text-lg font-semibold text-slate-800 mb-2'>How long does shipping take?</h4>
                        <p className='text-slate-600'>Standard shipping typically takes 5-7 business days. Express shipping options are also available at checkout.</p>
                    </div>
                    <div className='bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition'>
                        <h4 className='text-lg font-semibold text-slate-800 mb-2'>What is your return policy?</h4>
                        <p className='text-slate-600'>We offer a 30-day return policy on most items. Products must be in original condition with all packaging.</p>
                    </div>
                    <div className='bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition'>
                        <h4 className='text-lg font-semibold text-slate-800 mb-2'>Do you ship internationally?</h4>
                        <p className='text-slate-600'>Yes, we ship to most countries worldwide. International shipping times and costs vary by location.</p>
                    </div>
                    <div className='bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition'>
                        <h4 className='text-lg font-semibold text-slate-800 mb-2'>How can I track my order?</h4>
                        <p className='text-slate-600'>Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
