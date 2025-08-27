import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatters'
import PageHeader from '../components/ui/PageHeader'
import EmptyState from '../components/ui/EmptyState'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

/**
 * Cart page component - Refactored for clean code
 * Displays cart items with quantity management and checkout options
 */
const Cart = () => {
  const { 
    cartItems, 
    cartTotal, 
    totalItems, 
    updateQuantity, 
    removeFromCart,
    getTotalWithTax 
  } = useCart()

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader 
          title="Shopping Cart"
          highlightText="Cart"
        />
        
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added any items to your cart yet."
          actionText="Continue Shopping"
          actionLink="/products"
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title="Shopping Cart"
        highlightText="Cart"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div 
              key={item.id} 
              className="card card-interactive p-6 flex flex-col sm:flex-row gap-4 aurora-glow"
            >
              {/* Product Image */}
              <div className="w-full sm:w-24 h-24 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-lg font-bold text-aurora-600">
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col sm:items-end space-y-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1 border border-border rounded hover:bg-aurora-50 hover:border-aurora-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <span className="text-lg font-semibold min-w-[40px] text-center text-foreground">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                    className="p-1 border border-border rounded hover:bg-aurora-50 hover:border-aurora-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <p className="text-lg font-bold text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center space-x-1 text-destructive hover:text-destructive/80 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="card p-6 h-fit space-y-6 aurora-glow">
          <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-muted-foreground">
              <span>Items ({totalItems})</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-aurora-600 font-semibold">Free ✨</span>
            </div>
            
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>{formatPrice(cartTotal * 0.08)}</span>
            </div>
            
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Total</span>
                <span className="text-aurora-600">{formatPrice(getTotalWithTax())}</span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="btn-base btn-primary w-full"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/"
            className="w-full flex items-center justify-center text-aurora-600 hover:text-aurora-700 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
