
// view


function View(drugs) {
    this.news = document.querySelector('.news ul');
    this.drugs_container = document.querySelector('.drugs tbody');

    this.setup_drugs();
    this.setup_cities();

    this.refresh_prices([]);
    this.refresh_quantities([]);
}

let translateJson = {
    "game": " ",
    "new-game": " RESET",
    "change-name": " ALIAS",
    "high-score": " HISTORY",
    "about": " ",
    "move": " SWAP",
    "pawn-shop": " DEFI LOANS",
    "inventory": " WEB3 WALLET",
    "stats": " ",
    "day": " YEAR",
    "cash": " DAI",
    "guns": " Guns",
    "debt": " DEFI LOAN",
    "health": " ",
    "stock": " WALLET",
    "bank-account": " USD",
    "drugs": " ",
    "item": " ASSET",
    "value": " PRICE",
    "buy": " BUY",
    "sell": " SELL",
    "max": " MAX",
    "borrow": " BORROW",
    "you-currently-owe": " YOU OWE",
    "borrow-more-money": " BBORROW",
    "pay-debt": " PAY",
    "news": " ",
    "choose-city": " CHOOSE AN EXCHANGE",
    "close": " CLOSE",
    "pay": " PAY",
    "action": " ",
    "see-recent-news": " ~~~",
    "hide": " ",
    "no-drug-yet": " ... wow such empty ...",
    "final-score": " FINAL SCORE",
    "by": " by",
    "end": " END",
    "prompt-name": " DEFINE ALIAS",
    "prompt-name-again": " NO SOUP FOR YOU",
    "dope-ada": " ADA",
    "dope-alcx": " ALCX",
    "dope-aave": " AAVE",
    "dope-amc": " AMC",
    "dope-ape": " APE",
    "dope-atom": " ATOM",
    "dope-avax": " AVAX",
    "dope-axs": " AXS",
    "dope-bnb": " BNB",
    "dope-btc": " BTC",
    "dope-boo": " BOO",
    "dope-cake": " CAKE",
    "dope-comp": " COMP",
    "dope-doge": " DOGE",
    "dope-dot": " DOT",
    "dope-eth": " ETH",
    "dope-fil": " FIL",
    "dope-ftm": " FTM",
    "dope-ftx": " FTX",
    "dope-gme": " GME",
    "dope-icp": " ICP",
    "dope-link": " LINK",
    "dope-ltc": " LTC",
    "dope-mana": " MANA",
    "dope-matic": " MATIC",
    "dope-mkr": " MKR",
    "dope-oath": " OATH",
    "dope-sand": " SAND",
    "dope-shib": " SHIB",
    "dope-sol": " SOL",
    "dope-tron": " TRON",
    "dope-uni": " UNI",
    "dope-xrp": " XRP",
    "city-binance": " BINANCE",
    "city-coinbase": " COINBASE",
    "city-curve": " CURVE",
    "city-dydx": " DYDX",
    "city-ftx": " FTX",
    "city-gemini": " GEMINI",
    "city-honey": " HONEY",
    "city-jupiter": " JUPITER",
    "city-kine": " KINE",
    "city-kraken": " KRAKEN",
    "city-kucoin": " KUCOIN",
    "city-pancake": " PANCAKE",
    "city-spooky": " SPOOKY",
    "city-sushi": " SUSHI",
    "city-traderjoe": " TRADERJOE",
    "city-uni": " UNI",
    "notification-welcome": " Obviously, you're not a golfer.",
    "notification-move": "",
    "notification-bought": " SWAPPED \{\{quantity}} \{\{drug}} AT $\{\{price}}",
    "notification-sold": " SWAPPED \{\{quantity}} \{\{drug}} AT $\{\{price}}",
    "notification-need-more-money": " YOU'RE CASHED OUT",
    "notification-need-more-space": " ",
    "notification-do-not-own": " ",
    "message-100000000": " Life forms from destruction, disorder and chaos.",
    "message-1000000": " Character is what you are in the dark.",
    "message-400000": "  We suffer more in imagination than in reality.",
    "message-300000": " ",
    "message-200000": " ",
    "message-100000": " ",
    "message-50000": " ",
    "message-10000": " ",
    "message-5000": " ",
    "message-1000": " ",
    "message-0": " Maybe pull out a defi loan?",
    "message--4050": " Probably should pull out a defi loan?",
    "message--10000": " You know, it's fairly easy to pull out a defi loan.",
    "message--99999": " Probably should have pulled out a dfi loan, just sayin'.",
    "message--100000": " Maybe just reset.",
    "message-bad": " Ouch",
    "about-title": " ",
    "about-text": " ",
    "about-attribution": " ",
    "about-privacy-policy": " ",
    "about-glyphicons": " "
}

