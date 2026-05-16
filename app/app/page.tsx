export default function Home() {
  // Thay thế đường link Google Sheets của bạn vào giữa hai dấu nháy kép dưới đây
  const googleSheetUrl = "https://google.com"; 

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
