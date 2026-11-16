(function() {
    // ----- DATA -----
    const comedyItems = [
        { title: "The Office", match: 98, age: "16+", duration: "9 Seasons", imgSeed: "office" },
        { title: "Brooklyn Nine-Nine", match: 96, age: "16+", duration: "8 Seasons", imgSeed: "brooklyn" },
        { title: "Parks and Recreation", match: 94, age: "16+", duration: "7 Seasons", imgSeed: "parks" },
        { title: "Friends", match: 97, age: "13+", duration: "10 Seasons", imgSeed: "friends" },
        { title: "Arrested Development", match: 92, age: "16+", duration: "5 Seasons", imgSeed: "arrested" },
        { title: "Community", match: 93, age: "16+", duration: "6 Seasons", imgSeed: "community" },
        { title: "Schitt's Creek", match: 95, age: "16+", duration: "6 Seasons", imgSeed: "schitts" },
        { title: "Unbreakable Kimmy Schmidt", match: 91, age: "16+", duration: "4 Seasons", imgSeed: "kimmy" },
        { title: "Grace and Frankie", match: 90, age: "16+", duration: "7 Seasons", imgSeed: "grace" },
        { title: "Dead to Me", match: 89, age: "18+", duration: "3 Seasons", imgSeed: "dead" },
        { title: "The Good Place", match: 96, age: "13+", duration: "4 Seasons", imgSeed: "goodplace" },
        { title: "Never Have I Ever", match: 94, age: "16+", duration: "4 Seasons", imgSeed: "never" },
    ];

    // Helper to create a card element from an item
    function createCard(item) {
        const card = document.createElement('div');
        card.className = 'card';

        // Image URL using picsum with seed for consistency (and different sizes to avoid same image)
        // Using 260 x 150px as standard (second row uses 220 x 130px but same image is fine, CSS overrides height)
        const img = document.createElement('img');
        img.src = `https://picsum.photos/seed/${item.imgSeed}/260/150`;
        img.alt = item.title;
        img.loading = 'lazy';

        // fallback in case image fails
        img.onerror = function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="260" height="150" viewBox="0 0 260 150"%3E%3Crect width="260" height="150" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" fill="%23888" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
        };

        // Info container
        const info = document.createElement('div');
        info.className = 'card-info';

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = item.title;

        const meta = document.createElement('div');
        meta.className = 'card-meta';

        const match = document.createElement('span');
        match.className = 'match-score';
        match.textContent = `${item.match}% Match`;

        const age = document.createElement('span');
        age.className = 'age-badge';
        age.textContent = item.age;

        const duration = document.createElement('span');
        duration.className = 'duration';
        duration.textContent = item.duration;

        meta.appendChild(match);
        meta.appendChild(age);
        meta.appendChild(duration);

        info.appendChild(title);
        info.appendChild(meta);

        card.appendChild(img);
        card.appendChild(info);

        return card;
    }

    // Populate a row with items
    function populateRow(rowId, items) {
        const row = document.getElementById(rowId);
        if (!row) return;
        items.forEach(item => {
            row.appendChild(createCard(item));
        });
    }

    // Initialize rows
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

    // Optional: allow row drag with mouse (nice extra)
    // But not necessary for basic functionality. We'll keep it simple.

    // Also, to make the carousel feel more "Netflix", we could add a little fade on edges? Not required.

    // For better UX on touch devices, the rows are scrollable natively, which is fine.

    // One more detail: when user hovers over the row-wrapper, the buttons appear. 
    // That's already handled by CSS.

    // This ensures that if images are loaded, layout is stable.
    // Also, in case the user resizes, the scroll amount adapts (we fetch cardWidth at click time).

    // Preload some images? Not necessary.
})();