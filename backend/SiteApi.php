<?php

namespace App;

class SiteApi
{

    private $host;

    private $basePath = '/service/landing/api/';

    private $project;

    private $token;

    private $tracking = [];

    /**
     * SiteApi constructor.
     * @param $project
     * @param $token
     */
    public function __construct($host, $project, $token)
    {
        $this->host = $host;
        $this->project = $project;
        $this->token = $token;
    }

    public function exec($method, $data = [])
    {
        $data['project'] = $this->project;
        $data['tracking'] = $this->tracking;

        $dataString = json_encode($data, JSON_UNESCAPED_UNICODE);

        $url = $this->host . $this->basePath . $method;

        $ch = curl_init();

        $headers = [
            'Accept-Language: ru',
            'Accept-Encoding: gzip',
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->token,
            'Content-Length' => strlen($dataString),
        ];

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
        curl_setopt($ch, CURLOPT_ENCODING, true);
        curl_setopt($ch, CURLOPT_POSTREDIR, 2);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            throw new \Exception("site api request error " . curl_errno($ch) . "/ " . $result);
        }

        $response = json_decode($result, true);
        if (json_last_error()) {
            throw new \Exception("site api json decode error in '$result'");
        }

        return $response;
    }

    public function setTracking($tracking)
    {
        $this->tracking = $tracking;
    }

    public function getPrices($slugs)
    {
        return $this->exec('prices', compact('slugs'));
    }

    /**
     * цена корзины с промокодом
     * @param $cart
     * @param $code
     * @return mixed
     * @throws \Exception
     */
    public function getCartPrice($cart, $code)
    {
        return $this->exec('cart-price', compact('cart', 'code'));
    }

    public function checkPromoCode($data)
    {
        return $this->exec('check-promo-code', $data);
    }

    public function makeCreditRequest($data)
    {
        return $this->exec('make-credit-request', $data);
    }

    public function makeOrder($data)
    {
        return $this->exec('make-order', $data);
    }

    public function makeDolyamePayment($data)
    {
        return $this->exec('make-dolyame-payment', $data);
    }

    /**
     * Создать лид в CRM
     * @param array $data [name,phone,email,title,trace,comment]
     * @return mixed
     * @throws \Exception
     */
    public function lead($data)
    {
        return $this->exec('lead', $data);
    }

}