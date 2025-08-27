import { useState, useMemo } from 'react'
import { useProducts, useCategories } from '../hooks/useProducts'
import { PulseLoader } from '../components/ui/LoadingSpinner'
import { NetworkError } from '../components/ui/ErrorMessage'
import { ProductGridSkeleton } from '../components/ui/SkeletonLoader'
import PageHeader from '../components/ui/PageHeader'
import SearchAndFilters from '../components/product/SearchAndFilters'
import ProductGrid from '../components/product/ProductGrid'
import StatsDisplay from '../components/ui/StatsDisplay'
import { filterProducts, sortProducts } from '../utils/productUtils.jsx'

/**
 * ProductListing page component - Refactored for clean code
 * Displays products with search, filtering, and sorting capabilities
 */
const ProductListing = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('default')

  // Data fetching
  const { 
    data: products = [], 
    isLoading: productsLoading, 
    error: productsError,
    refetch: refetchProducts
  } = useProducts()
  
  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useCategories()

  // Computed values
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(products, searchTerm, selectedCategory)
    return sortProducts(filtered, sortBy)
  }, [products, searchTerm, selectedCategory, sortBy])

  // Event handlers
  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSortBy('default')
  }

  // Loading state
  if (productsLoading) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <PageHeader 
          title="Our Products"
          highlightText="Products"
          subtitle="Loading amazing products..."
        />
        <div className="text-center">
          <PulseLoader count={3} />
        </div>
        <ProductGridSkeleton count={12} />
      </div>
    )
  }

  // Error state
  if (productsError) {
    return (
      <div className="space-y-8">
        <PageHeader 
          title="Our Products"
          highlightText="Products"
        />
        <NetworkError onRetry={refetchProducts} />
      </div>
    )
  }

  // Main render
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <PageHeader 
        title="Our Products"
        highlightText="Products"
        subtitle="Discover amazing products at great prices with fast, free shipping"
      />

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
        categoriesLoading={categoriesLoading}
      />

      {/* Results Stats */}
      <StatsDisplay
        currentCount={filteredAndSortedProducts.length}
        totalCount={products.length}
        itemName="products"
        additionalInfo={[
          <>✨ Free shipping on all orders</>,
          <>🔄 30-day returns</>
        ]}
      />

      {/* Products Grid */}
      <ProductGrid
        products={filteredAndSortedProducts}
        viewMode={viewMode}
        emptyStateConfig={{
          title: 'No products found',
          description: 'Try adjusting your search criteria or browse all categories',
          actionText: 'Clear all filters'
        }}
        onClearFilters={handleClearFilters}
      />

      {/* Bottom Stats */}
      {filteredAndSortedProducts.length > 0 && (
        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Showing all{' '}
            <span className="text-aurora-600 font-semibold">
              {filteredAndSortedProducts.length}
            </span>{' '}
            products
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductListing
