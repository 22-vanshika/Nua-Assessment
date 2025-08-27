import ProductCard from './ProductCard'
import EmptyState from '../ui/EmptyState'
import { Search } from 'lucide-react'

/**
 * Reusable ProductGrid component
 * Handles responsive grid layout and empty states
 */
const ProductGrid = ({
  products = [],
  viewMode = 'grid',
  variant = 'default', // 'default' | 'wishlist'
  emptyStateConfig = {},
  className = '',
  onClearFilters
}) => {
  const {
    icon: EmptyIcon = Search,
    title = 'No products found',
    description = 'Try adjusting your search criteria or browse all categories',
    actionText = 'Clear all filters',
    showAction = true
  } = emptyStateConfig

  if (products.length === 0) {
    return (
      <EmptyState
        icon={EmptyIcon}
        title={title}
        description={description}
        actionText={showAction ? actionText : null}
        onAction={onClearFilters}
        className={className}
      />
    )
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
    : 'space-y-4'

  return (
    <div className={`${gridClasses} ${className}`}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          variant={variant}
        />
      ))}
    </div>
  )
}

export default ProductGrid
