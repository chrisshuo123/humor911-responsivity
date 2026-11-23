(function() {
    const API_KEY = 'AIzaSyDnenGVwaK4U7m2AI2Q9xNQb-n60suMvz4';
    // For multiple-videos
    const videoData = [
        {
            id: 'HogYTgAwy18',
            imgSeed: '../assets/show-1.png'
        },
        {
            id: 'iFDwEth40vo',
            imgSeed: '../assets/show-2.png'
        },
        {
            id: 'XzIPwPOj9W4',
            imgSeed: '../assets/show-3.png'
        },
        {
            id: 'pc1xsnDz5cw',
            imgSeed: '../assets/show-4.png'
        },
        {
            id: 'ZH93JNnicdg',
            imgSeed: '../assets/show-5.png'
        },
        {
            id: 'qSVgpDuEYM8',
            imgSeed: '../assets/show-6.png'
        },
        {
            id: '8gx9qpOfg4o',
            imgSeed: '../assets/show-7.png'
        },
        {
            id: 'jPL62kDZ2YQ',
            imgSeed: '../assets/show-8.png'
        },

        {
            id: 'sc-YQt5b07E',
            imgSeed: '../assets/show-9.png'
        },
        {
            id: 'pDGCVHfxMRQ',
            imgSeed: '../assets/show-10.png'
        },
        {
            id: '202kwXtalxQ',
            imgSeed: '../assets/show-11.png'
        },
        {
            id: 'neM-Z2FgBxU',
            imgSeed: '../assets/show-12.png'
        },
        {
            id: 'DelcFIvQG8w',
            imgSeed: '../assets/show-13.png'
        },
        {
            id: 'ZOFHCy54kYA',
            imgSeed: '../assets/show-14.png'
        },
        {
            id: 'uJzgHrrdIBo',
            imgSeed: '../assets/show-15.png'
        },
    ];

    // Extracting the IDs for the API call
    const videoIdsString = videoData.map(v => v.id).join(',');

    // Initialize Empty Array
    let comedyItems = [
        // { title: "The Office", match: 98, age: "16+", duration: "9 Seasons", imgSeed: "office" },
        // {
        //     title: "The Office",
        //     duration: "1 hour, 10 minutes",
        //     views: 98,
        //     uploaded: '2d ago',
        //     imgSeed: "office"
        // },
        // {
        //     title: "🚨 NOW! YOUR SOCIAL MEDIA FEED NEEDS A LAUGH BREAK! 😂",
        //     duration: "PT9S",  // You might want to convert this to "9 seconds"
        //     views: 500,
        //     uploaded: '2026-11-15',
        //     imgSeed: "social_media"
        // },
        // { title: "Parks and Recreation", match: 94, age: "16+", duration: "7 Seasons", imgSeed: "parks" },
        // { title: "Friends", match: 97, age: "13+", duration: "10 Seasons", imgSeed: "friends" },
        // { title: "Arrested Development", match: 92, age: "16+", duration: "5 Seasons", imgSeed: "arrested" },
        // { title: "Community", match: 93, age: "16+", duration: "6 Seasons", imgSeed: "community" },
        // { title: "Schitt's Creek", match: 95, age: "16+", duration: "6 Seasons", imgSeed: "schitts" },
        // { title: "Unbreakable Kimmy Schmidt", match: 91, age: "16+", duration: "4 Seasons", imgSeed: "kimmy" },
        // { title: "Grace and Frankie", match: 90, age: "16+", duration: "7 Seasons", imgSeed: "grace" },
        // { title: "Dead to Me", match: 89, age: "18+", duration: "3 Seasons", imgSeed: "dead" },
        // { title: "The Good Place", match: 96, age: "13+", duration: "4 Seasons", imgSeed: "goodplace" },
        // { title: "Never Have I Ever", match: 94, age: "16+", duration: "4 Seasons", imgSeed: "never" },
        // { title: "Dead to Me", match: 89, age: "18+", duration: "3 Seasons", imgSeed: "dead" },
        // { title: "The Good Place", match: 96, age: "13+", duration: "4 Seasons", imgSeed: "goodplace" },
        // { title: "Never Have I Ever", match: 94, age: "16+", duration: "4 Seasons", imgSeed: "never" },
    ];

    // Helper function for duration
    function formatYoutubeDuration(isoDuration) {
        // e.g. "PT1H10M5S"
        const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) return isoDuration;

        const hours = parseInt(match[1] || 0, 10);
        const minutes = parseInt(match[2] || 0, 10);
        const seconds = parseInt(match[3] || 0, 10);

        let result = [];
        if (hours > 0) result.push(`${hours}h`);
        if (minutes > 0) result.push(`${minutes}m`);
        if (seconds > 0) result.push(`${seconds}s`);

        return result.join(' ') || '0s';
    }

    // Usage:
    // const niceDuration = formatYoutubeDuration(item.contentDetails.duration);
    // returns "9 seconds" for your video.

    function formatLastUploadTime(dateString) {
        if (!dateString) return "Unknown";

        const uploadDate = new Date(dateString);
        const now = new Date();

        // Calculate difference in milliseconds, then convert to seconds
        const diffInSeconds = Math.floor((now - uploadDate) / 1000);

        // If it's in the future (unlikely, but possible with timezones), just show the date
        if (diffInSeconds < 0) return dateString.split('T')[0];

        const years = Math.floor(diffInSeconds / (3600 * 24 * 365));
        const months = Math.floor(diffInSeconds / (3600 * 24 * 30));
        const days = Math.floor(diffInSeconds / (3600 * 24));
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor(diffInSeconds / 60);

        let result = "";

        if (years > 0) result = `${years}yr ago`;
        else if (months > 0) result = `${months}mths ago`;
        else if (days > 0) result = `${days}d ago`;
        else if (hours > 0) result = `${hours}h ago`;
        else if (minutes > 0) result = `${minutes}m ago`;
        else if (seconds > 0) result = `Just Now`;
    
        return result;
    }

    // Create the Fetch Function
    async function fetchVideoData() {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIdsString}&key=${API_KEY}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();

            // if (!response.ok) throw new Error('Network response was not ok');

            // Map the API results into your specific JSON structure
            if(data.items && data.items.length > 0) {
                // The API returns an array of videos, so we loop through them
                data.items.forEach(video => {
                    
                    // Find the matching custom image URL from your videoData array
                    const customData = videoData.find(v => v.id === video.id);

                    // Fallback to a generic YouTube thumbnail if the custom one isn't found
                    const imgUrl = customData ? customData.imgSeed : video.snippet.thumbnails.high.url;

                    // Push the formatted YouTube data into your array
                    comedyItems.unshift({
                        title: video.snippet.title,
                        // Duration comes as ISO 8601 (e.g., "PT9S" or "PTH10M").
                        duration: formatYoutubeDuration(video.contentDetails.duration),
                        // Convert views from styling ("220") to Number (220)
                        views: parseInt(video.statistics.viewCount, 10),
                        // Uploaded date (e.g., "2026-11-15T14:18:48Z")
                        uploaded: formatLastUploadTime(video.snippet.publishedAt),  // Extracts YYYY-MM-DD
                        imgSeed: imgUrl
                    });
                });
                // CRITICAL: Once the data is fetched, we build the UI!
                initUI();
            }
        } catch(error) {
            console.error("Error fetching YouTube data: ", error);
            // Even if the API fails, we still want to show your hardcoded items
            initUI();
        }
    }

    // Helper to create a card element from an item
    function createCard(item) {
        const card = document.createElement('div');
        card.className = 'card';

        // Image URL using picsum with seed for consistency (and different sizes to avoid same image)
        // Using 260 x 150px as standard (second row uses 220 x 130px but same image is fine, CSS overrides height)
        const img = document.createElement('img');

        // Check if the imgSeed starts with 'http' (meaning it's a real URL)
        if(item.imgSeed.includes('.png') || item.imgSeed.includes('.jpg') || item.imgSeed.startsWith('http')) {
            img.src = item.imgSeed;
        }
        else {
            // img.src = `https://picsum.photos/seed/${item.imgSeed}/260/150`;
            img.src = `https://picsum.photos/seed/${item.imgSeed}/260/260`;
        }
        img.alt = item.title;
        img.loading = 'lazy';

        // fallback in case image fails
        img.onerror = function() {
            // this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="260" height="150" viewBox="0 0 260 150"%3E%3Crect width="260" height="150" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" fill="%23888" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 260 260"%3E%3Crect width="260" height="260" fill="%23333"/%3E%3Ctext x="50%50" y="50%50" fill="%23888" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
        };

        // Info container
        const info = document.createElement('div');
        info.className = 'card-info';

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = item.title;

        const meta = document.createElement('div');
        meta.className = 'card-meta';

        // const match = document.createElement('span');
        // match.className = 'match-score';
        // match.textContent = `${item.match}% Match`;

        // const age = document.createElement('span');
        // age.className = 'age-badge';
        // age.textContent = item.age;

        const duration = document.createElement('div');
        duration.className = 'duration';
        duration.textContent = `Duration: ${item.duration}`;

        const views = document.createElement('span');
        views.className = 'views';
        views.textContent = `${item.views} views`;

        const uploaded = document.createElement('span');
        uploaded.className = 'uploaded';
        uploaded.textContent = item.uploaded.includes('-') ? `Uploaded ${item.uploaded}` : `Uploaded ${item.uploaded}`;

        // meta.appendChild(match);
        // meta.appendChild(age);
        // meta.appendChild(duration);
        meta.appendChild(views);
        meta.appendChild(uploaded);

        info.appendChild(title);
        info.appendChild(duration);
        info.appendChild(meta);

        card.appendChild(img);
        card.appendChild(info);

        return card;
    }

    /** Gambaran Cara Kerja method createCard(item) diatas ini:
     *  <div class="card">
            <img src="..." alt="..." loading="lazy"></img>
            <div class="card-info">
                <div class="card-title"></div>
                <div class="duration">...</div>
                <div class="card-meta">
                    <span class="views">${item.views} views</span>
                    <span class="uploaded">${item.uploaded} days ago
                    </span>
                </div>
            </div>
        </div>
     */

    // Populate a row with items
    function populateRow(rowId, items) {
        const row = document.getElementById(rowId);
        if (!row) return;
        row.innerHTML = '';
        items.forEach(item => {
            row.appendChild(createCard(item));
        });
    }

    // Initialize UI
    function initUI() {
        populateRow('row3', comedyItems);

        // ----- SCROLL BUTTON LOGIC -----
        // Attach click listeners to all scroll buttons
        document.querySelectorAll('.scroll-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const targetId = this.getAttribute('data-target');
                if (!targetId) return;
                const row = document.getElementById(targetId);
                if (!row) return;

                // Determine scroll amount: width of one card + gap, times 2 for a nice jump
                const card = row.querySelector('.card');
                if (!card) return;

                const cardWidth = card.offsetWidth;
                const gap = 12; // matches CSS gap
                const scrollAmount = (cardWidth + gap) * 2; // scroll two cards at a time

                if (this.classList.contains('left')) {
                    row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });
        });
    }

    // Optional: allow row drag with mouse (nice extra)
    // But not necessary for basic functionality. We'll keep it simple.

    // Also, to make the carousel feel more "Netflix", we could add a little fade on edges? Not required.

    // For better UX on touch devices, the rows are scrollable natively, which is fine.

    // One more detail: when user hovers over the row-wrapper, the buttons appear. 
    // That's already handled by CSS.

    // This ensures that if images are loaded, layout is stable.
    // Also, in case the user resizes, the scroll amount adapts (we fetch cardWidth at click time).

    // Preload some images? Not necessary.

    // START EVERYTHING!
    fetchVideoData();

})();