'use client'
import { assets } from '@/assets/assets'
import Title from '@/components/Title'
import { Award, ShieldCheck, TrendingUp, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const AboutPage = () => {

    const values = [
        {
            icon: ShieldCheck,
            title: 'Trust & Quality',
            description: 'We only offer products that meet our high standards of quality and reliability.',
            accent: '#22C55E'
        },
        {
            icon: Users,
            title: 'Customer First',
            description: 'Your satisfaction is our priority. We\'re here to provide exceptional service.',
            accent: '#3B82F6'
        },
        {
            icon: TrendingUp,
            title: 'Innovation',
            description: 'We stay ahead of the curve, bringing you the latest technology and trends.',
            accent: '#F59E0B'
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'We strive for excellence in every aspect of our business.',
            accent: '#8B5CF6'
        }
    ]

    return (
        <div className='min-h-screen'>
            {/* Hero Section */}
            <div className='mx-6'>
                <div className='max-w-7xl mx-auto my-10'>
                    <div className='relative flex flex-col lg:flex-row gap-8 items-center bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 sm:p-16 overflow-hidden'>
                        <div className='flex-1 z-10'>
                            <div className='inline-flex items-center gap-3 bg-green-200 text-green-600 px-4 py-2 rounded-full text-xs sm:text-sm mb-6'>
                                <span className='bg-green-600 px-3 py-1 rounded-full text-white text-xs'>ABOUT US</span>
                                Discover Our Story
                            </div>
                            <h1 className='text-4xl sm:text-6xl leading-[1.2] font-semibold bg-gradient-to-r from-slate-700 to-green-600 bg-clip-text text-transparent mb-6'>
                                Your Trusted Partner in Tech
                            </h1>
                            <p className='text-slate-600 text-lg max-w-2xl'>
                                At vertexglobal, we're passionate about bringing you the latest and greatest in technology. From cutting-edge smartphones to essential accessories, we curate products that enhance your digital lifestyle.
                            </p>
                        </div>
                        <div className='relative w-full lg:w-1/2 h-64 lg:h-96'>
                            <Image 
                                src={assets.hero_model_img} 
                                alt="About Us" 
                                className='object-contain'
                                fill
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className='px-6 my-20 max-w-6xl mx-auto'>
                <Title 
                    visibleButton={false} 
                    title='Our Story' 
                    description="Founded with a vision to make premium technology accessible to everyone." 
                />
                <div className='mt-10 space-y-6 text-slate-600'>
                    <p className='text-lg leading-relaxed'>
                        vertexglobal was born from a simple idea: everyone deserves access to quality technology at fair prices. We started our journey with a commitment to bridging the gap between innovation and affordability, ensuring that the latest gadgets are within reach for all.
                    </p>
                    <p className='text-lg leading-relaxed'>
                        Today, we've grown into a trusted marketplace where tech enthusiasts, professionals, and everyday users find the devices they need. Our platform connects you with verified sellers offering authentic products, competitive pricing, and reliable service.
                    </p>
                    <p className='text-lg leading-relaxed'>
                        We believe in empowering our community—whether you're a buyer looking for your next device or a seller building your business. At vertexglobal, you're part of a movement that values quality, transparency, and innovation.
                    </p>
                </div>
            </div>

            {/* Our Values Section */}
            <div className='px-6 my-20 max-w-6xl mx-auto'>
                <Title 
                    visibleButton={false} 
                    title='Our Values' 
                    description="The principles that guide everything we do at vertexglobal." 
                />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 gap-y-10 mt-16'>
                    {values.map((value, index) => {
                        return (
                            <div 
                                className='relative h-56 px-6 flex flex-col items-center justify-center w-full text-center border rounded-xl group hover:shadow-lg transition-all' 
                                style={{ backgroundColor: value.accent + '10', borderColor: value.accent + '30' }} 
                                key={index}
                            >
                                <h3 className='text-slate-800 font-semibold text-lg mt-6'>{value.title}</h3>
                                <p className='text-sm text-slate-600 mt-3'>{value.description}</p>
                                <div 
                                    className='absolute -top-5 text-white size-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition shadow-md' 
                                    style={{ backgroundColor: value.accent }}
                                >
                                    <value.icon size={24} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Stats Section */}
            <div className='mx-6 mb-20'>
                <div className='max-w-7xl mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-16'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white'>
                        <div>
                            <h3 className='text-5xl font-bold mb-2'>10K+</h3>
                            <p className='text-indigo-100'>Happy Customers</p>
                        </div>
                        <div>
                            <h3 className='text-5xl font-bold mb-2'>500+</h3>
                            <p className='text-indigo-100'>Products Available</p>
                        </div>
                        <div>
                            <h3 className='text-5xl font-bold mb-2'>50+</h3>
                            <p className='text-indigo-100'>Trusted Sellers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className='px-6 my-20 max-w-6xl mx-auto'>
                <div className='bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200'>
                    <div className='max-w-3xl mx-auto text-center'>
                        <h2 className='text-3xl sm:text-4xl font-semibold text-slate-800 mb-6'>Our Mission</h2>
                        <p className='text-lg text-slate-600 leading-relaxed'>
                            To revolutionize the way people discover and purchase technology by creating a transparent, reliable, and customer-focused marketplace. We're committed to connecting buyers with quality products and empowering sellers to grow their businesses—all while maintaining the highest standards of service and integrity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
