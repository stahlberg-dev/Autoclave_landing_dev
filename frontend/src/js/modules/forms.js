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
    initCheckPromoCode,
    initMakeOrder,
    initCreditRequest,
    initDolyamePayment,
    initLeadForm,
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

// load server prices
function initPrices() {

    $('.jsSelectProduct').on('click', function() {
        let code = $(this).data('code');
        if (code) {
            shop.cart.productCode = code;
            updateViewPrices();
        }
    });

    updateViewPrices();
}

// update visual prices after changing options
function updateViewPrices() {
    //updateViewPricesApply(false);
    shop.updatePrice(() => {
        updateViewPricesApply(true);
    })
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
    let $priceOld = $('.jsPriceOld');
    let $discount = $('.jsPriceDiscount');

    $price.toggle(!! priceEnd).find('.value').text(formatPrice(priceEnd));
    $priceOld.toggle(!! priceOld).find('.value').text(formatPrice(priceOld));
    $discount.toggle(!! discount).find('.value').text(formatPrice(discount));

    $('.jsPricePart').each((i, price) => {
        let $price = $(price);
        let kf = + $price.data('price-part');
        let pricePart = Math.round(priceEnd * kf);
        $price.toggle(!! pricePart).find('.value').text(formatPrice(pricePart));
    });
}



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
        });
    });
}

function initDolyamePayment() {
    $('.jsDolyamePaymentBtn').on('click', (e) => {
        e.preventDefault();
        // $('.jsDolyameIFrame').attr('src', '');

        shop.makeDolyamePayment((response) => {
            // $('.jsDolyameIFrame').attr('src', response.link);
            //popups.popupOpen('dolyame', 'lock-padding', 300);
            window.open(response.link, '_blank');
        });
    });
}

export {
    startForms,
}
