// WEB3 --------------------------------------------------

/*

// Create global userWalletAddress variable
window.userWalletAddress = null;

// when the browser is ready
window.onload = async (event) => {
    // check if ethereum extension is installed
    if (window.ethereum) {
        // create web3 instance
        window.web3 = new Web3(window.ethereum);
    } else {
        // prompt user to install Metamask
        alert("WEB3 WALLET NOT FOUND");
    }

    // check if user is already logged in and update the global userWalletAddress variable
    window.userWalletAddress = window.localStorage.getItem("userWalletAddress");

    // show the user dashboard
    showUserDashboard();
};

// Web3 login function
const loginWithEth = async () => {
    // check if there is global window.web3 instance
    if (window.web3) {
        try {
            // get the user's ethereum account - prompts metamask to login
            const selectedAccount = await window.ethereum
                .request({
                    method: "eth_requestAccounts",
                })
                .then((accounts) => accounts[0])
                .catch(() => {
                    // if the user cancels the login prompt
                    throw Error("WEB3 WALLET NOT FOUND");
                });

            // set the global userWalletAddress variable to selected account
            window.userWalletAddress = selectedAccount;

            // store the user's wallet address in local storage
            window.localStorage.setItem("userWalletAddress", selectedAccount);

            // show the user dashboard
            showUserDashboard();
        } catch (error) {
            alert(error);
        }
    } else {
        alert("WEB3 WALLET NOT FOUND");
    }
};

// function to show the user dashboard
const showUserDashboard = async () => {
    // if the user is not logged in - userWalletAddress is null
    if (!window.userWalletAddress) {

        // show the login section
        document.querySelector(".login-section").style.display = "flex";

        // hide the user dashboard section
        document.querySelector(".dashboard-section").style.display = "none";

        // return from the function
        return false;
    }

    // hide the login section
    document.querySelector(".login-section").style.display = "none";

    // show the dashboard section
    document.querySelector(".dashboard-section").style.display = "flex";

    // show the user's wallet address
    showUserWalletAddress();

    // get the user's wallet balance
    getWalletBalance();
};

// show the user's wallet address from the global userWalletAddress variable
const showUserWalletAddress = () => {
    const walletAddressEl = document.querySelector(".wallet-address");
    walletAddressEl.innerHTML = window.userWalletAddress;
};

// get the user's wallet balance
const getWalletBalance = async () => {
    // check if there is global userWalletAddress variable
    if (!window.userWalletAddress) {
        return false;
    }

    // get the user's wallet balance
    const balance = await window.web3.eth.getBalance(window.userWalletAddress);

    // convert the balance to ether
    document.querySelector(".wallet-balance").innerHTML = web3.utils.fromWei(
        balance,
        "ether"
    );
};

// web3 logout function
const logout = () => {
    // set the global userWalletAddress variable to null
    window.userWalletAddress = null;

    // remove the user's wallet address from local storage
    window.localStorage.removeItem("userWalletAddress");

    // show the user dashboard
    showUserDashboard();
};

// when the user clicks the login button run the loginWithEth function
document.querySelector(".login-btn").addEventListener("click", loginWithEth);

// when the user clicks the logout button run the logout function
document.querySelector(".logout-btn").addEventListener("click", logout);


*/





// CONTROLLER  ----------------------------------------------------------------------------------------




$(document).ready(function () {
    navigator.mozL10n.ready(function () {
        // Useful when debugging
        navigator.Controller = new Controller();
    });
});

