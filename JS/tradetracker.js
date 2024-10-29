class TradeJournal {
  constructor() {
    this.trades = JSON.parse(localStorage.getItem("trades")) || [];
    this.form = document.getElementById("tradeForm");
    this.tradesList = document.getElementById("tradesList");
    this.submitButton = document.getElementById("submitButton");
    this.cancelButton = document.getElementById("cancelButton");
    this.editingTradeId = null;

    this.initializeEventListeners();
    this.renderTrades();
  }

  initializeEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.editingTradeId) {
        this.updateTrade();
      } else {
        this.addTrade();
      }
    });

    this.cancelButton.addEventListener("click", () => {
      this.cancelEdit();
    });

    ["entryPrice", "takeProfit", "stopLoss"].forEach((id) => {
      document
        .getElementById(id)
        .addEventListener("input", () => this.calculateRR());
    });
  }

  calculateRR() {
    const entry = parseFloat(document.getElementById("entryPrice").value);
    const tp = parseFloat(document.getElementById("takeProfit").value);
    const sl = parseFloat(document.getElementById("stopLoss").value);

    if (entry && tp && sl) {
      const risk = Math.abs(entry - sl);
      const reward = Math.abs(tp - entry);
      const rr = (reward / risk).toFixed(2);
      console.log(`R:R Ratio: ${rr}`);
    }
  }

  getFormData() {
    return {
      id: document.getElementById("tradeId").value || Date.now(),
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      pair: document.getElementById("pair").value,
      direction: document.getElementById("direction").value,
      entryPrice: document.getElementById("entryPrice").value,
      exitPrice: document.getElementById("exitPrice").value,
      stopLoss: document.getElementById("stopLoss").value,
      takeProfit: document.getElementById("takeProfit").value,
      risk: document.getElementById("risk").value,
      pnl: document.getElementById("pnl").value,
      reason: document.getElementById("reason").value,
      emotions: document.getElementById("emotions").value,
      outcome: document.getElementById("outcome").value,
      notes: document.getElementById("notes").value,
      followedRules: document.getElementById("followedRules").value,
    };
  }

  setFormData(trade) {
    document.getElementById("tradeId").value = trade.id;
    document.getElementById("date").value = trade.date;
    document.getElementById("time").value = trade.time;
    document.getElementById("pair").value = trade.pair;
    document.getElementById("direction").value = trade.direction;
    document.getElementById("entryPrice").value = trade.entryPrice;
    document.getElementById("exitPrice").value = trade.exitPrice;
    document.getElementById("stopLoss").value = trade.stopLoss;
    document.getElementById("takeProfit").value = trade.takeProfit;
    document.getElementById("risk").value = trade.risk;
    document.getElementById("pnl").value = trade.pnl;
    document.getElementById("reason").value = trade.reason;
    document.getElementById("emotions").value = trade.emotions;
    document.getElementById("outcome").value = trade.outcome;
    document.getElementById("notes").value = trade.notes;
    document.getElementById("followedRules").value = trade.followedRules;
  }

  clearForm() {
    document.getElementById("tradeId").value = "";
    this.form.reset();
    this.editingTradeId = null;
    this.submitButton.textContent = "Add Trade";
    this.cancelButton.style.display = "none";
  }

  editTrade(id) {
    const trade = this.trades.find((t) => t.id == id);
    if (trade) {
      this.editingTradeId = id;
      this.setFormData(trade);
      this.submitButton.textContent = "Update Trade";
      this.cancelButton.style.display = "block";
      this.form.scrollIntoView({ behavior: "smooth" });
    }
  }

  cancelEdit() {
    this.clearForm();
  }

  updateTrade() {
    const updatedTrade = this.getFormData();
    this.trades = this.trades.map((trade) =>
      trade.id == this.editingTradeId ? updatedTrade : trade
    );
    this.saveTrades();
    this.clearForm();
    this.renderTrades();
  }

  addTrade() {
    const trade = this.getFormData();
    this.trades.unshift(trade);
    this.saveTrades();
    this.clearForm();
    this.renderTrades();
  }

  deleteTrade(id) {
    if (confirm("Are you sure you want to delete this trade?")) {
      this.trades = this.trades.filter((trade) => trade.id != id);
      this.saveTrades();
      this.renderTrades();
    }
  }

  saveTrades() {
    localStorage.setItem("trades", JSON.stringify(this.trades));
  }

  renderTrades() {
    this.tradesList.innerHTML = this.trades
      .map(
        (trade) => `
            <div class="tt-trade-entry tt-${trade.outcome.toLowerCase()}">
                <div class="tt-trade-header">
                    <strong>${trade.pair} - ${trade.direction}</strong>
                    <div class="tt-button-group">
                        <button class="tt-edit-btn" onclick="tradeJournal.editTrade('${
                          trade.id
                        }')">Edit</button>
                        <button class="tt-delete-btn" onclick="tradeJournal.deleteTrade('${
                          trade.id
                        }')">Delete</button>
                    </div>
                </div>
                <p>Date: ${trade.date} ${trade.time}</p>
                <p>Entry: ${trade.entryPrice} | Exit: ${trade.exitPrice}</p>
                <p>SL: ${trade.stopLoss} | TP: ${trade.takeProfit}</p>
                <p>Risk: ${trade.risk}% | P/L: $${trade.pnl}</p>
                <p>Outcome: ${trade.outcome}</p>
                <p>Reason: ${trade.reason}</p>
                <p>Emotions: ${trade.emotions}</p>
                <p>Followed Rules: ${trade.followedRules}</p>
                ${trade.notes ? `<p>Notes: ${trade.notes}</p>` : ""}
            </div>
        `
      )
      .join("");
  }

  //GET WEEKLY_______________________________________________________
  getWeeklyTrades() {
    const weeklyTrades = {};

    this.trades.forEach((trade) => {
      const tradeDate = new Date(trade.date);
      const weekStart = this.getWeekStart(tradeDate);
      const weekKey = weekStart.toISOString().split("T")[0];

      if (!weeklyTrades[weekKey]) {
        weeklyTrades[weekKey] = {
          trades: [],
          stats: {
            totalPnl: 0,
            wins: 0,
            losses: 0,
            winRate: 0,
            totalTrades: 0,
          },
        };
      }

      weeklyTrades[weekKey].trades.push(trade);
      weeklyTrades[weekKey].stats.totalPnl += parseFloat(trade.pnl);
      if (trade.outcome === "Win") {
        weeklyTrades[weekKey].stats.wins++;
      } else {
        weeklyTrades[weekKey].stats.losses++;
      }
      weeklyTrades[weekKey].stats.totalTrades++;
    });

    Object.keys(weeklyTrades).forEach((week) => {
      const stats = weeklyTrades[week].stats;
      stats.winRate = ((stats.wins / stats.totalTrades) * 100).toFixed(1);
    });

    return weeklyTrades;
  }

  getWeekStart(date) {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() - d.getUTCDay());
    return d;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  renderTrades() {
    const weeklyTrades = this.getWeeklyTrades();
    const weeks = Object.keys(weeklyTrades).sort().reverse();

    this.tradesList.innerHTML = weeks
      .map(
        (week) => `
            <div class="tt-week-section">
                <div class="tt-week-header" onclick="document.getElementById('week-${week}').classList.toggle('tt-collapsed')">
                    <div class="tt-week-summary">
                        <h3>Week of ${this.formatDate(week)}</h3>
                        <div class="tt-week-stats">
                            <span class="tt-stat ${
                              weeklyTrades[week].stats.totalPnl >= 0
                                ? "tt-positive"
                                : "tt-negative"
                            }">
                                P/L: $${weeklyTrades[
                                  week
                                ].stats.totalPnl.toFixed(2)}
                            </span>
                            <span class="tt-stat">
                                Win Rate: ${weeklyTrades[week].stats.winRate}%
                            </span>
                            <span class="tt-stat">
                                Trades: ${weeklyTrades[week].stats.totalTrades}
                            </span>
                        </div>
                    </div>
                    <div class="tt-week-notes">
                        <textarea 
                            placeholder="Add weekly notes..."
                            onclick="event.stopPropagation()"
                            onchange="tradeJournal.saveWeeklyNotes('${week}', this.value)"
                        >${this.getWeeklyNotes(week) || ""}</textarea>
                    </div>
                </div>

                <div id="week-${week}" class="tt-week-trades tt-collapsed">
                    ${weeklyTrades[week].trades
                      .map(
                        (trade) => `
                            <div class="tt-trade-entry tt-${trade.outcome.toLowerCase()}">
                                <div class="tt-trade-header">
                                    <strong>${trade.pair} - ${
                          trade.direction
                        }</strong>
                                    <div class="tt-button-group">
                                        <button class="tt-edit-btn" onclick="tradeJournal.editTrade('${
                                          trade.id
                                        }')">Edit</button>
                                        <button class="tt-delete-btn" onclick="tradeJournal.deleteTrade('${
                                          trade.id
                                        }')">Delete</button>
                                    </div>
                                </div>
                                <p>Date: ${trade.date} ${trade.time}</p>
                                <p>Entry: ${trade.entryPrice} | Exit: ${
                          trade.exitPrice
                        }</p>
                                <p>SL: ${trade.stopLoss} | TP: ${
                          trade.takeProfit
                        }</p>
                                <p>Risk: ${trade.risk}% | P/L: $${trade.pnl}</p>
                                <p>Outcome: ${trade.outcome}</p>
                                <p>Reason: ${trade.reason}</p>
                                <p>Emotions: ${trade.emotions}</p>
                                <p>Followed Rules: ${trade.followedRules}</p>
                                ${
                                  trade.notes
                                    ? `<p>Notes: ${trade.notes}</p>`
                                    : ""
                                }
                            </div>
                        `
                      )
                      .join("")}
                </div>
            </div>
        `
      )
      .join("");
  }

  saveWeeklyNotes(week, notes) {
    const weeklyNotes = JSON.parse(localStorage.getItem("weeklyNotes") || "{}");
    weeklyNotes[week] = notes;
    localStorage.setItem("weeklyNotes", JSON.stringify(weeklyNotes));
  }

  getWeeklyNotes(week) {
    const weeklyNotes = JSON.parse(localStorage.getItem("weeklyNotes") || "{}");
    return weeklyNotes[week] || "";
  }
}

const tradeJournal = new TradeJournal();
