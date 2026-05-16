"use client";
import { useState } from "react";

// ===================== MẢNG DỮ LIỆU CHUẨN ĐỒNG BỘ =====================
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
  { id: 1, name: "Flash Sale 5/5", status: "done", budget: "5.000.000", spent: "4.800.000", channel: "TikTok Shop", start: "2025-05-01", end: "2025-05-05", result: "120% KPI" },
  { id: 2, name: "Ra mắt BST Li-Ning Hè 2025", status: "active", budget: "8.000.000", spent: "3.200.000", channel: "All", start: "2025-05-10", end: "2025-05-25", result: "Đang chạy" },
  { id: 3, name: "Affiliate TikTok tháng 5", status: "active", budget: "2.000.000", spent: "900.000", channel: "TikTok Affiliate", start: "2025-05-01", end: "2025-05-31", result: "Đang chạy" },
];

const channels = [
  { name: "TikTok Shop", pct: 85, color: "#111827", sub: "Mktroom" },
  { name: "Shopee", pct: 72, color: "#ea4335", sub: "Sàn TMĐT" },
  { name: "Website", pct: 45, color: "#1ae1ff", sub: "Web chính thức" },
  { name: "TikTok Affiliate", pct: 68, color: "#ff4d2d", sub: "Mixsport" },
];

