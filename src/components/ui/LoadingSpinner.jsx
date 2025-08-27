const LoadingSpinner = ({ 
  size = 'medium', 
  className = '', 
  variant = 'primary',
  label = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  }

  const variantClasses = {
    primary: 'border-blue-600',
    secondary: 'border-neutral-400',
    white: 'border-white',
    success: 'border-green-600',
    error: 'border-red-600'
  }

  return (
    <div className={`flex flex-col justify-center items-center ${className}`} role="status">
      {/* Modern spinner with gradient */}
      <div className={`${sizeClasses[size]} relative`}>
        <div 
          className={`absolute inset-0 rounded-full border-2 ${variantClasses[variant]} opacity-20`}
        />
        <div 
          className={`absolute inset-0 rounded-full border-2 border-transparent ${variantClasses[variant]} border-t-current animate-spin`}
        />
      </div>
      
      {/* Loading text */}
      {label && size !== 'small' && (
        <span className="mt-3 text-sm text-neutral-600 animate-pulse">
          {label}
        </span>
      )}
      
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Pulse loader for inline loading states
export const PulseLoader = ({ count = 3, size = 'small', className = '' }) => {
  const dotSize = {
    small: 'h-2 w-2',
    medium: 'h-3 w-3',
    large: 'h-4 w-4'
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={`${dotSize[size]} bg-blue-600 rounded-full animate-pulse`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  )
}

// Modern page loader with backdrop
export const PageLoader = ({ message = 'Loading...', show = true }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="large" />
        <p className="text-lg font-medium text-neutral-700">{message}</p>
      </div>
    </div>
  )
}

// Loading overlay for sections
export const LoadingOverlay = ({ 
  show = true, 
  message = 'Loading...', 
  className = '' 
}) => {
  if (!show) return null

  return (
    <div className={`absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center z-10 ${className}`}>
      <div className="text-center space-y-3">
        <LoadingSpinner size="medium" />
        <p className="text-sm text-neutral-600">{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
