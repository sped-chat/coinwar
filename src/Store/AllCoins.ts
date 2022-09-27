const formatter = Intl.NumberFormat('en', { notation: 'compact' })

const AllCoins = [
    {
        "name": "ada",
        "minimum_price": 1,
        "maximum_price": 2,
        "average": 1
    },
    {
        "name": "alcx",
        "minimum_price": 20,
        "maximum_price": 2004,
        "average": 1
    },
    {
        "name": "aave",
        "minimum_price": 28,
        "maximum_price": 632,
        "average": 1
    },
    {
        "name": "amc",
        "minimum_price": 2,
        "maximum_price": 59,
        "average": 1
    },
    {
        "name": "ape",
        "minimum_price": 3,
        "maximum_price": 26,
        "average": 1
    },
    {
        "name": "atom",
        "minimum_price": 2,
        "maximum_price": 45,
        "average": 1
    },
    {
        "name": "avax",
        "minimum_price": 3,
        "maximum_price": 134,
        "average": 1
    },
    {
        "name": "axs",
        "minimum_price": 1,
        "maximum_price": 160,
        "average": 1
    },
    {
        "name": "bnb",
        "minimum_price": 10,
        "maximum_price": 700,
        "average": 1
    },
    {
        "name": "btc",
        "minimum_price": 5000,
        "maximum_price": 69000,
        "average": 1
    },
    {
        "name": "boo",
        "minimum_price": 1,
        "maximum_price": 12,
        "average": 1
    },
    {
        "name": "cake",
        "minimum_price": 1,
        "maximum_price": 42,
        "average": 1
    },
    {
        "name": "comp",
        "minimum_price": 27,
        "maximum_price": 854,
        "average": 1
    },
    {
        "name": "doge",
        "minimum_price": 69,
        "maximum_price": 420,
        "average": 1
    },
    {
        "name": "dot",
        "minimum_price": 1,
        "maximum_price": 54,
        "average": 1
    },
    {
        "name": "eth",
        "minimum_price": 100,
        "maximum_price": 5000,
        "average": 1
    },
    {
        "name": "fil",
        "minimum_price": 5,
        "maximum_price": 188,
        "average": 1
    },
    {
        "name": "ftm",
        "minimum_price": 1,
        "maximum_price": 10,
        "average": 1
    },
    {
        "name": "ftx",
        "minimum_price": 2,
        "maximum_price": 80,
        "average": 1
    },
    {
        "name": "gme",
        "minimum_price": 4,
        "maximum_price": 325,
        "average": 1
    },
    {
        "name": "icp",
        "minimum_price": 5,
        "maximum_price": 364,
        "average": 1
    },
    {
        "name": "link",
        "minimum_price": 2,
        "maximum_price": 53,
        "average": 1
    },
    {
        "name": "ltc",
        "minimum_price": 2,
        "maximum_price": 278,
        "average": 1
    },
    {
        "name": "mana",
        "minimum_price": 1,
        "maximum_price": 6,
        "average": 1
    },
    {
        "name": "matic",
        "minimum_price": 1,
        "maximum_price": 10,
        "average": 1
    },
    {
        "name": "mkr",
        "minimum_price": 206,
        "maximum_price": 6012,
        "average": 1
    },
    {
        "name": "oath",
        "minimum_price": 1,
        "maximum_price": 10,
        "average": 1
    },
    {
        "name": "sand",
        "minimum_price": 1,
        "maximum_price": 9,
        "average": 1
    },
    {
        "name": "shib",
        "minimum_price": 1,
        "maximum_price": 7,
        "average": 1
    },
    {
        "name": "sol",
        "minimum_price": 1,
        "maximum_price": 260,
        "average": 1
    },
    {
        "name": "tron",
        "minimum_price": 1,
        "maximum_price": 9,
        "average": 1
    },
    {
        "name": "uni",
        "minimum_price": 2,
        "maximum_price": 43,
        "average": 1
    },
    {
        "name": "xrp",
        "minimum_price": 1,
        "maximum_price": 4,
        "average": 1
    }
].map(coin => {
    return {
        ...coin,
        average: formatter.format(Math.ceil((coin.minimum_price + coin.maximum_price) / 2))
    }
})

export default AllCoins