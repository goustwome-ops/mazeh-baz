# مزه باز v2
1. www/config.js: YOUR_USER، CONTACT، TG، RUBIKA را عوض کن. عکس تبلیغ (اختیاری): www/promo.png
2. پوشه را در ریپوی گیت‌هاب آپلود کن (keys-PRIVATE.txt آپلود نمی‌شود).
3. امضا: keytool -genkey -v -keystore release.jks -alias mazeh -keyalg RSA -keysize 2048 -validity 10000
   سپس در Settings ← Secrets: KEYSTORE_B64 (خروجی base64 فایل jks)، KS_PASS، KEY_ALIAS
4. Actions ← Build APK ← دانلود apk
5. status.json: enabled=false برای خاموشی؛ revoked برای ابطال کلید؛ ads برای تبلیغ.

## نظرسنجی QR
1. Settings ← Pages ← main ← /docs ← Save.
2. script.google.com ← New project ← محتوای docs/Code.gs را جایگزین کن ← تابع setup را Run کن و مجوز بده.
3. Deploy ← New deployment ← Web app ← Execute as: Me ← Who has access: Anyone ← آدرس را کپی کن.
4. آدرس را در docs/feedback.html به‌جای SCRIPT بگذار و آیدی‌ها را عوض کن.
5. در www/config.js مقدار FEEDBACK و آیدی‌ها را عوض کن و دوباره Build APK بزن.
