"use client";
import { useState, useEffect, useRef } from "react";

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

const weeklyData = [
  { day: "T2", tiktok: 38, shopee: 22, web: 15 },
  { day: "T3", tiktok: 45, shopee: 28, web: 18 },
  { day: "T4", tiktok: 32, shopee: 20, web: 12 },
  { day: "T5", tiktok: 52, shopee: 35, web: 22 },
  { day: "T6", tiktok: 48, shopee: 30, web: 20 },
  { day: "T7", tiktok: 58, shopee: 42, web: 28 },
  { day: "CN", tiktok: 44, shopee: 38, web: 25 },
];

const channels = [
  { name: "TikTok Shop", pct: 85, color: "#333", reach: "Kênh chính" },
  { name: "Shopee", pct: 72, color: "#EE4D2D", reach: "Sàn TMĐT" },
  { name: "Website", pct: 45, color: "#1877F2", reach: "Web chính thức" },
  { name: "TikTok Affiliate", pct: 68, color: "#E2401C", reach: "Mixsport" },
];

const statusMap = {
  doing:  { label: "Đang làm",   bg: "#fff7ed", color: "#c2410c" },
  review: { label: "Đang duyệt", bg: "#eff6ff", color: "#1d4ed8" },
  done:   { label: "Hoàn thành", bg: "#f0fdf4", color: "#16a34a" },
  todo:   { label: "Chờ làm",    bg: "#f1f5f9", color: "#64748b" },
};

const onlineColor = { online: "#22c55e", busy: "#ea580c", away: "#eab308" };
const onlineLabel = { online: "● Online", busy: "● Bận", away: "● Vắng" };
const typeColor = {
  "Full Time": { bg: "#dcfce7", color: "#15803d" },
  "Partime":   { bg: "#fef9c3", color: "#854d0e" },
};

const eventTypeStyle = {
  live:    { bg: "#fff0f0", color: "#E2401C", dot: "#E2401C" },
  content: { bg: "#f0f9ff", color: "#0284c7", dot: "#0284c7" },
  video:   { bg: "#f5f3ff", color: "#7c3aed", dot: "#7c3aed" },
  task:    { bg: "#fff7ed", color: "#c2410c", dot: "#f97316" },
  report:  { bg: "#f0fdf4", color: "#16a34a", dot: "#16a34a" },
  design:  { bg: "#fdf4ff", color: "#9333ea", dot: "#9333ea" },
};

const campaignStatusStyle = {
  done:    { label: "Hoàn thành", bg: "#f0fdf4", color: "#16a34a" },
  active:  { label: "Đang chạy",  bg: "#fff7ed", color: "#c2410c" },
  planned: { label: "Sắp tới",    bg: "#f1f5f9", color: "#64748b" },
};

