const langSelector = document.querySelector(".langs"),
    link = document.querySelector("option a"),
    /* Main Section */
    mainSubTitle = document.querySelector(".main-subtitle"),
    mainTitle = document.querySelector(".main-title"),
    mainDescription = document.querySelector(".main-description"),
    btnMeetComedians = document.querySelector(".button-meetComedians"),
    btnOurStory = document.querySelector(".button-ourStory");

let lang = localStorage.getItem("lang") || "english";

// let index = parseInt(localStorage.getItem("langIndex")) || 0;

// Mencegah scroll saat mouse ditekan
langSelector.addEventListener("mousedown", function(e) {
    // e.preventDefault();  // Intentionally leaving this in comment rather than erase it.
    
    // Fokuskan secara manual tanpa memicu scroll:
    // Untuk itu, kita perlu cek dukungan preventScroll agar tidak error di browser jadul
    if(typeof this.focus === "function") {
        try {
            this.focus({ preventScroll: true });
        } catch (err) {
            // Fallback untuk browser lama yang belum mendukung objek options
            this.focus();
        }
    }
});

// Untuk bagian Main Section
const dataMain = {
    english: {
        mainSubTitle: `Comedy Agency &amp; Production House`,
        mainTitle: `Every laugh is an <span class="highlight">emergency.</span><br />
            We respond.`,
        mainDescription: "HUMOR911 represents bold comedic voices and produces live comedy experiences worth leaving the house for. Funny is our business — and we take it seriously.",
        btnMeetComedians: "Meet Our Comedians",
        btnOurStory: "Our Story"
    },
    indonesian: {
        mainSubTitle: `Rumah Produksi &amp; Agensi Pelawak`,
        mainTitle: `Setiap tawaan adalah <span class="highlight">darurat.</span><br /> Kami menanggapinya.`,
        mainDescription: "HUMOR911 merepresentasikan komedi tajam dan menghadirkan pengalaman komedi langsung yang layak untuk keluar rumah.  Lucu adalah bisnis kami - dan kami ambil secara serius.",
        btnMeetComedians: "Komedian Humor911",
        btnOurStory: "Kisah Kami"
    }
}

// Listen for dropdown changes
langSelector.addEventListener("change", function(e) {
    // Get the selected value ("english" or "indonesian")
    const selectedLang = e.target.value;
    lang = selectedLang; // Update the global lang variable

    // Save to localStorage
    localStorage.setItem("lang", lang);

    // -- Call your changeLang function based on the selection to change the Language --
    
    // Buat Main Section
    changeLangMain(lang, mainSubTitle, mainTitle, mainDescription, btnMeetComedians, btnOurStory);
});

// Set the initial language on page load
// First, update the dropdown to match the saved language
langSelector.value = lang;
// Then, translate the page
changeLangMain(lang, mainSubTitle, mainTitle, mainDescription, btnMeetComedians, btnOurStory);

// === The translation Function ===

// Buat bagian Main Section
function changeLangMain(lang, mainSubTitle, mainTitle, mainDescription, btnMeetComedians, btnOurStory) {
    mainSubTitle.innerHTML = dataMain[lang].mainSubTitle
    // IMPORTANT: Use innerHTML for mainTitle so the <span> and <br> tags actually render
    mainTitle.innerHTML = dataMain[lang].mainTitle
    mainDescription.textContent = dataMain[lang].mainDescription
    btnMeetComedians.textContent = dataMain[lang].btnMeetComedians
    btnOurStory.textContent = dataMain[lang].btnOurStory
}