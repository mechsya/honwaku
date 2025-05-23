<!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <title>Honwaki - Novel in your pocket</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.ico') }}">
    <meta name="description"
        content="Honwaku adalah aplikasi baca novel ringan dan gratis untuk Android, dari dan untuk komunitas pecinta novel. Temukan dan baca novel favoritmu dengan lebih mudah dari sebelumnya, dalam tampilan yang sederhana dan nyaman.">

    <!-- Meta Keywords (opsional tapi tidak sepenting dulu) -->
    <meta name="keywords" content="honwaku, cerita ringan, cerita hangat, cerita jepang, kisah menyentuh">

    <!-- Open Graph untuk Sosial Media -->
    <meta property="og:title" content="Honwaku - Cerita yang Menghangatkan Hati">
    <meta property="og:description"
        content="Jelajahi dunia honwaku, kisah ringan dan menyentuh yang cocok dibaca kapan saja.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ env('APP_URL') }}">
    <meta property="og:image" content="{{ asset('images/logo.png') }}">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('build/assets/app-CrHdoOTL.css') }}">
    <link rel="manifest" href="{{ asset('build/manifest.json') }}" />
    @yield('head')
</head>

<body class="bg-base">
    @yield('content')

    <script src="{{ asset('build/assets/app-eMHK6VFw.js') }}"></script>
</body>

</html>
