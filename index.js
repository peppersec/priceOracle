const express = require('express')
const CoinGecko = require('coingecko-api')

const app = express()
app.use(express.json())

app.use((err, req, res, next) => {
  if (err) {
    console.log('Invalid Request data')
    res.send('Invalid Request data')
  } else {
    next()
  }
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

let prices = {}

async function updatePrice() {
    const CoinGeckoClient = new CoinGecko()
    const { data } = await CoinGeckoClient.simple.price({
        ids: ['ethereum'],
        vs_currencies: ['usd']
    })
    console.log(data)
    prices = data
    setTimeout(updatePrice, 10000)
}

app.get('/', function (req, res) {
  res.json(prices)
})

app.listen(8000)
updatePrice()
