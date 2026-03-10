/* ===== THEME TOGGLE ===== */
(function () {
  var toggle = document.querySelector("[data-theme-toggle]");
  var root = document.documentElement;
  var currentTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  root.setAttribute("data-theme", currentTheme);
  updateIcon();

  if (toggle) {
    toggle.addEventListener("click", function () {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", currentTheme);
      toggle.setAttribute(
        "aria-label",
        "Switch to " + (currentTheme === "dark" ? "light" : "dark") + " mode"
      );
      updateIcon();
    });
  }

  function updateIcon() {
    if (!toggle) return;
    toggle.innerHTML =
      currentTheme === "dark"
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

/* ===== DATA ===== */
var SCHEDULE = [
  {
    day: 1,
    dayName: "Senin",
    courses: [
      {
        time: "07:00 — 09:30",
        timeStart: "07:00",
        timeEnd: "09:30",
        name: "Kuliah Lapangan",
        code: "SIFO06401",
        sks: 1,
        room: "Ruang 3223",
        lecturer: "Emanuel Ristian Handoyo, S.T., M.Eng.",
        color: "color-slate",
      },
    ],
  },
  {
    day: 2,
    dayName: "Selasa",
    courses: [
      {
        time: "13:00 — 15:30",
        timeStart: "13:00",
        timeEnd: "15:30",
        name: "Teknologi Informasi untuk Masyarakat",
        code: "SIFO01403",
        sks: 3,
        room: "Ruang 3325 SI",
        lecturer: "Elisabeth Marsela, S.S., M.Li.",
        color: "color-emerald",
      },
    ],
  },
  {
    day: 3,
    dayName: "Rabu",
    courses: [
      {
        time: "10:00 — 12:30",
        timeStart: "10:00",
        timeEnd: "12:30",
        name: "Manajemen Layanan Teknologi Informasi",
        code: "SIFO03403",
        sks: 3,
        room: "Ruang 3223",
        lecturer: "Hendro Gunawan, S.Si., M.T.",
        color: "color-blue",
      },
      {
        time: "13:00 — 15:30",
        timeStart: "13:00",
        timeEnd: "15:30",
        name: "Manajemen Perubahan dan Inovasi",
        code: "SIFO05403",
        sks: 3,
        room: "Ruang 3326 SI",
        lecturer: "Julius Galih Prima Negara, S.Kom., S.A.P., M.Kom.",
        color: "color-violet",
      },
    ],
  },
  {
    day: 4,
    dayName: "Kamis",
    courses: [
      {
        time: "13:00 — 15:30",
        timeStart: "13:00",
        timeEnd: "15:30",
        name: "Seni Komunikasi",
        code: "SIFO04303",
        sks: 3,
        room: "Ruang 3326 SI",
        lecturer: "Drs. Josep J. Darmawan, M.A.",
        color: "color-amber",
      },
      {
        time: "16:00 — 18:30",
        timeStart: "16:00",
        timeEnd: "18:30",
        name: "Sistem Informasi Berbasis Web",
        code: "SIFO04403",
        sks: 3,
        room: "Lab Rekayasa Proses Bisnis",
        lecturer: "Rangga Perwiratama, S.T., M.Kom.",
        color: "color-rose",
      },
    ],
  },
  {
    day: 5,
    dayName: "Jumat",
    courses: [
      {
        time: "07:00 — 09:30",
        timeStart: "07:00",
        timeEnd: "09:30",
        name: "Kewirausahaan",
        code: "MKUN06002",
        sks: 2,
        room: "Ruang 3326 SI",
        lecturer: "Generosa Lukhayu Pritalia, S.T., M.Eng.",
        color: "color-orange",
      },
      {
        time: "10:00 — 12:30",
        timeStart: "10:00",
        timeEnd: "12:30",
        name: "Perencanaan Strategis Sistem Informasi",
        code: "SIFO03503",
        sks: 3,
        room: "Ruang 3424 A",
        lecturer: "Emanuel Ristian Handoyo, S.T., M.Eng.",
        color: "color-teal",
      },
      {
        time: "13:00 — 15:30",
        timeStart: "13:00",
        timeEnd: "15:30",
        name: "Masyarakat Digital",
        code: "MKUN05002",
        sks: 2,
        room: "Lab Rekayasa Proses Bisnis",
        lecturer: "Citra Yayu Palangan, S.T., M.Sc.",
        color: "color-cyan",
      },
    ],
  },
];

var DAY_NAMES = [
  "",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

var MONTHS_FULL = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

var MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

var DAY_NAMES_FULL = [
  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",
];

/* ===== DATE HELPERS ===== */
function getMondayOfCurrentWeek() {
  var now = new Date();
  var jsDay = now.getDay(); // 0=Sun, 1=Mon...
  var diff = jsDay === 0 ? -6 : 1 - jsDay;
  var monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getDateForDay(dayIndex) {
  // dayIndex: 1=Mon, 2=Tue, ..., 5=Fri
  var monday = getMondayOfCurrentWeek();
  var target = new Date(monday);
  target.setDate(monday.getDate() + (dayIndex - 1));
  return target;
}

function formatDateShort(date) {
  return date.getDate() + " " + MONTHS_SHORT[date.getMonth()];
}

function formatDateFull(date) {
  return date.getDate() + " " + MONTHS_FULL[date.getMonth()] + " " + date.getFullYear();
}

function formatDateWithDay(date) {
  return DAY_NAMES_FULL[date.getDay()] + ", " + formatDateFull(date);
}

/* ===== DYNAMIC DATES & TODAY HIGHLIGHT ===== */
function updateDynamicDates() {
  var now = new Date();
  var jsDay = now.getDay(); // 0=Sun, 1=Mon
  var dayMap = {
    0: "Minggu",
    1: "Senin",
    2: "Selasa",
    3: "Rabu",
    4: "Kamis",
    5: "Jumat",
    6: "Sabtu",
  };

  // Update "Hari Ini" stat
  var el = document.getElementById("current-day");
  if (el) el.textContent = dayMap[jsDay] || "—";

  // Update date on each day header
  document.querySelectorAll("[data-day]").forEach(function (dateEl) {
    var dayIndex = parseInt(dateEl.getAttribute("data-day"));
    var targetDate = getDateForDay(dayIndex);
    dateEl.textContent = formatDateFull(targetDate);
  });

  // Highlight today column
  var columns = document.querySelectorAll(".day-column");
  columns.forEach(function (col) {
    var header = col.querySelector(".day-header");
    if (header) header.classList.remove("today");
  });
  var todayIndex = jsDay - 1; // Mon=0, Tue=1...
  if (todayIndex >= 0 && todayIndex < columns.length) {
    var header = columns[todayIndex].querySelector(".day-header");
    if (header) header.classList.add("today");
  }

  // Update week range in header if element exists
  var weekRangeEl = document.getElementById("week-range");
  if (weekRangeEl) {
    var mondayDate = getDateForDay(1);
    var fridayDate = getDateForDay(5);
    weekRangeEl.textContent = formatDateShort(mondayDate) + " — " + formatDateShort(fridayDate) + " " + fridayDate.getFullYear();
  }
}

/* ===== INIT DATES ===== */
updateDynamicDates();

/* ===== AUTO-REFRESH AT MIDNIGHT ===== */
(function scheduleMidnightRefresh() {
  var now = new Date();
  var midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  var msUntilMidnight = midnight.getTime() - now.getTime();

  setTimeout(function () {
    updateDynamicDates();
    scheduleMidnightRefresh();
  }, msUntilMidnight);
})();

/* ===== COURSE-TO-DAY MAPPING ===== */
// Maps course name substrings to the day they occur (1=Mon, 2=Tue, etc.)
var COURSE_DAY_MAP = {
  "Kuliah Lapangan": 1,
  "Teknologi Informasi untuk Masyarakat": 2,
  "Manajemen Layanan": 3,
  "Manajemen Perubahan": 3,
  "Seni Komunikasi": 4,
  "Sistem Informasi Berbasis Web": 4,
  "Kewirausahaan": 5,
  "Perencanaan Strategis": 5,
  "Masyarakat Digital": 5,
};

function matchCourseToDay(courseName) {
  var name = courseName.toLowerCase();
  var keys = Object.keys(COURSE_DAY_MAP);
  for (var i = 0; i < keys.length; i++) {
    if (name.indexOf(keys[i].toLowerCase()) !== -1) {
      return COURSE_DAY_MAP[keys[i]];
    }
  }
  return null;
}

/* ===== SYNC TUGAS ===== */
var syncedTugas = [];

function openSyncModal() {
  document.getElementById("syncModal").classList.remove("hidden");
  document.getElementById("syncError").classList.add("hidden");
}

function closeSyncModal() {
  document.getElementById("syncModal").classList.add("hidden");
}

// Close modal on overlay click
document.getElementById("syncModal").addEventListener("click", function (e) {
  if (e.target === this) closeSyncModal();
});

function handleSync(e) {
  e.preventDefault();
  var username = document.getElementById("moodleUser").value.trim();
  var password = document.getElementById("moodlePass").value;
  var submitBtn = document.getElementById("syncSubmitBtn");
  var errorEl = document.getElementById("syncError");
  var statusEl = document.getElementById("syncStatus");

  if (!username || !password) return;

  // Show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Mengambil data...';
  errorEl.classList.add("hidden");

  fetch("/api/sync-tugas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Ambil Data Tugas';

      if (data.error) {
        errorEl.textContent = data.error;
        errorEl.classList.remove("hidden");
        return;
      }

      if (data.success) {
        syncedTugas = data.tugas || [];
        renderTugasOnSchedule();
        closeSyncModal();

        var now = new Date();
        var timeStr =
          String(now.getHours()).padStart(2, "0") +
          ":" +
          String(now.getMinutes()).padStart(2, "0");
        statusEl.textContent =
          syncedTugas.length + " tugas ditemukan (sync " + timeStr + ")";
        statusEl.classList.add("sync-success");
      }
    })
    .catch(function (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Ambil Data Tugas';
      errorEl.textContent = "Gagal terhubung ke server: " + (err.message || "");
      errorEl.classList.remove("hidden");
    });
}

function renderTugasOnSchedule() {
  // Clear all existing tugas displays
  document.querySelectorAll(".tugas-container").forEach(function (el) {
    el.innerHTML = "";
  });

  if (syncedTugas.length === 0) return;

  // Group tugas by day
  var tugasByDay = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  var unmapped = [];

  syncedTugas.forEach(function (t) {
    var day = matchCourseToDay(t.courseName);
    if (day && tugasByDay[day]) {
      tugasByDay[day].push(t);
    } else {
      unmapped.push(t);
    }
  });

  // Render tugas into each day column
  Object.keys(tugasByDay).forEach(function (dayKey) {
    var container = document.querySelector(
      '[data-tugas-day="' + dayKey + '"]'
    );
    if (!container) return;

    var tasks = tugasByDay[dayKey];
    if (tasks.length === 0) return;

    var html = '<div class="tugas-section">';
    html +=
      '<div class="tugas-section-header">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' +
      " Tugas (" +
      tasks.length +
      ")" +
      "</div>";

    tasks.forEach(function (t) {
      var statusClass = "tugas-status-pending";
      if (t.status === "submitted" || t.status === "graded")
        statusClass = "tugas-status-done";

      var deadlineStr = "";
      if (t.duedate && t.duedate > 0) {
        var d = new Date(t.duedate * 1000);
        var now = new Date();
        var diffMs = d.getTime() - now.getTime();
        var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        deadlineStr = d.getDate() + " " + MONTHS_SHORT[d.getMonth()];

        if (diffDays < 0) {
          deadlineStr += " (terlambat)";
          statusClass =
            t.status === "submitted" || t.status === "graded"
              ? "tugas-status-done"
              : "tugas-status-overdue";
        } else if (diffDays <= 3) {
          deadlineStr += " (" + diffDays + " hari lagi)";
          statusClass =
            t.status === "submitted" || t.status === "graded"
              ? "tugas-status-done"
              : "tugas-status-urgent";
        }
      }

      html +=
        '<div class="tugas-item ' +
        statusClass +
        '">' +
        '<div class="tugas-name">' +
        t.name +
        "</div>" +
        '<div class="tugas-meta">' +
        '<span class="tugas-deadline">' +
        (deadlineStr
          ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ' +
            deadlineStr
          : "Tanpa deadline") +
        "</span>" +
        '<span class="tugas-badge ' +
        statusClass +
        '">' +
        t.statusLabel +
        "</span>" +
        "</div>" +
        "</div>";
    });

    html += "</div>";
    container.innerHTML = html;
  });

  // If there are unmapped tasks, add them to a general area
  if (unmapped.length > 0) {
    var generalContainer = document.querySelector(
      '[data-tugas-day="1"]'
    );
    if (generalContainer) {
      var existingHtml = generalContainer.innerHTML;
      var html2 = '<div class="tugas-section tugas-general">';
      html2 +=
        '<div class="tugas-section-header">Tugas Lainnya (' +
        unmapped.length +
        ")</div>";
      unmapped.forEach(function (t) {
        var statusClass2 = "tugas-status-pending";
        if (t.status === "submitted" || t.status === "graded")
          statusClass2 = "tugas-status-done";

        var deadlineStr2 = "";
        if (t.duedate && t.duedate > 0) {
          var d2 = new Date(t.duedate * 1000);
          deadlineStr2 = d2.getDate() + " " + MONTHS_SHORT[d2.getMonth()];
        }

        html2 +=
          '<div class="tugas-item ' +
          statusClass2 +
          '">' +
          '<div class="tugas-name">' +
          t.name +
          "</div>" +
          '<div class="tugas-course-label">' +
          t.courseName +
          "</div>" +
          '<div class="tugas-meta">' +
          '<span class="tugas-deadline">' +
          (deadlineStr2 || "Tanpa deadline") +
          "</span>" +
          '<span class="tugas-badge ' +
          statusClass2 +
          '">' +
          t.statusLabel +
          "</span>" +
          "</div>" +
          "</div>";
      });
      html2 += "</div>";
      generalContainer.innerHTML = existingHtml + html2;
    }
  }
}

/* ===== VIEW SWITCHING ===== */
(function () {
  var btns = document.querySelectorAll("[data-view]");
  var weeklyView = document.getElementById("weekly-view");
  var dailyView = document.getElementById("daily-view");
  var listView = document.getElementById("list-view");
  var examSection = document.getElementById("exam-section");
  var currentDailyDay = new Date().getDay(); // 0=Sun
  // Convert to 1-5 (Mon-Fri), default to 1 if weekend
  if (currentDailyDay === 0 || currentDailyDay === 6) currentDailyDay = 1;

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      var view = btn.getAttribute("data-view");

      weeklyView.classList.toggle("hidden", view !== "weekly");
      dailyView.classList.toggle("hidden", view !== "daily");
      listView.classList.toggle("hidden", view !== "list");

      if (examSection) {
        examSection.classList.toggle("hidden", view === "list");
      }

      if (view === "daily") {
        renderDailyView(currentDailyDay);
      }
    });
  });

  function renderDailyView(jsDay) {
    currentDailyDay = jsDay;
    var dayData = SCHEDULE.find(function (s) {
      return s.day === jsDay;
    });
    var dayName = DAY_NAMES[jsDay] || "—";

    // Get the date for this day
    var targetDate = getDateForDay(jsDay);
    var dateStr = formatDateFull(targetDate);

    var html =
      '<div class="daily-nav">' +
      '<button class="daily-nav-btn" data-daily-prev aria-label="Previous day">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
      "</button>" +
      '<div class="daily-day-info">' +
      '<span class="daily-day-label">' +
      dayName +
      "</span>" +
      '<span class="daily-day-date">' +
      dateStr +
      "</span>" +
      "</div>" +
      '<button class="daily-nav-btn" data-daily-next aria-label="Next day">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      "</button>" +
      "</div>";

    if (dayData && dayData.courses.length > 0) {
      html += '<div class="daily-cards">';
      dayData.courses.forEach(function (c) {
        html +=
          '<div class="daily-card ' +
          c.color +
          '">' +
          '<div class="daily-time-block">' +
          '<span class="daily-time-start">' +
          c.timeStart +
          "</span>" +
          '<div class="daily-time-divider"></div>' +
          '<span class="daily-time-end">' +
          c.timeEnd +
          "</span>" +
          "</div>" +
          '<div class="daily-info">' +
          '<div class="daily-course-name">' +
          c.name +
          "</div>" +
          '<div class="daily-course-details">' +
          '<div class="daily-detail-row">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' +
          "<span>" +
          c.code +
          " &middot; " +
          c.sks +
          " SKS</span>" +
          "</div>" +
          '<div class="daily-detail-row">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
          "<span>" +
          c.room +
          "</span>" +
          "</div>" +
          '<div class="daily-detail-row">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          "<span>" +
          c.lecturer +
          "</span>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
      });
      html += "</div>";
    } else {
      html +=
        '<div class="daily-no-class">' +
        '<div class="daily-no-class-icon">&#128564;</div>' +
        '<div class="daily-no-class-text">Tidak ada kelas</div>' +
        '<div class="daily-no-class-sub">Nikmati waktu luangmu!</div>' +
        "</div>";
    }

    dailyView.innerHTML = html;

    // Bind nav buttons
    var prevBtn = dailyView.querySelector("[data-daily-prev]");
    var nextBtn = dailyView.querySelector("[data-daily-next]");

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        var prev = currentDailyDay - 1;
        if (prev < 1) prev = 7;
        renderDailyView(prev);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        var next = currentDailyDay + 1;
        if (next > 7) next = 1;
        renderDailyView(next);
      });
    }
  }
})();
