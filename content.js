// content.js

console.log('Content script loaded');

function convertCurrency(amount, currency, callback) {
    console.log(`Converting ${amount} ${currency}`);
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates['USD'];
            const result = (amount * rate).toFixed(2);
            callback(result);
        })
        .catch(err => {
            console.error('Error:', err);
        });
}

function showConversionTooltip(event, amount, currency, convertedAmount) {
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.zIndex = '10000';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.top = `${event.clientY + 10}px`;
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.fontSize = '14px';
    tooltip.textContent = `${amount} ${currency} = ${convertedAmount} USD`;
    document.body.appendChild(tooltip);

    function removeTooltip() {
        tooltip.remove();
        document.removeEventListener('mousemove', removeTooltip);
    }

    document.addEventListener('mousemove', removeTooltip);
}

function handleHover(event) {
    const target = event.target;

    // Ensure target is defined and has innerText
    if (target && typeof target.innerText === 'string') {
        const text = target.innerText.trim(); // Trim any extra whitespace
        
        if (text.length > 0) { // Proceed only if text is not empty
            const regex = /(\d+(\.\d{1,2})?)\s?(EUR|GBP|JPY|AUD|CAD|CHF|CNY|INR|MXN|SEK|NZD|NPR)/i;
            const match = text.match(regex);

            if (match) {
                console.log('Currency match found:', match);
                const amount = parseFloat(match[1]);
                const currency = match[3].toUpperCase();

                convertCurrency(amount, currency, (convertedAmount) => {
                    showConversionTooltip(event, amount, currency, convertedAmount);
                });
            }
        }
    }
}




// Attach the event listener for hover
document.addEventListener('mouseover', handleHover);
