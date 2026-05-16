"use client";
import { useState } from "react";

// ===================== DATA =====================
const members = [
  { initials: "PD", name: "Phạm Tấn Dũng", role: "Trưởng phòng", status: "online", type: "Full Time", color: "#fff7ed", textColor: "#c2410c" },
  { initials: "NL", name: "Nguyễn Thành Long", role: "Camera & Editor", status: "online", type: "Partime", color: "#eff6ff", textColor: "#1d4ed8" },
  { initials: "LH", name: "Lương Thị Hoà", role: "Quản trị web & sàn", status: "online", type: "Full Time", color: "#f0fdf4", textColor: "#16a34a" },
  { initials: "PT", name: "Đoàn Thị Phương Thu", role: "Quản trị web & sàn", status: "busy", type: "Full Time", color: "#faf5ff", textColor: "#7c3aed" },
  { initials: "LC", name: "Lương Thị Ngọc Châu", role: "Edit Aff TikTok", status: "online", type: "Partime", color: "#fdf4ff", textColor: "#9333ea" },
  { initials: "NG", name: "Nguyễn Hương Giang", role: "Design", status: "away", type: "Partime", color: "#fff0ed", textColor: "#E2401C" },
  { initials: "TH", name: "Tạ Quang Huy", role: "Nhân viên Live", status: "online", type: "Partime", color: "#f0fdf4", textColor: "#15803d" },
  { initials: "DS", name: "Đàm Cao Sơn", role: "Nhân viên Live", status: "online", type: "Partime", color: "#eff6ff", textColor: "#1e40af" },
  { initials: "VD", name: "Nguyễn Việt Đức", role: "Nhân viên Live", status: "away", type: "Partime", color: "#fef9c3", textColor: "#854d0e" },
];

const initTasks = [
  { id: 1, icon: "🎥", name: "Quay & edit video sản phẩm mới", sub: "Nguyễn Thành Long • Camera & Editor", status: "doing", due: "19/05", assignee: "NL" },
  { id: 2, icon: "🛒", name: "Quản trị gian hàng Shopee / TikTok Shop", sub: "Lương Thị Hoà • Quản trị web & sàn", status: "doing", due: "18/05", assignee: "LH" },
  { id: 3, icon: "📱", name: "Edit video Affiliate TikTok Mixsport", sub: "Lương Thị Ngọc Châu • Edit Aff TikTok", status: "review", due: "17/05", assignee: "LC" },
  { id: 4, icon: "🎨", name: "Thiết kế banner Flash Sale tuần này", sub: "Nguyễn Hương Giang • Design", status: "done", due: "16/05", assignee: "NG" },
  { id: 5, icon: "📡", name: "Ca Live TikTok chiều nay 17h", sub: "Tạ Quang Huy • Nhân viên Live", status: "todo", due: "Hôm nay", assignee: "TH" },
  { id: 6, icon: "📡", name: "Ca Live TikTok tối 20h", sub: "Đàm Cao Sơn • Nhân viên Live", status: "todo", due: "Hôm nay", assignee: "DS" },
  { id: 7, icon: "🌐", name: "Cập nhật sản phẩm mới lên website", sub: "Đoàn Thị Phương Thu • Quản trị web", status: "doing", due: "20/05", assignee: "PT" },
];

const initCampaigns = [
  { id: 1, name: "Flash Sale 5/5", status: "done", budget: "5.000.000", spent: "4.800.000", channel: "TikTok Shop", start: "2025-05-01", end: "2025-05-05", result: "120% KPI", color: "#16a34a" },
  { id: 2, name: "Ra mắt BST Li-Ning Hè 2025", status: "active", budget: "8.000.000", spent: "3.200.000", channel: "All", start: "2025-05-10", end: "2025-05-25", result: "Đang chạy", color: "#E2401C" },
  { id: 3, name: "Affiliate TikTok tháng 5", status: "active", budget: "2.000.000", spent: "900.000", channel: "TikTok Affiliate", start: "2025-05-01", end: "2025-05-31", result: "Đang chạy", color: "#E2401C" },
  { id: 4, name: "SEO Website tháng 5", status: "active", budget: "1.500.000", spent: "500.000", channel: "Website", start: "2025-05-01", end: "2025-05-31", result: "Đang chạy", color: "#E2401C" },
  { id: 5, name: "Mid-year Sale 6/6", status: "planned", budget: "10.000.000", spent: "0", channel: "All", start: "2025-06-01", end: "2025-06-08", result: "Chưa bắt đầu", color: "#64748b" },
];

