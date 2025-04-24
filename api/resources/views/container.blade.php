<!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    @vite('resources/css/app.css')
    <link rel="stylesheet" href="{{ asset('build/assets/app-D9NYL-1H.css') }}">
    <link rel="manifest" href="{{ asset('build/manifest.json') }}" />
    @yield('head')
</head>

<body>
    @yield('content')
    <script src="{{ asset('build/assets/app-eMHK6VFw.js') }}"></script>
</body>

</html>
