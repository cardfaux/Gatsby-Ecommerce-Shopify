require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

import React, { useState, useLayoutEffect } from "react"
import Img from "gatsby-image"
import ShopifyBuy from "@shopify/buy-button-js"

const ProductDetail = ({ product }) => {
  const [selectedVariant, setVariant] = useState(product.variants[0])

  useLayoutEffect(() => {
    const client = ShopifyBuy.buildClient({
      domain: "gatsbyapi",
      storefrontAccessToken: process.env.TOKEN,
    })
    const ui = ShopifyBuy.UI.init(client)
    console.log("ui", ui)

    return () => {}, []
  })

  return (
    <div>
      <h1>{product.title}</h1>
      <Img fixed={product.images[0].localFile.childImageSharp.fixed} />
      <p>{product.description}</p>
      <p>${selectedVariant.price}</p>
      <select
        onBlur={""}
        onChange={e => {
          const selected = product.variants.filter(
            variant => variant.sku === e.target.value
          )
          setVariant(selected[0])
        }}
        value={selectedVariant.sku}
      >
        {product.variants.map(variant => (
          <option key={variant.id} value={variant.sku}>
            {variant.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductDetail
