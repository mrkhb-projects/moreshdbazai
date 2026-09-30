/**
 * اسکریپت کوچک و همگام (blocking) که پیش از رندر شدن صفحه اجرا می‌شود تا
 * کلاس «dark» را — در صورت ذخیره‌شدن انتخاب قبلی کاربر در localStorage —
 * روی <html> بگذارد. این کار از چشمک زدن رنگ (FOUC) و ناهماهنگی هیدراسیون
 * جلوگیری می‌کند. پیش‌فرض پروژه همیشه «روشن» است؛ فقط وقتی کاربر قبلاً
 * صریحاً «تاریک» را انتخاب کرده باشد این اسکریپت آن را اعمال می‌کند.
 */
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("mb-theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
