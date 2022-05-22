<?php

/** @var \App\SiteApi $siteApi */
/** @var \App\Products $products */

function jsonError($error) {
    jsonResponse([
        'status' => 0,
        'error' => $error,
    ]);
}

function jsonResponse($data) {
    if (! isset($data['status'])) $data['status'] = 1;

    header('Content-Type: application/json');

    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}


try {
    require_once __DIR__ . '/init.php';

    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['action'])) {
        jsonError("no action");
    }

    switch ($data['action']) {
        case 'prices':
            jsonResponse([
                'prices' => $products->getPrices(),
                'pricesOld' => $products->getPricesOld(),
            ]);
            break;

        case 'price':
            jsonResponse($products->getPrice($data));
            break;

        case 'check-promo-code':
            jsonResponse($siteApi->checkPromoCode($data));
            break;

        case 'make-order':
            $data['cart'] = $products->getSiteCart($data['cart']);
            jsonResponse($siteApi->makeOrder($data));
            break;

        case 'make-credit-request':
            $data['cart'] = $products->getSiteCart($data['cart']);
            jsonResponse($siteApi->makeCreditRequest($data));
            break;

        default:
            jsonError("unknown action");
            break;
    }

} catch (\Throwable $e) {
    jsonError($e->getMessage());
}
