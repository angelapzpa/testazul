// Versión completa con mediciones reales
self.onmessage = async (e) => {
  if (e.data === "status") return;
  
  const config = JSON.parse(e.data.replace("start ", ""));
  const BASE_URL = config.server || self.location.origin;

  // 1. Ping
  const pingStart = performance.now();
  await fetch(`${BASE_URL}/php/empty.php?t=${Date.now()}`);
  const ping = (performance.now() - pingStart).toFixed(2);
  self.postMessage(JSON.stringify({ pingStatus: ping, testState: 3 }));

  // 2. Download
  const dlSize = 10; // 10MB
  const dlStart = performance.now();
  await fetch(`${BASE_URL}/php/garbage.php?ckSize=${dlSize}`);
  const dlSpeed = (dlSize * 8) / ((performance.now() - dlStart) / 1000);
  self.postMessage(JSON.stringify({ dlStatus: dlSpeed.toFixed(2), testState: 1 }));

  // 3. Upload (requiere PHP)
  const ulData = new Blob([new Uint8Array(2 * 1024 * 1024)]); // 2MB
  const ulStart = performance.now();
  await fetch(`${BASE_URL}/php/upload.php`, {
    method: 'POST',
    body: ulData
  });
  const ulSpeed = (2 * 8) / ((performance.now() - ulStart) / 1000);
  self.postMessage(JSON.stringify({ ulStatus: ulSpeed.toFixed(2), testState: 2 }));

  // Fin
  self.postMessage(JSON.stringify({ 
    dlStatus: dlSpeed.toFixed(2),
    ulStatus: ulSpeed.toFixed(2),
    pingStatus: ping,
    testState: 4 
  }));
};