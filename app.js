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

/* ===== AUTO-SYNC TUGAS ===== */
var syncedTugas = [];
var isSyncing = false;
var showCompletedTugas = false;

function getTugasStatus(t) {
  var now = new Date();
  var isSubmitted = t.status === "submitted" || t.status === "graded";

  if (isSubmitted) {
    return { statusLabel: "Selesai", statusClass: "tugas-status-done", isDone: true };
  }

  if (t.duedate && t.duedate > 0) {
    var deadline = new Date(t.duedate * 1000);
    var diffMs = now.getTime() - deadline.getTime();
    var diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours > 24) {
      return {
        statusLabel: "Selesai (tidak dikumpulkan di sini)",
        statusClass: "tugas-status-done-alt",
        isDone: true,
      };
    }
    if (diffHours > 0) {
      return {
        statusLabel: "Belum selesai",
        statusClass: "tugas-status-overdue",
        isDone: false,
      };
    }
    var daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3) {
      return {
        statusLabel: "Belum selesai (" + daysLeft + " hari lagi)",
        statusClass: "tugas-status-urgent",
        isDone: false,
      };
    }
    return { statusLabel: "Belum selesai", statusClass: "tugas-status-pending", isDone: false };
  }

  return { statusLabel: "Belum selesai", statusClass: "tugas-status-pending", isDone: false };
}

function toggleCompletedTugas() {
  showCompletedTugas = !showCompletedTugas;
  renderTugasOnSchedule();
  // Update toggle button text
  var toggleBtn = document.getElementById("tugasToggleBtn");
  if (toggleBtn) {
    toggleBtn.textContent = showCompletedTugas ? "Sembunyikan selesai" : "Tampilkan selesai";
  }
}

function autoSyncTugas() {
  if (isSyncing) return;
  isSyncing = true;

  var indicator = document.getElementById("syncIndicator");
  var refreshBtn = document.getElementById("syncRefreshBtn");

  // Show loading state
  indicator.innerHTML =
    '<svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>' +
    "<span>Mengambil data tugas dari situs kuliah...</span>";
  indicator.className = "sync-indicator sync-loading";
  refreshBtn.classList.add("hidden");

  fetch("/api/sync-tugas")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      isSyncing = false;

      if (data.error) {
        indicator.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
          "<span>Gagal: " + data.error + "</span>";
        indicator.className = "sync-indicator sync-error";
        refreshBtn.classList.remove("hidden");
        return;
      }

      if (data.success) {
        syncedTugas = data.tugas || [];
        renderTugasOnSchedule();
        renderUrgentBanner();

        var now = new Date();
        var timeStr =
          String(now.getHours()).padStart(2, "0") +
          ":" +
          String(now.getMinutes()).padStart(2, "0");

        // Count pending
        var pendingCount = 0;
        syncedTugas.forEach(function (t) {
          if (!getTugasStatus(t).isDone) pendingCount++;
        });
        var summaryText = pendingCount > 0
          ? pendingCount + " tugas belum selesai"
          : "Semua tugas selesai";

        indicator.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
          "<span>" + summaryText + " (sync " + timeStr + ")</span>";
        indicator.className = "sync-indicator sync-success";
        refreshBtn.classList.remove("hidden");
      }
    })
    .catch(function (err) {
      isSyncing = false;
      indicator.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
        "<span>Gagal terhubung: " + (err.message || "") + "</span>";
      indicator.className = "sync-indicator sync-error";
      refreshBtn.classList.remove("hidden");
    });
}