function translate(key) {
    return translateJson[key];
}

View.prototype.setup_drugs = function () {
    var row_template = this.drugs_container.querySelector('tr[data-drug]');
    var drugs = DataCenter.drugs;

    console.log("Drugs", drugs)
    for (var drug in drugs) {
        var row = row_template.cloneNode(true);

        row.dataset['drug'] = drug;

        row.children[0].innerText = translate('dope-' + drugs[drug].name);

        this.drugs_container.append(row);
    }

    row_template.remove();
    this.drugs = document.querySelectorAll('.drugs tbody tr[data-drug]');

    // Inventory
    row_template = document.querySelector('#modal-inventory tr.template');

    for (var drug in drugs) {
        var row = row_template.cloneNode(true);
        console.log(row, row_template)
        row.classList.remove('template');

        row.dataset['drug'] = drug;

        document.querySelector('#modal-inventory tbody').append(row);
    }

    row_template.remove();
};

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

View.prototype.setup_cities = function () {
    for (var city in DataCenter.cities) {
        document.querySelector('#modal-cities .cities').append(createElementFromHTML('<button class="btn" data-city="' + city + '">' +
            translate('city-' + DataCenter.cities[city].name) + '</button> '));
    }
    document.querySelector('#modal-cities .cities button.btn')?.classList.add('current');
}

View.prototype.refresh_quantities = function (quantities) {
    for (var drug = 0; drug < this.drugs.length; drug++) {
        this.drugs.item(drug).children[1].innerHTML = quantities[drug] || 0;
    }
};

View.prototype.refresh_prices = function (prices) {
    for (var drug = 0; drug < this.drugs.length; drug++) {
        this.drugs.item(drug).children[2].innerHTML = '$' + (prices[drug] || 0);
    }
};

View.prototype.refresh_news = function (notifications) {
    // this.news.empty();
    // for (var notification in notifications) {
    //     this.news.append('<li class="' + notifications[notification].type + '">' + notifications[notification].text + '</li>');
    // }

    // $('.news.visible-xs').readmore({
    //     maxHeight: 40,
    //     moreLink: '<a href="#" style="padding-top: 15px; text-align: center; font-size: small;">' + translate('see-recent-news') + '</a>',
    //     lessLink: '<a href="#" style="padding-top: 15px; text-align: center; font-size: small;">' + translate('hide') + '</a>',
    // });
};

function replaceText(selector, text) {
    let elems = document.querySelectorAll(selector);
    elems.forEach((elem) => {
        elem.innerText = text;
    })
}

View.prototype.refresh_stats = function (game, coat) {
    replaceText('.stats .city, .xs-stats .city', game.city.city_name);
    replaceText('.stats .day, .xs-stats .day', game.day);
    replaceText('.stats .end, .xs-stats .end', game.end);
    replaceText('.stats .debt, .xs-stats .debt', Math.round(game.debt));
    replaceText('.stats .bank_deposit', game.bank_deposit);

    replaceText('.stats .cash, .xs-stats .cash', coat.cash);
    replaceText('.stats .guns', coat.guns.length);
    replaceText('.stats .health', coat.health);
    replaceText('.stats .used_space, .xs-stats .used_space', coat.used_space());
    replaceText('.stats .total_space, .xs-stats .total_space', coat.total_space);
};

View.prototype.refresh_available_drugs = function (available_drugs) {
    document.querySelectorAll('tr[data-drug].hidden').forEach(elem => elem.classList.remove('hidden'));

    for (var drug in available_drugs) {
        if (!available_drugs[drug]) {
            document.querySelector('tr[data-drug]:nth-child(' + (parseInt(drug) + 2) + ')').classList.add('hidden');
        }
    }
};

View.prototype.refresh_high_score = function (high_score) {
    document.querySelector('#modal-high-score ul').innerHTML = '';

    for (var i in high_score) {
        if (high_score[i] != 'null' && high_score[i] != null) {
            document.querySelector('#modal-high-score ul').append('<li>' + high_score[i] + '</li>');
        }
    }
};

View.prototype.refresh_stone_level = function (stone_level) {
    var colors = ['red', 'yellow', 'green', 'blue', 'orange'];

    document.querySelectorAll('body *').forEach(function (elem) {
        if (rand(0, 100) < stone_level / 2) {
            elem.style.transform = 'rotate(' + rand(0, stone_level / 4) + 'deg)'
            elem.style.color = parseInt(rand(0, colors.length - 1))
            elem.style['background-color'] = colors[parseInt(rand(0, colors.length - 1))]
            elem.style['letter-spacing'] = ((rand(0, stone_level) > stone_level / 6) ? '-4px' : '0px')
        }
    });
};

