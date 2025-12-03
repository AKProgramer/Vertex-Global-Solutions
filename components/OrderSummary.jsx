import { CreditCard, Lock, PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '£';

    const router = useRouter();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('STRIPE');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');
    
    // Payment form states
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [postcode, setPostcode] = useState('');

    // Format card number with spaces
    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        if (value.length <= 16) {
            setCardNumber(formattedValue);
        }
    };

    // Format expiry date MM/YY
    const handleExpiryChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            const formattedValue = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
            setExpiryDate(formattedValue);
        }
    };

    // Format CVV to 3-4 digits
    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            setCvv(value);
        }
    };

    const handleCouponCode = async (event) => {
        event.preventDefault();
        
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        // Validate address
        if (!selectedAddress) {
            toast.error('Please select or add a delivery address');
            return;
        }

        // Validate payment fields
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 15) {
            toast.error('Please enter a valid card number');
            return;
        }

        if (!cardName || cardName.trim().length < 3) {
            toast.error('Please enter the cardholder name');
            return;
        }

        if (!expiryDate || expiryDate.length < 5) {
            toast.error('Please enter a valid expiry date (MM/YY)');
            return;
        }

        // Validate expiry date format and check if not expired
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = parseInt(currentDate.getFullYear().toString().slice(-2));
        const currentMonth = currentDate.getMonth() + 1;
        
        if (parseInt(month) > 12 || parseInt(month) < 1) {
            toast.error('Invalid expiry month');
            return;
        }

        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            toast.error('Card has expired');
            return;
        }

        if (!cvv || cvv.length < 3) {
            toast.error('Please enter a valid CVV/Security code');
            return;
        }

        if (!postcode || postcode.trim().length < 5) {
            toast.error('Please enter a valid UK postcode');
            return;
        }

        // Show processing toast
        const loadingToast = toast.loading('Processing payment...');

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            // Show success message
            toast.success('Order placed successfully! 🎉', {
                duration: 3000,
                icon: '✅'
            });

            // Redirect to orders page after a short delay
            setTimeout(() => {
                router.push('/orders');
            }, 1000);
        } catch (error) {
            // Dismiss loading toast
            toast.dismiss(loadingToast);
            toast.error('Payment failed. Please try again.');
        }
    }

    return (
        <div className='w-full max-w-lg lg:max-w-[480px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7'>
            <h2 className='text-xl font-medium text-slate-600'>Payment Summary</h2>
            <p className='text-slate-400 text-xs my-4'>Payment Method</p>
            <div className='flex gap-2 items-center'>
                <input type="radio" id="STRIPE" onChange={() => setPaymentMethod('STRIPE')} checked={paymentMethod === 'STRIPE'} className='accent-indigo-500' />
                <label htmlFor="STRIPE" className='cursor-pointer flex items-center gap-2'>
                    <span className='font-medium text-slate-700'>Stripe Payment</span>
                    <span className='text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded'>Secure</span>
                </label>
            </div>
            <div className='flex gap-2 items-center mt-2'>
                <input type="radio" id="CARD" name='payment' onChange={() => setPaymentMethod('CARD')} checked={paymentMethod === 'CARD'} className='accent-blue-500' />
                <label htmlFor="CARD" className='cursor-pointer flex items-center gap-2'>
                    <span className='font-medium text-slate-700'>Card Payment</span>
                    <span className='text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded'>UK Cards</span>
                </label>
            </div>

            {/* Payment Form Fields */}
            <div className='my-5 p-4 bg-white border border-slate-200 rounded-lg'>
                <div className='flex items-center gap-2 mb-4 text-slate-600'>
                    <Lock size={16} className='text-green-600' />
                    <span className='text-xs font-medium'>Secure Payment Processing</span>
                </div>

                {paymentMethod === 'STRIPE' && (
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2 mb-3 pb-3 border-b'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className='h-5' />
                            <span className='text-xs text-slate-500'>Powered by Stripe</span>
                        </div>
                        
                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-2'>Card Number</label>
                            <div className='relative'>
                                <input
                                    type='text'
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder='1234 5678 9012 3456'
                                    className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                                />
                                <CreditCard className='absolute right-3 top-2.5 text-slate-400' size={20} />
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-2'>Cardholder Name</label>
                            <input
                                type='text'
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder='John Smith'
                                className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                            />
                        </div>

                        <div className='grid grid-cols-3 gap-3'>
                            <div>
                                <label className='block text-xs font-medium text-slate-700 mb-2'>Expiry</label>
                                <input
                                    type='text'
                                    value={expiryDate}
                                    onChange={handleExpiryChange}
                                    placeholder='MM/YY'
                                    className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                                />
                            </div>
                            <div>
                                <label className='block text-xs font-medium text-slate-700 mb-2'>CVV</label>
                                <input
                                    type='text'
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    placeholder='123'
                                    className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                                />
                            </div>
                            <div>
                                <label className='block text-xs font-medium text-slate-700 mb-2'>Postcode</label>
                                <input
                                    type='text'
                                    value={postcode}
                                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                                    placeholder='SW1A 1AA'
                                    className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition'
                                />
                            </div>
                        </div>

                        <div className='flex items-center gap-2 text-xs text-slate-500 mt-3'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className='h-4' />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className='h-4' />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className='h-4' />
                        </div>
                    </div>
                )}

                {paymentMethod === 'CARD' && (
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2 mb-3 pb-3 border-b'>
                            <CreditCard size={18} className='text-blue-600' />
                            <span className='text-xs text-slate-600 font-medium'>UK Debit & Credit Cards Accepted</span>
                        </div>
                        
                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-2'>Card Number</label>
                            <div className='relative'>
                                <input
                                    type='text'
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder='1234 5678 9012 3456'
                                    className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                />
                                <CreditCard className='absolute right-3 top-2.5 text-slate-400' size={20} />
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-2'>Name on Card</label>
                            <input
                                type='text'
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder='John Smith'
                                className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <label className='block text-xs font-medium text-slate-700 mb-2'>Expiry Date</label>
                                <input
                                    type='text'
                                    value={expiryDate}
                                    onChange={handleExpiryChange}
                                    placeholder='MM/YY'
                                    className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                />
                            </div>
                            <div>
                                <label className='block text-xs font-medium text-slate-700 mb-2'>Security Code</label>
                                <input
                                    type='text'
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    placeholder='123'
                                    className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-medium text-slate-700 mb-2'>Billing Postcode (UK)</label>
                            <input
                                type='text'
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                                placeholder='SW1A 1AA'
                                className='w-full px-3 py-2.5 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                            />
                        </div>

                        <div className='flex items-center gap-2 text-xs text-slate-500 mt-3'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className='h-4' />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className='h-4' />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className='h-4' />
                            <span className='ml-auto'>Secure SSL Encryption</span>
                        </div>
                    </div>
                )}
            </div>

            <div className='my-4 py-4 border-y border-slate-200 text-slate-400'>
                <p>Address</p>
                {
                    selectedAddress ? (
                        <div className='flex gap-2 items-center'>
                            <p>{selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</p>
                            <SquarePenIcon onClick={() => setSelectedAddress(null)} className='cursor-pointer' size={18} />
                        </div>
                    ) : (
                        <div>
                            {
                                addressList.length > 0 && (
                                    <select className='border border-slate-400 p-2 w-full my-3 outline-none rounded' onChange={(e) => setSelectedAddress(addressList[e.target.value])} >
                                        <option value="">Select Address</option>
                                        {
                                            addressList.map((address, index) => (
                                                <option key={index} value={index}>{address.name}, {address.city}, {address.state}, {address.zip}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                            <button className='flex items-center gap-1 text-slate-600 mt-1' onClick={() => setShowAddressModal(true)} >Add Address <PlusIcon size={18} /></button>
                        </div>
                    )
                }
            </div>
            <div className='pb-4 border-b border-slate-200'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1 text-slate-400'>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        {coupon && <p>Coupon:</p>}
                    </div>
                    <div className='flex flex-col gap-1 font-medium text-right'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p>Free</p>
                        {coupon && <p>{`-${currency}${(coupon.discount / 100 * totalPrice).toFixed(2)}`}</p>}
                    </div>
                </div>
                {
                    !coupon ? (
                        <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })} className='flex justify-center gap-3 mt-3'>
                            <input onChange={(e) => setCouponCodeInput(e.target.value)} value={couponCodeInput} type="text" placeholder='Coupon Code' className='border border-slate-400 p-1.5 rounded w-full outline-none' />
                            <button className='bg-slate-600 text-white px-3 rounded hover:bg-slate-800 active:scale-95 transition-all'>Apply</button>
                        </form>
                    ) : (
                        <div className='w-full flex items-center justify-center gap-2 text-xs mt-2'>
                            <p>Code: <span className='font-semibold ml-1'>{coupon.code.toUpperCase()}</span></p>
                            <p>{coupon.description}</p>
                            <XIcon size={18} onClick={() => setCoupon('')} className='hover:text-red-700 transition cursor-pointer' />
                        </div>
                    )
                }
            </div>
            <div className='flex justify-between py-4'>
                <p>Total:</p>
                <p className='font-medium text-right'>{currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}</p>
            </div>
            <button 
                onClick={handlePlaceOrder} 
                className='w-full bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-900 active:scale-95 transition-all font-medium flex items-center justify-center gap-2'
            >
                <Lock size={16} />
                Place Order - {currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}
            </button>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}

        </div>
    )
}

export default OrderSummary