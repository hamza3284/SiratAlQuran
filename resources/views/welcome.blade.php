<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sirat Al Quran</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="icon" href="{{ asset('SiratAlQuranLogo.png') }}" type="image/png">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Reem+Kufi:wght@400;500;600;700&display=swap" rel="stylesheet">
        <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="antialiased">
        <div id="app"></div>
    </body>
</html>
