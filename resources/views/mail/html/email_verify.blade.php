<!DOCTYPE html>
<html lang="ja">
<style>
    body {
        background-color: #2a88bd;
        color: #FFFFFF;
    }
    h1 {
        font-size: 16px;
        color: #ff6666;
    }
</style>
<body>
<h1>
    Design Helper Emailアドレスの認証
</h1>
<p>
    {{ $name  }}様
</p>
<p>
    Emailアドレスの認証を行います。
</p>
<p>
    下記リンクによりEmailアドレスの認証を完了してください。
</p>
<p>
    <a href="{{ url('email_verification/'.$token) }}">{{ url('email_verification/'.$token) }}</a>
</p>
<p>
    ※心当たりがない場合は、何もせずこのメールを削除してください。
</p>

</body>
</html>