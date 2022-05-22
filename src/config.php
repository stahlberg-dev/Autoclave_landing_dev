<?php

return [
    'shopHost' => 'https://zagotovshik.ru',
    'project' => 'autoclave',
    'token' => 'QwnazusitpX1pG9z4qyyrTZ2SGaDoy',

    // комплекты (для каждого кода можно указать несколько позиций в заказе)
    // формат: [landingCode => [shopSlug => quantity]]
    'items' => [
        'av18' => [
            'avtoklav-18' => 1
        ],
        'av26' => [
            'avtoklav' => 1
        ],
        'av35' => [
            'avtoklav-35' => 1
        ],
    ],
];
