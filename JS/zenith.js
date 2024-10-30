// zenith-app.js

const ZenithApp = {
  timeLeft: 25 * 60,
  timerInterval: null,
  quotes: [
    "Every day is a new opportunity.",
    "You are stronger than you think.",
    "Small progress leads to big changes.",
    "Believe in yourself.",
    "Your attitude determines your direction.",
    "The only way to do great work is to love what you do.",
    "Start where you are. Use what you have. Do what you can.",
    "The future depends on what you do today.",
    "Don't count the days, make the days count.",
    "Difficult roads often lead to beautiful destinations.",
  ],

  // Navigation Methods
  openSection(sectionName) {
    document
      .getElementById(`zenith-${sectionName}-section`)
      .classList.add("zenith-section-active");
    // Hide main grid when showing a section
    document.querySelector(".zenith-container").style.display = "none";
  },

  closeSection(sectionName) {
    document
      .getElementById(`zenith-${sectionName}-section`)
      .classList.remove("zenith-section-active");
    // Show main grid when closing a section
    document.querySelector(".zenith-container").style.display = "flex";
  },

  goBack() {
    // Close all sections and show main grid
    const activeSections = document.querySelectorAll(".zenith-section-active");
    activeSections.forEach((section) => {
      section.classList.remove("zenith-section-active");
    });
    document.querySelector(".zenith-container").style.display = "flex";
  },

  // Diary Methods
  saveDiaryEntry() {
    const text = document.getElementById("zenith-diary-text").value;
    if (!text) return;

    const date = new Date().toLocaleDateString();
    const id = Date.now();
    let entries = JSON.parse(
      localStorage.getItem("zenith-diary-entries") || "[]"
    );
    entries.unshift({ id, date, text }); // Add new entries at the beginning
    localStorage.setItem("zenith-diary-entries", JSON.stringify(entries));

    this.displayDiaryEntries();
    document.getElementById("zenith-diary-text").value = "";
  },

  deleteDiaryEntry(id) {
    if (confirm("Are you sure you want to delete this entry?")) {
      let entries = JSON.parse(
        localStorage.getItem("zenith-diary-entries") || "[]"
      );
      entries = entries.filter((entry) => entry.id !== id);
      localStorage.setItem("zenith-diary-entries", JSON.stringify(entries));
      this.displayDiaryEntries();
    }
  },

  displayDiaryEntries() {
    const entries = JSON.parse(
      localStorage.getItem("zenith-diary-entries") || "[]"
    );
    const container = document.getElementById("zenith-diary-entries");
    container.innerHTML = entries
      .map(
        (entry) => `
            <div class="zenith-diary-entry">
                <button class="zenith-delete-btn" onclick="ZenithApp.deleteDiaryEntry(${
                  entry.id
                })">×</button>
                <div class="zenith-entry-date">${entry.date}</div>
                <div class="zenith-entry-text">${this.formatText(
                  entry.text
                )}</div>
            </div>
        `
      )
      .join("");
  },

  formatText(text) {
    // Convert URLs to clickable links and preserve line breaks
    return text
      .replace(/\n/g, "<br>")
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
  },

  // Goals Methods
  addGoal() {
    const goalInput = document.getElementById("zenith-goal-input");
    const goalText = goalInput.value.trim();
    if (!goalText) return;

    let goals = JSON.parse(localStorage.getItem("zenith-goals") || "[]");
    const newGoal = {
      id: Date.now(),
      text: goalText,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    goals.push(newGoal);
    localStorage.setItem("zenith-goals", JSON.stringify(goals));

    this.displayGoals();
    goalInput.value = "";
  },

  toggleGoal(id) {
    let goals = JSON.parse(localStorage.getItem("zenith-goals") || "[]");
    const index = goals.findIndex((goal) => goal.id === id);
    if (index !== -1) {
      goals[index].completed = !goals[index].completed;
      localStorage.setItem("zenith-goals", JSON.stringify(goals));
      this.displayGoals();
    }
  },

  deleteGoal(id) {
    if (confirm("Are you sure you want to delete this goal?")) {
      let goals = JSON.parse(localStorage.getItem("zenith-goals") || "[]");
      goals = goals.filter((goal) => goal.id !== id);
      localStorage.setItem("zenith-goals", JSON.stringify(goals));
      this.displayGoals();
    }
  },

  displayGoals() {
    const goals = JSON.parse(localStorage.getItem("zenith-goals") || "[]");
    const list = document.getElementById("zenith-goals-list");

    // Sort goals: incomplete first, then by creation date
    const sortedGoals = goals.sort((a, b) => {
      if (a.completed === b.completed) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a.completed ? 1 : -1;
    });

    list.innerHTML = sortedGoals
      .map(
        (goal) => `
            <li class="zenith-goal-item ${goal.completed ? "completed" : ""}">
                <div class="zenith-goal-content">
                    <input type="checkbox" 
                           ${goal.completed ? "checked" : ""} 
                           onclick="ZenithApp.toggleGoal(${goal.id})">
                    <span>${goal.text}</span>
                </div>
                <button class="zenith-delete-btn" onclick="ZenithApp.deleteGoal(${
                  goal.id
                })">×</button>
            </li>
        `
      )
      .join("");
  },

  // Quotes Methods
  getNewQuote() {
    const quoteElement = document.getElementById("zenith-daily-quote");
    const randomQuote =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];

    // Add fade-out effect
    quoteElement.style.opacity = "0";

    setTimeout(() => {
      quoteElement.textContent = randomQuote;
      quoteElement.style.opacity = "1";
    }, 300);
  },

  // Focus Session Methods
  startFocusSession() {
    if (this.timerInterval) return;

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimer();

      if (this.timeLeft <= 0) {
        this.completeFocusSession();
      }
    }, 1000);

    document.getElementById("zenith-start-btn").disabled = true;
    document.getElementById("zenith-pause-btn").disabled = false;
  },

  pauseFocusSession() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    document.getElementById("zenith-start-btn").disabled = false;
    document.getElementById("zenith-pause-btn").disabled = true;
  },

  resetFocusSession() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.timeLeft = 25 * 60;
    this.updateTimer();
    document.getElementById("zenith-start-btn").disabled = false;
    document.getElementById("zenith-pause-btn").disabled = true;
  },

  completeFocusSession() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;

    // Play notification sound if available
    const audio = new Audio("path-to-notification-sound.mp3");
    audio.play().catch(() => console.log("Audio playback failed"));

    // Show completion notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Focus Session Complete!", {
        body: "Great job! Take a break.",
        icon: "path-to-icon.png",
      });
    }

    alert("Session complete! Take a break.");
    this.resetFocusSession();
  },

  updateTimer() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const display = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.getElementById("zenith-timer").textContent = display;

    // Add progress bar update
    const progressBar = document.getElementById("zenith-timer-progress");
    const totalTime = 25 * 60;
    const progress = ((totalTime - this.timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progress}%`;
  },

  // Audio Methods
  initializeAudioControls() {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.volume = 0.5;

      // Save volume preference
      audio.addEventListener("volumechange", () => {
        localStorage.setItem("zenith-audio-volume", audio.volume);
      });
    });

    // Restore volume preference
    const savedVolume = localStorage.getItem("zenith-audio-volume");
    if (savedVolume !== null) {
      audioElements.forEach((audio) => {
        audio.volume = parseFloat(savedVolume);
      });
    }
  },

  // Utility Methods
  requestNotificationPermission() {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  },

  // Initialize Application
  init() {
    // Initialize all components
    this.displayDiaryEntries();
    this.displayGoals();
    this.getNewQuote();
    this.initializeAudioControls();
    this.requestNotificationPermission();

    // Add keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Escape key to go back
      if (e.key === "Escape") {
        this.goBack();
      }

      // Ctrl/Cmd + S to save diary entry
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "s" &&
        document.getElementById("zenith-diary-text") === document.activeElement
      ) {
        e.preventDefault();
        this.saveDiaryEntry();
      }
    });

    // Handle window focus for timer accuracy
    window.addEventListener("focus", () => {
      if (this.timerInterval) {
        this.updateTimer();
      }
    });

    // Save state before page unload
    window.addEventListener("beforeunload", () => {
      if (this.timerInterval) {
        localStorage.setItem(
          "zenith-timer-state",
          JSON.stringify({
            timeLeft: this.timeLeft,
            isRunning: true,
          })
        );
      }
    });

    // Restore timer state if needed
    const savedTimerState = localStorage.getItem("zenith-timer-state");
    if (savedTimerState) {
      const { timeLeft, isRunning } = JSON.parse(savedTimerState);
      this.timeLeft = timeLeft;
      this.updateTimer();
      if (isRunning) {
        this.startFocusSession();
      }
      localStorage.removeItem("zenith-timer-state");
    }
  },
};

// Initialize the app when the document is ready
document.addEventListener("DOMContentLoaded", () => {
  ZenithApp.init();
});
