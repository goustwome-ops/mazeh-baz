var KEY='mazze_baz'; // همان مقدار FB_KEY در config.js
function doPost(e){
  var p=e.parameter,sh=sheet_();
  var m={good:'😍 عالی',ok:'😐 معمولی',bad:'😞 ضعیف'},c={good:'#c8f7d4',ok:'#fff3c4',bad:'#ffd0d6'};
  sh.appendRow([new Date(),String(p.biz||'').slice(0,80),m[p.rate]||'',String(p.text||'').slice(0,500)]);
  if(c[p.rate])sh.getRange(sh.getLastRow(),3).setBackground(c[p.rate]);
  return ContentService.createTextOutput('ok');
}
function sheet_(){
  var pr=PropertiesService.getScriptProperties(),id=pr.getProperty('SID');
  if(id)return SpreadsheetApp.openById(id).getSheets()[0];
  var ss=SpreadsheetApp.create('نظرات مشتریان - مزه باز'),sh=ss.getSheets()[0];
  pr.setProperty('SID',ss.getId());sh.setName('نظرات');sh.appendRow(['زمان','کسب‌وکار','امتیاز','توضیح']);
  sh.getRange('A1:D1').setBackground('#2346a8').setFontColor('#ffffff').setFontWeight('bold');
  sh.setFrozenRows(1);sh.setRightToLeft(true);sh.setColumnWidth(4,350);
  return sh;
}
function setup(){var s=sheet_();Logger.log(s.getParent().getUrl());}

function doGet(e){
  if(e&&e.parameter&&e.parameter.k===KEY){
    var v=sheet_().getDataRange().getValues().slice(1).slice(-200).map(function(r){return [new Date(r[0]).getTime(),r[1],r[2],r[3]];});
    return ContentService.createTextOutput(JSON.stringify({rows:v})).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput('مزه باز: سرویس نظرسنجی فعال است');
}
