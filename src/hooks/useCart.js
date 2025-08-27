import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice'

export const useCart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const cartTotal = useSelector((state) => state.cart.total)

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === parseInt(productId))
  }

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === parseInt(productId))
    return item ? item.quantity : 0
  }

  const addToCartAction = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }))
  }

  /**
   * Remove product from cart
   * @param {number|string} productId - Product ID to remove
   */
  const removeFromCartAction = (productId) => {
    dispatch(removeFromCart(productId))
  }

  /**
   * Update quantity of a product in cart
   * @param {number|string} productId - Product ID to update
   * @param {number} quantity - New quantity
   */
  const updateQuantityAction = (productId, quantity) => {
    if (quantity >= 1 && quantity <= 10) {
      dispatch(updateQuantity({ productId, quantity }))
    }
  }

  /**
   * Clear all items from cart
   */
  const clearCartAction = () => {
    dispatch(clearCart())
  }

  /**
   * Calculate total price including tax
   * @param {number} taxRate - Tax rate (default: 0.08 for 8%)
   * @returns {number} Total price including tax
   */
  const getTotalWithTax = (taxRate = 0.08) => {
    return cartTotal * (1 + taxRate)
  }

  return {
    // State
    cartItems,
    cartTotal,
    totalItems: getTotalItems(),
    
    // Actions
    isInCart,
    getItemQuantity,
    addToCart: addToCartAction,
    removeFromCart: removeFromCartAction,
    updateQuantity: updateQuantityAction,
    clearCart: clearCartAction,
    getTotalWithTax
  }
}
