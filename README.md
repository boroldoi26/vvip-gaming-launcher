# VVIP Gaming Room — GitHub Pages Booking

Энэ repository-г `objectives-dashboard`-тай ижил архитектуртай болгосон:

**Facebook / Messenger / Instagram → GitHub Pages frontend → Apps Script API → Google Sheet + Calendar + Email**

Ингэснээр хэрэглэгч Facebook дотроос Google Apps Script-ийн HTML page руу шууд шилжихгүй. Захиалгын UI нь GitHub Pages дээр static байдлаар нээгдэж, Apps Script зөвхөн API/backend үүрэг гүйцэтгэнэ.

## 1. GitHub Pages асаах

Repository → **Settings → Pages**

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/ (root)**
- Save

Дараа нь сайт ерөнхийдөө:

`https://boroldoi26.github.io/vvip-gaming-launcher/`

хаягаар ажиллана.

## 2. Apps Script backend-ийн зайлшгүй өөрчлөлт

Одоогийн Apps Script `Code.gs` дотор байгаа хуучин `doGet(e)` функцийг repository дахь:

`apps-script/DOGET_REPLACEMENT.gs`

файлын `doGet(e)` функцээр солино. Мөн `apiOutput_()` функцийг Code.gs-д нэмнэ.

Дараа нь:

**Deploy → Manage deployments → Edit → New version → Deploy**

хийж шинэ version нийтэлнэ.

> `setupBookingSystem()`-ийг дахин ажиллуулах шаардлагагүй, хэрэв sheet/form/trigger-үүд өмнө нь аль хэдийн тохирсон бол.

## 3. API URL

`assets/config.js` дотор одоогийн Apps Script `/exec` URL тохируулагдсан:

`https://script.google.com/macros/s/AKfycbyl6AV0U2wWrYHEQfx8wthMioiJAcL_CKfGx5ODTrddIC28vwRVrikkiS5F5_Du07IX/exec`

Хэрэв шинэ deployment URL өөрчлөгдвөл зөвхөн энэ файлын URL-г солино.

## 4. Ажиллах боломжууд

- Mobile responsive booking UI
- Calendar дээр өдөр бүрийн day/night availability
- Сул / pending / confirmed статус
- Өдөр, ээлж сонгох
- Нэр, утас, optional email, хүний тоо, нэмэлт хүсэлт
- Захиалгыг Google Sheet + Calendar руу хадгалах
- Админ email confirmation/cancel workflow хэвээр
- Customer confirmation/reminder/feedback email workflow хэвээр
- Google Maps байрлал

## Файлын бүтэц

- `index.html` — GitHub Pages frontend
- `assets/config.js` — Apps Script API URL
- `apps-script/DOGET_REPLACEMENT.gs` — Apps Script API bridge
- `.nojekyll` — GitHub Pages static hosting
- `vercel.json` — хүсвэл Vercel дээр мөн deploy хийж болно

## Facebook дээр ашиглах URL

Facebook post, Page button, Messenger, Instagram bio дээр **Apps Script `/exec` URL биш**, GitHub Pages URL-ээ тавина:

`https://boroldoi26.github.io/vvip-gaming-launcher/`
