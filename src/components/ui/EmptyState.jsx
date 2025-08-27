import { Link } from 'react-router-dom'

/**
 * Reusable EmptyState component
 * Displays consistent empty states across the application
 */
const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  onAction,
  className = ''
}) => {
  const ActionComponent = actionLink ? Link : 'button'
  const actionProps = actionLink 
    ? { to: actionLink }
    : { onClick: onAction }

  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="card p-8 aurora-glow max-w-md mx-auto">
        {Icon && (
          <div className="w-24 h-24 mx-auto mb-6 bg-muted/30 rounded-full flex items-center justify-center">
            <Icon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          {title}
        </h2>
        
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
          {description}
        </p>
        
        {(actionText && (actionLink || onAction)) && (
          <ActionComponent
            className="btn-base btn-primary inline-flex items-center gap-2"
            {...actionProps}
          >
            {actionText}
          </ActionComponent>
        )}
      </div>
    </div>
  )
}

export default EmptyState
