import { formatNumber } from '../../utils/formatters'

/**
 * Reusable StatsDisplay component
 * Shows statistics with consistent formatting
 */
const StatsDisplay = ({
  currentCount,
  totalCount,
  itemName = 'items',
  additionalInfo = [],
  className = ''
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      <p className="text-muted-foreground">
        Showing{' '}
        <span className="font-semibold text-aurora-600">
          {formatNumber(currentCount)}
        </span>
        {totalCount && (
          <>
            {' '}of{' '}
            <span className="font-semibold text-aurora-600">
              {formatNumber(totalCount)}
            </span>
          </>
        )}
        {' '}{itemName}
      </p>
      
      {additionalInfo.length > 0 && (
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          {additionalInfo.map((info, index) => (
            <span key={index} className="flex items-center gap-1">
              {info}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default StatsDisplay
