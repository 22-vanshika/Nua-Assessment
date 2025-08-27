import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { formatPrice } from '../utils/formatters'
import { renderStarRating, getCategoryDisplayName } from '../utils/productUtils.jsx'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorMessage, { NetworkError } from '../components/ui/ErrorMessage'
import { ProductDetailSkeleton } from '../components/ui/SkeletonLoader'
import { ArrowLeft, ShoppingCart, Plus, Minus, Heart, Share2, CheckCircle, Truck, Shield, RotateCcw } from 'lucide-react'

/**
 * ProductDetail page component - Refactored for clean code
 * Displays detailed product information with purchase options
 */
const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  
  // Custom hooks
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isWishlisted = isInWishlist(id)

  const { 
    data: product, 
    isLoading, 
    error,
    refetch
  } = useProduct(id)

  // Handle quantity changes
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 5) {
      setQuantity(newQuantity)
    }
  }

  // Event handlers
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setAddedToCart(true)
      
      // Reset the "added" state after 2 seconds
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product)
    }
  }



  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-aurora-600 hover:text-aurora-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>
        <NetworkError onRetry={refetch} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-aurora-600 hover:text-aurora-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>
        <ErrorMessage 
          variant="warning" 
          message="Product not found. The item you're looking for may have been removed or is no longer available." 
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-aurora-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-foreground font-medium line-clamp-1">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="card p-8 aspect-square aurora-glow">
            <div className="relative h-full flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden group">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-full shadow-lg transition-colors aurora-glow ${
                    isWishlisted ? 'bg-destructive text-white' : 'bg-card text-muted-foreground hover:bg-aurora-50 hover:text-aurora-600'
                  }`}
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 bg-card text-muted-foreground rounded-full shadow-lg hover:bg-aurora-50 hover:text-aurora-600 transition-colors aurora-glow">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Zoom Indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-xs text-muted-foreground bg-card px-2 py-1 rounded aurora-glow">
                  Hover to zoom
                </span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-aurora-100 rounded-full flex items-center justify-center mx-auto aurora-glow">
                <Truck className="h-6 w-6 text-aurora-600" />
              </div>
              <p className="text-xs text-muted-foreground">Free Shipping</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto aurora-glow">
                <Shield className="h-6 w-6 text-indigo-500" />
              </div>
              <p className="text-xs text-muted-foreground">Secure Payment</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto aurora-glow">
                <RotateCcw className="h-6 w-6 text-violet-400" />
              </div>
              <p className="text-xs text-muted-foreground">30-Day Returns</p>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          {/* Category Badge */}
          <div className="inline-flex items-center px-3 py-1 bg-aurora-100 text-aurora-800 text-sm font-medium rounded-full aurora-glow">
            {getCategoryDisplayName(product.category)}
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {product.title}
          </h1>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-4">
            {renderStarRating(product.rating, { size: 'h-5 w-5', showCount: false })}
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="text-4xl font-bold text-aurora-600">
              {formatPrice(product.price)}
            </div>
            <p className="text-sm text-muted-foreground">
              Price includes all taxes. Free shipping on orders over $50.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-border rounded-lg aurora-glow">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-aurora-50 hover:text-aurora-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                
                <span className="text-lg font-semibold px-4 py-3 min-w-[60px] text-center text-foreground">
                  {quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 5}
                  className="p-3 hover:bg-aurora-50 hover:text-aurora-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <span className="text-sm text-muted-foreground">
                Maximum 5 items per order
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className={`btn-base w-full py-4 text-lg font-semibold ${
                addedToCart
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'btn-primary'
              }`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </button>

            <button 
              onClick={handleWishlistToggle}
              className={`btn-base btn-secondary w-full py-4 ${
                isWishlisted ? 'bg-destructive/10 border-destructive/20 text-destructive' : ''
              }`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Order Summary */}
          <div className="card p-6 bg-muted/30 aurora-glow">
            <h4 className="font-semibold text-foreground mb-4">Order Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                <span className="font-semibold text-foreground">{formatPrice(product.price * quantity)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-aurora-600">Free ✨</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-semibold text-foreground">{formatPrice(product.price * quantity * 0.08)}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-xl font-bold text-aurora-600">
                    {formatPrice(product.price * quantity * 1.08)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
