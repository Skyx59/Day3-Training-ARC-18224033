const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");

const fetchCurrencies = async () => {
    try {
        const response = await fetch('/api/currencies');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const { conversionRates } = data;

        console.log("Fetched Conversion Rates:", conversionRates); 

        fromDropDown.innerHTML = "";
        toDropDown.innerHTML = "";

        Object.keys(conversionRates).forEach(currency => {
            const optionFrom = document.createElement("option");
            optionFrom.value = currency;
            optionFrom.text = currency;
            fromDropDown.add(optionFrom);

            const optionTo = document.createElement("option");
            optionTo.value = currency;
            optionTo.text = currency;
            toDropDown.add(optionTo);
        });

        fromDropDown.value = "USD";
        toDropDown.value = "IDR";

    } catch (error) {
        console.error("Failed to fetch currency data:", error);
    }
};

const convertCurrency = async () => {
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if (amount.length !== 0) {
        try {
            const response = await fetch('/api/currencies');
            const data = await response.json();
            const fromRate = data.conversionRates[fromCurrency];
            const toRate = data.conversionRates[toCurrency];
            const convertedAmount = (amount / fromRate) * toRate;
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert("Please enter an amount");
    }
};

document.querySelector("#convert-button").addEventListener("click", convertCurrency);
window.addEventListener("load", fetchCurrencies);