View.prototype.refresh_inventory = function (drugs) {
    for (var drug in drugs) {
        var row = document.querySelector('#modal-inventory tr:nth-child(' + (parseInt(drug) + 2) + ')')
        row.classList.remove('hidden');

        row.children[0].innerText = (translate('dope-' + DataCenter.drugs[drug].name));
        row.children[1].innerText = (drugs[drug] || 0);
        // row.firstChild.nextSibling.nextSibling.firstChild.firstChild.innerText = drugs[drug] || 0;
        // row.firstChild.nextSibling.nextSibling.firstChild.firstChild.attributes['max'] = drugs[drug] || 0;

        if ((drugs[drug] || 0) == 0) {
            row.classList.add('hidden');
        }
    }
    let el = document.querySelector('#modal-inventory p')
    if (array_sum(drugs) == 0 && el) {
        el.innerText = translate('no-drug-yet');
    } else if (el) {
        el.innerText = '';
    }
};

// (function (c) {
//     var f = "readmore",
//         h = {
//             speed: 100,
//             maxHeight: 200,
//             heightMargin: 16,
//             moreLink: '<a href="#">Read More</a>',
//             lessLink: '<a href="#">Close</a>',
//             embedCSS: !0,
//             sectionCSS: "display: block; width: 100%;",
//             startOpen: !1,
//             expandedClass: "readmore-js-expanded",
//             collapsedClass: "readmore-js-collapsed",
//             beforeToggle: function () { },
//             afterToggle: function () { }
//         },
//         k = !1;
//     c.fn[f] = function (b) {
//         var a = arguments;
//         if (void 0 === b || "object" === typeof b) return this.each(function () {
//             if (c.data(this,
//                 "plugin_" + f)) {
//                 var a = c.data(this, "plugin_" + f);
//                 a.destroy.apply(a)
//             }
//             c.data(this, "plugin_" + f, new g(this, b))
//         });
//         if ("string" === typeof b && "_" !== b[0] && "init" !== b) return this.each(function () {
//             var d = c.data(this, "plugin_" + f);
//             d instanceof g && "function" === typeof d[b] && d[b].apply(d, Array.prototype.slice.call(a, 1))
//         })
//     }
// })(jQuery);






// data








var DataCenter = {
    drugs: [
        {
            "name": "ada",
            "minimum_price": 1,
            "maximum_price": 2
        },
        {
            "name": "alcx",
            "minimum_price": 20,
            "maximum_price": 2004
        },
        {
            "name": "aave",
            "minimum_price": 28,
            "maximum_price": 632
        },
        {
            "name": "amc",
            "minimum_price": 2,
            "maximum_price": 59
        },
        {
            "name": "ape",
            "minimum_price": 3,
            "maximum_price": 26
        },
        {
            "name": "atom",
            "minimum_price": 2,
            "maximum_price": 45
        },
        {
            "name": "avax",
            "minimum_price": 3,
            "maximum_price": 134
        },
        {
            "name": "axs",
            "minimum_price": 1,
            "maximum_price": 160
        },
        {
            "name": "bnb",
            "minimum_price": 10,
            "maximum_price": 700
        },
        {
            "name": "btc",
            "minimum_price": 5000,
            "maximum_price": 69000
        },
        {
            "name": "boo",
            "minimum_price": 1,
            "maximum_price": 12
        },
        {
            "name": "cake",
            "minimum_price": 1,
            "maximum_price": 42
        },
        {
            "name": "comp",
            "minimum_price": 27,
            "maximum_price": 854
        },
        {
            "name": "doge",
            "minimum_price": 69,
            "maximum_price": 420
        },
        {
            "name": "dot",
            "minimum_price": 1,
            "maximum_price": 54
        },
        {
            "name": "eth",
            "minimum_price": 100,
            "maximum_price": 5000
        },
        {
            "name": "fil",
            "minimum_price": 5,
            "maximum_price": 188
        },
        {
            "name": "ftm",
            "minimum_price": 1,
            "maximum_price": 10
        },
        {
            "name": "ftx",
            "minimum_price": 2,
            "maximum_price": 80
        },
        {
            "name": "gme",
            "minimum_price": 4,
            "maximum_price": 325
        },
        {
            "name": "icp",
            "minimum_price": 5,
            "maximum_price": 364
        },
        {
            "name": "link",
            "minimum_price": 2,
            "maximum_price": 53
        },
        {
            "name": "ltc",
            "minimum_price": 2,
            "maximum_price": 278
        },
        {
            "name": "mana",
            "minimum_price": 1,
            "maximum_price": 6
        },
        {
            "name": "matic",
            "minimum_price": 1,
            "maximum_price": 10
        },
        {
            "name": "mkr",
            "minimum_price": 206,
            "maximum_price": 6012
        },
        {
            "name": "oath",
            "minimum_price": 1,
            "maximum_price": 10
        },
        {
            "name": "sand",
            "minimum_price": 1,
            "maximum_price": 9
        },
        {
            "name": "shib",
            "minimum_price": 1,
            "maximum_price": 7
        },
        {
            "name": "sol",
            "minimum_price": 1,
            "maximum_price": 260
        },
        {
            "name": "tron",
            "minimum_price": 1,
            "maximum_price": 9
        },
        {
            "name": "uni",
            "minimum_price": 2,
            "maximum_price": 43
        },
        {
            "name": "xrp",
            "minimum_price": 1,
            "maximum_price": 4
        },


    ],
    cities: [
        {
            "name": "binance",
            "min_drugs": 16,
            "max_drugs": 17
        },
        {
            "name": "coinbase",
            "min_drugs": 1,
            "max_drugs": 17
        },
        {
            "name": "curve",
            "min_drugs": 13,
            "max_drugs": 17
        },
        {
            "name": "dydx",
            "min_drugs": 7,
            "max_drugs": 17
        },
        {
            "name": "ftx",
            "min_drugs": 10,
            "max_drugs": 17
        },
        {
            "name": "gemini",
            "min_drugs": 4,
            "max_drugs": 17
        },
        {
            "name": "honey",
            "min_drugs": 14,
            "max_drugs": 17
        },
        {
            "name": "jupiter",
            "min_drugs": 14,
            "max_drugs": 17
        },
        {
            "name": "kine",
            "min_drugs": 6,
            "max_drugs": 17
        },
        {
            "name": "kraken",
            "min_drugs": 9,
            "max_drugs": 17
        },
        {
            "name": "kucoin",
            "min_drugs": 3,
            "max_drugs": 17
        },
        {
            "name": "pancake",
            "min_drugs": 8,
            "max_drugs": 17
        },
        {
            "name": "spooky",
            "min_drugs": 2,
            "max_drugs": 17
        },
        {
            "name": "sushi",
            "min_drugs": 13,
            "max_drugs": 17
        },
        {
            "name": "traderjoe",
            "min_drugs": 5,
            "max_drugs": 17
        },
        {
            "name": "uni",
            "min_drugs": 12,
            "max_drugs": 17
        },
    ],
    messages: [
        100000000,
        1000000,
        400000,
        300000,
        200000,
        100000,
        50000,
        10000,
        5000,
        1000,
        0,
        -4050,
        -10000,
        -99999,
        -100000,
    ]
};