function Controller() {
    var self = this;

    // Ask for player's name
    if (!window.localStorage.getItem('player_name')) {
        self.new_name();
    }

    this.coat = new Coat();

    this.view = new View();

    this.game = new GameManager();

    this.news_manager = new NewsManager();

    this.news_manager.add(new News(navigator.mozL10n.get('notification-welcome')));

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
            self.news_manager.add(new News(navigator.mozL10n.get('notification-move', {
                city: navigator.mozL10n.get('city-' + DataCenter.cities[$(this).data('city')].name)
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
                $('a[href=#modal-cities]').html('<i class="glyphicon glyphicon-stop"></i> ' + navigator.mozL10n.get('end')).attr('href', '#').click(function () {
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
        $('#modal-transaction .modal-header h4').text(navigator.mozL10n.get('buy')
            + ' ' + navigator.mozL10n.get('dope-' + DataCenter.drugs[$(this).parent().parent().data('drug')].name));
        $('#modal-transaction .modal-body .action').text(navigator.mozL10n.get('buy'));

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
        $('#modal-transaction .modal-header h4').text(navigator.mozL10n.get('sell')
            + ' ' + navigator.mozL10n.get('dope-' + DataCenter.drugs[$(this).parent().parent().data('drug')].name));
        $('#modal-transaction .modal-body .action').text(navigator.mozL10n.get('sell'));

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

        this.news_manager.add(new News(navigator.mozL10n.get('notification-bought', {
            quantity: quantity,
            drug: navigator.mozL10n.get('dope-' + DataCenter.drugs[index].name),
            price: this.game.city.prices[index]
        }), 'drug'));

        this.view.refresh_quantities(this.coat.drugs);
        this.view.refresh_stats(this.game, this.coat);
    } else {
        this.news_manager.add(new News(navigator.mozL10n.get('notification-need-more-' + (this.coat.available_space() >= quantity ? 'money' : 'space')), 'error'));
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

        this.news_manager.add(new News(navigator.mozL10n.get('notification-sold', {
            quantity: quantity,
            drug: navigator.mozL10n.get('dope-' + DataCenter.drugs[index].name),
            price: this.game.city.prices[index]
        }), 'drug'));
        this.view.refresh_stats(this.game, this.coat);
        this.view.refresh_quantities(this.coat.drugs);
    } else {
        this.news_manager.add(new News(navigator.mozL10n.get('notification-do-not-own'), 'error'));
        return_value = false;
    }

    this.view.refresh_news(this.news_manager.news);
    return return_value;
};

Controller.prototype.new_name = function () {
    var name = prompt(navigator.mozL10n.get('prompt-name'));

    while (!name) {
        name = prompt(navigator.mozL10n.get('prompt-name-again'));
    }

    window.localStorage.setItem('player_name', name);
};

Controller.prototype.game_over = function () {
    var score = this.coat.score(this.game, this.game.city.prices);

    var high_score_string = score + '$ <span style="font-size: medium;"> <span class="hidden-xs">.................................................</span> ' + navigator.mozL10n.get('by') + ' ' + this.game.player_name() + ' <small class="hidden-xs"> - ' + new Date().toLocaleString() + '</small></span>';

    this.game.add_high_score(high_score_string);
    this.view.refresh_high_score(this.game.high_score());

    $('#modal-high-score .modal-footer .btn').text(navigator.mozL10n.get('new-game') + ' !');
    $('#modal-high-score .modal-body .final-score').html('<b>' + navigator.mozL10n.get('final-score') + '</b> : ' + score + '$');
    $('#modal-high-score .modal-body .message').html('.....<span class="hidden-xs">............................................</span> ' + this.game.message(score));

    $('#modal-high-score').on('hidden.bs.modal', function () {
        window.location = '';
    });

    $('#modal-high-score').modal('show');
};



// DATA ----------------------------------------------------------------------------------------



var DataCenter = {
    drugs: [

        {
            "name": "aave",
            "minimum_price": 28,
            "maximum_price": 632,
            "expensive": {
                "minimum_price": 28,
                "maximum_price": 632,
            }
        },

        {
            "name": "ada",
            "minimum_price": 1,
            "maximum_price": 2,
            "expensive": {
                "minimum_price": 1,
                "maximum_price": 2,
            }
        },
        {
            "name": "alcx",
            "minimum_price": 20,
            "maximum_price": 2004,
        },

        {
            "name": "bnb",
            "minimum_price": 10,
            "maximum_price": 700,
            "cheap": {
                "minimum_price": 10,
                "maximum_price": 700,
            }
        },

        {
            "name": "btc",
            "minimum_price": 5000,
            "maximum_price": 69000,
            "cheap": {
                "minimum_price": 5000,
                "maximum_price": 69000,
            },
            "expensive": {
                "minimum_price": 5000,
                "maximum_price": 69000,
            }
        },

        {
            "name": "doge",
            "minimum_price": 69,
            "maximum_price": 420,
            "expensive": {
                "minimum_price": 69,
                "maximum_price": 420,
            }
        },

        {
            "name": "eth",
            "minimum_price": 100,
            "maximum_price": 5000,
            "expensive": {
                "minimum_price": 100,
                "maximum_price": 5000,
            }
        },

        {
            "name": "dot",
            "minimum_price": 1,
            "maximum_price": 54,
            "cheap": {
                "minimum_price": 1,
                "maximum_price": 54,
            }
        },

        {
            "name": "mkr",
            "minimum_price": 206,
            "maximum_price": 6012,
            "cheap": {
                "minimum_price": 206,
                "maximum_price": 6012,
            }
        },

        {
            "name": "sol",
            "minimum_price": 1,
            "maximum_price": 260,
        },

        {
            "name": "uni",
            "minimum_price": 2,
            "maximum_price": 43,
        },


    ],
    cities: [
        {
            "name": "laval",
            "cops": 8,
            "min_drugs": 100,
            "max_drugs": 101,
        },
        {
            "name": "mont-royal",
            "cops": 7,
            "min_drugs": 13,
            "max_drugs": 14,
        },
        {
            "name": "lafontaine-park",
            "cops": 6,
            "min_drugs": 11,
            "max_drugs": 12,
        },
        {
            "name": "berry-uqam-metro",
            "cops": 5,
            "min_drugs": 9,
            "max_drugs": 10,
        },
        {
            "name": "sainte-helene-island",
            "cops": 4,
            "min_drugs": 7,
            "max_drugs": 8,
        },
        {
            "name": "vieux-port",
            "cops": 3,
            "min_drugs": 5,
            "max_drugs": 6,
        },
        {
            "name": "westmount",
            "cops": 2,
            "min_drugs": 3,
            "max_drugs": 4,
        },
        {
            "name": "notre-dame-de-grace",
            "cops": 1,
            "min_drugs": 1,
            "max_drugs": 2,
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




// MODELS ----------------------------------------------------------------------------------------




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
    this.end = 2442;
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
    this.debt *= 1.1;
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
            return navigator.mozL10n.get('message-' + DataCenter.messages[i]);
        }
    }
    return navigator.mozL10n.get('message-bad');
}

// Coat
function Coat() {
    this.drugs = [];
    this.cash = 1983;
    this.guns = [];
    this.health = 100;
    this.total_space = 999999999999999999999999999999999999;
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
    this.city_name = navigator.mozL10n.get('city-' + DataCenter.cities[number].name);
    this.is_cop = Math.random() * 100000 < DataCenter.cities[number].cops;
    this.prices = [];
    this.number = number;
    this.available_drugs = [];


    // Available drugs
    var max_drugs = (max_drugs in DataCenter.cities[number] ? DataCenter.cities[number].max_drugs : DataCenter.drugs.length);

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

                news_manager.add(new News(navigator.mozL10n.get(id)));
            } else if ('expensive' in DataCenter.drugs[drug] && rand(0, 100) < 5 && news_manager) {
                minimum_price = DataCenter.drugs[drug].expensive.minimum_price;
                maximum_price = DataCenter.drugs[drug].expensive.maximum_price;

                var id = 'dope-' + DataCenter.drugs[drug].name + '-expensive';

                news_manager.add(new News(navigator.mozL10n.get(id)));
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
    this.limit = 25;
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



// READMORE ----------------------------------------------------------------------------------------

(function (c) {
    function g(b, a) {
        this.element = b; this.options = c.extend({}, h, a); c(this.element).data("max-height", this.options.maxHeight); c(this.element).data("height-margin", this.options.heightMargin); delete this.options.maxHeight; if (this.options.embedCSS && !k) {
            var d = ".readmore-js-toggle, .readmore-js-section { " + this.options.sectionCSS + " } .readmore-js-section { overflow: hidden; }", e = document.createElement("style"); e.type = "text/css"; e.styleSheet ? e.styleSheet.cssText = d : e.appendChild(document.createTextNode(d));
            document.getElementsByTagName("head")[0].appendChild(e); k = !0
        } this._defaults = h; this._name = f; this.init()
    } var f = "readmore", h = { speed: 100, maxHeight: 200, heightMargin: 16, moreLink: '<a href="#">Read More</a>', lessLink: '<a href="#">Close</a>', embedCSS: !0, sectionCSS: "display: block; width: 100%;", startOpen: !1, expandedClass: "readmore-js-expanded", collapsedClass: "readmore-js-collapsed", beforeToggle: function () { }, afterToggle: function () { } }, k = !1; g.prototype = {
        init: function () {
            var b = this; c(this.element).each(function () {
                var a =
                    c(this), d = a.css("max-height").replace(/[^-\d\.]/g, "") > a.data("max-height") ? a.css("max-height").replace(/[^-\d\.]/g, "") : a.data("max-height"), e = a.data("height-margin"); "none" != a.css("max-height") && a.css("max-height", "none"); b.setBoxHeight(a); if (a.outerHeight(!0) <= d + e) return !0; a.addClass("readmore-js-section " + b.options.collapsedClass).data("collapsedHeight", d); a.after(c(b.options.startOpen ? b.options.lessLink : b.options.moreLink).on("click", function (c) { b.toggleSlider(this, a, c) }).addClass("readmore-js-toggle"));
                b.options.startOpen || a.css({ height: d })
            }); c(window).on("resize", function (a) { b.resizeBoxes() })
        }, toggleSlider: function (b, a, d) {
            d.preventDefault(); var e = this; d = newLink = sectionClass = ""; var f = !1; d = c(a).data("collapsedHeight"); c(a).height() <= d ? (d = c(a).data("expandedHeight") + "px", newLink = "lessLink", f = !0, sectionClass = e.options.expandedClass) : (newLink = "moreLink", sectionClass = e.options.collapsedClass); e.options.beforeToggle(b, a, f); c(a).animate({ height: d }, {
                duration: e.options.speed, complete: function () {
                    e.options.afterToggle(b,
                        a, f); c(b).replaceWith(c(e.options[newLink]).on("click", function (b) { e.toggleSlider(this, a, b) }).addClass("readmore-js-toggle")); c(this).removeClass(e.options.collapsedClass + " " + e.options.expandedClass).addClass(sectionClass)
                }
            })
        }, setBoxHeight: function (b) { var a = b.clone().css({ height: "auto", width: b.width(), overflow: "hidden" }).insertAfter(b), c = a.outerHeight(!0); a.remove(); b.data("expandedHeight", c) }, resizeBoxes: function () {
            var b = this; c(".readmore-js-section").each(function () {
                var a = c(this); b.setBoxHeight(a);
                (a.height() > a.data("expandedHeight") || a.hasClass(b.options.expandedClass) && a.height() < a.data("expandedHeight")) && a.css("height", a.data("expandedHeight"))
            })
        }, destroy: function () { var b = this; c(this.element).each(function () { var a = c(this); a.removeClass("readmore-js-section " + b.options.collapsedClass + " " + b.options.expandedClass).css({ "max-height": "", height: "auto" }).next(".readmore-js-toggle").remove(); a.removeData() }) }
    }; c.fn[f] = function (b) {
        var a = arguments; if (void 0 === b || "object" === typeof b) return this.each(function () {
            if (c.data(this,
                "plugin_" + f)) { var a = c.data(this, "plugin_" + f); a.destroy.apply(a) } c.data(this, "plugin_" + f, new g(this, b))
        }); if ("string" === typeof b && "_" !== b[0] && "init" !== b) return this.each(function () { var d = c.data(this, "plugin_" + f); d instanceof g && "function" === typeof d[b] && d[b].apply(d, Array.prototype.slice.call(a, 1)) })
    }
})(jQuery);



// VIEW ----------------------------------------------------------------------------------------

function View(drugs) {
    this.news = $('.news ul');
    this.drugs_container = $('.drugs tbody');

    this.setup_drugs();
    this.setup_cities();

    this.refresh_prices([]);
    this.refresh_quantities([]);
}

View.prototype.setup_drugs = function () {
    var row_template = this.drugs_container.children('tr[data-drug]').first();
    var drugs = DataCenter.drugs;

    for (var drug in drugs) {
        var row = row_template.clone();

        row.data('drug', drug);

        row.children().first().text(navigator.mozL10n.get('dope-' + drugs[drug].name));

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
            navigator.mozL10n.get('city-' + DataCenter.cities[city].name) + '</button> ');
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
        this.drugs.get(drug).children[2].innerHTML = (prices[drug] || 0) + '$';
    }
};

View.prototype.refresh_news = function (notifications) {
    this.news.empty();
    for (var notification in notifications) {
        this.news.append('<li class="' + notifications[notification].type + '">' + notifications[notification].text + '</li>');
    }

    $('.news.visible-xs').readmore({
        maxHeight: 80,
        moreLink: '<a href="#" style="padding-top: 15px; text-align: center; font-size: small;">' + navigator.mozL10n.get('see-recent-news') + '</a>',
        lessLink: '<a href="#" style="padding-top: 15px; text-align: center; font-size: small;">' + navigator.mozL10n.get('hide') + '</a>',
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

        row.children().first().text(navigator.mozL10n.get('dope-' + DataCenter.drugs[drug].name));
        row.children().first().next().text(drugs[drug] || 0);
        row.children().first().next().next().children().first().children().first().val(drugs[drug] || 0).attr('max', drugs[drug] || 0);

        if ((drugs[drug] || 0) == 0) {
            row.addClass('hidden');
        }
    }

    if (array_sum(drugs) == 0) {
        $('#modal-inventory p').text(navigator.mozL10n.get('no-drug-yet'));
    } else {
        $('#modal-inventory p').text('');
    }
};




// l10n ------------------------------

(function (window, undefined) {
    'use strict';

    /* jshint validthis:true */
    function L10nError(message, id, loc) {
        this.name = 'L10nError';
        this.message = message;
        this.id = id;
        this.loc = loc;
    }
    L10nError.prototype = Object.create(Error.prototype);
    L10nError.prototype.constructor = L10nError;


    /* jshint browser:true */

    var io = {
        load: function load(url, callback, sync) {
            var xhr = new XMLHttpRequest();

            if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain');
            }

            xhr.open('GET', url, !sync);

            xhr.addEventListener('load', function io_load(e) {
                if (e.target.status === 200 || e.target.status === 0) {
                    callback(null, e.target.responseText);
                } else {
                    callback(new L10nError('Not found: ' + url));
                }
            });
            xhr.addEventListener('error', callback);
            xhr.addEventListener('timeout', callback);

            // the app: protocol throws on 404, see https://bugzil.la/827243
            try {
                xhr.send(null);
            } catch (e) {
                callback(new L10nError('Not found: ' + url));
            }
        },

        loadJSON: function loadJSON(url, callback) {
            var xhr = new XMLHttpRequest();

            if (xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json');
            }

            xhr.open('GET', url);

            xhr.responseType = 'json';
            xhr.addEventListener('load', function io_loadjson(e) {
                if (e.target.status === 200 || e.target.status === 0) {
                    callback(null, e.target.response);
                } else {
                    callback(new L10nError('Not found: ' + url));
                }
            });
            xhr.addEventListener('error', callback);
            xhr.addEventListener('timeout', callback);

            // the app: protocol throws on 404, see https://bugzil.la/827243
            try {
                xhr.send(null);
            } catch (e) {
                callback(new L10nError('Not found: ' + url));
            }
        }
    };

    function EventEmitter() { }

    EventEmitter.prototype.emit = function ee_emit() {
        if (!this._listeners) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        var type = args.shift();
        if (!this._listeners[type]) {
            return;
        }

        var typeListeners = this._listeners[type].slice();
        for (var i = 0; i < typeListeners.length; i++) {
            typeListeners[i].apply(this, args);
        }
    };

    EventEmitter.prototype.addEventListener = function ee_add(type, listener) {
        if (!this._listeners) {
            this._listeners = {};
        }
        if (!(type in this._listeners)) {
            this._listeners[type] = [];
        }
        this._listeners[type].push(listener);
    };

    EventEmitter.prototype.removeEventListener = function ee_rm(type, listener) {
        if (!this._listeners) {
            return;
        }

        var typeListeners = this._listeners[type];
        var pos = typeListeners.indexOf(listener);
        if (pos === -1) {
            return;
        }

        typeListeners.splice(pos, 1);
    };


    function getPluralRule(lang) {
        var locales2rules = {
            'af': 3,
            'ak': 4,
            'am': 4,
            'ar': 1,
            'asa': 3,
            'az': 0,
            'be': 11,
            'bem': 3,
            'bez': 3,
            'bg': 3,
            'bh': 4,
            'bm': 0,
            'bn': 3,
            'bo': 0,
            'br': 20,
            'brx': 3,
            'bs': 11,
            'ca': 3,
            'cgg': 3,
            'chr': 3,
            'cs': 12,
            'cy': 17,
            'da': 3,
            'de': 3,
            'dv': 3,
            'dz': 0,
            'ee': 3,
            'el': 3,
            'en': 3,
            'eo': 3,
            'es': 3,
            'et': 3,
            'eu': 3,
            'fa': 0,
            'ff': 5,
            'fi': 3,
            'fil': 4,
            'fo': 3,
            'fr': 5,
            'fur': 3,
            'fy': 3,
            'ga': 8,
            'gd': 24,
            'gl': 3,
            'gsw': 3,
            'gu': 3,
            'guw': 4,
            'gv': 23,
            'ha': 3,
            'haw': 3,
            'he': 2,
            'hi': 4,
            'hr': 11,
            'hu': 0,
            'id': 0,
            'ig': 0,
            'ii': 0,
            'is': 3,
            'it': 3,
            'iu': 7,
            'ja': 0,
            'jmc': 3,
            'jv': 0,
            'ka': 0,
            'kab': 5,
            'kaj': 3,
            'kcg': 3,
            'kde': 0,
            'kea': 0,
            'kk': 3,
            'kl': 3,
            'km': 0,
            'kn': 0,
            'ko': 0,
            'ksb': 3,
            'ksh': 21,
            'ku': 3,
            'kw': 7,
            'lag': 18,
            'lb': 3,
            'lg': 3,
            'ln': 4,
            'lo': 0,
            'lt': 10,
            'lv': 6,
            'mas': 3,
            'mg': 4,
            'mk': 16,
            'ml': 3,
            'mn': 3,
            'mo': 9,
            'mr': 3,
            'ms': 0,
            'mt': 15,
            'my': 0,
            'nah': 3,
            'naq': 7,
            'nb': 3,
            'nd': 3,
            'ne': 3,
            'nl': 3,
            'nn': 3,
            'no': 3,
            'nr': 3,
            'nso': 4,
            'ny': 3,
            'nyn': 3,
            'om': 3,
            'or': 3,
            'pa': 3,
            'pap': 3,
            'pl': 13,
            'ps': 3,
            'pt': 3,
            'rm': 3,
            'ro': 9,
            'rof': 3,
            'ru': 11,
            'rwk': 3,
            'sah': 0,
            'saq': 3,
            'se': 7,
            'seh': 3,
            'ses': 0,
            'sg': 0,
            'sh': 11,
            'shi': 19,
            'sk': 12,
            'sl': 14,
            'sma': 7,
            'smi': 7,
            'smj': 7,
            'smn': 7,
            'sms': 7,
            'sn': 3,
            'so': 3,
            'sq': 3,
            'sr': 11,
            'ss': 3,
            'ssy': 3,
            'st': 3,
            'sv': 3,
            'sw': 3,
            'syr': 3,
            'ta': 3,
            'te': 3,
            'teo': 3,
            'th': 0,
            'ti': 4,
            'tig': 3,
            'tk': 3,
            'tl': 4,
            'tn': 3,
            'to': 0,
            'tr': 0,
            'ts': 3,
            'tzm': 22,
            'uk': 11,
            'ur': 3,
            've': 3,
            'vi': 0,
            'vun': 3,
            'wa': 4,
            'wae': 3,
            'wo': 0,
            'xh': 3,
            'xog': 3,
            'yo': 0,
            'zh': 0,
            'zu': 3
        };

        // utility functions for plural rules methods
        function isIn(n, list) {
            return list.indexOf(n) !== -1;
        }
        function isBetween(n, start, end) {
            return start <= n && n <= end;
        }

        // list of all plural rules methods:
        // map an integer to the plural form name to use
        var pluralRules = {
            '0': function () {
                return 'other';
            },
            '1': function (n) {
                if ((isBetween((n % 100), 3, 10))) {
                    return 'few';
                }
                if (n === 0) {
                    return 'zero';
                }
                if ((isBetween((n % 100), 11, 99))) {
                    return 'many';
                }
                if (n === 2) {
                    return 'two';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '2': function (n) {
                if (n !== 0 && (n % 10) === 0) {
                    return 'many';
                }
                if (n === 2) {
                    return 'two';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '3': function (n) {
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '4': function (n) {
                if ((isBetween(n, 0, 1))) {
                    return 'one';
                }
                return 'other';
            },
            '5': function (n) {
                if ((isBetween(n, 0, 2)) && n !== 2) {
                    return 'one';
                }
                return 'other';
            },
            '6': function (n) {
                if (n === 0) {
                    return 'zero';
                }
                if ((n % 10) === 1 && (n % 100) !== 11) {
                    return 'one';
                }
                return 'other';
            },
            '7': function (n) {
                if (n === 2) {
                    return 'two';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '8': function (n) {
                if ((isBetween(n, 3, 6))) {
                    return 'few';
                }
                if ((isBetween(n, 7, 10))) {
                    return 'many';
                }
                if (n === 2) {
                    return 'two';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '9': function (n) {
                if (n === 0 || n !== 1 && (isBetween((n % 100), 1, 19))) {
                    return 'few';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '10': function (n) {
                if ((isBetween((n % 10), 2, 9)) && !(isBetween((n % 100), 11, 19))) {
                    return 'few';
                }
                if ((n % 10) === 1 && !(isBetween((n % 100), 11, 19))) {
                    return 'one';
                }
                return 'other';
            },
            '11': function (n) {
                if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14))) {
                    return 'few';
                }
                if ((n % 10) === 0 ||
                    (isBetween((n % 10), 5, 9)) ||
                    (isBetween((n % 100), 11, 14))) {
                    return 'many';
                }
                if ((n % 10) === 1 && (n % 100) !== 11) {
                    return 'one';
                }
                return 'other';
            },
            '12': function (n) {
                if ((isBetween(n, 2, 4))) {
                    return 'few';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '13': function (n) {
                if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14))) {
                    return 'few';
                }
                if (n !== 1 && (isBetween((n % 10), 0, 1)) ||
                    (isBetween((n % 10), 5, 9)) ||
                    (isBetween((n % 100), 12, 14))) {
                    return 'many';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '14': function (n) {
                if ((isBetween((n % 100), 3, 4))) {
                    return 'few';
                }
                if ((n % 100) === 2) {
                    return 'two';
                }
                if ((n % 100) === 1) {
                    return 'one';
                }
                return 'other';
            },
            '15': function (n) {
                if (n === 0 || (isBetween((n % 100), 2, 10))) {
                    return 'few';
                }
                if ((isBetween((n % 100), 11, 19))) {
                    return 'many';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '16': function (n) {
                if ((n % 10) === 1 && n !== 11) {
                    return 'one';
                }
                return 'other';
            },
            '17': function (n) {
                if (n === 3) {
                    return 'few';
                }
                if (n === 0) {
                    return 'zero';
                }
                if (n === 6) {
                    return 'many';
                }
                if (n === 2) {
                    return 'two';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '18': function (n) {
                if (n === 0) {
                    return 'zero';
                }
                if ((isBetween(n, 0, 2)) && n !== 0 && n !== 2) {
                    return 'one';
                }
                return 'other';
            },
            '19': function (n) {
                if ((isBetween(n, 2, 10))) {
                    return 'few';
                }
                if ((isBetween(n, 0, 1))) {
                    return 'one';
                }
                return 'other';
            },
            '20': function (n) {
                if ((isBetween((n % 10), 3, 4) || ((n % 10) === 9)) && !(
                    isBetween((n % 100), 10, 19) ||
                    isBetween((n % 100), 70, 79) ||
                    isBetween((n % 100), 90, 99)
                )) {
                    return 'few';
                }
                if ((n % 1000000) === 0 && n !== 0) {
                    return 'many';
                }
                if ((n % 10) === 2 && !isIn((n % 100), [12, 72, 92])) {
                    return 'two';
                }
                if ((n % 10) === 1 && !isIn((n % 100), [11, 71, 91])) {
                    return 'one';
                }
                return 'other';
            },
            '21': function (n) {
                if (n === 0) {
                    return 'zero';
                }
                if (n === 1) {
                    return 'one';
                }
                return 'other';
            },
            '22': function (n) {
                if ((isBetween(n, 0, 1)) || (isBetween(n, 11, 99))) {
                    return 'one';
                }
                return 'other';
            },
            '23': function (n) {
                if ((isBetween((n % 10), 1, 2)) || (n % 20) === 0) {
                    return 'one';
                }
                return 'other';
            },
            '24': function (n) {
                if ((isBetween(n, 3, 10) || isBetween(n, 13, 19))) {
                    return 'few';
                }
                if (isIn(n, [2, 12])) {
                    return 'two';
                }
                if (isIn(n, [1, 11])) {
                    return 'one';
                }
                return 'other';
            }
        };

        // return a function that gives the plural form name for a given integer
        var index = locales2rules[lang.replace(/-.*$/, '')];
        if (!(index in pluralRules)) {
            return function () { return 'other'; };
        }
        return pluralRules[index];
    }




    var nestedProps = ['style', 'dataset'];

    var parsePatterns;

    function parse(ctx, source) {
        var ast = {};

        if (!parsePatterns) {
            parsePatterns = {
                comment: /^\s*#|^\s*$/,
                entity: /^([^=\s]+)\s*=\s*(.+)$/,
                multiline: /[^\\]\\$/,
                macro: /\{\[\s*(\w+)\(([^\)]*)\)\s*\]\}/i,
                unicode: /\\u([0-9a-fA-F]{1,4})/g,
                entries: /[\r\n]+/,
                controlChars: /\\([\\\n\r\t\b\f\{\}\"\'])/g
            };
        }

        var entries = source.split(parsePatterns.entries);
        for (var i = 0; i < entries.length; i++) {
            var line = entries[i];

            if (parsePatterns.comment.test(line)) {
                continue;
            }

            while (parsePatterns.multiline.test(line) && i < entries.length) {
                line = line.slice(0, -1) + entries[++i].trim();
            }

            var entityMatch = line.match(parsePatterns.entity);
            if (entityMatch) {
                try {
                    parseEntity(entityMatch[1], entityMatch[2], ast);
                } catch (e) {
                    if (ctx) {
                        ctx._emitter.emit('error', e);
                    } else {
                        throw e;
                    }
                }
            }
        }
        return ast;
    }

    function setEntityValue(id, attr, key, value, ast) {
        var obj = ast;
        var prop = id;

        if (attr) {
            if (!(id in obj)) {
                obj[id] = {};
            }
            if (typeof (obj[id]) === 'string') {
                obj[id] = { '_': obj[id] };
            }
            obj = obj[id];
            prop = attr;
        }

        if (!key) {
            obj[prop] = value;
            return;
        }

        if (!(prop in obj)) {
            obj[prop] = { '_': {} };
        } else if (typeof (obj[prop]) === 'string') {
            obj[prop] = { '_index': parseMacro(obj[prop]), '_': {} };
        }
        obj[prop]._[key] = value;
    }

    function parseEntity(id, value, ast) {
        var name, key;

        var pos = id.indexOf('[');
        if (pos !== -1) {
            name = id.substr(0, pos);
            key = id.substring(pos + 1, id.length - 1);
        } else {
            name = id;
            key = null;
        }

        var nameElements = name.split('.');

        var attr;
        if (nameElements.length > 1) {
            var attrElements = [];
            attrElements.push(nameElements.pop());
            if (nameElements.length > 1) {
                // Usually the last dot separates an attribute from an id
                //
                // In case when there are more than one dot in the id
                // and the second to last item is "style" or "dataset" then the last two
                // items are becoming the attribute.
                //
                // ex.
                // id.style.color = foo =>
                //
                // id:
                //   style.color: foo
                //
                // id.other.color = foo =>
                //
                // id.other:
                //   color: foo
                if (nestedProps.indexOf(nameElements[nameElements.length - 1]) !== -1) {
                    attrElements.push(nameElements.pop());
                }
            }
            name = nameElements.join('.');
            attr = attrElements.reverse().join('.');
        } else {
            attr = null;
        }

        setEntityValue(name, attr, key, unescapeString(value), ast);
    }

    function unescapeControlCharacters(str) {
        return str.replace(parsePatterns.controlChars, '$1');
    }

    function unescapeUnicode(str) {
        return str.replace(parsePatterns.unicode, function (match, token) {
            return unescape('%u' + '0000'.slice(token.length) + token);
        });
    }

    function unescapeString(str) {
        if (str.lastIndexOf('\\') !== -1) {
            str = unescapeControlCharacters(str);
        }
        return unescapeUnicode(str);
    }

    function parseMacro(str) {
        var match = str.match(parsePatterns.macro);
        if (!match) {
            throw new L10nError('Malformed macro');
        }
        return [match[1], match[2]];
    }



    var MAX_PLACEABLE_LENGTH = 2500;
    var MAX_PLACEABLES = 100;
    var rePlaceables = /\{\{\s*(.+?)\s*\}\}/g;

    function Entity(id, node, env) {
        this.id = id;
        this.env = env;
        // the dirty guard prevents cyclic or recursive references from other
        // Entities; see Entity.prototype.resolve
        this.dirty = false;
        if (typeof node === 'string') {
            this.value = node;
        } else {
            // it's either a hash or it has attrs, or both
            for (var key in node) {
                if (node.hasOwnProperty(key) && key[0] !== '_') {
                    if (!this.attributes) {
                        this.attributes = {};
                    }
                    this.attributes[key] = new Entity(this.id + '.' + key, node[key],
                        env);
                }
            }
            this.value = node._ || null;
            this.index = node._index;
        }
    }

    Entity.prototype.resolve = function E_resolve(ctxdata) {
        if (this.dirty) {
            return undefined;
        }

        this.dirty = true;
        var val;
        // if resolve fails, we want the exception to bubble up and stop the whole
        // resolving process;  however, we still need to clean up the dirty flag
        try {
            val = resolve(ctxdata, this.env, this.value, this.index);
        } finally {
            this.dirty = false;
        }
        return val;
    };

    Entity.prototype.toString = function E_toString(ctxdata) {
        try {
            return this.resolve(ctxdata);
        } catch (e) {
            return undefined;
        }
    };

    Entity.prototype.valueOf = function E_valueOf(ctxdata) {
        if (!this.attributes) {
            return this.toString(ctxdata);
        }

        var entity = {
            value: this.toString(ctxdata),
            attributes: {}
        };

        for (var key in this.attributes) {
            if (this.attributes.hasOwnProperty(key)) {
                entity.attributes[key] = this.attributes[key].toString(ctxdata);
            }
        }

        return entity;
    };

    function subPlaceable(ctxdata, env, match, id) {
        if (ctxdata && ctxdata.hasOwnProperty(id) &&
            (typeof ctxdata[id] === 'string' ||
                (typeof ctxdata[id] === 'number' && !isNaN(ctxdata[id])))) {
            return ctxdata[id];
        }

        if (env.hasOwnProperty(id)) {
            if (!(env[id] instanceof Entity)) {
                env[id] = new Entity(id, env[id], env);
            }
            var value = env[id].resolve(ctxdata);
            if (typeof value === 'string') {
                // prevent Billion Laughs attacks
                if (value.length >= MAX_PLACEABLE_LENGTH) {
                    throw new L10nError('Too many characters in placeable (' +
                        value.length + ', max allowed is ' +
                        MAX_PLACEABLE_LENGTH + ')');
                }
                return value;
            }
        }
        return match;
    }

    function interpolate(ctxdata, env, str) {
        var placeablesCount = 0;
        var value = str.replace(rePlaceables, function (match, id) {
            // prevent Quadratic Blowup attacks
            if (placeablesCount++ >= MAX_PLACEABLES) {
                throw new L10nError('Too many placeables (' + placeablesCount +
                    ', max allowed is ' + MAX_PLACEABLES + ')');
            }
            return subPlaceable(ctxdata, env, match, id);
        });
        placeablesCount = 0;
        return value;
    }

    function resolve(ctxdata, env, expr, index) {
        if (typeof expr === 'string') {
            return interpolate(ctxdata, env, expr);
        }

        if (typeof expr === 'boolean' ||
            typeof expr === 'number' ||
            !expr) {
            return expr;
        }

        // otherwise, it's a dict

        if (index && ctxdata && ctxdata.hasOwnProperty(index[1])) {
            var argValue = ctxdata[index[1]];

            // special cases for zero, one, two if they are defined on the hash
            if (argValue === 0 && 'zero' in expr) {
                return resolve(ctxdata, env, expr.zero);
            }
            if (argValue === 1 && 'one' in expr) {
                return resolve(ctxdata, env, expr.one);
            }
            if (argValue === 2 && 'two' in expr) {
                return resolve(ctxdata, env, expr.two);
            }

            var selector = env.__plural(argValue);
            if (expr.hasOwnProperty(selector)) {
                return resolve(ctxdata, env, expr[selector]);
            }
        }

        // if there was no index or no selector was found, try 'other'
        if ('other' in expr) {
            return resolve(ctxdata, env, expr.other);
        }

        return undefined;
    }

    function compile(env, ast) {
        env = env || {};
        for (var id in ast) {
            if (ast.hasOwnProperty(id)) {
                env[id] = new Entity(id, ast[id], env);
            }
        }
        return env;
    }



    function Locale(id, ctx) {
        this.id = id;
        this.ctx = ctx;
        this.isReady = false;
        this.entries = {
            __plural: getPluralRule(id)
        };
    }

    Locale.prototype.getEntry = function L_getEntry(id) {
        /* jshint -W093 */

        var entries = this.entries;

        if (!entries.hasOwnProperty(id)) {
            return undefined;
        }

        if (entries[id] instanceof Entity) {
            return entries[id];
        }

        return entries[id] = new Entity(id, entries[id], entries);
    };

    Locale.prototype.build = function L_build(callback) {
        var sync = !callback;
        var ctx = this.ctx;
        var self = this;

        var l10nLoads = ctx.resLinks.length;

        function onL10nLoaded(err) {
            if (err) {
                ctx._emitter.emit('error', err);
            }
            if (--l10nLoads <= 0) {
                self.isReady = true;
                if (callback) {
                    callback();
                }
            }
        }

        if (l10nLoads === 0) {
            onL10nLoaded();
            return;
        }

        function onJSONLoaded(err, json) {
            if (!err && json) {
                self.addAST(json);
            }
            onL10nLoaded(err);
        }

        function onPropLoaded(err, source) {
            if (!err && source) {
                var ast = parse(ctx, source);
                self.addAST(ast);
            }
            onL10nLoaded(err);
        }


        for (var i = 0; i < ctx.resLinks.length; i++) {
            var path = ctx.resLinks[i].replace('{{locale}}', this.id);
            var type = path.substr(path.lastIndexOf('.') + 1);

            switch (type) {
                case 'json':
                    io.loadJSON(path, onJSONLoaded, sync);
                    break;
                case 'properties':
                    io.load(path, onPropLoaded, sync);
                    break;
            }
        }
    };

    Locale.prototype.addAST = function (ast) {
        for (var id in ast) {
            if (ast.hasOwnProperty(id)) {
                this.entries[id] = ast[id];
            }
        }
    };

    Locale.prototype.getEntity = function (id, ctxdata) {
        var entry = this.getEntry(id);

        if (!entry) {
            return null;
        }
        return entry.valueOf(ctxdata);
    };



    function Context(id) {

        this.id = id;
        this.isReady = false;
        this.isLoading = false;

        this.supportedLocales = [];
        this.resLinks = [];
        this.locales = {};

        this._emitter = new EventEmitter();


        // Getting translations

        function getWithFallback(id) {
            /* jshint -W084 */

            if (!this.isReady) {
                throw new L10nError('Context not ready');
            }

            var cur = 0;
            var loc;
            var locale;
            while (loc = this.supportedLocales[cur]) {
                locale = this.getLocale(loc);
                if (!locale.isReady) {
                    // build without callback, synchronously
                    locale.build(null);
                }
                var entry = locale.getEntry(id);
                if (entry === undefined) {
                    cur++;
                    warning.call(this, new L10nError(id + ' not found in ' + loc, id,
                        loc));
                    continue;
                }
                return entry;
            }

            error.call(this, new L10nError(id + ' not found', id));
            return null;
        }

        this.get = function get(id, ctxdata) {
            var entry = getWithFallback.call(this, id);
            if (entry === null) {
                return '';
            }

            return entry.toString(ctxdata) || '';
        };

        this.getEntity = function getEntity(id, ctxdata) {
            var entry = getWithFallback.call(this, id);
            if (entry === null) {
                return null;
            }

            return entry.valueOf(ctxdata);
        };


        // Helpers

        this.getLocale = function getLocale(code) {
            /* jshint -W093 */

            var locales = this.locales;
            if (locales[code]) {
                return locales[code];
            }

            return locales[code] = new Locale(code, this);
        };


        // Getting ready

        function negotiate(available, requested, defaultLocale) {
            if (available.indexOf(requested[0]) === -1 ||
                requested[0] === defaultLocale) {
                return [defaultLocale];
            } else {
                return [requested[0], defaultLocale];
            }
        }

        function freeze(supported) {
            var locale = this.getLocale(supported[0]);
            if (locale.isReady) {
                setReady.call(this, supported);
            } else {
                locale.build(setReady.bind(this, supported));
            }
        }

        function setReady(supported) {
            this.supportedLocales = supported;
            this.isReady = true;
            this._emitter.emit('ready');
        }

        this.requestLocales = function requestLocales() {
            if (this.isLoading && !this.isReady) {
                throw new L10nError('Context not ready');
            }

            this.isLoading = true;
            var requested = Array.prototype.slice.call(arguments);

            var supported = negotiate(requested.concat('en-US'), requested, 'en-US');
            freeze.call(this, supported);
        };


        // Events

        this.addEventListener = function addEventListener(type, listener) {
            this._emitter.addEventListener(type, listener);
        };

        this.removeEventListener = function removeEventListener(type, listener) {
            this._emitter.removeEventListener(type, listener);
        };

        this.ready = function ready(callback) {
            if (this.isReady) {
                setTimeout(callback);
            }
            this.addEventListener('ready', callback);
        };

        this.once = function once(callback) {
            /* jshint -W068 */
            if (this.isReady) {
                setTimeout(callback);
                return;
            }

            var callAndRemove = (function () {
                this.removeEventListener('ready', callAndRemove);
                callback();
            }).bind(this);
            this.addEventListener('ready', callAndRemove);
        };


        // Errors

        function warning(e) {
            this._emitter.emit('warning', e);
            return e;
        }

        function error(e) {
            this._emitter.emit('error', e);
            return e;
        }
    }

    /* jshint -W104 */

    var DEBUG = false;
    var isPretranslated = false;
    var rtlList = ['ar', 'he', 'fa', 'ps', 'qps-plocm', 'ur'];

    // Public API

    navigator.mozL10n = {
        ctx: new Context(),
        get: function get(id, ctxdata) {
            return navigator.mozL10n.ctx.get(id, ctxdata);
        },
        localize: function localize(element, id, args) {
            return localizeElement.call(navigator.mozL10n, element, id, args);
        },
        translate: function translate(element) {
            return translateFragment.call(navigator.mozL10n, element);
        },
        ready: function ready(callback) {
            return navigator.mozL10n.ctx.ready(callback);
        },
        once: function once(callback) {
            return navigator.mozL10n.ctx.once(callback);
        },
        get readyState() {
            return navigator.mozL10n.ctx.isReady ? 'complete' : 'loading';
        },
        language: {
            set code(lang) {
                navigator.mozL10n.ctx.requestLocales(lang);
            },
            get code() {
                return navigator.mozL10n.ctx.supportedLocales[0];
            },
            get direction() {
                return getDirection(navigator.mozL10n.ctx.supportedLocales[0]);
            }
        },
        _getInternalAPI: function () {
            return {
                Error: L10nError,
                Context: Context,
                Locale: Locale,
                Entity: Entity,
                getPluralRule: getPluralRule,
                rePlaceables: rePlaceables,
                getTranslatableChildren: getTranslatableChildren,
                getL10nAttributes: getL10nAttributes,
                loadINI: loadINI,
                fireLocalizedEvent: fireLocalizedEvent,
                parse: parse,
                compile: compile
            };
        }
    };

    navigator.mozL10n.ctx.ready(onReady.bind(navigator.mozL10n));

    if (DEBUG) {
        navigator.mozL10n.ctx.addEventListener('error', console.error);
        navigator.mozL10n.ctx.addEventListener('warning', console.warn);
    }

    function getDirection(lang) {
        return (rtlList.indexOf(lang) >= 0) ? 'rtl' : 'ltr';
    }

    var readyStates = {
        'loading': 0,
        'interactive': 1,
        'complete': 2
    };

    function waitFor(state, callback) {
        state = readyStates[state];
        if (readyStates[document.readyState] >= state) {
            callback();
            return;
        }

        document.addEventListener('readystatechange', function l10n_onrsc() {
            if (readyStates[document.readyState] >= state) {
                document.removeEventListener('readystatechange', l10n_onrsc);
                callback();
            }
        });
    }

    if (window.document) {
        isPretranslated = (document.documentElement.lang === navigator.language);

        // this is a special case for netError bug; see https://bugzil.la/444165
        if (document.documentElement.dataset.noCompleteBug) {
            pretranslate.call(navigator.mozL10n);
            return;
        }


        if (isPretranslated) {
            waitFor('interactive', function () {
                window.setTimeout(initResources.bind(navigator.mozL10n));
            });
        } else {
            if (document.readyState === 'complete') {
                window.setTimeout(initResources.bind(navigator.mozL10n));
            } else {
                waitFor('interactive', pretranslate.bind(navigator.mozL10n));
            }
        }

    }

    function pretranslate() {
        /* jshint -W068 */
        if (inlineLocalization.call(this)) {
            waitFor('interactive', (function () {
                window.setTimeout(initResources.bind(this));
            }).bind(this));
        } else {
            initResources.call(this);
        }
    }

    function inlineLocalization() {
        var script = document.documentElement
            .querySelector('script[type="application/l10n"]' +
                '[lang="' + navigator.language + '"]');
        if (!script) {
            return false;
        }

        var locale = this.ctx.getLocale(navigator.language);
        // the inline localization is happenning very early, when the ctx is not
        // yet ready and when the resources haven't been downloaded yet;  add the
        // inlined JSON directly to the current locale
        locale.addAST(JSON.parse(script.innerHTML));
        // localize the visible DOM
        var l10n = {
            ctx: locale,
            language: {
                code: locale.id,
                direction: getDirection(locale.id)
            }
        };
        translateFragment.call(l10n);
        // the visible DOM is now pretranslated
        isPretranslated = true;
        return true;
    }

    function initResources() {
        var resLinks = document.head
            .querySelectorAll('link[type="application/l10n"]');
        var iniLinks = [];
        var i;

        for (i = 0; i < resLinks.length; i++) {
            var link = resLinks[i];
            var url = link.getAttribute('href');
            var type = url.substr(url.lastIndexOf('.') + 1);
            if (type === 'ini') {
                iniLinks.push(url);
            }
            this.ctx.resLinks.push(url);
        }

        var iniLoads = iniLinks.length;
        if (iniLoads === 0) {
            initLocale.call(this);
            return;
        }

        function onIniLoaded(err) {
            if (err) {
                this.ctx._emitter.emit('error', err);
            }
            if (--iniLoads === 0) {
                initLocale.call(this);
            }
        }

        for (i = 0; i < iniLinks.length; i++) {
            loadINI.call(this, iniLinks[i], onIniLoaded.bind(this));
        }
    }

    function initLocale() {
        this.ctx.requestLocales(navigator.language);
        window.addEventListener('languagechange', function l10n_langchange() {
            navigator.mozL10n.language.code = navigator.language;
        });
    }

    function onReady() {
        if (!isPretranslated) {
            this.translate();
        }
        isPretranslated = false;

        fireLocalizedEvent.call(this);
    }

    function fireLocalizedEvent() {
        var event = new CustomEvent('localized', {
            'bubbles': false,
            'cancelable': false,
            'detail': {
                'language': this.ctx.supportedLocales[0]
            }
        });
        window.dispatchEvent(event);
    }

    /* jshint -W104 */

    function loadINI(url, callback) {
        var ctx = this.ctx;
        io.load(url, function (err, source) {
            var pos = ctx.resLinks.indexOf(url);

            if (err) {
                // remove the ini link from resLinks
                ctx.resLinks.splice(pos, 1);
                return callback(err);
            }

            if (!source) {
                ctx.resLinks.splice(pos, 1);
                return callback(new Error('Empty file: ' + url));
            }

            var patterns = parseINI(source, url).resources.map(function (x) {
                return x.replace('en-US', '{{locale}}');
            });
            ctx.resLinks.splice.apply(ctx.resLinks, [pos, 1].concat(patterns));
            callback();
        });
    }

    function relativePath(baseUrl, url) {
        if (url[0] === '/') {
            return url;
        }

        var dirs = baseUrl.split('/')
            .slice(0, -1)
            .concat(url.split('/'))
            .filter(function (path) {
                return path !== '.';
            });

        return dirs.join('/');
    }

    var iniPatterns = {
        'section': /^\s*\[(.*)\]\s*$/,
        'import': /^\s*@import\s+url\((.*)\)\s*$/i,
        'entry': /[\r\n]+/
    };

    function parseINI(source, iniPath) {
        var entries = source.split(iniPatterns.entry);
        var locales = ['en-US'];
        var genericSection = true;
        var uris = [];
        var match;

        for (var i = 0; i < entries.length; i++) {
            var line = entries[i];
            // we only care about en-US resources
            if (genericSection && iniPatterns['import'].test(line)) {
                match = iniPatterns['import'].exec(line);
                var uri = relativePath(iniPath, match[1]);
                uris.push(uri);
                continue;
            }

            // but we need the list of all locales in the ini, too
            if (iniPatterns.section.test(line)) {
                genericSection = false;
                match = iniPatterns.section.exec(line);
                locales.push(match[1]);
            }
        }
        return {
            locales: locales,
            resources: uris
        };
    }

    /* jshint -W104 */

    function translateFragment(element) {
        if (!element) {
            element = document.documentElement;
            document.documentElement.lang = this.language.code;
            document.documentElement.dir = this.language.direction;
        }
        translateElement.call(this, element);

        var nodes = getTranslatableChildren(element);
        for (var i = 0; i < nodes.length; i++) {
            translateElement.call(this, nodes[i]);
        }
    }

    function getTranslatableChildren(element) {
        return element ? element.querySelectorAll('*[data-l10n-id]') : [];
    }

    function localizeElement(element, id, args) {
        if (!element) {
            return;
        }

        if (!id) {
            element.removeAttribute('data-l10n-id');
            element.removeAttribute('data-l10n-args');
            setTextContent(element, '');
            return;
        }

        element.setAttribute('data-l10n-id', id);
        if (args && typeof args === 'object') {
            element.setAttribute('data-l10n-args', JSON.stringify(args));
        } else {
            element.removeAttribute('data-l10n-args');
        }

        if (this.ctx.isReady) {
            translateElement.call(this, element);
        }
    }

    function getL10nAttributes(element) {
        if (!element) {
            return {};
        }

        var l10nId = element.getAttribute('data-l10n-id');
        var l10nArgs = element.getAttribute('data-l10n-args');

        var args = l10nArgs ? JSON.parse(l10nArgs) : null;

        return { id: l10nId, args: args };
    }



    function translateElement(element) {
        var l10n = getL10nAttributes(element);

        if (!l10n.id) {
            return;
        }

        var entity = this.ctx.getEntity(l10n.id, l10n.args);

        if (!entity) {
            return;
        }

        if (typeof entity === 'string') {
            setTextContent(element, entity);
            return true;
        }

        if (entity.value) {
            setTextContent(element, entity.value);
        }

        for (var key in entity.attributes) {
            if (entity.attributes.hasOwnProperty(key)) {
                var attr = entity.attributes[key];
                var pos = key.indexOf('.');
                if (pos !== -1) {
                    element[key.substr(0, pos)][key.substr(pos + 1)] = attr;
                } else if (key === 'ariaLabel') {
                    element.setAttribute('aria-label', attr);
                } else {
                    element[key] = attr;
                }
            }
        }

        return true;
    }

    function setTextContent(element, text) {
        // standard case: no element children
        if (!element.firstElementChild) {
            element.textContent = text;
            return;
        }

        // this element has element children: replace the content of the first
        // (non-blank) child textNode and clear other child textNodes
        var found = false;
        var reNotBlank = /\S/;
        for (var child = element.firstChild; child; child = child.nextSibling) {
            if (child.nodeType === Node.TEXT_NODE &&
                reNotBlank.test(child.nodeValue)) {
                if (found) {
                    child.nodeValue = '';
                } else {
                    child.nodeValue = text;
                    found = true;
                }
            }
        }
        // if no (non-empty) textNode is found, insert a textNode before the
        // element's first child.
        if (!found) {
            element.insertBefore(document.createTextNode(text), element.firstChild);
        }
    }

})(this);








// import ---------------------------------

