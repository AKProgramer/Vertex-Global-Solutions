'use client'
import Title from '@/components/Title'
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PrivacyPolicyPage = () => {
    const sections = [
        {
            icon: FileText,
            title: 'Information We Collect',
            content: 'We collect personal information (name, email, address, phone) when you create an account or make a purchase. We also collect payment details through secure third-party processors and usage data (IP address, browser type, pages visited) to improve your experience.'
        },
        {
            icon: Lock,
            title: 'How We Use Your Information',
            content: 'Your information is used to process orders, communicate with you, send promotional emails (you can opt-out), improve our services, prevent fraud, and comply with legal obligations.'
        },
        {
            icon: Shield,
            title: 'Information Sharing',
            content: 'We share your information with trusted service providers (payment processors, shipping companies), when required by law, or with your explicit consent. We never sell your personal data to third parties.'
        },
        {
            icon: Eye,
            title: 'Your Rights',
            content: 'You can access, update, or delete your account information at any time. You have the right to opt-out of marketing emails, control cookies, and request a copy of your data. Contact us to exercise these rights.'
        },
        {
            icon: Lock,
            title: 'Data Security',
            content: 'We use SSL encryption and PCI DSS compliant payment processors to protect your data. While we implement strong security measures, no internet transmission is 100% secure. We retain your data as long as necessary and delete it when you close your account.'
        }
    ]

    return (
        <div className='min-h-screen'>
            {/* Hero Section */}
            <div className='mx-6'>
                <div className='max-w-7xl mx-auto my-10'>
                    <div className='relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-16 overflow-hidden text-center'>
                        <div className='inline-flex items-center gap-3 bg-blue-200 text-blue-600 px-4 py-2 rounded-full text-xs sm:text-sm mb-6'>
                            <span className='bg-blue-600 px-3 py-1 rounded-full text-white text-xs'>PRIVACY</span>
                            Your Privacy Matters
                        </div>
                        <h1 className='text-4xl sm:text-6xl leading-[1.2] font-semibold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent mb-6'>
                            Privacy Policy
                        </h1>
                        <p className='text-slate-600 text-lg max-w-2xl'>
                            Last Updated: December 5, 2025
                        </p>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <div className='px-6 my-12 max-w-4xl mx-auto'>
                <div className='bg-blue-50 border border-blue-200 rounded-xl p-6'>
                    <p className='text-slate-700 leading-relaxed text-center'>
                        At <strong>vertexglobal</strong>, we are committed to protecting your privacy. This policy explains how we collect, 
                        use, and safeguard your personal information when you use our website and services.
                    </p>
                </div>
            </div>

            {/* Policy Sections */}
            <div className='px-6 my-12 max-w-4xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {sections.map((section, index) => (
                        <div key={index} className='bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='bg-blue-100 text-blue-600 p-2.5 rounded-lg'>
                                    <section.icon size={20} />
                                </div>
                                <h2 className='text-lg font-semibold text-slate-800'>{section.title}</h2>
                            </div>
                            <p className='text-slate-600 leading-relaxed text-sm'>{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Points */}
            <div className='px-6 my-12 max-w-4xl mx-auto'>
                <div className='bg-slate-50 border border-slate-200 rounded-xl p-6'>
                    <h2 className='text-xl font-semibold text-slate-800 mb-4'>Important Notes</h2>
                    <ul className='space-y-2 text-slate-600 text-sm'>
                        <li className='flex items-start gap-2'>
                            <span className='text-blue-600 mt-1'>•</span>
                            <span><strong>Cookies:</strong> We use cookies to enhance your browsing experience. You can control cookies through your browser settings.</span>
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-blue-600 mt-1'>•</span>
                            <span><strong>Children's Privacy:</strong> Our services are not intended for individuals under 16. We do not knowingly collect information from children.</span>
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-blue-600 mt-1'>•</span>
                            <span><strong>UK GDPR:</strong> As a UK-based business, we comply with UK GDPR and Data Protection Act 2018.</span>
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-blue-600 mt-1'>•</span>
                            <span><strong>Policy Updates:</strong> We may update this policy and will notify you of significant changes.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contact Information */}
            <div className='px-6 my-12 max-w-4xl mx-auto'>
                <div className='bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-8 text-white'>
                    <div className='max-w-2xl mx-auto text-center'>
                        <Mail size={40} className='mx-auto mb-4' />
                        <h2 className='text-2xl font-semibold mb-3'>Questions About Privacy?</h2>
                        <p className='text-blue-100 mb-4 text-sm'>
                            Contact us if you have any questions or concerns about this Privacy Policy.
                        </p>
                        <div className='space-y-1 text-blue-100 text-sm mb-6'>
                            <p><strong className='text-white'>Email:</strong> alivertexglobal@gmail.com</p>
                            <p><strong className='text-white'>Phone:</strong> +44-778-227-7004</p>
                        </div>
                        <Link 
                            href='/contact' 
                            className='inline-block bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition text-sm'
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Back to Home */}
            <div className='text-center pb-12'>
                <Link href='/' className='text-blue-600 hover:text-blue-700 font-medium text-sm'>
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}

export default PrivacyPolicyPage
