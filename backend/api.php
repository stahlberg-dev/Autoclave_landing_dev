<?php

header('Access-Control-Allow-Origin: *');

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

    die();
}

function sendLead (array $data) {
    global $config, $siteApi;

    $data['title'] = implode(' ', [
        $config['leadName'] ?? '',
        $data['form'] ?? '',
        $data['name'] ?? '',
    ]);

    unset($data['action'], $data['form']);

    return $siteApi->lead($data);
}

try {
    require_once __DIR__ . '/init.php';

    $data = $_POST;
    if (empty($data)) {
        $data = json_decode(file_get_contents('php://input'), true);
    }

    if (empty($data['action'])) {
        jsonError("no action");
    }

    switch ($data['action'] ?? null) {
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

        case 'make-dolyame-payment':
            $data['cart'] = $products->getSiteCart($data['cart']);
            jsonResponse($siteApi->makeDolyamePayment($data));
            break;

        case 'lead':
            jsonResponse(sendLead($data));
            break;

        default:
            jsonError("unknown action");
            break;
    }

} catch (\Throwable $e) {
    jsonError(['err' => $e->getMessage()]);
}