const quyTrinh = [
  {
    id: "truongphong", title: "Trưởng phòng MKT", icon: "👑", color: "#fff7ed", border: "#fed7aa", textColor: "#c2410c",
    mucTieu: ["Đạt & vượt doanh số toàn kênh", "Phát triển các chiến dịch hiệu quả", "Kiểm soát công việc cả phòng"],
    ngay: [
      { title: "Kiểm tra tổng quan đầu ngày", items: ["Check báo cáo & đầu công việc nhân sự quản trị web","Check file báo cáo quay dựng, đề xuất kịch bản quay","Check chiến dịch quảng cáo TikTok, Web, Facebook","Check ngân sách & doanh số các nền tảng","Bao quát công việc ngày, check lịch họp & deadline","Nắm tình hình hệ thống trong 10–15 phút"] },
      { title: "Phân bổ & giao việc", items: ["Phân công: Quản trị web, sàn TikTok, Facebook, team media","Giao chỉ tiêu: Số bài TikTok, blog/web, bài FB, video quay, ảnh chụp"] },
      { title: "Kiểm soát hoạt động MKT", items: ["Theo dõi chương trình KM, giá, hình ảnh web","Bài viết, ảnh, video trên Facebook","Doanh số & chi phí quảng cáo các nền tảng","Nếu có vấn đề → Sửa ngay trong ngày"] },
      { title: "Báo cáo cuối ngày", items: ["Tổng hợp doanh số theo kênh","Hiệu suất nhân viên & KPI các bộ phận","Vấn đề phát sinh → Gửi cho quản lý cấp trên"] },
    ],
    tuan: [
      { title: "Phối hợp phòng Kinh doanh", items: ["Đào tạo kịch bản sale","Thông báo chương trình khuyến mại","Tiếp nhận thông tin hàng bán chạy, hàng mới, hàng tồn"] },
      { title: "Đào tạo & nâng cấp team", items: ["Training kiến thức sản phẩm, thị trường hàng ngày","Kỹ năng mềm & công cụ bổ trợ marketing","Review nhân viên yếu & nhân viên top"] },
    ],
    thang: ["Tổng kết KPI toàn phòng","Lập kế hoạch chiến lược tháng mới","Họp tổng kết & đánh giá nhân sự"],
  },
  {
    id: "web", title: "Quản trị Web", icon: "🌐", color: "#f0fdf4", border: "#bbf7d0", textColor: "#16a34a",
    mucTieu: ["Đảm bảo website hoạt động ổn định","Cập nhật sản phẩm & tồn kho chính xác 100%","Tối ưu trải nghiệm mua hàng"],
    ngay: [
      { title: "Kiểm tra tổng quan website", items: ["Kiểm tra tốc độ load trang, lỗi hiển thị, ảnh sản phẩm"] },
      { title: "Cập nhật sản phẩm mới", items: ["Kiểm tra danh mục mới trên Zalo group","Lọc cột Mùa Nhập mới nhất, copy danh mục hàng mới","Tạo tên sản phẩm hàng loạt → tải file mẫu Haravan"] },
      { title: "Báo cáo công việc", items: ["Báo cáo kết quả công việc đã hoàn thành trong ngày"] },
    ],
    tuan: [
      { title: "Xử lý & tổng hợp tồn", items: ["Xử lý file Check LN, Check Maxx, Tồn Thanh Trì","Chuyển tồn có '–' và 1,2 về 0","Dùng PivotTable & VLOOKUP tổng hợp tồn cuối kỳ"] },
      { title: "Cập nhật tồn lên Haravan", items: ["Xuất dữ liệu theo mẫu Haravan → VLOOKUP tìm tồn & giá","Lọc #N/A → chuyển về 0, thêm tag HẾT HÀNG","Kiểm tra lại sau khi upload – sửa lỗi nếu có"] },
    ],
    thang: ["Tạo nhóm sản phẩm khi có BST mới","Ghép bộ sản phẩm nổi bật","Chỉnh sửa main menu & banner theo chương trình sale","Xem báo cáo tổng hợp doanh thu"],
  },
  {
    id: "editor", title: "Editor / Camera", icon: "🎥", color: "#eff6ff", border: "#bfdbfe", textColor: "#1d4ed8",
    mucTieu: ["Sáng tạo, chỉnh sửa nội dung hình ảnh","Đảm bảo tiến độ sản xuất nội dung","Xây dựng nội dung dễ tiếp cận người dùng"],
    ngay: [
      { title: "Thực hiện quay dựng trong ngày", items: ["Check list sản phẩm quay tại file Checklist","Chuẩn bị sẵn sản phẩm cho buổi quay","Chuẩn bị đạo cụ: Mic, điện thoại, tripod,..."] },
      { title: "Edit video & lưu trữ", items: ["Xem lại, cắt, chỉnh sửa video bằng Capcut","Chèn text, thêm sound effect","Gửi cho trưởng phòng nghiệm thu","Up toàn bộ cảnh quay vào file Tài Nguyên MKT"] },
      { title: "Đăng video TikTok", items: ["Đăng video đã edit, viết caption","Gắn sản phẩm trong giỏ hàng","Đăng video lên nhật ký"] },
    ],
    tuan: [
      { title: "Tổng hợp hiệu suất video", items: ["Liệt kê toàn bộ link video trong tuần","Thống kê: View, Tim, Comment"] },
    ],
    thang: ["Tổng kết & phân tích hiệu suất nội dung","Cập nhật xu hướng, đề xuất ý tưởng","Lập kế hoạch nội dung tháng tới"],
  },
  {
    id: "content", title: "Content Writer", icon: "✍️", color: "#faf5ff", border: "#e9d5ff", textColor: "#7c3aed",
    mucTieu: ["Sáng tạo nội dung cho TikTok, Fanpage, Website","Bắt trend nhanh, tối ưu hiệu quả tiếp cận","Đảm bảo tiến độ đăng bài và chất lượng nội dung"],
    ngay: [
      { title: "Lên nội dung TikTok", items: ["Lên tiêu đề & nội dung chính cho video","Đề xuất ý tưởng, concept video","Lên 3–5 kịch bản TikTok/ngày"] },
      { title: "Đăng bài Fanpage", items: ["Viết nội dung bài đăng theo sản phẩm/chiến dịch","Đăng Reels kèm caption ngắn gọn, thu hút","Dán link hoàn thành vào file Check list"] },
      { title: "Viết Blog", items: ["Viết bài blog theo key chính, sản phẩm, BST","Tối ưu SEO: title, heading, keyword"] },
    ],
    tuan: [
      { title: "Tổng hợp hiệu suất content", items: ["Đánh giá hiệu quả bài đăng FB trong tuần","Đánh giá hiệu quả video trong tuần","Đúc kết để lên kế hoạch tuần sau"] },
    ],
    thang: ["Tổng kết & phân tích hiệu suất cả tháng","Tối ưu chiến lược nội dung","Xây dựng định hướng content dài hạn"],
  },
  {
    id: "design", title: "Thiết kế", icon: "🎨", color: "#fff0ed", border: "#fecaca", textColor: "#E2401C",
    mucTieu: ["Sáng tạo nội dung hình ảnh cho TikTok, Fanpage, Website","Đảm bảo tiến độ & chất lượng thiết kế"],
    ngay: [
      { title: "Check file thiết kế yêu cầu", items: ["Kiểm tra các yêu cầu thiết kế trong ngày","Hoạch định thứ tự thiết kế ưu tiên","Thực hiện thiết kế theo yêu cầu"] },
      { title: "Nghiệm thu sản phẩm trong ngày", items: ["Gửi file cho Content để check & duyệt","Sửa lại theo yêu cầu (nếu có)","Dán link hoàn thành vào file yêu cầu"] },
    ],
    tuan: [
      { title: "Tổng hợp & đánh giá hiệu suất ảnh", items: ["Tổng hợp link kết quả các ảnh trong tuần","Họp với Content để đánh giá & feedback"] },
    ],
    thang: ["Tổng kết & phân tích hiệu suất thiết kế","Tổng hợp KPI: số thiết kế hoàn thành","Phối hợp xây dựng định hướng content dài hạn"],
  },
];

