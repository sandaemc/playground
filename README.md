# shopping-api

API for shopping products

Hosted at:

```
http :3000/sellers
http POST :3000/sellers name=Sandae
http :3000/sellers/\$SELLER_ID

http :3000/sellers/\$SELLER_ID/products
http POST :3000/sellers/\$SELLER_ID/products name=test description=simple
http :3000/sellers/$SELLER_ID/products/$PRODUCT_ID

http POST :3000/carts
http POST :3000/carts/$CART_ID/add-item productId=$PRODUCT_ID sellerId=\$SELLER_ID quantity=100
```


