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
    Design Helper 案件にアサインされました
</h1>
<p>
    {{ $name  }}様
</p>
<p>
    案件にアサインされました。
</p>
<p>
    下記リンクにより内容を確認してください。
</p>
<p>
    <a href="{{ url('propositions/') }}">{{ url('propositions/') }}</a>
</p>
<p>
    ※心当たりがない場合は、何もせずこのメールを削除してください。
</p>

</body>
</html>