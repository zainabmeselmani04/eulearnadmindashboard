
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
// ========================================
// Default Student Data
// ========================================

const starterStudents = [
    {
        id: "S001",
        name: "Sarah Ahmad",
        email: "sarah@gmail.com",
        phone: "70123456",
        course: "Web Development",
        date: "2026-11-01",
        status: "Approved",
        message: "Interested in learning web development."
    },
    {
        id: "S002",
        name: "Mohammad Ali",
        email: "mohammad@gmail.com",
        phone: "76123456",
        course: "Python Programming",
        date: "2026-11-03",
        status: "Pending",
        message: "I want to learn Python."
    },
    {
        id: "S003",
        name: "Lina Hassan",
        email: "lina@gmail.com",
        phone: "81123456",
        course: "Graphic Design",
        date: "2026-11-05",
        status: "Approved",
        message: "Interested in graphic design."
    },
    {
        id: "S004",
        name: "Omar Khalil",
        email: "omar@gmail.com",
        phone: "71111222",
        course: "Data Analysis",
        date: "2026-11-07",
        status: "Pending",
        message: "I want to improve my data analysis skills."
    },
    {
        id: "S005",
        name: "Maya Ibrahim",
        email: "maya@gmail.com",
        phone: "76111999",
        course: "Digital Marketing",
        date: "2026-11-10",
        status: "Rejected",
        message: "Interested in digital marketing."
    }
];

// Save default students only once
if (!localStorage.getItem(KEY_R)) {
    write(KEY_R, starterStudents);
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

    const menu = $("menu");
    const sidebar = $("sidebar");

    // Open and close menu using burger icon
    menu.onclick = (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("open");
    };

    // Close menu when clicking outside the sidebar
    document.addEventListener("click", (e) => {

        if (
            sidebar.classList.contains("open") &&
            !sidebar.contains(e.target) &&
            !menu.contains(e.target)
        ) {
            sidebar.classList.remove("open");
        }

    });

    // Close menu when pressing Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            sidebar.classList.remove("open");
        }
    });
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
