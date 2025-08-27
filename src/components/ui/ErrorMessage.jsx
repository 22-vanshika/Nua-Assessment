import { AlertCircle, AlertTriangle, Info, CheckCircle, X, RefreshCw } from 'lucide-react'

const ErrorMessage = ({ 
  message, 
  variant = 'error', 
  size = 'medium',
  showIcon = true,
  showRetry = false,
  onRetry,
  onDismiss,
  className = '' 
}) => {
  const variants = {
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700',
      iconColor: 'text-red-500',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-500',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-500',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-700',
      iconColor: 'text-green-500',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    }
  }

  const sizes = {
    small: 'p-3 text-sm',
    medium: 'p-4 text-base',
    large: 'p-6 text-lg'
  }

  const currentVariant = variants[variant]
  const IconComponent = currentVariant.icon

  const defaultMessages = {
    error: 'Something went wrong. Please try again.',
    warning: 'Please check your input and try again.',
    info: 'Here is some information you should know.',
    success: 'Operation completed successfully!'
  }

  return (
    <div className={`${currentVariant.bgColor} border rounded-lg ${sizes[size]} ${className} animate-fadeIn`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {showIcon && (
            <IconComponent className={`h-5 w-5 ${currentVariant.iconColor} flex-shrink-0 mt-0.5`} />
          )}
          <div className="flex-1">
            <p className={`${currentVariant.textColor} font-medium`}>
              {message || defaultMessages[variant]}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-medium text-white rounded-md ${currentVariant.buttonColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retry</span>
            </button>
          )}

          {onDismiss && (
            <button
              onClick={onDismiss}
              className={`${currentVariant.textColor} hover:${currentVariant.iconColor} transition-colors focus:outline-none`}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Specific error types for common use cases
export const NetworkError = ({ onRetry, className = '' }) => (
  <ErrorMessage
    variant="error"
    message="Network error. Please check your connection and try again."
    showRetry={true}
    onRetry={onRetry}
    className={className}
  />
)

export const NotFoundError = ({ message = "The requested item was not found.", className = '' }) => (
  <ErrorMessage
    variant="warning"
    message={message}
    className={className}
  />
)

export const ValidationError = ({ errors = [], className = '' }) => {
  if (errors.length === 0) return null

  return (
    <div className={`space-y-2 ${className}`}>
      {errors.map((error, index) => (
        <ErrorMessage
          key={index}
          variant="warning"
          message={error}
          size="small"
        />
      ))}
    </div>
  )
}

export const SuccessMessage = ({ message, onDismiss, className = '' }) => (
  <ErrorMessage
    variant="success"
    message={message}
    onDismiss={onDismiss}
    className={className}
  />
)

export const InfoMessage = ({ message, onDismiss, className = '' }) => (
  <ErrorMessage
    variant="info"
    message={message}
    onDismiss={onDismiss}
    className={className}
  />
)

export default ErrorMessage
