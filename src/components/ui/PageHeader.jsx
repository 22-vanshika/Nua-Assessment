/**
 * Reusable PageHeader component
 * Provides consistent page headers with title, subtitle, and optional actions
 */
const PageHeader = ({
  title,
  subtitle,
  highlightText, // Text to highlight with aurora gradient
  actions,
  className = ''
}) => {
  const renderTitle = () => {
    if (highlightText && title.includes(highlightText)) {
      const parts = title.split(highlightText)
      return (
        <>
          {parts[0]}
          <span className="aurora-text">{highlightText}</span>
          {parts[1]}
        </>
      )
    }
    return title
  }

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 ${className}`}>
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
          {renderTitle()}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-lg">
            {subtitle}
          </p>
        )}
      </div>
      
      {actions && (
        <div className="flex flex-col sm:flex-row gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}

export default PageHeader
