// ========================================
// TrexaSmp - JavaScript Functions
// ========================================

// Cart array to store items
let cart = [];

// WhatsApp number
const whatsappNumber = "01207974196";

// Add item to cart
function addToCart(name, price) {
    const item = {
        name: name,
        price: price,
        id: Date.now()
    };
    
    cart.push(item);
    updateCartDisplay();
    
    // Show notification
    showNotification(`${name} added to cart!`);
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    cartCount.textContent = cart.length;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0 EGP';
    } else {
        let itemsHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            itemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price} EGP</div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            total += item.price;
        });
        
        cartItems.innerHTML = itemsHTML;
        cartTotal.textContent = `${total} EGP`;
    }
}

// Toggle cart modal
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

// Checkout via WhatsApp
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    let total = 0;
    let message = "Hello TrexaSmp! I would like to order:\n\n";
    
    cart.forEach(item => {
        message += `• ${item.name} - ${item.price} EGP\n`;
        total += item.price;
    });
    
    message += `\nTotal: ${total} EGP\n\n`;
    message += "Please confirm my order. Thank you!";
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Clear cart after checkout
    cart = [];
    updateCartDisplay();
    toggleCart();
    
    showNotification('Order sent via WhatsApp!');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles inline
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(180deg, #5B8731, #11AC0C);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        font-weight: 700;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close cart modal when clicking outside
document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCart();
    }
});

// Add to cart animation on button click
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});

// Console welcome message
console.log('%c Welcome to TrexaSmp! ', 'background: #5B8731; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Enjoy your shopping! ', 'background: #11AC0C; color: white; font-size: 14px; padding: 5px;');
