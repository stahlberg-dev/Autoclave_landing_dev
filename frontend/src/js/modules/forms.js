import $ from "jquery";
import shop from "./shop-api.js";
import * as popups from "./popups.js";

//var PROD = !location.host.match(/\.local/);

window.$ = $;
// console.log(shop.cart.productCode);

const METRIKA_ID = 89325723;

function ymGoal(name, params, callback) {
    if (!name) return;
    console.log('reachGoal', name, params)
    if (!('ym' in window)) {
        if (callback) callback();
        return console.warn('metrika not found');
    }
    if (! METRIKA_ID) {
        return console.warn('METRIKA_ID not found');
    }
    ym(METRIKA_ID, 'reachGoal', name, params, callback);
}

function formatPrice(val, delim) {
    val = '' + val;
    let hiCount = val.length - 3;
    if (hiCount < 1) return val;
    if (!delim) delim = ' ';

    let hiVal = val.substr(0, hiCount),
        lowVal = val.substr(hiCount);

    return hiVal + delim + lowVal;
}

const initModulesMain = [
    initPrices,
    initProductOptions,
    //initStarterPromoCode,
    initComparisonPrices,
    initDiscountLink,
    initCheckPromoCode,
    initMakeOrder,
    initCreditRequest,
    initDolyamePayment,
    initLeadForm,
    dataLayerProductView,
];

//region run modules
function startForms() {
    runModules(initModulesMain, 'All');
}

function runModules(modules, name) {
    for (let i in modules) {
        try {
            let module = modules[i];
            module();
        } catch (e) {
            console.warn('init module error: ', e);
        }
    }
}
//endregion run modules

//region dataLayer
function pushDataLayer(data) {
    if (window.dataLayer) {
        window.dataLayer.push(data);
    } else {
        console.warn('no dataLayer', data);
    }
}

function dataLayerProductView() {
    setTimeout(function () {
        pushDataLayer({
            ecommerce: null,
        });
        pushDataLayer({
            ecommerce: {
                currencyCode: 'RUB',
                detail: {
                    actionField: {list: 'all'},
                    products: [
                        {
                            id: shop.cart.productCode,
                            name: shop.cart.productCode,
                            price: shop.prices.priceEnd,
                            category: 'main',
                        },
                    ],
                },
            },
        });
    }, 15000);
}
//endregion dataLayer

// load server prices
function initPrices() {

    shop.cart.productCode = 'av14';

    shop.cart.additionalProducts = {
        falsdno: 0,
        falsdno14: 0,
        falsdno35: 0,
        tvistOff: 0,
        zagim: 0,
        kluch: 0,
        masinka: 0,
    }

    $('.jsSelectProduct').on('click', function() {
        let code = $(this).data('code');
        if (code) {
            shop.cart.productCode = code;
            updateViewPrices();
        }
    });

    updateViewPrices();
}

