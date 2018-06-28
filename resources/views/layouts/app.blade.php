<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @if (auth()->guard('web')->check())
        <meta name="userId" content="{{ auth()->guard('web')->user()->id }}">
    @endif

    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
        rel="stylesheet">
    <link rel="stylesheet" href="/css/app.css" type="text/css">

    <title>{{ config('app.name', 'Laravel') }}</title>

    @yield('head')
</head>

<body>
    @yield('content')
    @yield('scripts')
</body>

</html>
