const WebSocket = require('ws');

// Cria um servidor WebSocket na porta 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('Servidor WebSocket iniciado na porta 8080.');

// Evento disparado quando um cliente se conecta
wss.on('connection', ws => {
console.log('Cliente conectado.');

// Envia dados para o cliente a cada 2 segundos
const sendData = setInterval(() => {
// Geramos um valor de exemplo (pode ser qualquer dado do seu monitoramento real)
const temperature = (Math.random() * 20 + 20).toFixed(2); // Temperatura entre 20 e 40
const data = JSON.stringify({
timestamp: new Date().toLocaleTimeString(),
temperature: temperature
});

// Enviamos o dado como uma string
ws.send(data);
}, 2000); // 2000 ms = 2 segundos

// Evento disparado quando o cliente fecha a conexão
ws.on('close', () => {
console.log('Cliente desconectado.');
clearInterval(sendData); // Paramos de enviar dados
});

// Evento para tratar possíveis erros

ws.on('error', error => {
console.error('Erro no WebSocket:', error);
});
});