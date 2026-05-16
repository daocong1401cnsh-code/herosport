"use client";
import { useState, useEffect } from "react";

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

const analyticsKPI = [
  { label: "Doanh số TikTok Shop", value: "245.600.000", unit: "VNĐ", icon: "🛍" },
  { label: "Doanh số Shopee", value: "132.400.000", unit: "VNĐ", icon: "🏪" },
  { label: "Lượt xem TikTok", value: "1.240.000", unit: "views", icon: "👁" },
  { label: "Chi phí quảng cáo", value: "8.700.000", unit: "VNĐ", icon: "📣" },
];

const channels = [
  { name: "TikTok Shop", pct: 85, color: "#333" },
  { name: "Shopee", pct: 72, color: "#EE4D2D" },
  { name: "Website", pct: 45, color: "#1877F2" },
  { name: "TikTok Affiliate", pct: 68, color: "#E2401C" },
];

const statusMap: any = {
  doing:  { label: "Đang làm",   bg: "#fff7ed", color: "#c2410c" },
  review: { label: "Đang duyệt", bg: "#eff6ff", color: "#1d4ed8" },
  done:   { label: "Hoàn thành", bg: "#f0fdf4", color: "#16a34a" },
  todo:   { label: "Chờ làm",    bg: "#f1f5f9", color: "#64748b" },
};

export default function Home() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "sans-serif", padding: "20px", display: "flex", gap: "20px" }}>
      
      {/* MENU BÊN TRÁI */}
      <div style={{ width: "250px", backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>HERO SPORT - MKT</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ padding: "10px", backgroundColor: "#f1f5f9", borderRadius: "6px", fontWeight: "bold", color: "#E2401C" }}>📊 Tổng quan</div>
          <div style={{ padding: "10px", color: "#64748b" }}>📅 Lịch trình ca trực</div>
          <div style={{ padding: "10px", color: "#64748b" }}>🏁 Chiến dịch</div>
          <div style={{ padding: "10px", color: "#64748b" }}>📈 Phân tích KPI</div>
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
          <button style={{ backgroundColor: "#E2401C", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>+ Thêm task</button>
        </div>

        {/* Ô THỐNG KÊ NHANH */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
          <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "12px" }}>
            <div style={{ color: "gray", fontSize: "13px" }}>Nhân sự phòng</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}>9 người</div>
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
            <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}>1/7 công việc</div>
          </div>
        </div>

        {/* DANH SÁCH CÔNG VIỆC VÀ BIỂU ĐỒ KÊNH */}
        <div style={{ display: "flex", gap: "20px" }}>
          
          {/* CỘT CÔNG VIỆC */}
          <div style={{ flex: 2, backgroundColor: "white", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>📋 Công việc đang thực hiện</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {initTasks.map((t) => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #f1f5f9", borderRadius: "8px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span style={{ fontSize: "20px" }}>{t.icon}</span>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{t.name}</div>
                      <div style={{ color: "gray", fontSize: "12px" }}>{t.sub}</div>
                    </div>
                  </div>
                  <span style={{ backgroundColor: statusMap[t.status]?.bg, color: statusMap[t.status]?.color, padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>
                    {statusMap[t.status]?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CỘT HIỆU QUẢ KÊNH */}
          <div style={{ flex: 1, backgroundColor: "white", padding: "20px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <h3 style={{ margin: "0", fontSize: "16px" }}>📊 Hiệu quả kênh</h3>
            {channels.map((c, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>{c.name}</span>
                  <span style={{ color: "gray" }}>{c.pct}%</span>
                </div>
                <div style={{ width: "100%", height: "8px", backgroundColor: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${c.pct}%`, height: "100%", backgroundColor: c.color }} />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
