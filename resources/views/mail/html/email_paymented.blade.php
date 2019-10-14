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
    Design Helper 発注・支払処理完了通知
</h1>
<p>
    {{ $name  }}様
</p>
<p>
    案件の発注および、支払い処理が完了しました。
</p>
<p>
    発注内容は下記リンクより確認が可能です。
</p>
<p>
    <a href="{{ url('propositions/') }}">{{ url('propositions/') }}</a>
</p>
<p>
    案件担当者が決定し次第、再度通知メールが送信されます。
</p>
<p>
    ※心当たりがない場合は、何もせずこのメールを削除してください。
</p>

</body>
</html>