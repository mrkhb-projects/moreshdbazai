# مرشد بازاری

پلتفرم مشاوره اقتصادی و مالی هوشمند برای بازار ایران. «مرشد بازاری» قیمت لحظه‌ای
دلار، یورو، طلا و سکه را (با اتصال به سرویس داده عمومی [tgju.org](https://www.tgju.org))
رصد می‌کند و بر پایه‌ی یک قاعده ساده و شفاف، به کاربر می‌گوید همین الان بهتر است
بخرد، بفروشد یا نگه‌دارد.

> ⚠️ سیگنال‌های این پروژه صرفاً آموزشی هستند و توصیه مالی رسمی محسوب نمی‌شوند.

## فهرست مطالب

- [تکنولوژی‌ها](#تکنولوژیها)
- [ساختار پروژه](#ساختار-پروژه)
- [نصب محلی](#نصب-محلی)
- [اجرای Development](#اجرای-development)
- [اجرای Production](#اجرای-production)
- [متغیرهای محیطی](#متغیرهای-محیطی)
- [ساخت Build](#ساخت-build)
- [فونت پروژه (باوان)](#فونت-پروژه-باوان)
- [اجرای روی Liara](#اجرای-روی-liara)
- [اتصال دامنه](#اتصال-دامنه)
- [اتصال دیتابیس (PostgreSQL)](#اتصال-دیتابیس-postgresql)
- [Deploy خودکار از GitHub](#deploy-خودکار-از-github)
- [رفع خطاهای متداول](#رفع-خطاهای-متداول)

## تکنولوژی‌ها

- **Next.js 16 (App Router)** + **React 19** + **TypeScript**
- **Tailwind CSS v4** برای استایل‌دهی (بدون وابستگی به CDN خارجی)
- فونت فارسی محلی (فعلاً وزیرمتن به‌عنوان جایگزین موقت فونت باوان)
- بدون دیتابیس در نسخه فعلی (داده نمونه) — ساختار آماده افزودن **PostgreSQL + Prisma**
- بدون هیچ وابستگی به Vercel، Netlify، Firebase یا Supabase

## ساختار پروژه

```
app/                    # صفحات و مسیرهای API (App Router)
  api/health/           # مسیر سلامت سرویس
  api/prices/           # دریافت قیمت‌ها (سرور)
  api/auth/             # درخواست/تایید کد یک‌بارمصرف (Mock)
  (marketing)/about/    # صفحه درباره ما
  (marketing)/contact/  # صفحه تماس با ما
  prices/               # صفحه قیمت‌های لحظه‌ای
  signals/              # صفحه سیگنال خرید/فروش
  login/                # صفحه ورود
components/
  ui/                   # کامپوننت‌های پایه (Button, Card, EmptyState, ...)
  layout/               # Header, Footer
  home/                 # بخش‌های صفحه اصلی
  prices/               # کامپوننت‌های مرتبط با قیمت و سیگنال
  auth/                 # فرم ورود با OTP
lib/                    # منطق سرور: tgju.ts, signals.ts, format.ts, session.ts, ...
types/                  # تایپ‌های TypeScript مشترک
prisma/                 # schema.prisma (اسکلت آماده برای توسعه‌های آینده)
public/                 # فایل‌های استاتیک، فونت‌ها، آیکون‌ها
styles/                 # fonts.css (تعریف فونت Bavan)
.github/workflow-templates/deploy.yml.txt  # قالب GitHub Actions (نحوه فعال‌سازی در ادامه)
```

## نصب محلی

پیش‌نیاز: **Node.js نسخه ۲۰ یا بالاتر** و npm.

```bash
git clone https://github.com/mrkhb-projects/moreshdbazai.git
cd moreshdbazai
npm install
cp .env.example .env.local
```

## اجرای Development

```bash
npm run dev
```

سپس آدرس `http://localhost:3000` را باز کنید. در این حالت اگر سرویس tgju در
دسترس نباشد، برنامه به‌صورت خودکار از داده نمونه استفاده می‌کند و هرگز خطا
نمی‌دهد.

## اجرای Production

اجرای Production دقیقاً با همان منطقی است که Liara هم استفاده می‌کند:

```bash
npm run build
npm start
```

`npm start` به‌صورت پیش‌فرض روی پورت ۳۰۰۰ اجرا می‌شود، اما اگر متغیر محیطی
`PORT` تنظیم شده باشد (دقیقاً مثل محیط Liara)، همان پورت استفاده می‌شود؛ به
همین دلیل هیچ پورتی در کد به‌صورت ثابت (hardcode) نوشته نشده است.

## متغیرهای محیطی

تمام متغیرها در فایل [`.env.example`](./.env.example) مستند شده‌اند. خلاصه:

| متغیر | الزامی؟ | توضیح |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | خیر | آدرس عمومی سایت، برای SEO و Open Graph |
| `NEXT_PUBLIC_SITE_NAME` | خیر | نام نمایشی برند |
| `TGJU_API_URL` | خیر | آدرس سرویس داده قیمت (پیش‌فرض: `call1.tgju.org/ajax.json`) |
| `PRICE_CACHE_SECONDS` | خیر | مدت کش پاسخ قیمت روی سرور (ثانیه) |
| `DATABASE_URL` | خیر (فعلاً) | فقط زمانی لازم است که PostgreSQL را متصل کنید |
| `AUTH_MODE` | خیر | `mock` (پیش‌فرض، توسعه) یا `sms` (سرویس واقعی) |
| `AUTH_SECRET` | **بله در Production** | کلید امضای کوکی نشست؛ یک رشته تصادفی طولانی |
| `SMS_PROVIDER_API_KEY` / `SMS_PROVIDER_SENDER` | فقط در حالت `sms` | اطلاعات سرویس پیامک ایرانی |

هیچ‌کدام از این مقادیر داخل کد نوشته نشده‌اند و فقط از `process.env` خوانده
می‌شوند؛ فایل `.env` واقعی هرگز نباید Commit شود (در `.gitignore` قرار دارد).

## ساخت Build

```bash
npm run build
```

خروجی build در پوشه `.next/` قرار می‌گیرد (در Git ردیابی نمی‌شود).

## فونت پروژه (باوان)

طبق درخواست پروژه، فونت رسمی «باوان» است. چون فایل فونت در یک Google Drive
شخصی قرار داشت و در محیط ساخت این پروژه قابل دانلود مستقیم نبود، فعلاً از
فونت آزاد و متن‌باز **وزیرمتن** (مجوز SIL OFL) با نام خانواده فونت `Bavan`
استفاده شده تا ظاهر فارسی از همین امروز درست باشد.

برای فعال‌سازی فونت واقعی باوان (بدون نیاز به تغییر در کد):

1. فایل‌های وب‌فونت باوان (فرمت `woff2`) را در مسیر `public/fonts/bavan/` با
   نام‌های `Bavan-Regular.woff2`، `Bavan-Medium.woff2`، `Bavan-SemiBold.woff2`
   و `Bavan-Bold.woff2` قرار دهید.
2. فایل [`styles/fonts.css`](./styles/fonts.css) را باز کنید؛ بلاک
   «فونت باوان (نسخه نهایی)» را از حالت کامنت خارج و بلاک «جایگزین موقت» را
   حذف/کامنت کنید.

چون همه‌جای پروژه از `font-family: 'Bavan'` استفاده می‌کند، هیچ کامپوننت یا
کلاس دیگری نیاز به تغییر ندارد.

## اجرای روی Liara

این پروژه مستقیماً با پلتفرم **Next.js لیارا** سازگار است (بدون Docker یا
سرور سفارشی) چون:

- `package.json` شامل اسکریپت‌های استاندارد `dev`, `build`, `start`, `lint` است.
- پورت از متغیر محیطی `PORT` خوانده می‌شود (به‌صورت خودکار توسط CLI/Runtime نکست).
- هیچ وابستگی به `localhost` یا سرویس خارجی برای اجرای اصلی وجود ندارد.

### روش ۱: استقرار دستی با Liara CLI

```bash
npm install -g @liara/cli
liara login
liara deploy --platform=next --port=3000 --app=<شناسه-برنامه-شما>
```

### روش ۲: استقرار با Drag & Drop در پنل Liara

1. پوشه پروژه را (بدون `node_modules` و `.next`) به‌صورت zip کنید.
2. در پنل Liara، «استقرار جدید» و سپس تب «Drag & Drop» را انتخاب کنید.
3. پلتفرم را روی **Next.js** و پورت را روی `3000` تنظیم کنید.

### روش ۳ (پیشنهادی): استقرار خودکار با GitHub Actions

به بخش [Deploy خودکار از GitHub](#deploy-خودکار-از-github) مراجعه کنید.

## اتصال دامنه

1. در پنل Liara، وارد برنامه خود شوید و به تب **Domains** بروید.
2. دامنه اختصاصی خود (مثلاً `moreshdbazari.ir`) را اضافه کنید.
3. رکوردهای DNS پیشنهادی Liara (معمولاً یک رکورد `CNAME` یا `A`) را در پنل
   ثبت‌کننده دامنه‌تان تنظیم کنید.
4. پس از تایید DNS (ممکن است تا چند ساعت طول بکشد)، گواهی SSL به‌صورت خودکار
   توسط Liara صادر می‌شود.
5. مقدار `NEXT_PUBLIC_SITE_URL` را در Environment Variables برنامه به آدرس
   نهایی دامنه به‌روزرسانی کنید تا متادیتای SEO و Open Graph صحیح باشد.

## اتصال دیتابیس (PostgreSQL)

نسخه فعلی پروژه برای سادگی و سرعت، از **داده نمونه** استفاده می‌کند و به
دیتابیس نیاز ندارد. ساختار پروژه اما از قبل برای افزودن PostgreSQL آماده است:

1. در پنل Liara یک دیتابیس **PostgreSQL** بسازید و مقدار Connection String آن
   را کپی کنید.
2. آن را به‌عنوان `DATABASE_URL` در Environment Variables برنامه اضافه کنید
   (هرگز آن را در کد یا Git قرار ندهید).
3. وابستگی‌های Prisma را نصب کنید:
   ```bash
   npm install prisma @prisma/client
   ```
4. مدل‌های نمونه در [`prisma/schema.prisma`](./prisma/schema.prisma) آماده‌اند؛
   Migration اولیه را اجرا کنید:
   ```bash
   npx prisma migrate dev --name init
   ```
5. یک فایل `lib/prisma.ts` بسازید که `PrismaClient` را به‌صورت Singleton
   صادر کند و به‌جای `lib/otp-store.ts` (که فعلاً در حافظه کار می‌کند) از آن
   برای نگهداری کاربران/نشست‌ها استفاده کنید.

## اتصال سرویس پیامک واقعی (احراز هویت)

فعلاً ورود با کد یک‌بارمصرف در **حالت توسعه/Mock** است: کد تایید در لاگ سرور
چاپ می‌شود و در پاسخ API هم (فقط در این حالت) برگردانده می‌شود تا بدون سرویس
پیامک واقعی قابل تست باشد. برای اتصال یک سرویس واقعی ایرانی (کاوه‌نگار،
ملی‌پیامک، ippanel و ...):

1. `AUTH_MODE=sms` را در Environment Variables تنظیم کنید.
2. `SMS_PROVIDER_API_KEY` و `SMS_PROVIDER_SENDER` را مقداردهی کنید.
3. تابع `sendOtpSms` در [`lib/sms.ts`](./lib/sms.ts) را با فراخوانی API واقعی
   آن سرویس تکمیل کنید. بقیه پروژه بدون تغییر باقی می‌ماند.

## Deploy خودکار از GitHub

> ⚠️ **نکته مهم درباره این فایل:** برنامه‌ی GitHub متصل به این محیط (Arena)
> دسترسی `workflows` ندارد، بنابراین نمی‌تواند مستقیماً فایلی در مسیر
> `.github/workflows/` روی گیت‌هاب Push کند. به همین دلیل محتوای این
> Workflow در مسیر
> [`.github/workflow-templates/deploy.yml.txt`](./.github/workflow-templates/deploy.yml.txt)
> ذخیره و Push شده است (نسخه واقعی و اجراشدنی آن هم داخل همین پروژه، در
> مسیر `.github/workflows/deploy.yml` موجود است، فقط روی گیت‌هاب Push
> نشده). برای فعال‌سازی آن یکی از دو راه زیر را انجام دهید:
>
> **راه ۱ (ساده‌تر):** در گیت‌هاب ریپازیتوری، گزینه «Add file → Create new
> file» را بزنید، مسیر را `.github/workflows/deploy.yml` بگذارید و محتوای
> فایل `.github/workflow-templates/deploy.yml.txt` را در آن Paste و Commit
> کنید.
>
> **راه ۲:** به‌صورت محلی این دستورها را اجرا کنید:
> ```bash
> git pull origin arena/01a0f3fe-moreshdbazai
> mkdir -p .github/workflows
> cp .github/workflow-templates/deploy.yml.txt .github/workflows/deploy.yml
> git add .github/workflows/deploy.yml
> git commit -m "ci: add Liara deploy workflow"
> git push origin main   # یا شاخه‌ای که برای Production استفاده می‌کنید
> ```

فایل `deploy.yml` با هر Push روی شاخه `main`، مراحل زیر را به‌صورت خودکار
انجام می‌دهد:

1. Checkout کد
2. نصب Node.js
3. نصب وابستگی‌ها (`npm ci`)
4. اجرای Lint (`npm run lint`)
5. اجرای Build (`npm run build`)
6. نصب Liara CLI
7. اجرای `liara deploy` روی برنامه شما

### تنظیمات لازم در ریپازیتوری GitHub

در مسیر **Settings → Secrets and variables → Actions**:

- یک **Secret** با نام `LIARA_API_TOKEN` بسازید و مقدار توکن API حساب Liara
  خودتان را در آن قرار دهید (توکن هرگز داخل کد یا فایل workflow نوشته
  نمی‌شود).
- (اختیاری) یک **Variable** با نام `LIARA_APP_NAME` بسازید و شناسه برنامه‌تان
  در پنل Liara را وارد کنید. اگر تنظیم نشود، مقدار پیش‌فرض `moreshd-bazari`
  استفاده می‌شود.

### مراحل کامل اتصال GitHub به Liara

1. یک برنامه با پلتفرم **Next.js** در پنل Liara بسازید و شناسه‌ی آن (App ID)
   را یادداشت کنید.
2. در پنل Liara، از بخش **API Tokens**، یک توکن جدید بسازید.
3. در ریپازیتوری GitHub پروژه، Secret نام‌گذاری‌شده `LIARA_API_TOKEN` را با
   همین مقدار بسازید.
4. Variable با نام `LIARA_APP_NAME` را برابر با App ID مرحله ۱ تنظیم کنید (یا
   مستقیماً در فایل `deploy.yml` مقدار `moreshd-bazari` را جایگزین کنید).
5. تغییرات را روی شاخه `main` پوش کنید؛ GitHub Actions به‌صورت خودکار پروژه
   را Build و روی Liara مستقر می‌کند.
6. وضعیت را از تب **Actions** در GitHub و از داشبورد Liara پیگیری کنید.

## رفع خطاهای متداول

| مشکل | راه‌حل |
| --- | --- |
| صفحه در Liara باز نمی‌شود / خطای 502 | مطمئن شوید برنامه به `PORT` محیطی گوش می‌دهد (این پروژه از قبل این‌طور تنظیم شده) و اسکریپت `start` دقیقاً `next start` است. |
| قیمت‌ها نمایش داده نمی‌شوند یا «داده نمونه» نشان داده می‌شود | یعنی سرویس `tgju.org` موقتاً در دسترس نیست یا از شبکه سرور شما قابل دسترسی نیست؛ برنامه به‌جای کرش کردن، به‌صورت شفاف داده نمونه نشان می‌دهد. |
| خطای «AUTH_SECRET تنظیم نشده» | در Environment Variables برنامه، یک مقدار تصادفی و طولانی (مثلاً خروجی `openssl rand -base64 32`) برای `AUTH_SECRET` تنظیم کنید. |
| Build با خطای ESLint متوقف می‌شود | دستور `npm run lint` را محلی اجرا کنید و خطاها را قبل از Push برطرف کنید. |
| فونت باوان نمایش داده نمی‌شود | تا وقتی فایل‌های واقعی فونت باوان در `public/fonts/bavan/` قرار نگرفته‌اند، پروژه به‌صورت موقت از فونت وزیرمتن استفاده می‌کند (بخش [فونت پروژه](#فونت-پروژه-باوان) را ببینید). |
| GitHub Actions با خطای «LIARA_API_TOKEN تنظیم نشده» متوقف می‌شود | Secret مربوطه را طبق بخش [Deploy خودکار از GitHub](#deploy-خودکار-از-github) در تنظیمات ریپازیتوری اضافه کنید. |
