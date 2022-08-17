
// view






function View(drugs) {
    this.news = $('.news ul');
    this.drugs_container = $('.drugs tbody');

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
    var row_template = this.drugs_container.children('tr[data-drug]').first();
    var drugs = DataCenter.drugs;

    for (var drug in drugs) {
        var row = row_template.clone();

        row.data('drug', drug);

        row.children().first().text(translate('dope-' + drugs[drug].name));

        this.drugs_container.append(row);
    }

    row_template.remove();
    this.drugs = $('.drugs tbody tr[data-drug]');

    // Inventory
    row_template = $('#modal-inventory tr.template');

    for (var drug in drugs) {
        var row = row_template.clone().removeClass('template');

        row.data('drug', drug);

        $('#modal-inventory tbody').append(row);
    }

    row_template.remove();
};

View.prototype.setup_cities = function () {
    for (var city in DataCenter.cities) {
        $('#modal-cities .cities').append('<button class="btn" data-city="' + city + '">' +
            translate('city-' + DataCenter.cities[city].name) + '</button> ');
    }
    $('#modal-cities .cities button.btn').first().addClass('current');
}

View.prototype.refresh_quantities = function (quantities) {
    for (var drug = 0; drug < this.drugs.length; drug++) {
        this.drugs.get(drug).children[1].innerHTML = quantities[drug] || 0;
    }
};

View.prototype.refresh_prices = function (prices) {
    for (var drug = 0; drug < this.drugs.length; drug++) {
        this.drugs.get(drug).children[2].innerHTML = '$' + (prices[drug] || 0);
    }
};

View.prototype.refresh_news = function (notifications) {
    this.news.empty();
    for (var notification in notifications) {
        this.news.append('<li class="' + notifications[notification].type + '">' + notifications[notification].text + '</li>');
    }

    $('.news.visible-xs').readmore({
        maxHeight: 40,
        moreLink: '<a href="#" style="padding-top: 15px; text-align: center; font-size: small;">' + translate('see-recent-news') + '</a>',
        lessLink: '<a href="#" style="padding-top: 15px; text-align: center; font-size: small;">' + translate('hide') + '</a>',
    });
};

View.prototype.refresh_stats = function (game, coat) {
    $('.stats .city, .xs-stats .city').text(game.city.city_name);
    $('.stats .day, .xs-stats .day').text(game.day);
    $('.stats .end, .xs-stats .end').text(game.end);
    $('.stats .debt, .xs-stats .debt').text(Math.round(game.debt));
    $('.stats .bank_deposit').text(game.bank_deposit);

    $('.stats .cash, .xs-stats .cash').text(coat.cash);
    $('.stats .guns').text(coat.guns.length);
    $('.stats .health').text(coat.health);
    $('.stats .used_space, .xs-stats .used_space').text(coat.used_space());
    $('.stats .total_space, .xs-stats .total_space').text(coat.total_space);
};

View.prototype.refresh_available_drugs = function (available_drugs) {
    $('tr[data-drug].hidden').removeClass('hidden');

    for (var drug in available_drugs) {
        if (!available_drugs[drug]) {
            $('tr[data-drug]:nth-child(' + (parseInt(drug) + 2) + ')').addClass('hidden');
        }
    }
};

View.prototype.refresh_high_score = function (high_score) {
    $('#modal-high-score ul').empty();

    for (var i in high_score) {
        if (high_score[i] != 'null' && high_score[i] != null) {
            $('#modal-high-score ul').append('<li>' + high_score[i] + '</li>');
        }
    }
};

View.prototype.refresh_stone_level = function (stone_level) {
    var colors = ['red', 'yellow', 'green', 'blue', 'orange'];

    $('body *').each(function () {
        if (rand(0, 100) < stone_level / 2) {
            $(this).css({
                transform: 'rotate(' + rand(0, stone_level / 4) + 'deg)',
                color: colors[parseInt(rand(0, colors.length - 1))],
                backgroundColor: colors[parseInt(rand(0, colors.length - 1))],
                letterSpacing: ((rand(0, stone_level) > stone_level / 6) ? '-4px' : '0px'),
            });
        }
    });
};

