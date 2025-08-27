import { createSlice } from '@reduxjs/toolkit'

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return []
  }
}

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

const initialState = {
  items: loadCartFromStorage(),
  total: 0,
}

// Calculate total when items change
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    total: calculateTotal(initialState.items)
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        // Update quantity but don't exceed 10
        existingItem.quantity = Math.min(existingItem.quantity + quantity, 10)
      } else {
        // Add new item to cart
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: Math.min(quantity, 10)
        })
      }
      
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.id === productId)
      
      if (item && quantity >= 1 && quantity <= 10) {
        item.quantity = quantity
        state.total = calculateTotal(state.items)
        saveCartToStorage(state.items)
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.total = 0
      localStorage.removeItem('cart')
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
