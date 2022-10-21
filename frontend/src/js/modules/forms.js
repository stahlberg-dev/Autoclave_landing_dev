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
    if (!delim) delim = ' ';

    let hiVal = val.substr(0, hiCount),
        lowVal = val.substr(hiCount);

    return hiVal + delim + lowVal;
}

const initModulesMain = [
    initPrices,
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

    $('.jsSelectProduct').on('click', function() {
        let code = $(this).data('code');
        if (code) {
            shop.cart.productCode = code;
            updateViewPrices();
            setPromoDiscountPrice('.jsPricePromoDiscount', code);
        }
    });

    updateViewPrices();
    setPromoDiscountPrice('.jsPricePromoDiscount', 'av14');
}

// update visual prices after changing options
function updateViewPrices() {
    //updateViewPricesApply(false);
    shop.updatePrice(() => {
        updateViewPricesApply(true);
    });
}

function updateViewPricesApply(show) {
    let priceEnd = 0, priceBase = 0, priceOld = 0, discount = 0;
    if (shop.prices.actual && show) {
        priceEnd = shop.prices.priceEnd;
        priceBase = shop.prices.priceBase;
        priceOld = shop.prices.priceOld;
        discount = shop.prices.getTotalDiscount();
    }

    let $price = $('.jsPrice');
    let $priceBase = $('.jsPriceBase');
    let $priceOld = $('.jsPriceOld');
    let $discount = $('.jsPriceDiscount');

    $price.toggle(!! priceEnd).find('.value').text(formatPrice(priceEnd));
    $priceBase.toggle(!! priceBase).find('.value').text(formatPrice(priceBase));
    $priceOld.toggle(!! priceOld).find('.value').text(formatPrice(priceOld));
    $discount.toggle(!! discount).find('.value').text(formatPrice(discount));

    $('.jsPricePart').each((i, price) => {
        let $price = $(price);
        let kf = + $price.data('price-part');
        let pricePart = Math.round(priceBase * kf);
        $price.toggle(!! pricePart).find('.value').text(formatPrice(pricePart));
    });
}

function setPromoDiscountPrice(promoPriceClass, code) {

    const $pricePlace = $(promoPriceClass);
    let promoPrice;

    shop.updatePrice(() => {

        switch(code) {
            case 'av14': 
                promoPrice = shop.cache.prices[code] - 1500;
                break;
            case 'av18': 
                promoPrice = shop.cache.prices[code] - 2000;
                break;
            case 'av26': 
                promoPrice = shop.cache.prices[code] - 2000;
                break;
            case 'av35': 
                promoPrice = shop.cache.prices[code] - 2000;
                break;
            default: 
                return;
        }
        $pricePlace.toggle(!! promoPrice).find('.value').text(formatPrice(promoPrice));
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
