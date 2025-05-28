// Mendapatkan elemen-elemen DOM
const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentPage = 1;
const itemsPerPage = 7; // Jumlah item per halaman
let allData = [];
let filteredData = [];

// Fungsi untuk menampilkan hasil pencarian dengan pagination
function displayResults(data) {
  resultsList.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedResults = data.slice(start, end);

  if (paginatedResults.length === 0) {
    resultsList.innerHTML = "<li>Tidak ada hasil ditemukan.</li>";
  } else {
    paginatedResults.forEach((item, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = item.link; // Menggunakan link dari data CSV
      link.textContent = `${item.artist} - ${item.title}`;
      link.target = "_blank"; // Membuka tautan di tab baru

      // Menambahkan kelas animasi khusus untuk "Hinatazaka46" dan "Hiragana"
      if (
        item.artist === "Hinatazaka46" ||
        item.artist === "Hiragana Keyakizaka46" || item.artist === "Hiragana Keyakizaka46 (Hinatazaka46)"
      ) {
        link.classList.add("shining-text");
      } else if (
        item.artist === "Hinatazaka46" ||
        (item.artist === "Hiragana Keyakizaka46") & (data.indexOf(item) === 0)
      ) {
        link.classList.add("shining-text");
      } else if (data.indexOf(item) === 0) {
        link.classList.add("new-text");
      }

      li.appendChild(link);
      resultsList.appendChild(li);
    });
  }

  // Mengatur status tombol "Sebelumnya" dan "Selanjutnya"
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = end >= data.length;
}

// Fungsi untuk melakukan pencarian
function search(data) {
  const query = searchInput.value.toLowerCase();
  filteredData = data.filter(
    (item) =>
      item.artist.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query)
  );
  currentPage = 1; // Reset ke halaman pertama
  displayResults(filteredData);
}

// Fungsi untuk memuat data dari Google Sheets dalam format CSV
function loadData() {
  const fileUrls = [
    "https://docs.google.com/spreadsheets/d/14Fdcj-zkv052BVkiuBAlhjSZ3Uce4EG-oIE5HAEJpCc/export?format=csv&gid=0#gid=0",
    "https://docs.google.com/spreadsheets/d/14Fdcj-zkv052BVkiuBAlhjSZ3Uce4EG-oIE5HAEJpCc/export?format=csv&gid=62941114#gid=62941114",
  ];

  const promises = fileUrls.map((url) =>
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        // Parse CSV menjadi array objek
        const data = Papa.parse(text, { header: true }).data;
        return data;
      })
  );

  Promise.all(promises)
    .then((dataArrays) => {
      // Menggabungkan semua data menjadi satu array dan membalikkan urutan
      allData = dataArrays.flat().reverse();
      search(allData); // Menampilkan data awal saat halaman dimuat
      searchInput.addEventListener("input", () => search(allData)); // Menambahkan event listener
    })
    .catch((error) => console.error("Error loading data:", error));
}

// Menangani klik pada tombol "Sebelumnya"
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayResults(filteredData);
  }
});

// Menangani klik pada tombol "Selanjutnya"
nextButton.addEventListener("click", () => {
  currentPage++;
  displayResults(filteredData);
});

// Memuat data saat halaman dimuat
loadData();
