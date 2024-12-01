document.addEventListener('DOMContentLoaded', () => {
    const variantTemplate = (unitNumber, isFirstRow) => `
        <div class="variant-selector">
            ${isFirstRow ? `
                <div class="details-header">
                    <div>Size</div>
                    <div>Color</div>
                </div>` : ''}
            <div class="coupons-details-row">
                <div>#${unitNumber}</div>
                <div class="details-row">
                    <select name="size" id="size-${unitNumber}">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div class="details-row">
                    <select name="color" id="color-${unitNumber}">
                        <option value="Color">Color</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                    </select>
                </div>
            </div>
        </div>
    `;

    function calculatePrice(units) {
        const basePrice = 24.00;
        const discount = units === 1 ? 0.1 : units === 2 ? 0.2 : 0.3;
        return (basePrice * units * (1 - discount)).toFixed(2);
    }

    function updateTotalPrice() {
        const selectedUnits = document.querySelector('input[name="units"]:checked');
        const total = document.querySelector('.total');
        if (selectedUnits) {
            const price = calculatePrice(parseInt(selectedUnits.value));
            total.textContent = `Total: $${price} USD`;
        }
    }

    function toggleVariantSelectors(selectedUnits) {
        const variantSelectors = document.querySelectorAll('.variant-selector');
        variantSelectors.forEach((selector) => {
            selector.style.display = 'none';
            selector.innerHTML = '';
        });

        const selectedSelector = document.querySelector(`input[value="${selectedUnits}"]`)
            .closest('.pricing-option')
            .querySelector('.variant-selector');

        if (selectedSelector) {
            selectedSelector.style.display = 'grid';
            for (let i = 0; i < selectedUnits; i++) {
                selectedSelector.innerHTML += variantTemplate(i + 1, i === 0);
            }
        }
    }

   
    document.querySelectorAll('input[name="units"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateTotalPrice();
            toggleVariantSelectors(e.target.value);
        });
    });

    document.querySelector('.add-to-cart').addEventListener('click', () => {
        alert('Item added to cart!');
    });

   
    toggleVariantSelectors('2');
});
