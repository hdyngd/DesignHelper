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
    Design Helper 案件発生通知
</h1>
<p>
    管理者各位
</p>
<p>
    案件が発生しました。
</p>
<p>
    下記リンクより内容を確認し、担当者をアサインしてください。
</p>
<p>
    <a href="{{ url('admin/dash_board/') }}">{{ url('admin/dash_board/') }}</a>
</p>
<p>
    ※心当たりがない場合は、何もせずこのメールを削除してください。
</p>

</body>
</html>