// models









function rand(min_rand, max_rand) {
    return min_rand + (Math.random() * 10000 % (max_rand - min_rand));
}

function shuffle(array) {
    var shuffled = [], index;

    for (var i = 0; i < array.length; i++) {
        while ((index = parseInt(rand(0, array.length))) in shuffled);

        shuffled[index] = array[i];
    }

    return shuffled;
}

function array_sort(a, b) {
    a = parseInt(a);
    b = parseInt(b);

    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}

function pop_array(array, from_index) {
    var popped = [];

    for (var i = 0; i < from_index; i++) {
        popped[i] = array[i];
    }

    popped[from_index] = null;

    for (var i = from_index + 1; i < array.length; i++) {
        popped[i] = array[i - 1];
    }

    return popped;
}

function array_sum(array) {
    var sum = 0;

    for (var i in array) {
        sum += parseInt(array[i] || 0);
    }

    return sum;
}

// GameManager
function GameManager() {
    this.day = 2022;
    this.end = 2036;
    this.debt = 0;
    this.bank_deposit = 0;
    this.stone_level = 0;
    this.city = new City(0);
}

GameManager.prototype.is_game_over = function () {
    return this.day >= this.end;
};

GameManager.prototype.new_city = function (number, news_manager) {
    this.city = new City(number, news_manager);
    this.day++;
    this.debt *= 1.29;
    this.debt = Math.round(this.debt);
};

GameManager.prototype.player_name = function () {
    return window.localStorage.getItem('player_name') || '';
};

GameManager.prototype.high_score = function () {
    var scores = [];

    for (var i = 0; i < 10; i++) {
        scores[i] = window.localStorage.getItem('high-score-' + i);
    }

    return scores;
};

GameManager.prototype.add_high_score = function (score) {
    var scores = this.high_score();

    for (var i = 0; i < 10; i++) {
        if (parseInt(scores[i]) < parseInt(score) || scores[i] == 'null' || scores[i] == null) {
            scores = pop_array(scores, i);
            scores[i] = score;

            for (var j in scores) {
                window.localStorage.setItem('high-score-' + j, scores[j]);
            }

            return;
        }
    }
};

GameManager.prototype.reset_high_score = function () {
    for (var i = 0; i < 10; i++) {
        window.localStorage.removeItem('high-score-' + i);
    }
};

