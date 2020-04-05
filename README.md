# appiness-node-project
node


install node

then,
to run,
node app
================
to add categories,
url: http://localhost:3000/product/category
method: post
body: {
	"category":"buses"
}

=======================
to add products,
url: http://localhost:3000/product
method: post
body: {
	"name": "volvo",
	"price":1000,
	"sku_code": 123,
	"weight": 120, 
	"description": "royal en bus",
	"categoryId": "5e8a1d7a2e886a32c89e76d1",
	"image_urls":" "
}
=========================
when category delete thier assosiate products delete,
url: http://localhost:3000/products/category
method: delete
headers:    
categoryid: ""
role: "admin"