function renderTugasItemHtml(t, showCourse) {
  var s = getTugasStatus(t);

  var deadlineStr = "";
  if (t.duedate && t.duedate > 0) {
    var d = new Date(t.duedate * 1000);
    deadlineStr = d.getDate() + " " + MONTHS_SHORT[d.getMonth()] + " " + d.getFullYear();
    var hours = String(d.getHours()).padStart(2, "0");
    var mins = String(d.getMinutes()).padStart(2, "0");
    deadlineStr += ", " + hours + ":" + mins;
  }

  var introHtml = "";
  if (t.intro && t.intro.trim() !== "") {
    introHtml = '<div class="tugas-detail">' + t.intro + "</div>";
  }

  var courseHtml = "";
  if (showCourse) {
    courseHtml = '<div class="tugas-course-label">' + t.courseName + "</div>";
  }

  return (
    '<div class="tugas-item ' + s.statusClass + '">' +
    '<div class="tugas-name">' + t.name + "</div>" +
    courseHtml +
    introHtml +
    '<div class="tugas-meta">' +
    '<span class="tugas-deadline">' +
    (deadlineStr
      ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ' + deadlineStr
      : "Tanpa deadline") +
    "</span>" +
    '<span class="tugas-badge ' + s.statusClass + '">' + s.statusLabel + "</span>" +
    "</div>" +
    "</div>"
  );
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
    var container = document.querySelector('[data-tugas-day="' + dayKey + '"]');
    if (!container) return;

    var tasks = tugasByDay[dayKey];
    if (tasks.length === 0) return;

    // Split into pending and done
    var pending = [];
    var done = [];
    tasks.forEach(function (t) {
      if (getTugasStatus(t).isDone) {
        done.push(t);
      } else {
        pending.push(t);
      }
    });

    // If hiding completed and nothing pending, skip this day entirely
    if (!showCompletedTugas && pending.length === 0) return;

    var html = '<div class="tugas-section">';

    // Header shows pending count prominently
    var headerLabel = pending.length > 0
      ? "Tugas Belum Selesai (" + pending.length + ")"
      : "Semua Tugas Selesai";
    html +=
      '<div class="tugas-section-header">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> ' +
      headerLabel +
      "</div>";

    // Render pending tugas (always visible)
    pending.forEach(function (t) {
      html += renderTugasItemHtml(t, false);
    });

    // Render done tugas only when toggle is on
    if (done.length > 0 && showCompletedTugas) {
      html += '<div class="tugas-done-divider">Selesai (' + done.length + ')</div>';
      done.forEach(function (t) {
        html += renderTugasItemHtml(t, false);
      });
    }

    html += "</div>";
    container.innerHTML = html;
  });

  // Unmapped tasks
  if (unmapped.length > 0) {
    var generalContainer = document.querySelector('[data-tugas-day="1"]');
    if (generalContainer) {
      var existingHtml = generalContainer.innerHTML;

      var pendingU = [];
      var doneU = [];
      unmapped.forEach(function (t) {
        if (getTugasStatus(t).isDone) { doneU.push(t); } else { pendingU.push(t); }
      });

      var visibleU = showCompletedTugas ? unmapped : pendingU;
      if (visibleU.length > 0) {
        var html2 = '<div class="tugas-section tugas-general">';
        html2 += '<div class="tugas-section-header">Tugas Lainnya (' + visibleU.length + ")</div>";
        visibleU.forEach(function (t) {
          html2 += renderTugasItemHtml(t, true);
        });
        html2 += "</div>";
        generalContainer.innerHTML = existingHtml + html2;
      }
    }
  }

  // Update the toggle button in sync bar
  updateTugasToggleBtn();
}

function updateTugasToggleBtn() {
  var totalDone = 0;
  var totalPending = 0;
  syncedTugas.forEach(function (t) {
    if (getTugasStatus(t).isDone) { totalDone++; } else { totalPending++; }
  });

  var toggleBtn = document.getElementById("tugasToggleBtn");
  if (!toggleBtn) {
    // Create toggle button in sync bar
    var syncBar = document.getElementById("syncBar");
    if (syncBar && totalDone > 0) {
      toggleBtn = document.createElement("button");
      toggleBtn.id = "tugasToggleBtn";
      toggleBtn.className = "tugas-toggle-btn";
      toggleBtn.onclick = toggleCompletedTugas;
      syncBar.insertBefore(toggleBtn, document.getElementById("syncRefreshBtn"));
    }
  }
  if (toggleBtn) {
    if (totalDone > 0) {
      toggleBtn.textContent = showCompletedTugas
        ? "Sembunyikan selesai (" + totalDone + ")"
        : "Tampilkan selesai (" + totalDone + ")";
      toggleBtn.classList.remove("hidden");
    } else {
      toggleBtn.classList.add("hidden");
    }
  }
}

