/**
 * Generates a WhatsApp URL with a prefilled order message
 */
export function generateWhatsAppUrl({ product, phone, quantity = 1 }) {
  const productUrl = `${window.location.origin}/products/${product.slug}`

  const message = [
    `Hello, I want to order this product:`,
    ``,
    `Product: ${product.name}`,
    `Price: ₹${product.price.toLocaleString('en-IN')}`,
    `Quantity: ${quantity}`,
    `Total: ₹${(product.price * quantity).toLocaleString('en-IN')}`,
    ``,
    `Link: ${productUrl}`,
    ``,
    `Please confirm availability and share payment details. Thank you!`,
  ].join('\n')

  const encodedMessage = encodeURIComponent(message)
  const cleanPhone = (phone || '919876543210').replace(/\D/g, '')

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

/**
 * Opens WhatsApp with the order message
 */
export function openWhatsAppOrder({ product, phone, quantity = 1 }) {
  const url = generateWhatsAppUrl({ product, phone, quantity })
  window.open(url, '_blank', 'noopener,noreferrer')
}