GameManager.prototype.message = function (score) {
    for (var i in DataCenter.messages) {
        var max_score = DataCenter.messages[i];
        if (max_score <= score) {
            return translate('message-' + DataCenter.messages[i]);
        }
    }
    return translate('message-bad');
}

// Coat
function Coat() {
    this.drugs = [];
    this.cash = 42;
    this.guns = [];
    this.health = 100;
    this.total_space = 420;
}

Coat.prototype.available_space = function () {
    var available_space = this.total_space;

    for (var i in this.drugs) {
        available_space -= this.drugs[i];
    }

    return available_space;
};

Coat.prototype.used_space = function () {
    return this.total_space - this.available_space();
};

Coat.prototype.add = function (drug, quantity) {
    this.drugs[drug] = this.drugs[drug] || 0;
    this.drugs[drug] += quantity;
};

Coat.prototype.can_buy = function (price, quantity) {
    return this.available_space() >= quantity && this.cash >= price * quantity;
};

Coat.prototype.can_sell = function (item, quantity) {
    return this.drugs[item] >= quantity;
};

Coat.prototype.buy = function (item, price, quantity) {
    this.cash -= price * quantity;
    this.add(item, quantity);
};

Coat.prototype.sell = function (item, price, quantity) {
    this.cash += price * quantity;
    this.drugs[item] -= quantity;
};

Coat.prototype.max_quantity = function (price) {
    return Math.min(this.available_space(), Math.floor(this.cash / price));
};

Coat.prototype.score = function (game, prices) {
    var score = this.cash - game.debt;

    for (var drug in this.drugs) {
        score += (this.drugs[drug] * prices[drug]) || 0;
    }

    return Math.round(score);
};

// City
function City(number, news_manager) {
    this.city_name = translate('city-' + DataCenter.cities[number].name);
    this.is_cop = Math.random() * 100 < DataCenter.cities[number].cops;
    this.prices = [];
    this.number = number;
    this.available_drugs = [];


    // Available drugs
    var max_drugs = ('max_drugs' in DataCenter.cities[number] ? DataCenter.cities[number].max_drugs : DataCenter.drugs.length);

    var number_of_drugs = parseInt(rand(DataCenter.cities[number].min_drugs, max_drugs));
    for (var i = 0; i < number_of_drugs; i++) {
        this.available_drugs[i] = true;
    }

    for (var i = number_of_drugs; i < DataCenter.drugs.length; i++) {
        this.available_drugs[i] = false;
    }

    this.available_drugs = shuffle(this.available_drugs);

    // Prices
    for (var drug in DataCenter.drugs) {
        if (this.available_drugs[parseInt(drug)]) {
            var minimum_price = DataCenter.drugs[drug].minimum_price;
            var maximum_price = DataCenter.drugs[drug].maximum_price;

            if ('cheap' in DataCenter.drugs[drug] && rand(0, 100) < 5 && news_manager != null) {
                minimum_price = DataCenter.drugs[drug].cheap.minimum_price;
                maximum_price = DataCenter.drugs[drug].cheap.maximum_price;

                var id = 'dope-' + DataCenter.drugs[drug].name + '-cheap';

                news_manager.add(new News(translate(id)));
            } else if ('expensive' in DataCenter.drugs[drug] && rand(0, 100) < 5 && news_manager) {
                minimum_price = DataCenter.drugs[drug].expensive.minimum_price;
                maximum_price = DataCenter.drugs[drug].expensive.maximum_price;

                var id = 'dope-' + DataCenter.drugs[drug].name + '-expensive';

                news_manager.add(new News(translate(id)));
            }

            this.prices[drug] = Math.round(rand(minimum_price, maximum_price));
        }
    }

    console.log("Prices", this.prices)
}

// News & NewsManager
function News(text, type) {
    this.text = text;
    this.type = type || '';
}

function NewsManager() {
    this.news = [];
    this.limit = 15;
}

NewsManager.prototype.add = function (news) {
    this.news.reverse();

    // Keep only this.limit news
    if (this.news.length == this.limit) {
        this.news.shift();
    }

    this.news.push(news);

    this.news.reverse();
};



