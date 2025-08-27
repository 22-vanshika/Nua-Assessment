export const formatPrice = (price, currency = 'INR', locale = 'en-IN') => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0.00'
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(price)
}

export const capitalizeFirst = (str) => {
  if (!str || typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeWords = (str) => {
  if (!str || typeof str !== 'string') return ''
  return str.split(' ').map(word => capitalizeFirst(word)).join(' ')
}

export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + suffix
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const formatNumber = (num) => {
  if (typeof num !== 'number' || isNaN(num)) return '0'
  return num.toLocaleString()
}

export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, length + 2)
}

export const isEmpty = (value) => {
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}
