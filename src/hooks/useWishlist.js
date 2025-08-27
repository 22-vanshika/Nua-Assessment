import { useSelector, useDispatch } from 'react-redux'
import { addToWishlist, removeFromWishlist, moveToCart } from '../store/wishlistSlice'
import { addToCart } from '../store/cartSlice'

export const useWishlist = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const wishlistTotal = useSelector((state) => state.wishlist.total)

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === parseInt(productId))
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  const addToWishlistAction = (product) => {
    dispatch(addToWishlist(product))
  }

  const removeFromWishlistAction = (productId) => {
    dispatch(removeFromWishlist(productId))
  }

  const moveToCartAction = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }))
    dispatch(moveToCart(product.id))
  }

  const moveAllToCart = () => {
    wishlistItems.forEach(item => {
      moveToCartAction(item, 1)
    })
  }

  return {
    wishlistItems,
    wishlistTotal,
    isInWishlist,
    toggleWishlist,
    addToWishlist: addToWishlistAction,
    removeFromWishlist: removeFromWishlistAction,
    moveToCart: moveToCartAction,
    moveAllToCart
  }
}
