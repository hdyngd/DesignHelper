<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>DesignHelper</title>

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<div id="app">
    <app></app>
</div>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>