const statusMap: any = {
  todo:   { label: "Chờ làm",    bg: "#f1f5f9", color: "#64748b", border: "#cbd5e1" },
  doing:  { label: "Đang làm",   bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  review: { label: "Đang duyệt", bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  done:   { label: "Hoàn thành", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview"); 
  const [tasks, setTasks] = useState(initTasks);
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState(members[0].name);

  const handleAddTask = (e: any) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const matchedMember = members.find(m => m.name === newTaskAssignee);
    const newTask = {
      id: Date.now(),
      icon: "📌",
      name: newTaskName,
      sub: `${newTaskAssignee} • Thành viên`,
      status: "todo",
      due: "Hôm nay",
      assignee: matchedMember ? matchedMember.initials : "PD"
    };

    setTasks([newTask, ...tasks]);
    setNewTaskName("");
    setShowModal(false);
  };

  const changeStatus = (id: number, currentStatus: string) => {
    const order = ["todo", "doing", "review", "done"];
    const nextIdx = (order.indexOf(currentStatus) + 1) % order.length;
    setTasks(tasks.map(t => t.id === id ? { ...t, status: order[nextIdx] } : t));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ backgroundColor: "#fcfcfd", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", padding: "16px", display: "flex", gap: "16px", color: "#1e293b" }}>
      
      {/* SIDEBAR BÊN TRÁI */}
      <div style={{ width: "240px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "800", letterSpacing: "0.3px", margin: 0 }}>HERO SPORT - MKT</h2>
            <span style={{ backgroundColor: "#ff4d4f", color: "white", padding: "1px 5px", fontSize: "10px", fontWeight: "bold", borderRadius: "4px" }}>TRỰC TUYẾN</span>
          </div>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "11px" }}>Phòng marketing Hero Sport</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "20px" }}>
            {[
              { id: "overview", label: "Tổng quan", icon: "📊" },
              { id: "quytrinh", label: "Quy trình", icon: "📋" },
              { id: "campaigns", label: "Chiến dịch", icon: "📢" },
            ].map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", transition: "0.2s",
                  backgroundColor: activeTab === tab.id ? "#fff5f5" : "transparent",
                  color: activeTab === tab.id ? "#ff4d4f" : "#475569"
                }}
              >
                <span style={{ fontSize: "14px" }}>{tab.icon}</span>
                <span style={{ fontWeight: activeTab === tab.id ? "bold" : "normal" }}>{tab.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9", fontSize: "12px", color: "#64748b" }}>
          <div style={{ fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>NHÂN SỰ</div>
          <div>Tổng: <strong style={{ color: "#1e293b" }}>9 người</strong></div>
          <div style={{ marginTop: "4px" }}>Full Time: 3 • Partime: 6</div>
        </div>
      </div>

      {/* KHÔNG GIAN TRUNG TÂM */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        
        <div style={{ backgroundColor: "white", padding: "12px 20px", borderRadius: "12px", border: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: "700", fontSize: "15px" }}>Mktroom .JSX</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: "bold" }}>● 9 Online</span>
            <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#ff4d4f", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>+ Thêm task</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            {activeTab === "overview" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                  {[
                    { label: "Nhân sự MKT", value: "9 người", sub: "3 FT + 6 PT" },
                    { label: "Task hôm nay", value: "2 chờ", sub: "3 đang chạy" },
                    { label: "Ca Live hôm nay", value: "2 ca", sub: "17h & 20h" },
                    { label: "Hoàn thành", value: `${tasks.filter(t=>t.status==='done').length}/${tasks.length}`, sub: "Tiến độ phòng" },
                  ].map((card, i) => (
                    <div key={i} style={{ backgroundColor: "white", padding: "14px 16px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                      <span style={{ color: "#94a3b8", fontSize: "11px", fontWeight: "600" }}>{card.label}</span>
                      <div style={{ fontSize: "20px", fontWeight: "800", margin: "4px 0", color: "#0f172a" }}>{card.value}</div>
                      <span style={{ color: "#94a3b8", fontSize: "11px" }}>{card.sub}</span>
                    </div>
                  ))}
                </div>

                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: "bold" }}>📋 Công việc đang thực hiện</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {tasks.map((t) => (
                      <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", border: "1px solid #f8fafc", backgroundColor: "#fdfdfd", borderRadius: "8px" }}>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          <span style={{ fontSize: "16px" }}>{t.icon}</span>
                          <div>
                            <div style={{ fontWeight: "700", fontSize: "13px", color: "#1e293b" }}>{t.name}</div>
                            <div style={{ color: "#94a3b8", fontSize: "11px" }}>{t.sub}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button onClick={() => changeStatus(t.id, t.status)} style={{ backgroundColor: statusMap[t.status]?.bg, color: statusMap[t.status]?.color, border: `1px solid ${statusMap[t.status]?.border}`, padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
                            {statusMap[t.status]?.label} ▾
                          </button>
                          <span style={{ fontSize: "11px", color: "#94a3b8" }}>{t.due}</span>
                          <button onClick={() => removeTask(t.id)} style={{ border: "none", backgroundColor: "transparent", color: "#cbd5e1", cursor: "pointer" }}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: "bold" }}>📊 Hiệu quả kênh</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    {channels.map((c, i) => (
                      <div key={i}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                          <span style={{ fontWeight: "700", color: "#334155" }}>{c.name}</span>
                          <span style={{ color: "#64748b", fontWeight: "bold" }}>{c.pct}%</span>
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
          </div>

          {/* CỘT PHẢI CÓ BIỂU ĐỒ 7 NGÀY SỬA LỖI */}
          <div style={{ width: "260px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "12px" }}>THÀNH VIÊN</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {members.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: m.color, color: m.textColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "10px" }}>{m.initials}</div>
                      <span style={{ fontWeight: "bold" }}>{m.name}</span>
                    </div>
                    <span style={{ color: m.status === "online" ? "#22c55e" : "#eab308" }}>● {m.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SỬA LỖI MẢNG Ở ĐÂY */}
            <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
              <h4 style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "bold", color: "#64748b" }}>HOẠT ĐỘNG 7 NGÀY</h4>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", height: "60px", padding: "0 10px" }}>
                {[40, 60, 45, 90, 85, 30, 50].map((val, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "12px", height: `${val}%`, backgroundColor: "#ff4d2d", borderRadius: "2px" }} />
                    <span style={{ fontSize: "9px", color: "#94a3b8" }}>T{idx + 2}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* POPUP THÊM TASK */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", width: "340px" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: "bold" }}>➕ Tạo công việc mới</h3>
            <form onSubmit={handleAddTask}>
              <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Tên việc..." style={{ width: "93%", padding: "8px 10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #cbd5e1" }} required />
              <select value={newTaskAssignee} onChange={(e) => setNewTaskAssignee(e.target.value)} style={{ width: "100%", padding: "8px 10px", marginBottom: "16px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                {members.map((m, i) => <option key={i} value={m.name}>{m.name}</option>)}
              </select>
              <div style={{ display: "flex", justifyContent: "end", gap: "8px" }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>Hủy</button>
                <button type="submit" style={{ padding: "6px 12px", borderRadius: "6px", backgroundColor: "#ff4d4f", color: "white", border: "none" }}>Thêm</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