// доп опции товаров
function initProductOptions() {

    let volume = 14;

    // выбранные пользователем опции
    const options = {
        clamp: 0,
        izumovka: 0,
        yastreb: 0,

        falsdno: 0,
        falsdno35: 0, // с ножками

        tvistOff: 0,
        zagim: 0,
        kluch: 0,
        masinka: 0,
    };

    // доступные опции (видимые)
    const available = {
        clamp: 0,
        izumovka: 0,
        yastrb: 0,

        falsdno: 1,
        falsdno35: 0, // с ножками

        tvistOff: 1,
        zagim: 1,
        kluch: 1,
        masinka: 1,
    };

    // https://docs.google.com/spreadsheets/d/1a2LiZ1QDi84U386w2dzipcRHJSGuXNoSENnV0wcpuAo/edit?usp=sharing
    // обновить видимость опций
    function updateOptionsVisibility() {
        let isMini = volume === 14
        available.clamp = !isMini
        available.izumovka = !isMini
        available.yastreb = volume >= 26
        available.falsdno35 = volume === 35

        for (let option in available) {
            let isAvailable = available[option]
            let node = $(`.jsConstructorRow[data-option="${option}"]`).get(0)
            if (node) node.style.display = isAvailable ? '' : 'none'
        }
    }
    updateOptionsVisibility()

    // обновить состояния чекбоксов (взаимозависимые опции)
    function updateCheckboxes() {
        for (let option in options) {
            let isChecked = options[option]
            $(`.jsConstructorRow[data-option="${option}"] .jsConstructorOption`).prop('checked', isChecked)
        }
    }
    updateCheckboxes()

    // обновить содержимое корзины по выбранным опциям и объему
    function updateCart() {
        let isMini = volume === 14
        let is35 = volume === 35
        let is26plus = volume >= 26

        // основной товар в корзине
        let main = `av${volume}`

        if (isMini) {
            // у 14 другое фальшдно
            shop.cart.additionalProducts.falsdno = 0
            shop.cart.additionalProducts.falsdno14 = options.falsdno
        } else {
            shop.cart.additionalProducts.falsdno = options.falsdno
            shop.cart.additionalProducts.falsdno14 = 0

            // фальшдно с ножками только для 35
            shop.cart.additionalProducts.falsdno35 = is35 ? options.falsdno35 : 0

            if (options.izumovka) {
                options.clamp = 1
                main = `av${volume}-distiller`
            } else if (options.yastreb && is26plus) {
                options.clamp = 1
                main = `av${volume}-sa`
            } else if (options.clamp && !is35) { // с клампом без СА
                main = `av${volume}-clamp`
            }
        }

        shop.cart.additionalProducts.tvistOff = options.tvistOff
        shop.cart.additionalProducts.zagim =    options.zagim
        shop.cart.additionalProducts.kluch =    options.kluch
        shop.cart.additionalProducts.masinka =  options.masinka

        shop.cart.productCode = main
        updateViewPrices()
    }

    // синхронизировать взаимозависимые опции
    // option - опция которую пользователь изменил
    // isChecked - новое состояние опции
    function syncDependOptions(option, isChecked) {
        if (isChecked) { // добавили опцию
            if (option === 'izumovka') {
                options.clamp = 1
                options.yastreb = 0
            } else if (option === 'yastreb') {
                options.clamp = 1
                options.izumovka = 0
            }
        } else { // сняли опцию
            if (option === 'clamp') { // без клампа нет СА
                options.izumovka = 0
                options.yastreb = 0
            }
        }
    }

    // клик по чекбоксам опций
    $('input.jsConstructorOption').on('change', function (e) {
        let option = $(this)
            .closest('.jsConstructorRow')
            .data('option')

        options[option] = this.checked

        syncDependOptions(option, this.checked)
        updateCheckboxes()
        updateCart()
    });

    // выбор объема
    $('.jsConstructorVolume').on('click', function (e) {
        volume = + $(this).data('volume')

        // обновить активную кнопку
        /* $('.jsConstructorVolume.liter-buttons__button_active').removeClass('liter-buttons__button_active')
        $(this).addClass('liter-buttons__button_active') */

        updateOptionsVisibility()
        updateCheckboxes()
        updateCart()
    });
}

// update visual prices after changing options
function updateViewPrices() {
    //updateViewPricesApply(false);
    shop.updatePrice(() => {
        updateViewPricesApply(true);
    });
}

function updateViewPricesApply(show) {
    let priceEnd = 0, priceBase = 0, priceOld = 0, pricePromoDiscount = 0, discount = 0;
    if (shop.prices.actual && show) {
        priceEnd = shop.prices.priceEnd;
        priceBase = shop.prices.priceBase;
        priceOld = shop.prices.priceOld;
        pricePromoDiscount = (shop.cart.productCode === 'av14') ? priceBase - 1500 :
                             priceBase - 2000;
        discount = shop.prices.getTotalDiscount();
    }

    let $price = $('.jsPrice');
    let $priceBase = $('.jsPriceBase');
    let $priceOld = $('.jsPriceOld');
    let $pricePromoDiscount = $('.jsPricePromoDiscount');
    let $discount = $('.jsPriceDiscount');

    $price.toggle(!! priceEnd).find('.value').text(formatPrice(priceEnd));
    $priceBase.toggle(!! priceBase).find('.value').text(formatPrice(priceBase));
    $priceOld.toggle(!! priceOld).find('.value').text(formatPrice(priceOld));
    $pricePromoDiscount.toggle(!! pricePromoDiscount).find('.value').text(formatPrice(pricePromoDiscount));
    $discount.toggle(!! discount).find('.value').text(formatPrice(discount));

    $('.jsPricePart').each((i, price) => {
        let $price = $(price);
        let kf = + $price.data('price-part');
        let pricePart = Math.round(priceBase * kf);
        $price.toggle(!! pricePart).find('.value').text(formatPrice(pricePart));
    });
}

function initComparisonPrices() {

    $('.jsComparisonPriceOld').each(function(i) {

        let code = $(this).data('code');
        const $pricePlace = $(this);

        shop.updatePrice(() => {

            let oldPrice = shop.cache.pricesOld[code];
            $pricePlace.toggle(!! oldPrice).find('.value').text(formatPrice(oldPrice));

        });

    });

    $('.jsComparisonPriceBase').each(function(i) {

        let code = $(this).data('code');
        const $pricePlace = $(this);

        shop.updatePrice(() => {

            let basePrice = shop.cache.prices[code];
            $pricePlace.toggle(!! basePrice).find('.value').text(formatPrice(basePrice));

        });

    });

    $('.jsComparisonPricePromo').each(function(i) {

        let code = $(this).data('code');
        const $pricePlace = $(this);

        shop.updatePrice(() => {

            let promoPrice = (code === 'av14') ? shop.cache.prices[code] - 1500 : 
                             shop.cache.prices[code] - 2000;
            $pricePlace.toggle(!! promoPrice).find('.value').text(formatPrice(promoPrice));

        });

    });

}

