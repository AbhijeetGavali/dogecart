
// exporting schema for product type data
export {default as Product} from require('./product/product.model') 
export {default as ProductCategory} from require('./product/productCategory.model')
export {default as ProductCampany} from require('./product/productCompany.model')
export {default as ProductRating} from require('./product/productRating.model')
export {default as ProductLike} from require('./product/productLike.model')

// export schema for store type data
export {default as Store} from require('./store/store.model')
export {default as StorePassword} from require('./store/storePassword.model')
export {default as StorePromotion} from require('./store/storePromo.model')
export {default as StoreSubscribers} from require('./store/storeSubscriber.model')

// export schema for user type datas
export {default as User} from require('./user/user.model')
export {default as UsetBucketList} from require('./user/userBucketList.model')
export {default as UserCartMpa} from require('./user/userCart.model')
export {default as UserDetails} from require('./user/userDetails.model')
export {default as userPassword} from require('./user/userPassword.model')