// controller
(function (funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace

    console.log("Here?3")
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function (callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function () { callback(context); }, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({ fn: callback, ctx: context });
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

docReady(function () {
    console.log("Here?")
    // Useful when debugging
    navigator.Controller = new Controller();

    document.querySelectorAll("button[data-l10n-id]").forEach((elem) => {
        let key = elem.attributes['data-l10n-id'].value;

        if (key) {
            elem.innerText = translate(key);
        }
    })
});

function Controller() {
    var self = this;


    this.coat = new Coat();

    this.view = new View();

    this.game = new GameManager();

    this.news_manager = new NewsManager();

    this.news_manager.add(new News(translate('notification-welcome')));

    this.view.refresh_prices(this.game.city.prices);
    this.view.refresh_available_drugs(this.game.city.available_drugs);
    this.view.refresh_stats(this.game, this.coat);
    this.view.refresh_news(this.news_manager.news);
    this.view.refresh_high_score(self.game.high_score());

    document.querySelectorAll('button.buy').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            if (self.buy(parseInt(elem.parentElement.parentElement.dataset['drug']), parseInt(elem.previousElementSibling.previousElementSibling.value))) {
                elem.previousElementSibling.previousElementSibling.value = 0;
            }
        }
    })

    document.querySelectorAll('button.sell').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var index = parseInt(elem.parentNode.parentElement.dataset['drug']);
            var quantity = parseInt(elem.previousElementSibling.previousElementSibling.value);
            if (self.sell(index, quantity)) {
                elem.previousElementSibling.previousElementSibling.value = 0;
                elem.parentNode.parentNode.querySelector('td:nth-child(2)').innerText = (self.coat.drugs[index]);
            }
        }
    })

    document.querySelectorAll('button.buy-max').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var item_number = parseInt(elem.parentNode.parentElement.dataset['drug']);
            var quantity = self.coat.max_quantity(self.game.city.prices[item_number]);
            elem.previousElementSibling.value = quantity;
        }
    })

    document.querySelectorAll('button.sell-max').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var item_number = parseInt(elem.parentNode.parentElement.dataset['drug']);
            var quantity = self.coat.drugs[item_number] || 0;
            elem.previousElementSibling.value = quantity;
        }
    })

    document.querySelectorAll('a.new-game').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            window.location = '';
        }
    })

    document.querySelectorAll('a.new-name').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            self.new_name();
        }
    })

    document.querySelectorAll('#modal-cities .cities button[data-city]').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            if (self.game.city.number == elem.dataset['city']) {
                return;
            }

            if (self.game.day == self.game.end) {
                self.game_over();
            } else {
                self.news_manager.add(new News(translate('notification-move', {
                    city: translate('city-' + DataCenter.cities[elem.dataset['city']].name)
                }), 'move'));

                self.game.new_city(elem.dataset['city'], self.news_manager);
                self.view.refresh_available_drugs(self.game.city.available_drugs);
                self.view.refresh_news(self.news_manager.news);

                document.querySelectorAll('button[data-city].current').forEach((elem) => {
                    elem.classList.remove('current');
                })
                elem.classList.add('current');

                document.querySelectorAll('input.number').forEach(function () {
                    elem.previousElementSibling.value = 0;
                });

                self.view.refresh_news(self.news_manager.news);
                self.view.refresh_prices(self.game.city.prices);
                self.view.refresh_stats(self.game, self.coat);

                if (self.game.day == self.game.end) {
                    document.querySelectorAll('a[data-bs-target=#modal-cities]').forEach((elem) => {
                        elem.innerHTML = '<i class="glyphicon glyphicon-stop"></i> ' + translate('end');
                        elem.attributes['href'] = '#'
                        let a = elem.onclick; elem.onclick = (ev) => {
                            if (a) a(ev);
                            document.querySelector('#modal-cities .cities button[data-city]:not(.current)').click();
                        }
                    })
                }
            }

            document.querySelector('#modal-cities').classList.add('hide.bs.modal')
            document.querySelectorAll('.navbar .navbar-collapse').forEach((elem) => {
                elem.classList.remove('in')
            })
        }
    })

    document.querySelectorAll('a[data-bs-target="#modal-pawn-shop"]').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            document.querySelectorAll('#modal-pawn-shop .form-group').forEach((elem) => { elem.classList.remove('has-error') });
            document.querySelectorAll('#modal-pawn-shop .debt').forEach((elem) => { elem.innerText = self.game.debt })
            document.querySelectorAll('#modal-pawn-shop input').forEach((elem) => { elem.value = 0; })
        }
    })
    console.log("Here?")
    document.querySelectorAll('a[data-bs-target="#modal-inventory"]').forEach((elem) => {
        let a = elem.onclick;
        console.log(elem)
        elem.onclick = (ev) => {
            if (a) a(ev);
            self.view.refresh_inventory(self.coat.drugs);
        }
    })

    document.querySelectorAll('button[data-bs-target="#modal-inventory"]').forEach((elem) => {
        let a = elem.onclick
        elem.onclick = (ev) => {
            if (a) a(ev);
            self.view.refresh_inventory(self.coat.drugs);
        }
    })

    document.querySelectorAll('.depayland').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            let val = elem.parentNode.previousElementSibling.value;
            console.log(val);

            var amount = parseInt(val);
            self.coat.cash += amount;

            elem.parentNode.previousElementSibling.value = 0;
            self.view.refresh_stats(self.game, self.coat);
        }
    });

    document.querySelectorAll('#modal-inventory button.land').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var amount = parseInt(elem.parentNode.previousElementSibling.value);
            self.coat.cash += amount;

            elem.parentNode.previousElementSibling.value = 0;
            self.view.refresh_stats(self.game, self.coat);
        }
    });

    document.querySelectorAll('#modal-inventory button.defi').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var amount = parseInt(elem.parentNode.previousElementSibling.value);
            self.game.debt += amount;
            self.coat.cash += amount;

            elem.parentNode.previousElementSibling.value = 0;
            self.view.refresh_stats(self.game, self.coat);
        }
    })

    document.querySelectorAll('#modal-inventory button.paydefi').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var amount = Math.min(parseInt(elem.parentNode.previousElementSibling.value), self.game.debt);

            if (self.coat.cash >= amount) {
                self.game.debt -= amount;
                self.coat.cash -= amount;
                elem.parentNode.previousElementSibling.value = 0;

                self.view.refresh_stats(self.game, self.coat);
            } else {
                elem.parentNode.parentNode.parentElement.classList.add('has-error')
            }
        }
    })

    document.querySelectorAll('#modal-pawn-shop button.pay').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var amount = Math.min(parseInt(elem.parentNode.previousElementSibling.value), self.game.debt);

            if (self.coat.cash >= amount) {
                self.game.debt -= amount;
                self.coat.cash -= amount;
                elem.parentNode.previousElementSibling.value = 0;

                self.view.refresh_stats(self.game, self.coat);
            } else {
                elem.parentNode.parentNode.parentElement.classList.add('has-error')
            }
        }
    })

    document.querySelectorAll('#modal-pawn-shop button.land').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var amount = parseInt(elem.parentNode.previousElementSibling.value);
            self.game.debt += amount;
            self.coat.cash += amount;

            elem.parentNode.previousElementSibling.value = 0;
            self.view.refresh_stats(self.game, self.coat);
        }
    })

    document.querySelectorAll('#modal-pawn-shop button.pay-max').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            elem.parentNode.previousElementSibling.value = (Math.min(self.coat.cash, self.game.debt));
        }
    })



    document.querySelectorAll('#modal-inventory button.max').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            elem.parentNode.previousElementSibling.value = parseInt(elem.parentNode.parentNode.parentNode.previousElementSibling.innerText)
        }
    })

    document.querySelectorAll('#modal-inventory button.consume').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var index = parseInt(elem.parentNode.parentNode.parentElement.dataset['drug']);
            var quantity = Math.min(parseInt(elem.parentElement.parentElement.previousElementSibling.firstChild.firstChild.value), self.coat.drugs[index]);

            self.coat.drugs[index] -= quantity;
            self.game.stone_level += quantity;

            self.view.refresh_stone_level(self.game.stone_level);
            self.view.refresh_inventory(self.coat.drugs);
            self.view.refresh_quantities(self.coat.drugs);
            self.view.refresh_stats(self.game, self.coat);

            elem.parentElement.parentElement.previousElementSibling.firstChild.firstChild.value = 0;
        }
    })

    document.querySelectorAll('#modal-inventory button.drop').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            var index = parseInt(elem.parentElement.parentElement.parentElement.dataset['drug']);
            var quantity = Math.min(parseInt(elem.parentElement.parentElement.previousElementSibling.firstChild.firstChild.value), self.coat.drugs[index]);

            self.coat.drugs[index] -= quantity;

            self.view.refresh_inventory(self.coat.drugs);
            self.view.refresh_quantities(self.coat.drugs);
            self.view.refresh_stats(self.game, self.coat);

            elem.parentElement.parentElement.previousElementSibling.firstChild.firstChild.value = (0);
        }
    })



    document.querySelectorAll('.buy-xs').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            document.querySelector('#modal-transaction input[type="number"]').value = (0);

            document.querySelector('#modal-transaction').classList.remove('sell');
            document.querySelector('#modal-transaction').classList.add('buy')
            document.querySelector('#modal-transaction').dataset['drug'] = elem.parentElement.parentElement.dataset['drug'];
            document.querySelector('#modal-transaction .modal-header h4').innerText = (translate('buy')
                + ' ' + translate('dope-' + DataCenter.drugs[elem.parentElement.parentElement.dataset['drug']].name));
            document.querySelector('#modal-transaction .modal-body .action').innerText = (translate('buy'));

            document.querySelector('#modal-transaction.buy button.max').onclick = (ev) => {
                let elem = ev.currentTarget;
                var item_number = parseInt(elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset['drug']);
                var quantity = self.coat.max_quantity(self.game.city.prices[item_number]);

                elem.parentNode.previousElementSibling.value = (quantity);
            };

            document.querySelector('#modal-transaction.buy button.action').onclick = (ev) => {
                let elem = ev.currentTarget;

                var index = parseInt(elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset['drug']);

                if (self.buy(index, parseInt(elem.parentElement.previousElementSibling.value))) {
                    elem.removeEventListener('click', elem.onclick);
                }
            };
        }
    })

    document.querySelectorAll('.sell-xs').forEach((elem) => {
        let a = elem.onclick; elem.onclick = (ev) => {
            if (a) a(ev);
            document.querySelector('#modal-transaction input[type="number"]').value = (0);

            document.querySelector('#modal-transaction').classList.remove('buy');
            document.querySelector('#modal-transaction').classList.add('sell')
            document.querySelector('#modal-transaction').dataset['drug'] = elem.parentElement.parentElement.dataset['drug'];
            document.querySelector('#modal-transaction .modal-header h4').innerText = (translate('sell')
                + ' ' + translate('dope-' + DataCenter.drugs[elem.parentElement.parentElement.dataset['drug']].name));
            document.querySelector('#modal-transaction .modal-body .action').innerText = (translate('sell'));

            document.querySelector('#modal-transaction.sell button.max').onclick = (ev) => {
                // Hmmm... Maybe this isn't the best way to do it...
                let elem = ev.currentTarget;
                var index = parseInt(elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset['drug']);
                var quantity = self.coat.drugs[index] || 0;

                elem.parentElement.previousElementSibling.value = quantity;
            };

            document.querySelector('#modal-transaction.sell button.action').onclick = (ev) => {
                let elem = ev.currentTarget;
                var index = parseInt(elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset['drug']);
                var quantity = parseInt(elem.parentElement.previousElementSibling.value);

                if (self.sell(index, quantity)) {
                    elem.removeEventListener('click', elem.onclick);
                }
            };
        }
    })

    // document.querySelectorAll('.stats_toggle').click(function () {
    //     $('.stats').slideToggle();
    // });
}

