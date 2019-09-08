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
    Design Helper パスワード再設定通知
</h1>

<p>
    下記リンクよりパスワードの再設定が可能です。
</p>
<p>
    <a href="{{ url('verification/'.$token) }}">{{ url('verification/'.$token) }}</a>
</p>
<p>
    ※心当たりがない場合は、何もせずこのメールを削除してください。
</p>

</body>
</html>