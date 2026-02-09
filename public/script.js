async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value;
    if (!message) return;

    // Tampilin pesan user
    chatBox.innerHTML += `<div class="message user">Lu: ${message}</div>`;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Kirim ke backend
    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    const data = await response.json();

    // Tampilin respons AI
    chatBox.innerHTML += `<div class="message ai">AI: ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
