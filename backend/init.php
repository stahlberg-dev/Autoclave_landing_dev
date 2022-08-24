<?php

require_once __DIR__ . '/SiteApi.php';
require_once __DIR__ . '/Products.php';

define('APP_PATH', __DIR__);
define('DATA_PATH', __DIR__ . '/data');
define('BASE_PATH', realpath(__DIR__ . '/..'));

$config = require APP_PATH . '/config.php';

$landingHost = $_SERVER['SERVER_NAME'] ?? '';

$isDev = preg_match('#\.local$#isu', $landingHost, $matches);

// при работе лэндинга на localhost - работать с магазином также на localhost
if ($isDev) {
    $config['shopHost'] = 'http://zagotovshik.local';
}

$siteApi = new \App\SiteApi($config['shopHost'], $config['project'], $config['token']);
$products = new \App\Products($config['items'], $siteApi);

function createSid() {
    global $config;

    $sid = substr(md5(rand() . microtime() . rand()), 0, 16);
    $sid = $config['project'] . ':' . $sid;

    return $sid;
}