Controller.prototype.buy = function (index, quantity) {
    if (!quantity) {
        return false;
    }

    var return_value = true;

    if (this.coat.can_buy(this.game.city.prices[index], quantity)) {
        this.coat.buy(index, this.game.city.prices[index], quantity);

        this.news_manager.add(new News(translate('notification-bought', {
            quantity: quantity,
            drug: translate('dope-' + DataCenter.drugs[index].name),
            price: this.game.city.prices[index]
        }), 'drug'));

        this.view.refresh_quantities(this.coat.drugs);
        this.view.refresh_stats(this.game, this.coat);
    } else {
        this.news_manager.add(new News(translate('notification-need-more-' + (this.coat.available_space() >= quantity ? 'money' : 'space')), 'error'));
        return_value = false;
    }

    this.view.refresh_news(this.news_manager.news);
    return return_value;
};

Controller.prototype.sell = function (index, quantity) {
    if (!quantity) {
        return;
    }

    var return_value = true;

    if (this.coat.can_sell(index, quantity)) {
        this.coat.sell(index, this.game.city.prices[index], quantity);

        this.news_manager.add(new News(translate('notification-sold', {
            quantity: quantity,
            drug: translate('dope-' + DataCenter.drugs[index].name),
            price: this.game.city.prices[index]
        }), 'drug'));
        this.view.refresh_stats(this.game, this.coat);
        this.view.refresh_quantities(this.coat.drugs);
    } else {
        this.news_manager.add(new News(translate('notification-do-not-own'), 'error'));
        return_value = false;
    }

    this.view.refresh_news(this.news_manager.news);
    return return_value;
};

Controller.prototype.new_name = function () {
    var name = prompt(translate('prompt-name'));

    window.localStorage.setItem('player_name', name);
};

Controller.prototype.game_over = function () {
    var score = this.coat.score(this.game, this.game.city.prices);

    var high_score_string = '$' + score + ' by ' + this.game.player_name() + '  on  ' + new Date().toLocaleString() + '</small></span>';

    this.game.add_high_score(high_score_string);
    this.view.refresh_high_score(this.game.high_score());

    document.querySelector('#modal-high-score .modal-footer .btn').innerText = (translate('new-game'));
    document.querySelector('#modal-high-score .modal-body .final-score').innerHtml = ('FINAL SCORE : $' + score);
    document.querySelector('#modal-high-score .modal-body .message').innerHtml = ('' + this.game.message(score));

    document.querySelectorAll('#modal-high-score').on('hidden.bs.modal', function () {
        window.location = '';
    });

    document.querySelector('#modal-high-score').classList.add('show.bs.modal');
};



window.addEventListener('load', () => {
    registerSW();
});
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator
                .serviceWorker
                .register('serviceWorker.js');
        }
        catch { }
    }
}