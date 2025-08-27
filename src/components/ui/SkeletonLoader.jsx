// Modern skeleton loader components for better loading states

const SkeletonBase = ({ className = '', ...props }) => (
  <div 
    className={`skeleton rounded-lg ${className}`} 
    {...props}
  />
)

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="card p-0 overflow-hidden">
    {/* Image skeleton */}
    <div className="aspect-square bg-neutral-200 skeleton" />
    
    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Rating skeleton */}
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <SkeletonBase key={i} className="h-4 w-4 rounded-full" />
        ))}
        <SkeletonBase className="h-4 w-16 ml-2" />
      </div>
      
      {/* Title skeleton */}
      <div className="space-y-2">
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-3/4" />
      </div>
      
      {/* Price skeleton */}
      <SkeletonBase className="h-6 w-20" />
    </div>
  </div>
)

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 12 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(count)].map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
)

// Product Detail Skeleton
export const ProductDetailSkeleton = () => (
  <div className="max-w-6xl mx-auto">
    <SkeletonBase className="h-6 w-32 mb-6" />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image skeleton */}
      <div className="card p-8">
        <SkeletonBase className="aspect-square w-full" />
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-6">
        <SkeletonBase className="h-4 w-24" />
        <SkeletonBase className="h-8 w-full" />
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <SkeletonBase key={i} className="h-5 w-5 rounded-full" />
          ))}
          <SkeletonBase className="h-5 w-20 ml-2" />
        </div>
        <SkeletonBase className="h-8 w-32" />
        <div className="space-y-2">
          <SkeletonBase className="h-6 w-24" />
          {[...Array(4)].map((_, i) => (
            <SkeletonBase key={i} className="h-4 w-full" />
          ))}
          <SkeletonBase className="h-4 w-3/4" />
        </div>
        <div className="space-y-4">
          <SkeletonBase className="h-6 w-20" />
          <div className="flex items-center space-x-3">
            <SkeletonBase className="h-10 w-10" />
            <SkeletonBase className="h-6 w-8" />
            <SkeletonBase className="h-10 w-10" />
          </div>
        </div>
        <SkeletonBase className="h-12 w-full" />
      </div>
    </div>
  </div>
)

// Cart Item Skeleton
export const CartItemSkeleton = () => (
  <div className="card p-6 flex flex-col sm:flex-row gap-4">
    <SkeletonBase className="w-full sm:w-24 h-24 rounded-lg" />
    <div className="flex-1 space-y-2">
      <SkeletonBase className="h-5 w-3/4" />
      <SkeletonBase className="h-4 w-20" />
    </div>
    <div className="flex flex-col sm:items-end space-y-3">
      <div className="flex items-center space-x-2">
        <SkeletonBase className="h-8 w-8" />
        <SkeletonBase className="h-6 w-8" />
        <SkeletonBase className="h-8 w-8" />
      </div>
      <SkeletonBase className="h-5 w-16" />
      <SkeletonBase className="h-4 w-12" />
    </div>
  </div>
)

// Text Skeleton
export const TextSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {[...Array(lines)].map((_, index) => (
      <SkeletonBase 
        key={index} 
        className={`h-4 ${
          index === lines - 1 ? 'w-3/4' : 'w-full'
        }`} 
      />
    ))}
  </div>
)

// Button Skeleton
export const ButtonSkeleton = ({ className = '' }) => (
  <SkeletonBase className={`h-10 w-24 ${className}`} />
)

// Form Field Skeleton
export const FormFieldSkeleton = () => (
  <div className="space-y-2">
    <SkeletonBase className="h-4 w-20" />
    <SkeletonBase className="h-10 w-full" />
  </div>
)

export default SkeletonBase