function initDiscountLink() {

    $('.jsDiscountLink').on('click', function(event) {

        event.preventDefault();
        const $root = $('.jsPromoCode');
        const $input = $root.find('.jsPromoCodeInput');
        const $info = $root.find('.jsPromoCodeInfo');
        const $checkButton = $root.find('.jsPromoCodeCheckButton');
        const $deleteButton = $root.find('.jsPromoCodeDeleteButton');
        let code = 'ДОБРО';

        $checkButton.hide(200);
        $deleteButton.show(200);

        shop.checkPromoCode(code, (response) => {
            if (response.active) {
                shop.cart.promoCode = code;
                $input.val(code);
                let info = response.info;
                info = info.replace('Акция на автоклавы! Действует', 'Внимание! Промокод действует');
                $info.text(info);
                $info.toggleClass('active', response.active);

                updateViewPrices();
            }
        });
        
    });

}

/* function setPromoDiscountPrice() {
    let code = 'ДОБРО';
    let $pricePromoDiscount = $('.jsPricePromoDiscount');
    let promoPrice = 0;
    let defaultPromo = shop.cart.promoCode;
    shop.checkPromoCode(code, (response) => {
        if (response.active) {
            shop.cart.promoCode = code;
            shop.loadEndPrice((response) => {
                promoPrice = response.price;
                $pricePromoDiscount.toggle(!! promoPrice).find('.value').text(formatPrice(promoPrice));
            });
            shop.cart.promoCode = defaultPromo;
            console.log(shop.cache.prices);
        }
    });
} */

/* function initStarterPromoCode() {
    const $root = $('.jsPromoCode');
    const $input = $root.find('.jsPromoCodeInput');
    const $info = $root.find('.jsPromoCodeInfo');
    let code = 'ДОБРО';
    shop.checkPromoCode(code, (response) => {
        if (response.active) {
            shop.cart.promoCode = code;
            $input.val(code);
            let info = response.info;
            info = info.replace('Акция на автоклавы! Действует', 'Внимание! Промокод действует');
            $info.text(info);
            $info.toggleClass('active', response.active);
            updateViewPrices();
        }
    });
} */

function initCheckPromoCode() {
    $('.jsPromoCode').each(function (i, root) {
        const $root = $(root);
        const $input = $root.find('.jsPromoCodeInput');
        const $info = $root.find('.jsPromoCodeInfo');
        const $checkButton = $root.find('.jsPromoCodeCheckButton');
        const $deleteButton = $root.find('.jsPromoCodeDeleteButton');

        $checkButton.on('click', function (e) {
            e.preventDefault();
            const code = $input.val();
            $info.text('');
            if (code) {
                $checkButton.hide(200);
                $deleteButton.show(200);
            }

            shop.checkPromoCode(code, (response) => {
                if (response.active) {
                    shop.cart.promoCode = code;
                }
                $info.text(response.info);
                $info.toggleClass('active', response.active);

                updateViewPrices();
            });
        });

        $deleteButton.on('click', function (e) {
            e.preventDefault();
            $input.val('');
            $info.text('');
            shop.cart.promoCode = '';
            updateViewPrices();
            $checkButton.show(200);
            $deleteButton.hide(200);
        });
    });
}


function initMakeOrder() {
    $('.jsOrderForm').each(function (i, form) {
        const $form = $(form);

        $form.on('submit', (e) => {
            e.preventDefault();
            let user = {
                name: $form.find('.jsName').val(),
                phone: $form.find('.jsPhone').val(),
            };

            shop.makeOrder(user, (response) => {
                if (response.error) {
                    alert(response.error);
                } else {
                    ymGoal('zakaz');
                    form.reset();
                    popups.popupOpen('checkout', 'lock-padding', 300);
                    //alert(`Ваш заказ принят. Номер заказа ${response.orderNumber}`);
                }
            });
        });
    });
}

function initLeadForm() {
    $('.jsLeadForm').each(function (i, form) {
        const $form = $(form);

        $form.on('submit', (e) => {
            e.preventDefault();

            const data = new FormData(form);

            shop.lead(data, (response) => {
                ymGoal('getconsult');
                popups.popupOpen('thanks', 'lock-padding', 300);
            });
        });
    });
}


function initCreditRequest() {
    $('.jsCreditRequestBtn').on('click', (e) => {
        e.preventDefault();
        shop.makeCreditTinkoff((data) => {
            // data.type - статус например tinkoff.constants.SUCCESS
            console.log('TNK EVENT', data);
            ymGoal('rassrochka');
        }, (response) => {
            if (response.error) alert(response.error);
        });
    });
}

function initDolyamePayment() {
    $('.jsDolyamePaymentBtn').on('click', (e) => {
        e.preventDefault();
        shop.makeDolyamePayment((response) => {
            window.open(response.link, '_blank');
        }, (response) => {
            if (response.error) alert(response.error);
        });
    });
}

export {
    startForms,
};
