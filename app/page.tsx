export default function Home() {
const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsTUQO9fUB3l8PrFnPDL0Y_IiFZ6RWqrRG2syD3jH49PVEKuj89fBuuU0TsKQqa4dia6m3t-VVfyfv/pubhtml";
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
