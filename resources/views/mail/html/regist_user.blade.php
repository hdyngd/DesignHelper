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
    Design Helper アカウント仮登録のお知らせ
</h1>
<p>
    {{ $name  }}様
</p>
<p>
    Design Helper事務局により、仮アカウントが発行されました。
</p>
<p>
    下記リンクよりEmailアドレスの認証およびログインパスワードの設定をお願いします。
</p>
<p>
    <a href="{{ url('email_verification/'.$token) }}">{{ url('email_verification/'.$token) }}</a>
</p>
<p>
    ※心当たりがない場合は、何もせずこのメールを削除してください。
</p>

</body>
</html>