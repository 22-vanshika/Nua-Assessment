import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // Array of wishlisted products
  total: 0   // Total number of items in wishlist
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (!existingItem) {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
          description: product.description
        })
        state.total = state.items.length
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
      state.total = state.items.length
    },
    
    clearWishlist: (state) => {
      state.items = []
      state.total = 0
    },
    
    moveToCart: (state, action) => {
      // This will be called alongside adding to cart
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
      state.total = state.items.length
    }
  }
})

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist, 
  moveToCart 
} = wishlistSlice.actions

export default wishlistSlice.reducer
