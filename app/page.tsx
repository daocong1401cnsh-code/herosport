export default function Home() {
  const googleSheetUrl = "https://google.com"; // Thay bằng link Google Sheets thực tế của bạn nếu có

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
      <iframe
        src={googleSheetUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
      />
    </div>
  );
}
