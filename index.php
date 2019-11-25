<?php
include 'map.php'; // 导入assets-map文件
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php insertCSS('index') ?>
  <title>标题</title>
</head>
<body>
  <h1>php webpack 插件测试</h1>
  
	  <table data-toggle="table" data-search="true" data-search-align="left">
      <thead>
        <tr>
          <th data-field="id">学号</th>
          <th data-field="name">姓名</th>
          <th data-field="math">数学</th>
          <th data-field="chinese">语文</th>
          <th data-field="english">英语</th>
          <th data-field="biology">生物</th>
          <th data-field="physics">物理</th>
          <th data-field="chemistry">化学</th>
          <th data-field="politics">政治</th>
          <th data-field="geography">地理</th>
          <th data-field="history">历史</th>
        </tr>
      </thead>
    </table>
  <?php insertJS('index') ?>
</body>
</html>