View.prototype.refresh_inventory = function (drugs) {
    for (var drug in drugs) {
        var row = $('#modal-inventory tr:nth-child(' + (parseInt(drug) + 2) + ')').removeClass('hidden');

        row.children().first().text(translate('dope-' + DataCenter.drugs[drug].name));
        row.children().first().next().text(drugs[drug] || 0);
        row.children().first().next().next().children().first().children().first().val(drugs[drug] || 0).attr('max', drugs[drug] || 0);

        if ((drugs[drug] || 0) == 0) {
            row.addClass('hidden');
        }
    }

    if (array_sum(drugs) == 0) {
        $('#modal-inventory p').text(translate('no-drug-yet'));
    } else {
        $('#modal-inventory p').text('');
    }
};

(function (c) {
    function g(b, a) {
        this.element = b;
        this.options = c.extend({}, h, a);
        c(this.element).data("max-height", this.options.maxHeight);
        c(this.element).data("height-margin", this.options.heightMargin);
        delete this.options.maxHeight;
        if (this.options.embedCSS && !k) {
            var d = ".readmore-js-toggle, .readmore-js-section { " + this.options.sectionCSS + " } .readmore-js-section { overflow: hidden; }",
                e = document.createElement("style");
            e.type = "text/css";
            e.styleSheet ? e.styleSheet.cssText = d : e.appendChild(document.createTextNode(d));
            document.getElementsByTagName("head")[0].appendChild(e);
            k = !0
        }
        this._defaults = h;
        this._name = f;
        this.init()
    }
    var f = "readmore",
        h = {
            speed: 100,
            maxHeight: 200,
            heightMargin: 16,
            moreLink: '<a href="#">Read More</a>',
            lessLink: '<a href="#">Close</a>',
            embedCSS: !0,
            sectionCSS: "display: block; width: 100%;",
            startOpen: !1,
            expandedClass: "readmore-js-expanded",
            collapsedClass: "readmore-js-collapsed",
            beforeToggle: function () { },
            afterToggle: function () { }
        },
        k = !1;
    g.prototype = {
        init: function () {
            var b = this;
            c(this.element).each(function () {
                var a =
                    c(this),
                    d = a.css("max-height").replace(/[^-\d\.]/g, "") > a.data("max-height") ? a.css("max-height").replace(/[^-\d\.]/g, "") : a.data("max-height"),
                    e = a.data("height-margin");
                "none" != a.css("max-height") && a.css("max-height", "none");
                b.setBoxHeight(a);
                if (a.outerHeight(!0) <= d + e) return !0;
                a.addClass("readmore-js-section " + b.options.collapsedClass).data("collapsedHeight", d);
                a.after(c(b.options.startOpen ? b.options.lessLink : b.options.moreLink).on("click", function (c) {
                    b.toggleSlider(this, a, c)
                }).addClass("readmore-js-toggle"));
                b.options.startOpen || a.css({
                    height: d
                })
            });
            c(window).on("resize", function (a) {
                b.resizeBoxes()
            })
        },
        toggleSlider: function (b, a, d) {
            d.preventDefault();
            var e = this;
            d = newLink = sectionClass = "";
            var f = !1;
            d = c(a).data("collapsedHeight");
            c(a).height() <= d ? (d = c(a).data("expandedHeight") + "px", newLink = "lessLink", f = !0, sectionClass = e.options.expandedClass) : (newLink = "moreLink", sectionClass = e.options.collapsedClass);
            e.options.beforeToggle(b, a, f);
            c(a).animate({
                height: d
            }, {
                duration: e.options.speed,
                complete: function () {
                    e.options.afterToggle(b,
                        a, f);
                    c(b).replaceWith(c(e.options[newLink]).on("click", function (b) {
                        e.toggleSlider(this, a, b)
                    }).addClass("readmore-js-toggle"));
                    c(this).removeClass(e.options.collapsedClass + " " + e.options.expandedClass).addClass(sectionClass)
                }
            })
        },
        setBoxHeight: function (b) {
            var a = b.clone().css({
                height: "auto",
                width: b.width(),
                overflow: "hidden"
            }).insertAfter(b),
                c = a.outerHeight(!0);
            a.remove();
            b.data("expandedHeight", c)
        },
        resizeBoxes: function () {
            var b = this;
            c(".readmore-js-section").each(function () {
                var a = c(this);
                b.setBoxHeight(a);
                (a.height() > a.data("expandedHeight") || a.hasClass(b.options.expandedClass) && a.height() < a.data("expandedHeight")) && a.css("height", a.data("expandedHeight"))
            })
        },
        destroy: function () {
            var b = this;
            c(this.element).each(function () {
                var a = c(this);
                a.removeClass("readmore-js-section " + b.options.collapsedClass + " " + b.options.expandedClass).css({
                    "max-height": "",
                    height: "auto"
                }).next(".readmore-js-toggle").remove();
                a.removeData()
            })
        }
    };
    c.fn[f] = function (b) {
        var a = arguments;
        if (void 0 === b || "object" === typeof b) return this.each(function () {
            if (c.data(this,
                "plugin_" + f)) {
                var a = c.data(this, "plugin_" + f);
                a.destroy.apply(a)
            }
            c.data(this, "plugin_" + f, new g(this, b))
        });
        if ("string" === typeof b && "_" !== b[0] && "init" !== b) return this.each(function () {
            var d = c.data(this, "plugin_" + f);
            d instanceof g && "function" === typeof d[b] && d[b].apply(d, Array.prototype.slice.call(a, 1))
        })
    }
})(jQuery);






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
            "maximum_price": 1000
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
            "maximum_price": 2
        },
        {
            "name": "sol",
            "minimum_price": 1,
            "maximum_price": 260
        },
        {
            "name": "tron",
            "minimum_price": 1,
            "maximum_price": 2
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
            "min_drugs": 13,
            "max_drugs": 14
        },
        {
            "name": "coinbase",
            "min_drugs": 1,
            "max_drugs": 100
        },
        {
            "name": "curve",
            "min_drugs": 13,
            "max_drugs": 21
        },
        {
            "name": "dydx",
            "min_drugs": 7,
            "max_drugs": 30
        },
        {
            "name": "ftx",
            "min_drugs": 10,
            "max_drugs": 23
        },
        {
            "name": "gemini",
            "min_drugs": 4,
            "max_drugs": 45
        },
        {
            "name": "honey",
            "min_drugs": 14,
            "max_drugs": 20
        },
        {
            "name": "jupiter",
            "min_drugs": 14,
            "max_drugs": 21
        },
        {
            "name": "kine",
            "min_drugs": 6,
            "max_drugs": 35
        },
        {
            "name": "kraken",
            "min_drugs": 9,
            "max_drugs": 24
        },
        {
            "name": "kucoin",
            "min_drugs": 3,
            "max_drugs": 50
        },
        {
            "name": "pancake",
            "min_drugs": 8,
            "max_drugs": 25
        },
        {
            "name": "spooky",
            "min_drugs": 2,
            "max_drugs": 50
        },
        {
            "name": "sushi",
            "min_drugs": 13,
            "max_drugs": 22
        },
        {
            "name": "traderjoe",
            "min_drugs": 5,
            "max_drugs": 40
        },
        {
            "name": "uni",
            "min_drugs": 12,
            "max_drugs": 23
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



$(document).ready(function () {
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

    $('button.buy').click(function () {
        if (self.buy(parseInt($(this).parent().parent().data('drug')), parseInt($(this).prev().prev().val()))) {
            $(this).prev().prev().val(0);
        }
    });

    $('button.sell').click(function () {
        var index = parseInt($(this).parent().parent().data('drug'));
        var quantity = parseInt($(this).prev().prev().val());
        if (self.sell(index, quantity)) {
            $(this).prev().prev().val(0);
            $(this).parent().parent().children('td:nth-child(2)').text(self.coat.drugs[index]);
        }
    });

    $('button.buy-max').click(function () {
        var item_number = parseInt($(this).parent().parent().data('drug'));
        var quantity = self.coat.max_quantity(self.game.city.prices[item_number]);
        $(this).prev().val(quantity);
    });

    $('button.sell-max').click(function () {
        var item_number = parseInt($(this).parent().parent().data('drug'));
        var quantity = self.coat.drugs[item_number] || 0;
        $(this).prev().val(quantity);
    });

    $('a.new-game').click(function () {
        window.location = '';
    });

    $('a.new-name').click(function () {
        self.new_name();
    });

    $('#modal-cities .cities button[data-city]').click(function () {
        if (self.game.city.number == $(this).data('city')) {
            return;
        }

        if (self.game.day == self.game.end) {
            self.game_over();
        } else {
            self.news_manager.add(new News(translate('notification-move', {
                city: translate('city-' + DataCenter.cities[$(this).data('city')].name)
            }), 'move'));

            self.game.new_city($(this).data('city'), self.news_manager);
            self.view.refresh_available_drugs(self.game.city.available_drugs);
            self.view.refresh_news(self.news_manager.news);

            $('button[data-city].current').removeClass('current');
            $(this).addClass('current');

            $('input.number').each(function () {
                $(this).prev().val(0);
            });

            self.view.refresh_news(self.news_manager.news);
            self.view.refresh_prices(self.game.city.prices);
            self.view.refresh_stats(self.game, self.coat);

            if (self.game.day == self.game.end) {
                $('a[href=#modal-cities]').html('<i class="glyphicon glyphicon-stop"></i> ' + translate('end')).attr('href', '#').click(function () {
                    $('#modal-cities .cities button[data-city]:not(.current)').first().click();
                });
            }
        }

        $('#modal-cities').modal('hide');
        $('.navbar .navbar-collapse').removeClass('in');
    });

    $('a[href=#modal-pawn-shop]').click(function () {
        $('#modal-pawn-shop .form-group').removeClass('has-error');
        $('#modal-pawn-shop .debt').text(self.game.debt);
        $('#modal-pawn-shop input').val(0);
    });

    $('a[href=#modal-inventory]').click(function () {
        self.view.refresh_inventory(self.coat.drugs);
    });

    $('.depayland').click(function () {
        var amount = parseInt($(this).parent().prev().val());
        self.coat.cash += amount;

        $(this).parent().prev().val(0);
        self.view.refresh_stats(self.game, self.coat);
    });

    $('#modal-inventory button.land').click(function () {
        var amount = parseInt($(this).parent().prev().val());
        self.coat.cash += amount;

        $(this).parent().prev().val(0);
        self.view.refresh_stats(self.game, self.coat);
    });

    $('#modal-inventory button.defi').click(function () {
        var amount = parseInt($(this).parent().prev().val());
        self.game.debt += amount;
        self.coat.cash += amount;

        $(this).parent().prev().val(0);
        self.view.refresh_stats(self.game, self.coat);
    });

    $('#modal-inventory button.paydefi').click(function () {
        var amount = Math.min(parseInt($(this).parent().prev().val()), self.game.debt);

        if (self.coat.cash >= amount) {
            self.game.debt -= amount;
            self.coat.cash -= amount;
            $(this).parent().prev().val(0);

            self.view.refresh_stats(self.game, self.coat);
        } else {
            $(this).parent().parent().parent().addClass('has-error');
        }
    });

    $('#modal-pawn-shop button.pay').click(function () {
        var amount = Math.min(parseInt($(this).parent().prev().val()), self.game.debt);

        if (self.coat.cash >= amount) {
            self.game.debt -= amount;
            self.coat.cash -= amount;
            $(this).parent().prev().val(0);

            self.view.refresh_stats(self.game, self.coat);
        } else {
            $(this).parent().parent().parent().addClass('has-error');
        }
    });

    $('#modal-pawn-shop button.land').click(function () {
        var amount = parseInt($(this).parent().prev().val());
        self.game.debt += amount;
        self.coat.cash += amount;

        $(this).parent().prev().val(0);
        self.view.refresh_stats(self.game, self.coat);
    });

    $('#modal-pawn-shop button.pay-max').click(function () {
        $(this).parent().prev().val(Math.min(self.coat.cash, self.game.debt));
    });



    $('#modal-inventory button.max').click(function () {
        $(this).parent().prev().val(parseInt($(this).parent().parent().parent().prev().text()));
    });

    $('#modal-inventory button.consume').click(function () {
        var index = parseInt($(this).parent().parent().parent().data('drug'));
        var quantity = Math.min(parseInt($(this).parent().parent().prev().children().first().children().first().val()), self.coat.drugs[index]);

        self.coat.drugs[index] -= quantity;
        self.game.stone_level += quantity;

        self.view.refresh_stone_level(self.game.stone_level);
        self.view.refresh_inventory(self.coat.drugs);
        self.view.refresh_quantities(self.coat.drugs);
        self.view.refresh_stats(self.game, self.coat);

        $(this).parent().parent().prev().children().first().children().first().val(0);
    });

    $('#modal-inventory button.drop').click(function () {
        var index = parseInt($(this).parent().parent().parent().data('drug'));
        var quantity = Math.min(parseInt($(this).parent().parent().prev().children().first().children().first().val()), self.coat.drugs[index]);

        self.coat.drugs[index] -= quantity;

        self.view.refresh_inventory(self.coat.drugs);
        self.view.refresh_quantities(self.coat.drugs);
        self.view.refresh_stats(self.game, self.coat);

        $(this).parent().parent().prev().children().first().children().first().val(0);
    });



    $('.buy-xs').click(function () {
        $('#modal-transaction input[type="number"]').val(0);

        $('#modal-transaction').removeClass('sell');
        $('#modal-transaction').addClass('buy').data('drug', $(this).parent().parent().data('drug'));
        $('#modal-transaction .modal-header h4').text(translate('buy')
            + ' ' + translate('dope-' + DataCenter.drugs[$(this).parent().parent().data('drug')].name));
        $('#modal-transaction .modal-body .action').text(translate('buy'));

        $('#modal-transaction.buy button.max').click(function () {
            var item_number = parseInt($(this).parent().parent().parent().parent().parent().parent().parent().parent().data('drug'));
            var quantity = self.coat.max_quantity(self.game.city.prices[item_number]);

            $(this).parent().prev().val(quantity);
        });

        $('#modal-transaction.buy button.action').click(function () {
            var index = parseInt($(this).parent().parent().parent().parent().parent().parent().parent().parent().data('drug'));

            if (self.buy(index, parseInt($(this).parent().prev().val()))) {
                $(this).unbind('click');
            }
        });
    });

    $('.sell-xs').click(function () {
        $('#modal-transaction input[type="number"]').val(0);

        $('#modal-transaction').removeClass('buy');
        $('#modal-transaction').addClass('sell').data('drug', $(this).parent().parent().data('drug'));
        $('#modal-transaction .modal-header h4').text(translate('sell')
            + ' ' + translate('dope-' + DataCenter.drugs[$(this).parent().parent().data('drug')].name));
        $('#modal-transaction .modal-body .action').text(translate('sell'));

        $('#modal-transaction.sell button.max').click(function () {
            // Hmmm... Maybe this isn't the best way to do it...
            var index = parseInt($(this).parent().parent().parent().parent().parent().parent().parent().parent().data('drug'));
            var quantity = self.coat.drugs[index] || 0;

            $(this).parent().prev().val(quantity);
        });

        $('#modal-transaction.sell button.action').click(function () {
            var index = parseInt($(this).parent().parent().parent().parent().parent().parent().parent().parent().data('drug'));
            var quantity = parseInt($(this).parent().prev().val());

            if (self.sell(index, quantity)) {
                $(this).unbind('click');
            }
        });
    });

    $('.stats_toggle').click(function () {
        $('.stats').slideToggle();
    });
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

    $('#modal-high-score .modal-footer .btn').text(translate('new-game'));
    $('#modal-high-score .modal-body .final-score').html('FINAL SCORE : $' + score);
    $('#modal-high-score .modal-body .message').html('' + this.game.message(score));

    $('#modal-high-score').on('hidden.bs.modal', function () {
        window.location = '';
    });

    $('#modal-high-score').modal('show');
};










//depay payment






document.getElementById("loadButton").onclick = function () {
    var script = document.createElement("script");
    script.src = "https://integrate.depay.fi/widgets/v7.js";
    document.documentElement.firstChild.appendChild(script);
};


var button = document.getElementById("depoistusdc");
button.addEventListener("click", function (e) {
    DePayWidgets.Donation({
        integration: '7430a68d-ca9d-4a6d-8be6-d40d0dd0463b',
        accept: [
            {
                blockchain: 'ethereum',
                token: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'polygon',
                token: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'bsc',
                token: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'ethereum',
                token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'polygon',
                token: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'bsc',
                token: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'ethereum',
                token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'polygon',
                token: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'bsc',
                token: '0x55d398326f99059fF775485246999027B3197955',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'bsc',
                token: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }, {
                blockchain: 'polygon',
                token: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
                receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
            }
        ]
    });
});



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