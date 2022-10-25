<?php

return [
    'leadName' => 'Лэндинг автоклав',
    'shopHost' => 'https://zagotovshik.ru',
    'project' => 'autoclave',
    'token' => 'QwnazusitpX1pG9z4qyyrTZ2SGaDoy',

    // комплекты (для каждого кода можно указать несколько позиций в заказе)
    // формат: [landingCode => [shopSlug => quantity]]
    'items' => [
        // основные товары (все кроме 35 без клампа, 35 только с клампом)
        'av14' => [
            'mini-avtoklav-zagotovshhik' => 1
        ],
        'av18' => [
            'avtoklav-zagotovshhik-lait-18' => 1
        ],
        'av26' => [
            'avtoklav-zagotovshhik-lait-26' => 1
        ],
        'av35' => [
            'avtoklav-35' => 1
        ],

        // с клампом без СА (при выборе "с клампом", но без любого СА)
        'av18-clamp' => [
            'avtoklav-18' => 1
        ],
        'av26-clamp' => [
            'avtoklav' => 1
        ],

        // с клампом + изюмовка
        'av18-distiller' => [
            'zagotovshhik-avtolait-18' => 1
        ],
        'av26-distiller' => [
            'zagotovshhik-avtolait' => 1
        ],
        'av35-distiller' => [
            'zagotovshhik-avtolait-35' => 1
        ],

        // с клампом СА ястреб
        'av26-sa' => [
            'avtoklav-kombo-26' => 1
        ],
        'av35-sa' => [
            'zagotovshhik-kombo-35' => 1
        ],


        // ДОП ТОВАРЫ

        // Фальшдно
        'falsdno' => [ // при выборе опции "фальшдно" у всех кроме 14
            'falsdno-avtoklav' => 1
        ],
        'falsdno14' => [ // при выборе опции "фальшдно" у 14
            'falsdno-mini-avtoklav' => 1
        ],
        'falsdno35' => [ // "фальшдно с ножками"
            'falsdno-avtoklav-35' => 1
        ],

        'tvistOff' => [ // крышки твист-офф
            'tvist-off' => 1
        ],
        'zagim' => [ // Комплект зажимов для крышек СКО (7 штук)
            'ustroistvo-dlya-konservacii' => 7
        ],
        'kluch' => [ // Ключ для открывания крышек твист-офф
            'kluch-tvistoff' => 7
        ],
        'masinka' => [ // Машинка закаточная
            'masinka-zakatocnaya' => 1
        ],

    ],

];