const calendarEvents = [
  { date: "2025-05-16", type: "live", title: "Live TikTok 17h & 20h", member: "TH + DS" },
  { date: "2025-05-17", type: "content", title: "Đăng video Affiliate Mixsport", member: "LC" },
  { date: "2025-05-18", type: "task", title: "Deadline quản trị Shopee", member: "LH" },
  { date: "2025-05-19", type: "video", title: "Nộp video sản phẩm mới", member: "NL" },
  { date: "2025-05-20", type: "task", title: "Cập nhật sản phẩm website", member: "PT" },
  { date: "2025-05-21", type: "live", title: "Live TikTok chiều & tối", member: "TH + DS + VD" },
  { date: "2025-05-22", type: "report", title: "Báo cáo tuần cho trưởng phòng", member: "All" },
  { date: "2025-05-23", type: "content", title: "Đăng bài Fanpage Li-Ning", member: "LC" },
  { date: "2025-05-24", type: "live", title: "Live TikTok cuối tuần", member: "DS + VD" },
  { date: "2025-05-25", type: "design", title: "Banner Flash Sale tháng 6", member: "NG" },
];

const analyticsKPI = [
  { label: "Doanh số TikTok Shop", value: "245.600.000", unit: "VNĐ", change: "+18%", up: true, icon: "🛍" },
  { label: "Doanh số Shopee", value: "132.400.000", unit: "VNĐ", change: "+12%", up: true, icon: "🏪" },
  { label: "Lượt xem TikTok", value: "1.240.000", unit: "views", change: "+35%", up: true, icon: "👁" },
  { label: "Chi phí quảng cáo", value: "8.700.000", unit: "VNĐ", change: "+5%", up: false, icon: "📣" },
  { label: "Video đã đăng", value: "42", unit: "video", change: "+8", up: true, icon: "🎬" },
  { label: "Đơn hàng website", value: "318", unit: "đơn", change: "+22%", up: true, icon: "🌐" },
];

const channels = [
  { name: "TikTok Shop", pct: 85, color: "#333", reach: "Kênh chính" },
  { name: "Shopee", pct: 72, color: "#EE4D2D", reach: "Sàn TMĐT" },
  { name: "Website", pct: 45, color: "#1877F2", reach: "Web chính thức" },
  { name: "TikTok Affiliate", pct: 68, color: "#E2401C", reach: "Mixsport" },
];

const statusMap: any = {
  todo:   { label: "Chờ làm",    bg: "#f1f5f9", color: "#64748b" },
  doing:  { label: "Đang làm",   bg: "#fff7ed", color: "#c2410c" },
  review: { label: "Đang duyệt", bg: "#eff6ff", color: "#1d4ed8" },
  done:   { label: "Hoàn thành", bg: "#f0fdf4", color: "#16a34a" },
};

const onlineColor: any = { online: "#22c55e", busy: "#ea580c", away: "#eab308" };
const onlineLabel: any = { online: "● Online", busy: "● Bận", away: "● Vắng" };

const eventTypeStyle: any = {
  live:    { bg: "#fff0f0", color: "#E2401C" },
  content: { bg: "#f0f9ff", color: "#0284c7" },
  video:   { bg: "#f5f3ff", color: "#7c3aed" },
  task:    { bg: "#fff7ed", color: "#c2410c" },
  report:  { bg: "#f0fdf4", color: "#16a34a" },
  design:  { bg: "#fdf4ff", color: "#9333ea" },
};