/* ===== URGENT TUGAS BANNER ===== */
function renderUrgentBanner() {
  var existing = document.getElementById("urgentBanner");
  if (existing) existing.remove();

  var now = new Date();
  var urgent = [];

  syncedTugas.forEach(function (t) {
    var s = getTugasStatus(t);
    if (s.isDone) return;

    if (t.duedate && t.duedate > 0) {
      var deadline = new Date(t.duedate * 1000);
      var diffMs = deadline.getTime() - now.getTime();
      var diffHours = diffMs / (1000 * 60 * 60);

      // Show if deadline within next 48 hours or already overdue within 1 day
      if (diffHours <= 48 && diffHours > -24) {
        urgent.push(t);
      }
    }
  });

  if (urgent.length === 0) return;

  var banner = document.createElement("div");
  banner.id = "urgentBanner";
  banner.className = "urgent-banner";

  var label = urgent.length === 1
    ? "1 tugas deadline segera"
    : urgent.length + " tugas deadline segera";

  var items = "";
  urgent.forEach(function (t) {
    var deadline = new Date(t.duedate * 1000);
    var diffMs = deadline.getTime() - now.getTime();
    var diffHours = Math.round(diffMs / (1000 * 60 * 60));
    var timeLabel;
    if (diffHours < 0) {
      timeLabel = "terlambat";
    } else if (diffHours < 1) {
      timeLabel = "< 1 jam lagi";
    } else if (diffHours < 24) {
      timeLabel = diffHours + " jam lagi";
    } else {
      timeLabel = Math.ceil(diffHours / 24) + " hari lagi";
    }
    items += '<span class="urgent-item">' + t.name + ' <span class="urgent-time">(' + timeLabel + ')</span></span>';
  });

  banner.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
    '<div class="urgent-content">' +
    '<strong>' + label + '</strong>' +
    '<div class="urgent-items">' + items + '</div>' +
    '</div>';

  // Insert after sync bar
  var syncBar = document.getElementById("syncBar");
  if (syncBar && syncBar.parentNode) {
    syncBar.parentNode.insertBefore(banner, syncBar.nextSibling);
  }
}

// Auto-sync on page load
autoSyncTugas();

/* ===== LIVE CLASS INDICATOR ===== */
function highlightLiveClass() {
  var now = new Date();
  var jsDay = now.getDay(); // 0=Sun
  // Only highlight on weekdays
  if (jsDay < 1 || jsDay > 5) return;

  var dayData = SCHEDULE.find(function (s) { return s.day === jsDay; });
  if (!dayData) return;

  var nowMins = now.getHours() * 60 + now.getMinutes();

  // Remove old highlights
  document.querySelectorAll(".course-card").forEach(function (card) {
    card.classList.remove("is-live");
    var old = card.querySelector(".live-badge");
    if (old) old.remove();
  });

  dayData.courses.forEach(function (c) {
    var startParts = c.timeStart.split(":");
    var endParts = c.timeEnd.split(":");
    var startMins = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
    var endMins = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);

    if (nowMins >= startMins && nowMins < endMins) {
      var remaining = endMins - nowMins;
      var hrs = Math.floor(remaining / 60);
      var mins = remaining % 60;
      var timeLeft = hrs > 0 ? hrs + " jam " + mins + " menit" : mins + " menit";

      // Find the course card
      var cards = document.querySelectorAll(".course-card");
      cards.forEach(function (card) {
        var nameEl = card.querySelector(".course-name");
        if (nameEl && nameEl.textContent.trim() === c.name) {
          card.classList.add("is-live");
          var badge = document.createElement("div");
          badge.className = "live-badge";
          badge.innerHTML = '<span class="live-dot"></span> Sedang berlangsung &middot; sisa ' + timeLeft;
          card.insertBefore(badge, card.firstChild);
        }
      });
    }
  });
}

highlightLiveClass();
// Refresh every minute
setInterval(highlightLiveClass, 60000);

/* ===== UTS/UAS COUNTDOWN ===== */
function updateExamCountdown() {
  var now = new Date();
  now.setHours(0, 0, 0, 0);

  var exams = [
    { type: "UTS", start: new Date(2026, 3, 20) }, // April 20
    { type: "UAS", start: new Date(2026, 5, 22) }, // June 22
  ];

  exams.forEach(function (exam) {
    var diffMs = exam.start.getTime() - now.getTime();
    var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    var cards = document.querySelectorAll(".exam-card");
    cards.forEach(function (card) {
      var typeEl = card.querySelector(".exam-type");
      if (typeEl && typeEl.textContent.trim() === exam.type) {
        // Remove old countdown
        var old = card.querySelector(".exam-countdown");
        if (old) old.remove();

        var countdownEl = document.createElement("div");
        countdownEl.className = "exam-countdown";

        if (diffDays > 0) {
          countdownEl.textContent = diffDays + " hari lagi";
          if (diffDays <= 7) {
            countdownEl.classList.add("exam-countdown-urgent");
          } else if (diffDays <= 30) {
            countdownEl.classList.add("exam-countdown-soon");
          }
        } else if (diffDays === 0) {
          countdownEl.textContent = "Hari ini!";
          countdownEl.classList.add("exam-countdown-urgent");
        } else {
          countdownEl.textContent = "Sudah lewat";
          countdownEl.classList.add("exam-countdown-past");
        }

        card.appendChild(countdownEl);
      }
    });
  });
}

updateExamCountdown();

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
