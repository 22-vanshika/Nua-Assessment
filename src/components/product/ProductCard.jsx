import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useWishlist } from '../../hooks/useWishlist'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatters'
import { renderStarRating, getProductBadge, getCategoryDisplayName } from '../../utils/productUtils.jsx'

/**
 * Reusable ProductCard component
 * Used in ProductListing, Wishlist, and other product grid displays
 */
const ProductCard = ({ 
  product, 
  variant = 'default', // 'default' | 'wishlist'
  className = '',
  showQuickActions = true,
  showCategory = true,
  showRating = true
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  const isWishlisted = isInWishlist(product.id)

  const cardClasses = variant === 'wishlist' 
    ? 'card card-interactive p-4 space-y-4 aurora-glow group'
    : 'group'

  return (
    <div className={`${cardClasses} ${className}`}>
      <Link
        to={`/product/${product.id}`}
        className={variant === 'default' ? 'card card-interactive block overflow-hidden animate-fadeIn' : 'block'}
      >
        {/* Product Image */}
        <div className="relative aspect-square bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Product Badge */}
          {getProductBadge(product)}
          
          {/* Quick Actions Overlay */}
          {showQuickActions && (
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button 
                onClick={handleWishlistClick}
                className={`p-2 rounded-full shadow-md transition-all duration-200 aurora-glow ${
                  isWishlisted 
                    ? 'bg-destructive text-white hover:bg-destructive/80' 
                    : 'bg-card hover:bg-aurora-50 hover:text-aurora-600'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={variant === 'default' ? 'p-4 space-y-3' : 'space-y-3'}>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-aurora-600 transition-colors">
              {product.title}
            </h3>
            
            {/* Category */}
            {showCategory && (
              <p className="text-sm text-muted-foreground capitalize">
                {getCategoryDisplayName(product.category)}
              </p>
            )}
            
            {/* Rating */}
            {showRating && renderStarRating(product.rating)}
          </div>
          
          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-aurora-600">
              {formatPrice(product.price)}
            </p>
            
            {variant === 'default' && (
              <button 
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 p-2 bg-aurora-500 text-white rounded-lg hover:bg-aurora-600 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0 aurora-glow-hover"
                title="Add to cart"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist variant additional actions */}
      {variant === 'wishlist' && (
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={handleAddToCart}
            className="btn-base btn-primary w-full text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
          
          <button
            onClick={handleWishlistClick}
            className="btn-base btn-ghost w-full text-sm text-muted-foreground hover:text-destructive"
          >
            <Heart className="h-4 w-4 fill-current" />
            <span>Remove from Wishlist</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductCard
