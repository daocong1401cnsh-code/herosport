"use client";
import { useState } from "react";

// ===================== DATA =====================
const members = [
  { initials: "PD", name: "Phạm Tấn Dũng", role: "Trưởng phòng", status: "online", type: "Full Time" },
  { initials: "NL", name: "Nguyễn Thành Long", role: "Camera & Editor", status: "online", type: "Partime" },
  { initials: "LH", name: "Lương Thị Hoà", role: "Quản trị web & sàn", status: "online", type: "Full Time" },
  { initials: "PT", name: "Đoàn Thị Phương Thu", role: "Quản trị web & sàn", status: "busy", type: "Full Time" },
  { initials: "LC", name: "Lương Thị Ngọc Châu", role: "Edit Aff TikTok", status: "online", type: "Partime" },
  { initials: "NG", name: "Nguyễn Hương Giang", role: "Design", status: "away", type: "Partime" },
  { initials: "TH", name: "Tạ Quang Huy", role: "Nhân viên Live", status: "online", type: "Partime" },
  { initials: "DS", name: "Đàm Cao Sơn", role: "Nhân viên Live", status: "online", type: "Partime" },
  { initials: "VD", name: "Nguyễn Việt Đức", role: "Nhân viên Live", status: "away", type: "Partime" },
];

const statusMap: any = {
  todo:   { label: "Chờ làm",    bg: "#f1f5f9", color: "#64748b" },
  doing:  { label: "Đang làm",   bg: "#fff7ed", color: "#c2410c" },
  review: { label: "Đang duyệt", bg: "#eff6ff", color: "#1d4ed8" },
  done:   { label: "Hoàn thành", bg: "#f0fdf4", color: "#16a34a" },
};

export default function Home() {
  // --- Các State quản lý ứng dụng ---
  const [activeTab, setActiveTab] = useState("overview"); // Tab hiện tại
  const [tasks, setTasks] = useState([
    { id: 1, icon: "🎥", name: "Quay & edit video sản phẩm mới", sub: "Nguyễn Thành Long • Camera & Editor", status: "doing", due: "19/05" },
    { id: 2, icon: "🛒", name: "Quản trị gian hàng Shopee / TikTok Shop", sub: "Lương Thị Hoà • Quản trị web & sàn", status: "doing", due: "18/05" },
    { id: 3, icon: "📱", name: "Edit video Affiliate TikTok Mixsport", sub: "Lương Thị Ngọc Châu • Edit Aff TikTok", status: "review", due: "17/05" },
    { id: 4, icon: "🎨", name: "Thiết kế banner Flash Sale tuần này", sub: "Nguyễn Hương Giang • Design", status: "done", due: "16/05" },
    { id: 5, icon: "📡", name: "Ca Live TikTok chiều nay 17h", sub: "Tạ Quang Huy • Nhân viên Live", status: "todo", due: "Hôm nay" },
    { id: 6, icon: "📡", name: "Ca Live TikTok tối 20h", sub: "Đàm Cao Sơn • Nhân viên Live", status: "todo", due: "Hôm nay" },
    { id: 7, icon: "🌐", name: "Cập nhật sản phẩm mới lên website", sub: "Đoàn Thị Phương Thu • Quản trị web", status: "doing", due: "20/05" },
  ]);

  // State cho Form thêm task mới
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState(members[0].name);

  // Hàm xử lý thêm task mới
  const handleAddTask = (e: any) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const newTask = {
      id: Date.now(),
      icon: "📌",
      name: newTaskName,
      sub: `${newTaskAssignee}`,
      status: "todo",
      due: "Hôm nay"
    };

    setTasks([newTask, ...tasks]);
    setNewTaskName("");
    setShowModal(false);
  };

  // Hàm thay đổi nhanh trạng thái task khi bấm vào nút trạng thái
  const toggleStatus = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const statusOrder = ["todo", "doing", "review", "done"];
        const nextIndex = (statusOrder.indexOf(t.status) + 1) % statusOrder.length;
        return { ...t, status: statusOrder[nextIndex] };
      }
      return t;
    }));
  };

  // Tính toán số liệu động
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === "done").length;

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "sans-serif", padding: "20px", display: "flex", gap: "20px" }}>
      
      {/* MENU BÊN TRÁI (ĐÃ CHẠY ĐƯỢC) */}
      <div style={{ width: "250px", backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>HERO SPORT - MKT</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div onClick={() => setActiveTab("overview")} style={{ padding: "10px", backgroundColor: activeTab === "overview" ? "#f1f5f9" : "transparent", borderRadius: "6px", fontWeight: "bold", color: activeTab === "overview" ? "#E2401C" : "#64748b", cursor: "pointer" }}>📊 Tổng quan</div>
          <div onClick={() => setActiveTab("calendar")} style={{ padding: "10px", backgroundColor: activeTab === "calendar" ? "#f1f5f9" : "transparent", borderRadius: "6px", fontWeight: "bold", color: activeTab === "calendar" ? "#E2401C" : "#64748b", cursor: "pointer" }}>📅 Lịch trình ca trực</div>
          <div onClick={() => setActiveTab("campaigns")} style={{ padding: "10px", backgroundColor: activeTab === "campaigns" ? "#f1f5f9" : "transparent", borderRadius: "6px", fontWeight: "bold", color: activeTab === "campaigns" ? "#E2401C" : "#64748b", cursor: "pointer" }}>🏁 Chiến dịch</div>
        </div>

        {/* THÀNH VIÊN ONLINE */}
        <h3 style={{ fontSize: "14px", color: "#64748b", marginTop: "30px", marginBottom: "10px" }}>👥 THÀNH VIÊN ({members.length})</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {members.map((m, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: m.status === "online" ? "#22c55e" : m.status === "busy" ? "#ea580c" : "#eab308" }} />
              <div>
                <div style={{ fontWeight: "bold" }}>{m.name}</div>
                <div style={{ color: "gray", fontSize: "11px" }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NỘI DUNG CHÍNH BÊN PHẢI */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* THANH TIÊU ĐỀ TRÊN CÙNG */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: "15px 20px", borderRadius: "12px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>Phòng marketing Hero Sport</h1>
            <span style={{ backgroundColor: "#fee2e2", color: "#ef4444", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>● TRỰC TUYẾN</span>
          </div>
          <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#E2401C", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>+ Thêm task</button>
        </div>

        {/* HIỂN THỊ NỘI DUNG THEO TAB ĐANG CHỌN */}
        {activeTab === "overview" && (
          <>
            {/* Ô THỐNG KÊ NHANH (SỐ LIỆU ĐỘNG) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
              <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px" }}>
                <div style={{ color: "gray", fontSize: "13px" }}>Nhân sự phòng</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}>{members.length} người</div>
              </div>
              <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px" }}>
                <div style={{ color: "gray", fontSize: "13px" }}>Vị trí chờ duyệt</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}>2 chỗ</div>
              </div>
              <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px" }}>
                <div style={{ color: "gray", fontSize: "13px" }}>Ca Live hôm nay</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}>2 ca</div>
              </div>
              <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px" }}>
                <div style={{ color: "gray", fontSize: "13px" }}>Hoàn thành</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}>{doneTasks}/{totalTasks} công việc</div>
              </div>
            </div>

            {/* DANH SÁCH CÔNG VIỆC CHẠY ĐƯỢC */}
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>📋 Công việc đang thực hiện</h3>
              <p style={{ fontSize: "12px", color: "gray", marginBottom: "15px" }}>(Mẹo: Click vào nút Trạng thái để đổi nhanh tiến độ công việc)</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {tasks.map((t) => (
                  <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #f1f5f9", borderRadius: "8px" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <span style={{ fontSize: "20px" }}>{t.icon}</span>
                      <div>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{t.name}</div>
                        <div style={{ color: "gray", fontSize: "12px" }}>{t.sub} • Hạn: {t.due}</div>
                      </div>
                    </div>
                    <span onClick={() => toggleStatus(t.id)} style={{ backgroundColor: statusMap[t.status]?.bg, color: statusMap[t.status]?.color, padding: "6px 14px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", cursor: "pointer", transition: "0.2s" }}>
                      {statusMap[t.status]?.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "calendar" && (
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>📅 Lịch trình ca trực tuần này</h3>
            <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", color: "#333" }}>
              • <strong>Ca chiều (17h)</strong>: Tạ Quang Huy trực Live TikTok.<br/><br/>
              • <strong>Ca tối (20h)</strong>: Đàm Cao Sơn trực Live TikTok.
            </div>
          </div>
        )}

        {activeTab === "campaigns" && (
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>🏁 Các chiến dịch marketing đang triển khai</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ padding: "12px", border: "1px solid #eee", borderRadius: "6px" }}>🔥 <strong>Flash Sale 5/5</strong> - Ngân sách: 5.000.000đ (Đã hoàn thành)</div>
              <div style={{ padding: "12px", border: "1px solid #eee", borderRadius: "6px" }}>👟 <strong>Ra mắt BST Li-Ning Hè 2025</strong> - Ngân sách: 8.000.000đ (Đang chạy)</div>
            </div>
          </div>
        )}

      </div>

      {/* POPUP (MODAL) FORM THÊM TASK MỚI KHI BẤM NÚT */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
          <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "12px", width: "400px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 20px 0" }}>➕ Thêm công việc mới</h3>
            <form onSubmit={handleAddTask}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "gray", marginBottom: "5px" }}>Tên công việc</label>
                <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Nhập tên việc cần làm..." style={{ width: "92%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} required />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", color: "gray", marginBottom: "5px" }}>Người chịu trách nhiệm</label>
                <select value={newTaskAssignee} onChange={(e) => setNewTaskAssignee(e.target.value)} style={{ width: "98%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
                  {members.map((m, idx) => (
                    <option key={idx} value={m.name}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "white", cursor: "pointer" }}>Hủy</button>
                <button type="submit" style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#E2401C", color: "white", fontWeight: "bold", cursor: "pointer" }}>Thêm mới</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
