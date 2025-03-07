import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;
const API_KEY = 'c0ed8d635decb7fbb17c6286';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

app.use(express.static('.'));

app.get('/api/currencies', async (req, res) => {
    try {
        const response = await axios.get(BASE_URL);
        const data = response.data;
        
        console.log("Fetched data from API:", data);

        res.json({
            base: data.base_code,
            conversionRates: data.conversion_rates
        });
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ message: 'Failed to fetch currency data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
