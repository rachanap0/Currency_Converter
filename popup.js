document.getElementById('convert').addEventListener('click', () => {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');

    if (amount && currency) {
        errorElement.style.display = 'none';
        resultElement.innerText = 'Converting...';

        fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates['USD'];
                const result = (amount * rate).toFixed(2);
                resultElement.innerText = `${amount} ${currency} = ${result} USD`;
            })
            .catch(err => {
                resultElement.innerText = '';
                errorElement.style.display = 'block';
                errorElement.innerText = 'Error: ' + err.message;
            });
    } else {
        resultElement.innerText = '';
        errorElement.style.display = 'block';
        errorElement.innerText = 'Please enter a valid amount and select a currency.';
    }
});
