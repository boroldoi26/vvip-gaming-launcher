# VVIP Gaming Room — Vercel Launcher

Facebook / Messenger / Instagram in-app browser-аас VVIP Gaming Room-ийн захиалгын сайтыг нээхэд зориулсан хөнгөн launcher page.

## Үндсэн захиалгын сайт

Google Apps Script Web App:

`https://script.google.com/macros/s/AKfycbyl6AV0U2wWrYHEQfx8wthMioiJAcL_CKfGx5ODTrddIC28vwRVrikkiS5F5_Du07IX/exec`

## Deploy: GitHub → Vercel

1. Vercel → **Add New → Project**.
2. GitHub account-аа холбоод `vvip-gaming-launcher` repository-г **Import** хийнэ.
3. Framework Preset: **Other**.
4. Root Directory: `./`.
5. Build Command болон Output Directory-г хоосон хэвээр үлдээнэ.
6. **Deploy** дарна.

Ингэсний дараа Vercel URL гарна. Facebook, Messenger, Instagram дээр Google Apps Script-ийн урт холбоосын оронд Vercel URL-ийг ашиглана.

## Auto deploy

`main` branch руу commit/push хийх бүрт Vercel production deployment автоматаар шинэчлэгдэнэ.

## Файлын бүтэц

- `index.html` — launcher UI болон browser-open logic
- `vercel.json` — static hosting / routing тохиргоо
- `.gitignore` — Git-д оруулах шаардлагагүй локал файлууд
- `README.md` — суулгах заавар
