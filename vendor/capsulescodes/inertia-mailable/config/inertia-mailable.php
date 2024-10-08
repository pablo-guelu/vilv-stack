<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Inertia identifier
    |--------------------------------------------------------------------------
    |
    | The div identifier used by Inertia.
    |
    */

    'id' => 'app',

    /*
    |--------------------------------------------------------------------------
    | Node path
    |--------------------------------------------------------------------------
    |
    | The node path.
    |
    */

    'node' => env( 'NODE_PATH', 'node' ),

    /*
    |--------------------------------------------------------------------------
    | Inertia path
    |--------------------------------------------------------------------------
    |
    | The path where the built Inertia resource is located.
    |
    */

    'inertia' => 'bootstrap/ssr/mail.js',

    /*
    |--------------------------------------------------------------------------
    | CSS path
    |--------------------------------------------------------------------------
    |
    | The path where the CSS resource is located.
    |
    */

    'css' => 'resources/css/mail.css',

    /*
    |--------------------------------------------------------------------------
    | Tailwind config path
    |--------------------------------------------------------------------------
    |
    | The path where the Tailwind config is located.
    |
    */

    'tailwind' => 'tailwind.config.js'

];
