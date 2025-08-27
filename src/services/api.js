const BASE_URL = 'https://fakestoreapi.com'

// API service functions for Fake Store API
export const api = {
  // Get all products
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },

  // Get single product by ID
  getProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}`)
    }
    return response.json()
  },

  // Get all categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category ${category}`)
    }
    return response.json()
  }
}

export default api
