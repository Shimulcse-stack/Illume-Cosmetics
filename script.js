const products = [
            { id: 1, name: "MAC Matte Lipstick", price: 2850, image: "images/img 1.jpeg", category: "Lipstick", description: "Highly pigmented, long-wearing matte finish lipstick. Achieve a bold lip look that lasts all day without drying." },
            { id: 2, name: "IMAGIC Liquid Foundation", price: 3200, image: "images/img 2.jpeg", category: "Face", description: "Medium-to-full coverage foundation with a natural, dewy finish. Perfect for all-day wear and evening out skin tone." },
            { id: 3, name: "Shimmer Eyeshadow Palette", price: 2470, image: "images/img 3.jpeg", category: "Eyeshadow", description: "A collection of 12 highly blendable shimmer and metallic shades for dazzling eye looks. Suitable for day or night glamour." },
            { id: 4, name: "Professional Brush Set", price: 220, image: "images/img 4.png", category: "Tools", description: "Set of 5 essential synthetic brushes for face and eye application. Soft, cruelty-free bristles for a flawless blend." },
            { id: 5, name: "Blusher & Contour Palette", price: 370, image: "images/img 5.jpeg", category: "Blush", description: "Sculpt and add color with this dual-purpose palette. Includes a matte contour powder and a radiant pink blush." },
            { id: 6, name: "Revolution Banana Loose Powder", price: 990, image: "images/img 6.jpeg", category: "Face", description: "Finely milled setting powder with a subtle yellow tint to counteract redness and brighten the under-eye area. Great for baking." },
            { id: 7, name: "Volume Max Mascara", price: 2990, image: "images/img 7.jpeg", category: "Mascara", description: "Intensely black mascara that builds dramatic volume and length. Smudge-proof and long-lasting formula." },
            { id: 8, name: "Perfect Stay Lip-Liner", price: 250, image: "images/img 8.jpeg", category: "Lipstick", description: "Creamy, smooth lip liner that prevents lipstick bleeding and feathering. Define your perfect pout with precision." }
        ];

        // ----------------- DOM Elements & State -----------------
        const productsGrid = document.getElementById('products-grid');
        const cartCountElement = document.getElementById('cart-count');
        const searchInput = document.getElementById('product-search');
        let cartItemCount = 0;

        // Modal Elements
        const quickViewModal = document.getElementById('quickViewModal');
        const closeModalBtn = quickViewModal.querySelector('.close-btn');
        const modalAddToCartBtn = document.getElementById('modal-add-to-cart');

        // ----------------- Core Functions -----------------

        function renderProducts(productList) {
            productsGrid.innerHTML = '';
            if (productList.length === 0) {
                productsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem; font-size: 1.2rem;">No products found matching your search.</p>';
                return;
            }

            productList.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.dataset.id = product.id;

                productDiv.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-content">
                        <h3>${product.name}</h3>
                        <p>${product.price} BDT</p>
                    </div>
                    <div class="product-actions">
                        <button class="quick-view-btn" data-product-id="${product.id}">QUICK VIEW</button>
                        <button class="buy-btn" data-product-name="${product.name}">BUY NOW</button>
                    </div>
                `;
                productsGrid.appendChild(productDiv);
            });

            // Re-attach event listeners after rendering
            attachActionListeners();
        }

        function buyProduct(productName) {
            cartItemCount++;
            cartCountElement.textContent = cartItemCount;
            console.log(`Added ${productName} to cart. Total items: ${cartItemCount}`);
            // In a real application, you would add a temporary success message here
        }

        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const filteredList = products.filter(product => {
                return product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm);
            });
            renderProducts(filteredList);
        }

        // ----------------- Quick View Modal Logic -----------------

        /**
         * Populates the Quick View modal with the selected product's data and shows it.
         * @param {number} productId - The ID of the product to display.
         */
        function showQuickView(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            // Populate Modal Content
            document.getElementById('modal-product-image').src = product.image;
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-price').textContent = `${product.price} BDT`;
            document.getElementById('modal-product-description').textContent = product.description;

            // Set the product data on the modal button for cart functionality
            modalAddToCartBtn.dataset.productName = product.name;

            // Display the modal
            quickViewModal.style.display = 'flex';
        }

        function hideQuickView() {
            quickViewModal.style.display = 'none';
        }

        // ----------------- Event Listeners -----------------

        function attachActionListeners() {
            const quickViewButtons = document.querySelectorAll('.quick-view-btn');
            const buyButtons = document.querySelectorAll('.buy-btn');

            // 1. Quick View Listener
            quickViewButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    const productId = parseInt(event.target.dataset.productId);
                    showQuickView(productId);
                });
            });

            // 2. Buy Now Listener (from product card)
            buyButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    buyProduct(event.target.dataset.productName);
                });
            });
        }

        // 3. Close Modal Listeners
        closeModalBtn.addEventListener('click', hideQuickView);
        // Close modal if user clicks outside the content
        window.addEventListener('click', (event) => {
            if (event.target === quickViewModal) {
                hideQuickView();
            }
        });

        // 4. Modal Add to Cart Listener
        modalAddToCartBtn.addEventListener('click', (event) => {
            event.preventDefault();
            buyProduct(event.target.dataset.productName);
            hideQuickView(); // Close modal after adding to cart
        });

        // 5. Search Event Listener
        searchInput.addEventListener('input', filterProducts);

        // ----------------- Initialization -----------------
        renderProducts(products);