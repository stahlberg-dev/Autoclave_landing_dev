<?php

namespace App;

class Products
{

    /** @var array [landingCode => siteSlug] */
    private $items = [];

    /** @var SiteApi */
    private $siteApi;

    // разрешить автообновление цен из магазина
    private $autoUpdatePrices = true;

    /**
     * Products constructor.
     * @param array $items
     */
    public function __construct(array $items, $siteApi)
    {
        $this->items = $items;
        $this->siteApi = $siteApi;
    }

    private function getPricesFile()
    {
        return DATA_PATH . '/prices.json';
    }

    /**
     * обновить цены с сайта
     */
    public function updatePrices()
    {
        $slugs = [];
        foreach ($this->items as $code => $productBundle) {
            foreach ($productBundle as $slug => $quantity) {
                $slugs[] = $slug;
            }
        }

        $data = $this->siteApi->getPrices($slugs);

        file_put_contents($this->getPricesFile(), json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }

    /**
     * @return array [prices: [], pricesOld: []]
     */
    private function getSitePrices()
    {
        $file = $this->getPricesFile();

        $isOutdated = @filemtime($file) < time() - 30 * 60; // update every 30 min
        if ($isOutdated && $this->autoUpdatePrices) {
            try {
                $this->updatePrices();
            } catch (\Throwable $e) {
                // skip errors
            }
        }

        return json_decode(file_get_contents($file), true);
    }

    public function getPrices()
    {
        $sitePrices = $this->getSitePrices()['prices'];

        $prices = [];
        foreach ($this->items as $code => $productBundle) {
            $price = 0;
            foreach ($productBundle as $slug => $quantity) {
                if (! isset($sitePrices[$slug])) {
                    throw new \Exception("no price $slug");
                }
                $price += $sitePrices[$slug] * $quantity;
            }
            $prices[$code] = $price;
        }

        return $prices;
    }

    public function getPricesOld()
    {
        $sitePricesAll = $this->getSitePrices();
        $sitePrices = $sitePricesAll['prices'];
        $sitePricesOld = $sitePricesAll['pricesOld'];

        $prices = [];
        foreach ($this->items as $code => $productBundle) {
            $price = 0;
            foreach ($productBundle as $slug => $quantity) {
                if (! isset($sitePricesOld[$slug]) && ! isset($sitePrices[$slug])) {
                    throw new \Exception("no price $slug");
                }
                $itemPrice = $sitePricesOld[$slug] ?: $sitePrices[$slug];
                $price += $itemPrice * $quantity;
            }
            $prices[$code] = $price;
        }

        return $prices;
    }

    /**
     * преобразует корзину лэндинга в корзину сайта
     * @param array $landingCart [code => quantity]
     * @return array [siteSlug => quantity]
     */
    public function getSiteCart($landingCart)
    {
        $siteCart = [];

        foreach ($landingCart as $code => $quantity) {
            if ($quantity < 1) continue;
            if (! isset($this->items[$code])) throw new \Exception("unknown code {$code}");
            foreach ($this->items[$code] as $slug => $siteQuantity) {
                $totalQuantity = $quantity * $siteQuantity;
                if (! isset($siteCart[$slug])) {
                    $siteCart[$slug] = 0;
                }
                $siteCart[$slug] += $totalQuantity;
            }
        }

        return $siteCart;
    }

    public function getPrice($data)
    {
        $code = $data['code'] ?? null; // promo code
        $cart = $data['cart'] ?? [];

        $siteCart = $this->getSiteCart($cart);

        $result = $this->siteApi->getCartPrice($siteCart, $code);

        return [
            'price' => $result['totalPrice'],
        ];
    }


}