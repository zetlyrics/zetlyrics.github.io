// Fungsi untuk membuat elemen salju
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄"; // Gunakan simbol salju
  document.body.appendChild(snowflake);

  // Atur posisi awal dan animasi
  const size = Math.random() * 20 + 15 + "px";
  const startX = Math.random() * window.innerWidth + "px";
  const duration = Math.random() * 15 + 5 + "s";

  snowflake.style.left = startX;
  snowflake.style.fontSize = size;
  snowflake.style.animationDuration = duration;

  // Hapus elemen setelah selesai animasi
  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
  });

  setTimeout(() => snowflake.remove(), parseFloat(duration) * 1000);
}

// Buat salju setiap 100ms
setInterval(createSnowflake, 300);