const quyTrinhChung = {
  yeuCau: [
    "100% công việc thực hiện qua văn bản (File yêu cầu & kết quả + tin nhắn thông báo)",
    "Không nhắc ở ngoài hoặc gọi điện thoại (nếu sai sót xảy ra, tính lỗi cả 2 bên)",
    "Các bộ phận thống nhất 1 file chung duy nhất để giao, nhận, hoàn thành công việc",
  ],
  boPhận: [
    "Bộ phận yêu cầu: Gửi đầy đủ thông tin công việc, nội dung chi tiết, guideline, deadline",
    "Bộ phận được yêu cầu: Feedback ngay nếu gặp vấn đề, báo trước nếu không kịp deadline",
    "Khi hoàn thành: Báo lại cho bộ phận yêu cầu check – cả 2 đồng thuận mới tính hoàn thành",
  ],
  phoiHop: [
    { a: "Design", b: "Content", file: "Order thiết kế Hero theo ngày", hoan: "Design", nghiem: "Content" },
    { a: "Editor", b: "Content", file: "Checklist quay sp hàng ngày", hoan: "Content", nghiem: "Editor" },
    { a: "Web", b: "Content", file: "Web - content giao việc", hoan: "Content", nghiem: "Web" },
    { a: "Design", b: "Web", file: "Order thiết kế Hero theo ngày", hoan: "Design", nghiem: "Web" },
  ],
};

// ===================== HELPERS =====================
const genId = () => Date.now() + Math.random();
const today = new Date();
const todayStr = today.toISOString().split("T")[0];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// ===================== MODALS =====================
function AddTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", assignee: "", status: "todo", due: "", icon: "📋" });
  const icons = ["📋","🎥","🛒","📱","🎨","📡","🌐","✍️","📊","🚀"];
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>➕ Thêm Task mới</span>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={styles.label}>Icon</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {icons.map(ic => (
                <button key={ic} onClick={() => setForm(f => ({ ...f, icon: ic }))}
                  style={{ fontSize: 18, padding: "4px 8px", borderRadius: 6, border: form.icon === ic ? "2px solid #E2401C" : "1px solid #e5e7eb", background: form.icon === ic ? "#fff0ed" : "#fff", cursor: "pointer" }}>
                  {ic}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={styles.label}>Tên công việc *</div>
            <input style={styles.input} placeholder="Nhập tên task..." value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <div style={styles.label}>Người thực hiện</div>
            <select style={styles.input} value={form.assignee} onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}>
              <option value="">-- Chọn thành viên --</option>
              {members.map(m => <option key={m.initials} value={m.initials}>{m.name} • {m.role}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={styles.label}>Trạng thái</div>
              <select style={styles.input} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="todo">Chờ làm</option>
                <option value="doing">Đang làm</option>
                <option value="review">Đang duyệt</option>
                <option value="done">Hoàn thành</option>
              </select>
            </div>
            <div>
              <div style={styles.label}>Deadline</div>
              <input type="date" style={styles.input} value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={onClose} style={styles.btnSecondary}>Huỷ</button>
            <button onClick={() => {
              if (!form.name) return;
              const m = members.find(x => x.initials === form.assignee);
              onAdd({
                id: genId(), icon: form.icon, name: form.name,
                sub: m ? `${m.name} • ${m.role}` : "Chưa phân công",
                status: form.status,
                due: form.due ? form.due.split("-").reverse().join("/") : "—",
                assignee: form.assignee
              });
              onClose();
            }} style={styles.btnPrimary}>Thêm Task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddCampaignModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", channel: "TikTok Shop", status: "planned", budget: "", start: "", end: "" });
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>🚀 Tạo Chiến dịch mới</span>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={styles.label}>Tên chiến dịch *</div>
            <input style={styles.input} placeholder="Vd: Flash Sale 6/6..." value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={styles.label}>Kênh</div>
              <select style={styles.input} value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value }))}>
                {["TikTok Shop", "Shopee", "Website", "TikTok Affiliate", "All"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div style={styles.label}>Ngân sách (VNĐ)</div>
              <input style={styles.input} placeholder="0" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={styles.label}>Ngày bắt đầu</div>
              <input type="date" style={styles.input} value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))} />
            </div>
            <div>
              <div style={styles.label}>Ngày kết thúc</div>
              <input type="date" style={styles.input} value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={onClose} style={styles.btnSecondary}>Huỷ</button>
            <button onClick={() => {
              if (!form.name) return;
              onAdd({ id: genId(), name: form.name, status: "planned", budget: form.budget || "0", spent: "0", channel: form.channel, start: form.start, end: form.end, result: "Chưa bắt đầu", color: "#64748b" });
              onClose();
            }} style={styles.btnPrimary}>Tạo chiến dịch</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportModal({ tasks, campaigns, onClose }) {
  const done = tasks.filter(t => t.status === "done").length;
  const total = tasks.length;
  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const reportText = `📊 BÁO CÁO TUẦN - PHÒNG MKT HERO SPORT
═══════════════════════════════════
📅 Ngày: ${new Date().toLocaleDateString("vi-VN")}

✅ TIẾN ĐỘ TASK:
• Hoàn thành: ${done}/${total} task (${Math.round(done/total*100)}%)
• Đang thực hiện: ${tasks.filter(t=>t.status==="doing").length} task
• Đang duyệt: ${tasks.filter(t=>t.status==="review").length} task
• Chờ làm: ${tasks.filter(t=>t.status==="todo").length} task

🚀 CHIẾN DỊCH:
• Đang chạy: ${activeCampaigns} chiến dịch
• Hoàn thành: ${campaigns.filter(c=>c.status==="done").length} chiến dịch
• Sắp tới: ${campaigns.filter(c=>c.status==="planned").length} chiến dịch

📈 KPI KÊNH:
• TikTok Shop: 85% mục tiêu
• Shopee: 72% mục tiêu
• Website: 45% mục tiêu
• TikTok Affiliate: 68% mục tiêu

👥 NHÂN SỰ:
• Tổng: ${members.length} người (${members.filter(m=>m.type==="Full Time").length} FT, ${members.filter(m=>m.type==="Partime").length} PT)
• Online hôm nay: ${members.filter(m=>m.status==="online").length} người
═══════════════════════════════════`;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, maxWidth: 520 }}>
        <div style={styles.modalHeader}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>📄 Báo cáo tuần</span>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        <pre style={{ fontSize: 12, background: "#f8fafc", borderRadius: 8, padding: 14, whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#334155", fontFamily: "monospace", maxHeight: 400, overflowY: "auto" }}>{reportText}</pre>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10 }}>
          <button onClick={() => { navigator.clipboard.writeText(reportText); }} style={styles.btnSecondary}>📋 Sao chép</button>
          <button onClick={onClose} style={styles.btnPrimary}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

// ===================== AI CHAT =====================
function AIChatPanel({ tasks, campaigns }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Xin chào! Tôi là AI hỗ trợ phòng MKT Hero Sport 🏃‍♂️\nBạn có thể hỏi tôi về:\n• Phân tích hiệu quả kênh\n• Đề xuất chiến dịch\n• Tóm tắt tiến độ task\n• Ý tưởng content TikTok\n• Bất kỳ câu hỏi nào về marketing!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const done = tasks.filter(t => t.status === "done").length;
  const context = `Bạn là AI hỗ trợ phòng Marketing của Hero Sport - công ty bán đồ thể thao (Li-Ning, Adidas, Mixsport). Phòng có ${members.length} người gồm ${members.map(m=>m.name+" ("+m.role+")").join(", ")}. Hiện có ${tasks.length} task, ${done} hoàn thành. Các kênh: TikTok Shop (chính), Shopee, Website, TikTok Affiliate Mixsport. Trả lời bằng tiếng Việt, ngắn gọn, thực tế, chuyên nghiệp.`;

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: context,
          messages: [
            ...messages.filter(m => m.role !== "assistant" || messages.indexOf(m) > 0).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
            { role: "user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Xin lỗi, tôi không thể trả lời lúc này.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "⚠️ Lỗi kết nối. Vui lòng thử lại." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#fafafa" }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid #e5e7eb", background: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 18 }}>🤖</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>AI Assistant MKT</div>
          <div style={{ fontSize: 10, color: "#22c55e" }}>● Sẵn sàng hỗ trợ</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "85%", padding: "8px 11px", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              background: m.role === "user" ? "#E2401C" : "#fff",
              color: m.role === "user" ? "#fff" : "#333",
              fontSize: 12, lineHeight: 1.6,
              border: m.role === "user" ? "none" : "1px solid #e5e7eb",
              whiteSpace: "pre-wrap"
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ padding: "8px 12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px 12px 12px 2px", fontSize: 12, color: "#888" }}>
              ✍️ Đang soạn...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "10px 14px", borderTop: "1px solid #e5e7eb", background: "#fff", display: "flex", gap: 8 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Hỏi gì đó..." style={{ flex: 1, padding: "7px 12px", border: "1px solid #e5e7eb", borderRadius: 20, fontSize: 12, outline: "none" }} />
        <button onClick={send} disabled={loading} style={{ padding: "7px 14px", background: "#E2401C", color: "#fff", border: "none", borderRadius: 20, fontSize: 12, cursor: "pointer", opacity: loading ? 0.6 : 1 }}>↑</button>
      </div>
    </div>
  );
}

