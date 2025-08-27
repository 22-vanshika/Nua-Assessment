import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../store/cartSlice'
import { CheckCircle, CreditCard, Truck, Lock, User, MapPin, Mail, Phone, ArrowRight, Package, Shield } from 'lucide-react'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total } = useSelector(state => state.cart)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  // Redirect if cart is empty
  if (items.length === 0 && !orderPlaced) {
    navigate('/cart')
    return null
  }

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart and show confirmation
    dispatch(clearCart())
    setOrderPlaced(true)
    setIsSubmitting(false)
    
    // Reset form
    reset()
  }

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  // Order confirmation page
  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-8 space-y-6 aurora-glow">
          <CheckCircle className="h-16 w-16 text-aurora-600 mx-auto" />
          <h1 className="text-3xl font-bold text-foreground">Order <span className="aurora-text">Confirmed!</span></h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
          </p>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              You will receive an email confirmation with your order details and tracking information.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-base btn-primary px-8 py-3"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8"><span className="aurora-text">Checkout</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="card p-6 aurora-glow">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                <User className="h-5 w-5 text-aurora-600" />
                <span>Personal Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register('firstName', { 
                      required: 'First name is required',
                      minLength: { value: 2, message: 'First name must be at least 2 characters' }
                    })}
                    className={`form-input ${
                      errors.firstName ? 'border-destructive focus-visible:ring-destructive' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register('lastName', { 
                      required: 'Last name is required',
                      minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                    })}
                    className={`form-input ${
                      errors.lastName ? 'border-destructive focus-visible:ring-destructive' : ''
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`form-input ${
                      errors.email ? 'border-destructive focus-visible:ring-destructive' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card p-6 aurora-glow">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-aurora-600" />
                <span>Shipping Address</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register('address', { 
                      required: 'Address is required',
                      minLength: { value: 5, message: 'Address must be at least 5 characters' }
                    })}
                    className={`form-input ${
                      errors.address ? 'border-destructive focus-visible:ring-destructive' : ''
                    }`}
                  />
                  {errors.address && (
                    <p className="text-destructive text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register('city', { 
                        required: 'City is required',
                        minLength: { value: 2, message: 'City must be at least 2 characters' }
                      })}
                      className={`form-input ${
                        errors.city ? 'border-destructive focus-visible:ring-destructive' : ''
                      }`}
                    />
                    {errors.city && (
                      <p className="text-destructive text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-foreground mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      {...register('state', { 
                        required: 'State is required',
                        minLength: { value: 2, message: 'State must be at least 2 characters' }
                      })}
                      className={`form-input ${
                        errors.state ? 'border-destructive focus-visible:ring-destructive' : ''
                      }`}
                    />
                    {errors.state && (
                      <p className="text-destructive text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-foreground mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      {...register('zipCode', { 
                        required: 'ZIP code is required',
                        pattern: {
                          value: /^[A-Za-z0-9\s-]{3,10}$/,
                          message: 'Please enter a valid postal code'
                        }
                        
                      })}
                      className={`form-input ${
                        errors.zipCode ? 'border-destructive focus-visible:ring-destructive' : ''
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="text-destructive text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-base w-full py-4 ${
                isSubmitting 
                  ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                  : 'btn-primary'
              }`}
            >
              <Lock className="h-5 w-5" />
              <span>{isSubmitting ? 'Processing...' : 'Place Order'}</span>
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="card p-6 h-fit space-y-6 aurora-glow">
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Package className="h-5 w-5 text-aurora-600" />
            <span>Order Summary</span>
          </h2>
          
          {/* Items */}
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted/30 rounded flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-aurora-600">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          
          {/* Totals */}
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-aurora-600 font-semibold">Free ✨</span>
            </div>
            
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>{formatPrice(total * 0.08)}</span>
            </div>
            
            <div className="border-t border-border pt-2">
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Total</span>
                <span className="text-aurora-600">{formatPrice(total * 1.08)}</span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 text-aurora-600" />
              <span>Your information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