const campaignStatusStyle: any = {
  done:    { label: "Hoàn thành", bg: "#f0fdf4", color: "#16a34a" },
  active:  { label: "Đang chạy",  bg: "#fff7ed", color: "#c2410c" },
  planned: { label: "Sắp tới",    bg: "#f1f5f9", color: "#64748b" },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview"); 
  const [tasks, setTasks] = useState(initTasks);
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState(members[0].name);

  // Logic thêm task
  const handleAddTask = (e: any) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const matchedMember = members.find(m => m.name === newTaskAssignee);
    const newTask = {
      id: Date.now(),
      icon: "📌",
      name: newTaskName,
      sub: `${newTaskAssignee} • Nhân viên`,
      status: "todo",
      due: "Hôm nay",
      assignee: matchedMember ? matchedMember.initials : "PD"
    };

    setTasks([newTask, ...tasks]);
    setNewTaskName("");
    setShowModal(false);
  };

  // Logic đổi nhanh trạng thái task
  const toggleStatus = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const order = ["todo", "doing", "review", "done"];
        const nextIdx = (order.indexOf(t.status) + 1) % order.length;
        return { ...t, status: order[nextIdx] };
      }
      return t;
    }));
  };

  const doneCount = tasks.filter(t => t.status === "done").length;

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "sans-serif", padding: "20px", display: "flex", gap: "20px" }}>
      
      {/* SIDEBAR BÊN TRÁI */}
      <div style={{ width: "260px", backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px", color: "#111" }}>HERO SPORT - MKT</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div onClick={() => setActiveTab("overview")} style={{ padding: "10px 12px", backgroundColor: activeTab === "overview" ? "#fff5f5" : "transparent", borderRadius: "6px", fontWeight: "bold", color: activeTab === "overview" ? "#E2401C" : "#64748b", cursor: "pointer" }}>📊 Tổng quan</div>
          <div onClick={() => setActiveTab("calendar")} style={{ padding: "10px 12px", backgroundColor: activeTab === "calendar" ? "#fff5f5" : "transparent", borderRadius: "6px", fontWeight: "bold", color: activeTab === "calendar" ? "#E2401C" : "#64748b", cursor: "pointer" }}>📅 Lịch trình ca trực</div>
          <div onClick={() => setActiveTab("campaigns")} style={{ padding: "10px 12px", backgroundColor: activeTab === "campaigns" ? "#fff5f5" : "transparent", borderRadius: "6px", fontWeight: "bold", color: activeTab === "campaigns" ? "#E2401C" : "#64748b", cursor: "pointer" }}>🏁 Chiến dịch</div>
          <div onClick={() => setActiveTab("kpi")} style={{ padding: "10px 12px", backgroundColor: activeTab === "kpi" ? "#fff5f5" : "transparent", borderRadius: "6px", fontWeight: "bold", color: activeTab === "kpi" ? "#E2401C" : "#64748b", cursor: "pointer" }}>📈 Phân tích KPI</div>
        </div>

        {/* THÀNH VIÊN */}
        <h3 style={{ fontSize: "12px", color: "#94a3b8", marginTop: "30px", marginBottom: "12px", letterSpacing: "0.5px" }}>👥 THÀNH VIÊN ({members.length})</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {members.map((m, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: m.color, color: m.textColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px" }}>{m.initials}</div>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "13px", color: "#334155" }}>{m.name}</div>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>{m.role}</div>
                </div>
              </div>
              <span style={{ fontSize: "11px", color: onlineColor[m.status] }}>{onlineLabel[m.status]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* KHÔNG GIAN LÀM VIỆC CHÍNH */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* TOPBAR HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: "15px 20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#1e293b" }}>Phòng marketing Hero Sport</h1>
            <span style={{ backgroundColor: "#fef2f2", color: "#ef4444", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" }}>● TRỰC TUYẾN</span>
          </div>
          <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#E2401C", color: "white", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>+ Thêm task</button>
        </div>

        {/* NỘI DUNG CHUYỂN ĐỔI TAB */}
        {activeTab === "overview" && (
          <>
            {/* THỐNG KÊ SỐ LIỆU ĐỘNG */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
              <div style={{ backgroundColor: "white", padding: "18px", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                <div style={{ color: "#64748b", fontSize: "13px" }}>Nhân sự phòng</div>
                <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "6px", color: "#0f172a" }}>{members.length} người</div>
              </div>
              <div style={{ backgroundColor: "white", padding: "18px", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                <div style={{ color: "#64748b", fontSize: "13px" }}>Vị trí chờ duyệt</div>
                <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "6px", color: "#0f172a" }}>2 chỗ</div>
              </div>
              <div style={{ backgroundColor: "white", padding: "18px", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                <div style={{ color: "#64748b", fontSize: "13px" }}>Ca Live hôm nay</div>
                <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "6px", color: "#0f172a" }}>2 ca</div>
              </div>
              <div style={{ backgroundColor: "white", padding: "18px", borderRadius: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                <div style={{ color: "#64748b", fontSize: "13px" }}>Hoàn thành</div>
                <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "6px", color: "#0f172a" }}>{doneCount}/{tasks.length} công việc</div>
              </div>
            </div>

            {/* DANH SÁCH TASK VÀ TIẾN ĐỘ KÊNH */}
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 2, backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "15px", color: "#1e293b" }}>📋 Công việc đang thực hiện</h3>
                <p style={{ margin: "0 0 15px 0", fontSize: "11px", color: "#94a3b8" }}>(Mẹo: Click nút trạng thái để đổi nhanh tiến độ)</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {tasks.map((t) => (
                    <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #f1f5f9", borderRadius: "8px" }}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <span style={{ fontSize: "18px" }}>{t.icon}</span>
                        <div>
                          <div style={{ fontWeight: "bold", fontSize: "13px", color: "#334155" }}>{t.name}</div>
                          <div style={{ color: "#64748b", fontSize: "11px" }}>{t.sub} • Hạn: {t.due}</div>
                        </div>
                      </div>
                      <span onClick={() => toggleStatus(t.id)} style={{ backgroundColor: statusMap[t.status]?.bg, color: statusMap[t.status]?.color, padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
                        {statusMap[t.status]?.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* HIỆU QUẢ KÊNH */}
              <div style={{ flex: 1, backgroundColor: "white", padding: "20px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <h3 style={{ margin: 0, fontSize: "15px", color: "#1e293b" }}>📊 Hiệu quả kênh</h3>
                {channels.map((c, idx) => (
                  <div key={idx}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                      <span style={{ fontWeight: "bold", color: "#475569" }}>{c.name}</span>
                      <span style={{ color: "#94a3b8" }}>{c.pct}%</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${c.pct}%`, height: "100%", backgroundColor: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "calendar" && (
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "15px" }}>📅 Lịch trình sự kiện & Ca trực phòng MKT</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              {calendarEvents.map((ev, i) => (
                <div key={i} style={{ padding: "12px", backgroundColor: eventTypeStyle[ev.type]?.bg, borderLeft: `4px solid ${eventTypeStyle[ev.type]?.color}`, borderRadius: "4px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b" }}>{ev.date} — Nhân sự: {ev.member}</div>
                  <div style={{ fontWeight: "bold", fontSize: "14px", marginTop: "4px", color: "#1e293b" }}>{ev.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "campaigns" && (
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "15px" }}>🏁 Quản lý Chiến dịch Marketing</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "10px" }}>Tên chiến dịch</th>
                  <th>Kênh triển khai</th>
                  <th>Ngân sách</th>
                  <th>Đã chi</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {initCampaigns.map((cp) => (
                  <tr key={cp.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px 10px", fontWeight: "bold" }}>{cp.name}</td>
                    <td>{cp.channel}</td>
                    <td>{cp.budget}đ</td>
                    <td>{cp.spent}đ</td>
                    <td>
                      <span style={{ backgroundColor: campaignStatusStyle[cp.status].bg, color: campaignStatusStyle[cp.status].color, padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" }}>
                        {campaignStatusStyle[cp.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "kpi" && (
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "15px" }}>📈 Phân tích KPI & Báo cáo Chỉ số</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
              {analyticsKPI.map((kpi, idx) => (
                <div key={idx} style={{ padding: "15px", border: "1px solid #f1f5f9", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "18px" }}>{kpi.icon}</span>
                    <span style={{ color: kpi.up ? "#16a34a" : "#dc2626", fontSize: "12px", fontWeight: "bold" }}>{kpi.change}</span>
                  </div>
                  <div style={{ color: "#64748b", fontSize: "12px", marginTop: "10px" }}>{kpi.label}</div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "4px" }}>{kpi.value} <span style={{ fontSize: "12px", fontWeight: "normal" }}>{kpi.unit}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* POPUP THÊM TASK MỚI CHẠY ĐƯỢC */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", width: "380px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>➕ Tạo công việc mới</h3>
            <form onSubmit={handleAddTask}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Tên công việc</label>
                <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Nhập việc cần giao..." style={{ width: "93%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} required />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Nhân sự phụ trách</label>
                <select value={newTaskAssignee} onChange={(e) => setNewTaskAssignee(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                  {members.map((m, i) => (
                    <option key={i} value={m.name}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", justifyContent: "end", gap: "8px" }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "7px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white", cursor: "pointer", fontSize: "13px" }}>Hủy</button>
                <button type="submit" style={{ padding: "7px 14px", borderRadius: "6px", border: "none", backgroundColor: "#E2401C", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>Thêm ngay</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
