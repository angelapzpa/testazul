// Worker para pruebas de velocidad
self.onmessage = function(e) {
  if (e.data === "status") {
    // Simular datos de prueba (en un caso real, aquí se harían las mediciones)
    const testData = {
      dlStatus: (Math.random() * 100).toFixed(2),
      ulStatus: (Math.random() * 30).toFixed(2),
      pingStatus: (Math.random() * 50).toFixed(2),
      jitterStatus: (Math.random() * 10).toFixed(2),
      testState: 4 // 4 = completado
    };
    self.postMessage(JSON.stringify(testData));
  } else if (e.data.startsWith("start")) {
    // Lógica real de prueba iría aquí
  } else if (e.data === "abort") {
    self.close();
  }
};