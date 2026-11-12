
// ========================================
// EduLearn Academy - Shared JavaScript
// ========================================

const KEY_C = "adminCourses";
const KEY_R = "courseRegistrations";

const $ = id => document.getElementById(id);

// Default courses
const starter = [
    ["web", "Web Development", "Development", "Beginner", "8 Weeks", 120, "Active"],
    ["python", "Python Programming", "Programming", "Beginner", "10 Weeks", 150, "Active"],
    ["data", "Data Analysis", "Data Science", "Intermediate", "6 Weeks", 130, "Active"],
    ["design", "Graphic Design", "Design", "Beginner", "7 Weeks", 110, "Active"],
    ["marketing", "Digital Marketing", "Marketing", "Beginner", "5 Weeks", 90, "Active"],
    ["database", "Database Management", "Technology", "Intermediate", "8 Weeks", 140, "Inactive"]
].map(([id, name, category, level, duration, price, status]) => ({
    id, name, category, level, duration, price, status
}));

// Storage functions
const read = key => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};

const write = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Initialize courses
if (!localStorage.getItem(KEY_C)) {
    write(KEY_C, starter);
}

// Security helper
const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
}[c]));

// Date formatting
const date = v => {
    return v
        ? (!isNaN(new Date(v))
            ? new Date(v).toLocaleDateString()
            : safe(v))
        : "—";
};

// Status badge
const badge = s =>
    `<span class="badge-status ${safe(s)}">${safe(s)}</span>`;

// Unique students
function students() {
    const regs = read(KEY_R);
    const map = new Map();

    regs.forEach(r => {
        const key = (r.email || r.name || r.id || "").toLowerCase();

        if (key && !map.has(key)) {
            map.set(key, r);
        }
    });

    return [...map.values()];
}

// Notification
function note(message) {
    const toastElement = $("toast");

    if (!toastElement) return;

    $("toastText").textContent = message;

    bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

// Current date
if ($("date")) {
    $("date").textContent = new Date().toLocaleDateString(
        undefined,
        {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}

// Mobile menu
if ($("menu")) {
    $("menu").onclick = () => {
        $("sidebar").classList.toggle("open");
    };
}

// Logout
if ($("logout")) {
    $("logout").onclick = () => {
        if (confirm("Return to the academy website?")) {
            location.href = "index.html";
        }
    };
}

// Synchronize changes between browser tabs
window.addEventListener("storage", e => {
    if ([KEY_C, KEY_R].includes(e.key)) {
        location.reload();
    }
});
