var KEY='mazze_baz'; // همان مقدار FB_KEY در config.js

function doPost(e){
  var p=e.parameter,
      sh=sheet_();

  var rates={
    good:'😄 عالی بود',
    ok:'😐 معمولی بود',
    bad:'😞 راضی نبودم'
  };

  var colors={
    good:'#c8f7d4',
    ok:'#fff3c4',
    bad:'#ffd0d6'
  };

  var issues='';

  if(p.issues){
    issues=Array.isArray(p.issues)
      ? p.issues.join(' | ')
      : String(p.issues);
  }

  sh.appendRow([
    new Date(),
    rates[p.rate] || '',
    issues,
    String(p.text || '').slice(0,500)
  ]);

  if(colors[p.rate]){
    sh.getRange(sh.getLastRow(),2).setBackground(colors[p.rate]);
  }

  return ContentService.createTextOutput('ok');
}

function sheet_(){
  var pr=PropertiesService.getScriptProperties(),
      id=pr.getProperty('SID');

  if(id){
    return SpreadsheetApp.openById(id).getSheets()[0];
  }

  var ss=SpreadsheetApp.create('فیدبک مشتریان - مزه باز'),
      sh=ss.getSheets()[0];

  pr.setProperty('SID',ss.getId());

  sh.setName('فیدبک');

  sh.appendRow([
    'زمان ثبت',
    'رضایت مشتری',
    'موارد انتخاب‌شده',
    'توضیحات'
  ]);

  sh.getRange('A1:D1')
    .setBackground('#2346a8')
    .setFontColor('#ffffff')
    .setFontWeight('bold');

  sh.setFrozenRows(1);
  sh.setRightToLeft(true);

  sh.setColumnWidth(3,250);
  sh.setColumnWidth(4,400);

  return sh;
}

function setup(){
  var s=sheet_();
  Logger.log(s.getParent().getUrl());
}

function doGet(e){
  if(e && e.parameter && e.parameter.k===KEY){

    var rows=sheet_()
      .getDataRange()
      .getValues()
      .slice(1)
      .slice(-200)
      .map(function(r){
        return [
          new Date(r[0]).getTime(),
          r[1],
          r[2],
          r[3]
        ];
      });

    return ContentService
      .createTextOutput(JSON.stringify({rows:rows}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    'مزه باز: سرویس فیدبک فعال است'
  );
}