// ===================== CALENDAR =====================
function CalendarView({ events, onAddEvent }) {
  const [curYear, setCurYear] = useState(2025);
  const [curMonth, setCurMonth] = useState(4); // May = 4
  const [selected, setSelected] = useState(todayStr);

  const daysInMonth = getDaysInMonth(curYear, curMonth);
  const firstDay = getFirstDayOfMonth(curYear, curMonth);
  const monthName = new Date(curYear, curMonth, 1).toLocaleString("vi-VN", { month: "long", year: "numeric" });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDateStr = (d) => `${curYear}-${String(curMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const getEventsForDay = (d) => events.filter(e => e.date === getDateStr(d));
  const selectedEvents = events.filter(e => e.date === selected);

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {/* Month nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <button onClick={() => { if (curMonth === 0) { setCurMonth(11); setCurYear(y => y - 1); } else setCurMonth(m => m - 1); }} style={styles.navBtn}>‹</button>
          <span style={{ fontWeight: 700, fontSize: 14, textTransform: "capitalize" }}>{monthName}</span>
          <button onClick={() => { if (curMonth === 11) { setCurMonth(0); setCurYear(y => y + 1); } else setCurMonth(m => m + 1); }} style={styles.navBtn}>›</button>
        </div>
        {/* Weekday headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
          {["CN","T2","T3","T4","T5","T6","T7"].map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, color: "#aaa", padding: "4px 0" }}>{d}</div>
          ))}
        </div>
        {/* Days grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
          {cells.map((d, i) => {
            if (!d) return <div key={`e-${i}`} />;
            const ds = getDateStr(d);
            const dayEvents = getEventsForDay(d);
            const isToday = ds === todayStr;
            const isSelected = ds === selected;
            return (
              <div key={d} onClick={() => setSelected(ds)} style={{
                minHeight: 54, padding: "4px 5px", borderRadius: 8, cursor: "pointer",
                background: isSelected ? "#fff0ed" : isToday ? "#fff7f5" : "#fff",
                border: isSelected ? "1.5px solid #E2401C" : isToday ? "1px solid #fca5a5" : "1px solid #f1f5f9",
                transition: "all 0.15s"
              }}>
                <div style={{ fontSize: 11, fontWeight: isToday ? 700 : 500, color: isToday ? "#E2401C" : "#444", marginBottom: 2 }}>{d}</div>
                {dayEvents.slice(0, 2).map((ev, j) => {
                  const s = eventTypeStyle[ev.type] || eventTypeStyle.task;
                  return (
                    <div key={j} style={{ fontSize: 9, padding: "1px 4px", borderRadius: 3, background: s.bg, color: s.color, marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {ev.title}
                    </div>
                  );
                })}
                {dayEvents.length > 2 && <div style={{ fontSize: 9, color: "#aaa" }}>+{dayEvents.length - 2}</div>}
              </div>
            );
          })}
        </div>
      </div>
      {/* Day detail */}
      <div style={{ width: 240, borderLeft: "1px solid #e5e7eb", overflowY: "auto", padding: 14, background: "#fafafa" }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10, color: "#333" }}>
          📅 {new Date(selected + "T00:00:00").toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}
        </div>
        {selectedEvents.length === 0 ? (
          <div style={{ fontSize: 12, color: "#aaa", textAlign: "center", marginTop: 30 }}>Không có sự kiện</div>
        ) : (
          selectedEvents.map((ev, i) => {
            const s = eventTypeStyle[ev.type] || eventTypeStyle.task;
            return (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{ev.title}</span>
                </div>
                <div style={{ fontSize: 11, color: "#888" }}>👤 {ev.member}</div>
                <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: s.bg, color: s.color, marginTop: 4, display: "inline-block", fontWeight: 600 }}>{ev.type}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ===================== ANALYTICS =====================
function AnalyticsView() {
  const maxVal = Math.max(...weeklyData.flatMap(d => [d.tiktok, d.shopee, d.web]));
  return (
    <div style={{ overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {analyticsKPI.map((k, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>{k.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: k.up ? "#f0fdf4" : "#fff7f5", color: k.up ? "#16a34a" : "#E2401C" }}>{k.change}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{k.value}</div>
            <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{k.label} ({k.unit})</div>
          </div>
        ))}
      </div>
      {/* Weekly bar chart */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12, color: "#333" }}>📊 Hiệu quả 7 ngày theo kênh</div>
        <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
          {[["#333","TikTok Shop"],["#EE4D2D","Shopee"],["#1877F2","Website"]].map(([c,l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "#666" }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
          {weeklyData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 100 }}>
                {[{ v: d.tiktok, c: "#333" }, { v: d.shopee, c: "#EE4D2D" }, { v: d.web, c: "#1877F2" }].map((bar, bi) => (
                  <div key={bi} style={{ flex: 1, height: `${(bar.v / maxVal) * 100}%`, background: bar.c, borderRadius: "3px 3px 0 0", minHeight: 2 }} />
                ))}
              </div>
              <span style={{ fontSize: 10, color: "#aaa" }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Channel performance */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12, color: "#333" }}>📡 Hiệu quả kênh (% mục tiêu tháng)</div>
        {channels.map((c, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{c.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: c.color === "#333" ? "#555" : c.color }}>{c.pct}%</span>
            </div>
            <div style={{ height: 8, background: "#f1f5f9", borderRadius: 10 }}>
              <div style={{ height: 8, width: `${c.pct}%`, background: c.color, borderRadius: 10, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 10, color: "#aaa", marginTop: 3 }}>{c.reach}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== CAMPAIGN =====================
function CampaignView({ campaigns, onAdd }) {
  const [showAdd, setShowAdd] = useState(false);
  const active = campaigns.filter(c => c.status === "active");
  const done = campaigns.filter(c => c.status === "done");
  const planned = campaigns.filter(c => c.status === "planned");

  const CampaignCard = ({ c }) => {
    const s = campaignStatusStyle[c.status];
    const spentNum = parseInt(c.spent.replace(/\./g, "")) || 0;
    const budgetNum = parseInt(c.budget.replace(/\./g, "")) || 1;
    const pct = Math.min(Math.round((spentNum / budgetNum) * 100), 100);
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{c.name}</div>
          <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: s.bg, color: s.color, flexShrink: 0, marginLeft: 8 }}>{s.label}</span>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#666", marginBottom: 8 }}>
          <span>📡 {c.channel}</span>
          {c.start && <span>📅 {c.start} → {c.end}</span>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
          <span style={{ color: "#888" }}>Chi tiêu: <strong style={{ color: "#1e293b" }}>{c.spent !== "0" ? c.spent + "đ" : "0đ"}</strong></span>
          <span style={{ color: "#888" }}>Ngân sách: <strong>{c.budget}đ</strong></span>
        </div>
        {c.status !== "planned" && (
          <div style={{ height: 5, background: "#f1f5f9", borderRadius: 10 }}>
            <div style={{ height: 5, width: `${pct}%`, background: c.color, borderRadius: 10 }} />
          </div>
        )}
        <div style={{ fontSize: 11, color: c.color, fontWeight: 600, marginTop: 6 }}>📊 {c.result}</div>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>🚀 Chiến dịch Marketing</div>
        <button onClick={() => setShowAdd(true)} style={styles.btnPrimary}>+ Tạo chiến dịch</button>
      </div>
      {showAdd && <AddCampaignModal onClose={() => setShowAdd(false)} onAdd={c => { campaigns.push(c); setShowAdd(false); }} />}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#c2410c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E2401C", display: "inline-block" }} /> Đang chạy ({active.length})
          </div>
          {active.map(c => <CampaignCard key={c.id} c={c} />)}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> Hoàn thành ({done.length})
          </div>
          {done.map(c => <CampaignCard key={c.id} c={c} />)}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#94a3b8", display: "inline-block" }} /> Sắp tới ({planned.length})
          </div>
          {planned.map(c => <CampaignCard key={c.id} c={c} />)}
        </div>
      </div>
    </div>
  );
}

// ===================== STYLES =====================
const styles = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", borderRadius: 12, padding: 20, width: "90%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  closeBtn: { background: "none", border: "none", fontSize: 16, cursor: "pointer", color: "#888", padding: "2px 6px" },
  label: { fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 },
  input: { width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", background: "#f9fafb", boxSizing: "border-box" },
  btnPrimary: { padding: "7px 16px", background: "#E2401C", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 600 },
  btnSecondary: { padding: "7px 16px", background: "#f1f5f9", color: "#555", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, cursor: "pointer" },
  navBtn: { padding: "4px 10px", border: "1px solid #e5e7eb", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 14 },
};

// ===================== NOTIFICATIONS =====================
function getNotifications(tasks) {
  const notifs = [];
  const todayParts = new Date().toLocaleDateString("vi-VN").split("/").reverse();
  tasks.forEach(t => {
    if (t.due === "Hôm nay") notifs.push({ type: "deadline", msg: `⏰ Hôm nay: "${t.name}"`, color: "#E2401C" });
    if (t.status === "review") notifs.push({ type: "review", msg: `👀 Chờ duyệt: "${t.name}"`, color: "#1d4ed8" });
  });
  return notifs;
}

// ===================== MAIN APP =====================
export default function MKTRoom() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeQT, setActiveQT] = useState("truongphong");
  const [tasks, setTasks] = useState(initTasks);
  const [campaigns, setCampaigns] = useState(initCampaigns);
  const [events] = useState(calendarEvents);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [rightTab, setRightTab] = useState("members"); // members | ai | notifs
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const totalOnline = members.filter(m => m.status === "online").length;
  const totalDone = tasks.filter(t => t.status === "done").length;
  const totalTodo = tasks.filter(t => t.status === "todo").length;
  const totalDoing = tasks.filter(t => t.status === "doing").length;
  const selectedQT = quyTrinh.find(q => q.id === activeQT);
  const notifications = getNotifications(tasks);

  const navItems = [
    { id: "dashboard", icon: "🗂", label: "Tổng quan" },
    { id: "quytrinh", icon: "📋", label: "Quy trình" },
    { id: "campaign", icon: "📢", label: "Chiến dịch" },
    { id: "calendar", icon: "📅", label: "Lịch nội dung" },
    { id: "analytics", icon: "📈", label: "Phân tích" },
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", background: "#f8f8f8" }}>
      {/* Modals */}
      {showAddTask && <AddTaskModal onClose={() => setShowAddTask(false)} onAdd={t => setTasks(prev => [...prev, t])} />}
      {showReport && <ReportModal tasks={tasks} campaigns={campaigns} onClose={() => setShowReport(false)} />}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: "#fff", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>HERO SPORT - MKT</span>
              <span style={{ background: "#E2401C", color: "#fff", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>TRỰC TUYẾN</span>
              {notifications.length > 0 && (
                <span style={{ background: "#fef9c3", color: "#854d0e", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>
                  🔔 {notifications.length} thông báo
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>Phòng marketing Hero Sport</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, color: "#666", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            {totalOnline} online
          </span>
          <button onClick={() => setShowAddTask(true)} style={{ ...styles.btnPrimary, fontSize: 12 }}>+ Thêm task</button>
          <button onClick={() => setShowReport(true)} style={{ ...styles.btnSecondary, fontSize: 12 }}>📊 Báo cáo</button>
          <button onClick={() => setRightTab("ai")} style={{ fontSize: 12, padding: "7px 14px", border: "1px solid #e5e7eb", borderRadius: 8, background: rightTab === "ai" ? "#fff0ed" : "#fff", color: rightTab === "ai" ? "#E2401C" : "#555", cursor: "pointer", fontWeight: rightTab === "ai" ? 600 : 400 }}>🤖 AI</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 260px", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ borderRight: "1px solid #e5e7eb", background: "#fafafa", overflowY: "auto", padding: "12px 0" }}>
          <div style={{ padding: "0 10px 12px", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#aaa", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Điều hướng</div>
            {navItems.map(item => (
              <div key={item.id} onClick={() => setActiveNav(item.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 2, background: activeNav === item.id ? "#fff0ed" : "transparent", color: activeNav === item.id ? "#E2401C" : "#555", fontWeight: activeNav === item.id ? 600 : 400 }}>
                <span>{item.icon}</span> {item.label}
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 10px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#aaa", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Nhân sự</div>
            <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>Tổng: <strong>{members.length} người</strong></div>
            <div style={{ fontSize: 12, color: "#16a34a", marginBottom: 4 }}>Full Time: <strong>{members.filter(m => m.type === "Full Time").length}</strong></div>
            <div style={{ fontSize: 12, color: "#854d0e" }}>Partime: <strong>{members.filter(m => m.type === "Partime").length}</strong></div>
          </div>
          {/* Deadline alert */}
          {notifications.length > 0 && (
            <div style={{ margin: "0 10px", padding: "10px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#c2410c", marginBottom: 6 }}>⏰ SẮP ĐẾN HẠN</div>
              {notifications.slice(0, 3).map((n, i) => (
                <div key={i} style={{ fontSize: 11, color: n.color, marginBottom: 3 }}>{n.msg}</div>
              ))}
            </div>
          )}
        </div>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Dashboard */}
          {activeNav === "dashboard" && (
            <div style={{ overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {[
                  { label: "Nhân sự MKT", val: `${members.length} người`, change: `${members.filter(m=>m.type==="Full Time").length} FT • ${members.filter(m=>m.type==="Partime").length} PT` },
                  { label: "Task hôm nay", val: `${totalTodo} chờ`, change: `${totalDoing} đang chạy` },
                  { label: "Ca Live hôm nay", val: "2 ca", change: "17h & 20h" },
                  { label: "Hoàn thành", val: `${totalDone}/${tasks.length}`, change: `${Math.round(totalDone/tasks.length*100)}% tiến độ` },
                ].map((k, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{k.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{k.val}</div>
                    <div style={{ fontSize: 11, color: "#16a34a", marginTop: 2 }}>{k.change}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 8 }}>✅ Công việc đang thực hiện</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {tasks.map((t, i) => {
                    const s = statusMap[t.status];
                    return (
                      <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10 }}>
                        <span style={{ fontSize: 16 }}>{t.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</div>
                          <div style={{ fontSize: 11, color: "#888" }}>{t.sub}</div>
                        </div>
                        <select value={t.status} onChange={e => setTasks(prev => prev.map(x => x.id === t.id ? { ...x, status: e.target.value } : x))}
                          style={{ fontSize: 11, fontWeight: 600, padding: "3px 6px", borderRadius: 20, border: "1px solid", borderColor: s.color, background: s.bg, color: s.color, cursor: "pointer" }}>
                          {Object.entries(statusMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                        <span style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap" }}>{t.due}</span>
                        <button onClick={() => setTasks(prev => prev.filter(x => x.id !== t.id))} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 14, padding: "0 2px" }}>✕</button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 8 }}>📊 Hiệu quả kênh</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {channels.map((c, i) => (
                    <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{c.name}</div>
                      <div style={{ height: 6, background: "#e5e7eb", borderRadius: 10, marginBottom: 4 }}>
                        <div style={{ height: 6, width: `${c.pct}%`, background: c.color, borderRadius: 10 }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888" }}>
                        <span>{c.reach}</span>
                        <span style={{ color: c.color === "#333" ? "#555" : c.color, fontWeight: 600 }}>{c.pct}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quy trình */}
          {activeNav === "quytrinh" && (
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
              <div style={{ width: 170, borderRight: "1px solid #e5e7eb", background: "#fafafa", padding: "12px 8px", overflowY: "auto", flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#aaa", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase", paddingLeft: 4 }}>Bộ phận</div>
                <div onClick={() => setActiveQT("chung")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12, marginBottom: 4, background: activeQT === "chung" ? "#fff0ed" : "transparent", color: activeQT === "chung" ? "#E2401C" : "#555", fontWeight: activeQT === "chung" ? 600 : 400 }}>
                  🔗 Quy trình chung
                </div>
                {quyTrinh.map(q => (
                  <div key={q.id} onClick={() => setActiveQT(q.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12, marginBottom: 4, background: activeQT === q.id ? q.color : "transparent", color: activeQT === q.id ? q.textColor : "#555", fontWeight: activeQT === q.id ? 600 : 400, border: activeQT === q.id ? `1px solid ${q.border}` : "1px solid transparent" }}>
                    {q.icon} {q.title}
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
                {activeQT === "chung" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>📌 Nguyên tắc chung</div>
                      {quyTrinhChung.yeuCau.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13 }}>
                          <span style={{ color: "#E2401C", flexShrink: 0 }}>•</span>
                          <span style={{ color: "#444" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>🤝 Trách nhiệm các bên</div>
                      {quyTrinhChung.boPhận.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13 }}>
                          <span style={{ color: "#E2401C", flexShrink: 0 }}>•</span>
                          <span style={{ color: "#444" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>🔄 Phối hợp giữa các bộ phận</div>
                      <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc" }}>
                            {["Phối hợp","File làm việc chung","Hoàn thiện","Nghiệm thu"].map(h => (
                              <th key={h} style={{ padding: "8px 10px", textAlign: "left", borderBottom: "1px solid #e5e7eb", color: "#888", fontWeight: 600 }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {quyTrinhChung.phoiHop.map((p, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "8px 10px", fontWeight: 500 }}>{p.a} ↔ {p.b}</td>
                              <td style={{ padding: "8px 10px", color: "#555" }}>{p.file}</td>
                              <td style={{ padding: "8px 10px" }}><span style={{ background: "#f0fdf4", color: "#16a34a", fontSize: 11, padding: "2px 7px", borderRadius: 10, fontWeight: 600 }}>{p.hoan}</span></td>
                              <td style={{ padding: "8px 10px" }}><span style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: 11, padding: "2px 7px", borderRadius: 10, fontWeight: 600 }}>{p.nghiem}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeQT !== "chung" && selectedQT && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ background: selectedQT.color, border: `1px solid ${selectedQT.border}`, borderRadius: 10, padding: "14px 16px" }}>
                      <div style={{ fontSize: 16, marginBottom: 8 }}>{selectedQT.icon} <span style={{ fontWeight: 700, color: selectedQT.textColor }}>{selectedQT.title}</span></div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: selectedQT.textColor, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>🎯 Mục tiêu</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {selectedQT.mucTieu.map((m, i) => (
                          <span key={i} style={{ fontSize: 12, background: "#fff", color: "#555", padding: "3px 10px", borderRadius: 20, border: `1px solid ${selectedQT.border}` }}>{m}</span>
                        ))}
                      </div>
                    </div>
                    {[
                      { label: "🌅 Công việc hàng ngày", key: "ngay", data: selectedQT.ngay },
                      { label: "📅 Công việc hàng tuần", key: "tuan", data: selectedQT.tuan },
                    ].map(section => section.data.length > 0 && (
                      <div key={section.key} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e5e7eb", fontWeight: 600, fontSize: 13 }}>{section.label}</div>
                        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                          {section.data.map((s, si) => {
                            const k = `${activeQT}-${section.key}-${si}`;
                            const open = expandedSections[k] !== false;
                            return (
                              <div key={si}>
                                <div onClick={() => toggleSection(k)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "4px 0" }}>
                                  <span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>📌 {s.title}</span>
                                  <span style={{ fontSize: 11, color: "#aaa" }}>{open ? "▲" : "▼"}</span>
                                </div>
                                {open && (
                                  <div style={{ marginLeft: 14, marginTop: 4, display: "flex", flexDirection: "column", gap: 5 }}>
                                    {s.items.map((item, ii) => (
                                      <div key={ii} style={{ display: "flex", gap: 8, fontSize: 12, color: "#555" }}>
                                        <span style={{ color: "#E2401C", flexShrink: 0 }}>✓</span>
                                        <span>{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {selectedQT.thang.length > 0 && (
                      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e5e7eb", fontWeight: 600, fontSize: 13 }}>📆 Công việc hàng tháng</div>
                        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                          {selectedQT.thang.map((item, i) => (
                            <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "#555" }}>
                              <span style={{ color: "#E2401C", flexShrink: 0 }}>✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeNav === "campaign" && (
            <CampaignView campaigns={campaigns} onAdd={c => setCampaigns(prev => [...prev, c])} />
          )}
          {activeNav === "calendar" && <CalendarView events={events} />}
          {activeNav === "analytics" && <AnalyticsView />}
        </div>

        {/* Right panel */}
        <div style={{ borderLeft: "1px solid #e5e7eb", display: "flex", flexDirection: "column", background: "#fafafa", overflow: "hidden" }}>
          {/* Right tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", background: "#fff", flexShrink: 0 }}>
            {[
              { id: "members", label: "👥 Nhân sự" },
              { id: "ai", label: "🤖 AI Chat" },
              { id: "notifs", label: `🔔 TB${notifications.length > 0 ? ` (${notifications.length})` : ""}` },
            ].map(tab => (
              <button key={tab.id} onClick={() => setRightTab(tab.id)} style={{ flex: 1, padding: "9px 4px", border: "none", background: "none", fontSize: 11, fontWeight: rightTab === tab.id ? 700 : 400, color: rightTab === tab.id ? "#E2401C" : "#888", borderBottom: rightTab === tab.id ? "2px solid #E2401C" : "2px solid transparent", cursor: "pointer" }}>
                {tab.label}
              </button>
            ))}
          </div>

          {rightTab === "members" && (
            <div style={{ overflowY: "auto", flex: 1 }}>
              <div style={{ padding: "12px 14px", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#aaa", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Thành viên ({members.length})</div>
                {members.map((m, i) => {
                  const t = typeColor[m.type];
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: m.color, color: m.textColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{m.initials}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</div>
                        <div style={{ fontSize: 10, color: "#888" }}>{m.role}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                        <span style={{ fontSize: 9, color: onlineColor[m.status], fontWeight: 600 }}>{onlineLabel[m.status]}</span>
                        <span style={{ fontSize: 9, fontWeight: 600, padding: "1px 5px", borderRadius: 10, background: t.bg, color: t.color }}>{m.type}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Mini chart */}
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#aaa", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Hoạt động 7 ngày</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 55 }}>
                  {weeklyData.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <div style={{ width: "100%", height: d.tiktok, background: d.tiktok >= 50 ? "#E2401C" : "#e5e7eb", borderRadius: "3px 3px 0 0" }} />
                      <span style={{ fontSize: 9, color: d.tiktok >= 50 ? "#E2401C" : "#aaa" }}>{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                <button onClick={() => setShowReport(true)} style={{ width: "100%", padding: "8px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff", fontSize: 12, cursor: "pointer" }}>📄 Tạo báo cáo tuần</button>
                <button onClick={() => setActiveNav("campaign")} style={{ width: "100%", padding: "8px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff", fontSize: 12, cursor: "pointer" }}>🚀 Lên chiến dịch mới</button>
              </div>
            </div>
          )}

          {rightTab === "ai" && <AIChatPanel tasks={tasks} campaigns={campaigns} />}

          {rightTab === "notifs" && (
            <div style={{ overflowY: "auto", flex: 1, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#aaa", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Thông báo</div>
              {notifications.length === 0 ? (
                <div style={{ textAlign: "center", color: "#aaa", fontSize: 12, marginTop: 40 }}>Không có thông báo mới ✓</div>
              ) : notifications.map((n, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: n.color, fontWeight: 600 }}>{n.msg}</div>
                  <div style={{ fontSize: 10, color: "#aaa", marginTop: 4 }}>Hôm nay</div>
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#aaa", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Deadline sắp tới</div>
                {tasks.filter(t => t.status !== "done").slice(0, 5).map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", background: "#fff", border: "1px solid #f1f5f9", borderRadius: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 14 }}>{t.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</div>
                      <div style={{ fontSize: 10, color: "#aaa" }}>Due: {t.due}</div>
                    </div>
                    <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, background: statusMap[t.status].bg, color: statusMap[t.status].color, fontWeight: 600 }}>{statusMap[t.status].label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
