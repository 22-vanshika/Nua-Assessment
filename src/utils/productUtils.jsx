import { Star } from 'lucide-react'

export const renderStarRating = (rating, options = {}) => {
  const {
    size = 'h-4 w-4',
    showCount = true,
    className = ''
  } = options

  const stars = []
  const fullStars = Math.floor(rating.rate)
  const hasHalfStar = rating.rate % 1 !== 0

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />
    )
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <Star key="half" className={`${size} fill-yellow-400 text-yellow-400 opacity-50`} />
    )
  }

  // Empty stars
  const emptyStars = 5 - Math.ceil(rating.rate)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className={`${size} text-muted-foreground`} />
    )
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex">{stars}</div>
      {showCount && (
        <span className="text-sm text-muted-foreground">
          ({rating.count})
        </span>
      )}
    </div>
  )
}

export const getProductBadge = (product) => {
  if (product.rating.rate >= 4.5) {
    return (
      <div className="absolute top-3 left-3 flex items-center space-x-1 bg-aurora-100 text-aurora-800 px-2 py-1 rounded-full text-xs font-medium aurora-glow">
        <Star className="h-3 w-3 fill-current" />
        <span>Top Rated</span>
      </div>
    )
  }
  return null
}

export const filterProducts = (products, searchTerm, selectedCategory) => {
  return products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })
}

export const sortProducts = (products, sortBy) => {
  const sorted = [...products]
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate)
    case 'name':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}

export const getCategoryDisplayName = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export const getProductSlug = (product) => {
  return product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export const isProductOnSale = (product) => {
  return product.salePrice && product.salePrice < product.price
}

export const calculateDiscountPercentage = (originalPrice, salePrice) => {
  if (!salePrice || salePrice >= originalPrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}
