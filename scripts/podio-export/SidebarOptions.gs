<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <?!= HtmlService.createHtmlOutputFromFile('SidebarStyles.css').getContent() ?>
</head>
<body>
  <div id="main">
    <div>
    <button id="refresh">Refresh</button>
    <div class="sidebar bottom" id="bottom-bar">
      <span class="gray branding-text">Spreadsheet Add-on by DGCG</span>
    </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <script>
    var date = '<?= date ?>';
  </script>
  <?!= HtmlService.createHtmlOutputFromFile('SidebarScripts.js').getContent() ?>
</body>
</html>