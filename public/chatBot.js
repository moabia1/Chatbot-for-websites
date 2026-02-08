
(function () {
  const api_Url = "http://localhost:3000/api/chat";

  const scriptTag = document.currentScript;
  const ownerId = scriptTag.getAttribute("data-org-id");

  if (!ownerId) {
    console.log("Owner id not found");
    return;
  }

  const button = document.createElement("div");
  button.innerHTML = "💬";

  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    background: "#000",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "22px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.35)",
    zIndex: "9999",
  });
  document.body.append(button);

  const box = document.createElement("div");
  Object.assign(box.style, {
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "320px",
    display: "none",
    height: "420px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.25)",
    flexDirection: "column",
    zIndex: "9999",
    overflow: "hidden",
    fontFamily: "Inter, system-ui, sans-serif",
  });

  box.innerHTML = `<div style="
  background: #000;
  color: #fff;
  padding: 12px 14px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ">
  <span>Customer Support</span>
  <span id="chat-close" style="cursor: pointer; font-size: 16px;">✖️</span>
  </div>

  <div id="chat-messages" style="
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  overflow-y: auto;
  "></div>

  <div style="
  display: flex;
  border-top: 1px solid #e5e7eb;
  padding: 8px;
  gap: 6px;
">
  <input
    type="text"
    id="chat-input"
    placeholder="Type a message"
    style="
      flex: 1;
      padding: 8px 10px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 13px;
      outline: none;
    "
  />
  <button
  id="chat-send"
    style="
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      color: #fff;
      background: #000;
      cursor: pointer;
    "
  >
    send
  </button>
</div>
`;
  
  document.body.appendChild(box);

  button.onclick = () => {
    box.style.display = box.style.display === "none" ? "flex" : "none";
  };

  document.getElementById("chat-close").onclick = () => {
    box.style.display = "none";
  }

  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");
  const messageArea = document.getElementById("chat-messages");

  function addMessage(text, from) {
    const bubble = document.createElement("div");
    bubble.textContent = text;
    Object.assign(bubble.style, {
      maxWidth: "78%",
      padding: "8px 12px",
      borderRadius: "14px",
      marginBottom: "8px",
      fontSize: "13px",
      lineHeight: "1.4",
      alignSelf: from === "user" ? "flex-end" : "flex-start",
      background: from === "user" ? "#000" : "#e5e7eb",
      color: from === "user" ? "#fff" : "#111",

      //bubble direction
      borderTopRightRadius: from === "user" ? "4px" : "14px",
      borderTopLeftRadius: from === "user" ? "14px" : "4px",
    })
    messageArea.appendChild(bubble)
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";

    const typing = document.createElement("div");
    typing.textContent = "Typing...";
    Object.assign(typing.style, {
      fontSize: "12px",
      color: "#6b7280",
      marginBottom: "8px",
      alignSelf: "flex-start",
    })
    messageArea.appendChild(typing);
    messageArea.scrollTop = messageArea.scrollHeight;

    try {
      const res = await fetch(api_Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId,
          message: text,
        })
      })

      const data = await res.json();
      messageArea.removeChild(typing);
      addMessage(data,"ai")
    } catch (error) {
      console.log(error)
      messageArea.removeChild(typing);
      addMessage("Something went wrong. Please try again later.", "ai");
    }
  }



})();
