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
    Design Helper ニュースが更新されました
</h1>
<p>
    {{ $name  }}様
</p>
<p>
    ニュースが更新されました。
</p>
<p>
    下記リンクより内容を確認可能です。
</p>
<p>
    <a href="{{ url('information/'.$informationId) }}">{{ url('information/'.$informationId) }}</a>
</p>
<p>
    ※心当たりがない場合は、何もせずこのメールを削除してください。
</p>

</body>
</html>