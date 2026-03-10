// Vercel Serverless Function: /api/sync-tugas
// Auto-fetches assignments from Moodle using stored credentials

export default async function handler(req, res) {
  // Allow both GET and POST
  var MOODLE_URL = "https://kuliah.uajy.ac.id";
  var username = process.env.MOODLE_USER || "241712918";
  var password = process.env.MOODLE_PASS || "Deltaoga2219.";

  try {
    // Step 1: Get token
    var tokenUrl =
      MOODLE_URL +
      "/login/token.php?username=" +
      encodeURIComponent(username) +
      "&password=" +
      encodeURIComponent(password) +
      "&service=moodle_mobile_app";

    var tokenRes = await fetch(tokenUrl);
    var tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.token) {
      return res.status(401).json({
        error: "Login gagal: " + (tokenData.error || "Token tidak ditemukan"),
      });
    }

    var token = tokenData.token;

    // Step 2: Get user info
    var userInfoRes = await fetch(
      MOODLE_URL +
        "/webservice/rest/server.php?wstoken=" +
        token +
        "&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json"
    );
    var userInfo = await userInfoRes.json();

    if (userInfo.exception) {
      return res.status(500).json({ error: "Gagal mengambil info user" });
    }

    var userid = userInfo.userid;

    // Step 3: Get enrolled courses
    var coursesRes = await fetch(
      MOODLE_URL +
        "/webservice/rest/server.php?wstoken=" +
        token +
        "&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=" +
        userid
    );
    var courses = await coursesRes.json();

    if (!Array.isArray(courses)) {
      return res.status(500).json({ error: "Gagal mengambil daftar mata kuliah" });
    }

    // Step 4: Get assignments for all courses
    var courseIds = courses.map(function (c) {
      return c.id;
    });

    var courseIdsParam = courseIds
      .map(function (id, i) {
        return "courseids[" + i + "]=" + id;
      })
      .join("&");

    var assignRes = await fetch(
      MOODLE_URL +
        "/webservice/rest/server.php?wstoken=" +
        token +
        "&wsfunction=mod_assign_get_assignments&moodlewsrestformat=json&" +
        courseIdsParam
    );
    var assignData = await assignRes.json();

    if (assignData.exception) {
      return res.status(500).json({ error: "Gagal mengambil tugas" });
    }

    // Step 5: Collect all assignments
    var allAssignments = [];

    if (assignData.courses && Array.isArray(assignData.courses)) {
      assignData.courses.forEach(function (course) {
        if (course.assignments && Array.isArray(course.assignments)) {
          course.assignments.forEach(function (assign) {
            allAssignments.push({
              id: assign.id,
              courseId: course.id,
              courseName: course.fullname || course.shortname || "",
              courseShortName: course.shortname || "",
              name: assign.name || "",
              duedate: assign.duedate || 0,
              intro: assign.intro || "",
              introPlain: assign.intro
                ? assign.intro.replace(/<[^>]*>/g, "").trim()
                : "",
              status: "new",
              submissionStatus: null,
              gradingStatus: null,
            });
          });
        }
      });
    }

    // Step 6: Get submission statuses
    var statusPromises = allAssignments.map(async function (assign) {
      try {
        var statusRes = await fetch(
          MOODLE_URL +
            "/webservice/rest/server.php?wstoken=" +
            token +
            "&wsfunction=mod_assign_get_submission_status&moodlewsrestformat=json&assignid=" +
            assign.id
        );
        var statusData = await statusRes.json();

        if (statusData.lastattempt && statusData.lastattempt.submission) {
          assign.submissionStatus =
            statusData.lastattempt.submission.status || "new";
          assign.status = assign.submissionStatus;
        }
        if (statusData.lastattempt && statusData.lastattempt.gradingstatus) {
          assign.gradingStatus = statusData.lastattempt.gradingstatus;
        }
      } catch (_e) {
        assign.status = "unknown";
      }
      return assign;
    });

    await Promise.all(statusPromises);

    // Step 7: Filter and format results
    var now = Math.floor(Date.now() / 1000);
    var thirtyDaysAgo = now - 30 * 24 * 60 * 60;

    var result = allAssignments
      .filter(function (a) {
        // Show tasks from last 30 days or future
        return a.duedate === 0 || a.duedate > thirtyDaysAgo;
      })
      .map(function (a) {
        return {
          id: a.id,
          courseName: a.courseName,
          courseShortName: a.courseShortName,
          courseId: a.courseId,
          name: a.name,
          duedate: a.duedate,
          duedateISO: a.duedate
            ? new Date(a.duedate * 1000).toISOString()
            : null,
          intro: a.introPlain,
          status: a.status,
          gradingStatus: a.gradingStatus,
        };
      })
      .sort(function (a, b) {
        if (a.duedate === 0) return 1;
        if (b.duedate === 0) return -1;
        return a.duedate - b.duedate;
      });

    // Set CORS and cache headers
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).json({
      success: true,
      studentName: userInfo.fullname || "",
      syncTime: new Date().toISOString(),
      totalTugas: result.length,
      tugas: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Terjadi kesalahan: " + (err.message || "Unknown error"),
    });
  }
}
