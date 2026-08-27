// 모바일 메뉴 토글 + 다크/라이트 모드 토글 (모든 페이지 공용)
document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var isOpen = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  var THEME_KEY = "mbti-theme";
  var themeToggle = document.getElementById("theme-toggle");

  function updateToggleLabel(theme) {
    if (!themeToggle) return;
    var nextTheme = theme === "dark" ? "light" : "dark";
    var label = nextTheme === "dark" ? "다크 모드로 전환" : "라이트 모드로 전환";
    themeToggle.setAttribute("aria-label", label);
  }

  updateToggleLabel(document.documentElement.getAttribute("data-theme") || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      updateToggleLabel(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
    });
  }
});
