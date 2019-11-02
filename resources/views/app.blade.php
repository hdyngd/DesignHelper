<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Design Helper</title>

    <link rel="stylesheet" href="{{ mix('css/app.css') }}"></link>
    <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossorigin="anonymous"
    />
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}"></link>

    <script>
        window.Laravel = {
            csrfToken: "{{ csrf_token() }}"
        };
    </script>

    <script type="text/javascript" src="https://credit.j-payment.co.jp/gateway/js/jquery.js"></script>
    <script type="text/javascript" src="https://credit.j-payment.co.jp/gateway/js/CPToken.js"></script>
</head>
<body>
{{--    <form id="mainform">--}}
{{--        <input id="tkn" name="tkn" type="hidden" value="">--}}
{{--        <div id="CARD_INPUT_FORM" />--}}
{{--        <input type="button" value="購入する" onclick="doPurchase()"/>--}}
{{--    </form>--}}
    <div id="app"></div>

    <script src="{{ mix('js/app.js') }}"></script>

{{--    <script>--}}
{{--        function doPurchase() {--}}
{{--        //CP非同期通信よりカード番号入力画面を表示する--}}
{{--            CPToken.CardInfo (--}}
{{--            {--}}
{{--                aid: '113408'--}}
{{--            },--}}
{{--            execPurchase );--}}
{{--        }--}}

{{--        // コールバック関数--}}
{{--        function execPurchase(resultCode, errMsg) {--}}
{{--            if (resultCode != "Success") {--}}
{{--            // 戻り値がSuccess以外の場合はエラーメッセージを表示--}}
{{--                window.alert(errMsg);--}}
{{--            } else {--}}
{{--            // スクリプトからフォームをsubmit--}}
{{--                $("#mainform").submit();--}}
{{--            }--}}
{{--        }--}}
{{--    </script>--}}
</body>
</html>