import { Heart, ShoppingCart, ArrowRight } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'
import PageHeader from '../components/ui/PageHeader'
import ProductGrid from '../components/product/ProductGrid'
import EmptyState from '../components/ui/EmptyState'
import { Link } from 'react-router-dom'

/**
 * Wishlist page component - Refactored for clean code
 * Displays user's wishlisted products with management options
 */
const Wishlist = () => {
  const { wishlistItems, moveAllToCart } = useWishlist()

  // Empty wishlist state
  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageHeader 
          title="My Wishlist"
          highlightText="Wishlist"
        />
        
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love for later by clicking the heart icon on any product."
          actionText="Start Shopping"
          actionLink="/products"
        />
      </div>
    )
  }

  // Actions for the header
  const headerActions = (
    <Link
      to="/products"
      className="btn-base btn-ghost"
    >
      Continue Shopping
    </Link>
  )

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      {/* Page Header */}
      <PageHeader 
        title="My Wishlist"
        highlightText="Wishlist"
        subtitle={`${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'} saved for later`}
        actions={headerActions}
      />

      {/* Wishlist Products Grid */}
      <ProductGrid
        products={wishlistItems}
        variant="wishlist"
        viewMode="grid"
        className="mb-12"
      />

      {/* Bulk Actions */}
      {wishlistItems.length > 0 && (
        <div className="text-center">
          <div className="card p-6 aurora-glow max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Ready to buy everything?
            </h3>
            <p className="text-muted-foreground mb-6">
              Add all wishlist items to your cart and checkout in one go.
            </p>
            <button
              onClick={moveAllToCart}
              className="btn-base btn-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add All to Cart</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Wishlist
