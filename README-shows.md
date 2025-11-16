## Shows section – how to edit it

This project uses a **single unified card** on the home page to show the next concert OR a “no shows planned” message.  
You mainly edit this in `index.html`, with a small helper in `static/javascript/carousel.js`.

---

### 1. Where the shows card lives

- **File**: `index.html`
- **Section**: look for:

```startLine:endLine:index.html
    <section id="shows" class="shows-section">
        <div class="shows-background-container">
            <div class="shows-bg-image"></div>
            <div class="shows-bg-overlay"></div>
        </div>
        <div class="shows-container" id="shows-container">
            <div class="shows-card-unified" id="unified-card">
                <!-- Concert Image Element -->
                <div class="shows-card-image">
                    <img src="assets/graphics/photo_concert.png" alt="Anne Live Performance" class="concert-image">
                    <div class="image-overlay"></div>
                </div>
                
                <!-- Card Content -->
                <div class="shows-card-content">
                    <!-- Show Mode Content -->
                    <div class="show-content" id="show-content">
```

Everything you will edit is inside this `shows-card-unified` block.

---

### 2. Editing the “upcoming show” card text

Still in `index.html`, inside the `show-content` block:

```startLine:endLine:index.html
                    <div class="show-content" id="show-content">
                        <div class="show-header">
                            <div class="show-date">September 15, 2025</div>
                            <div class="show-tag">Festival</div>
                        </div>
                        <h2 class="show-title">Anne Live</h2>
                        <div class="show-location">Prague, Czech Republic</div>
                        <div class="show-venue">Rock Festival</div>
                        <div class="show-actions">
                            <a href="#" class="primary-button">Get Tickets</a>
                            <a href="book.html" class="secondary-button">Book Us</a>
                        </div>
                    </div>
```

- **Date**: change the text inside `<div class="show-date">…</div>`.
- **Tag** (e.g. “Festival”, “Club show”): edit `<div class="show-tag">…</div>`.
- **Title**: `<h2 class="show-title">…</h2>`.
- **Location**: `<div class="show-location">…</div>`.
- **Venue / event name**: `<div class="show-venue">…</div>`.
- **Tickets button**:
  - Change the **URL** in `href="..."` on the `<a class="primary-button">`.
  - Change the button **label** by editing the text `Get Tickets`.
- **Book Us button**: points to `book.html`. You can change the label or URL the same way.

---

### 3. Editing the “no shows planned” card text

Right below `show-content` you will see the `no-show-content` block:

```startLine:endLine:index.html
                    <!-- No Shows Mode Content -->
                    <div class="no-show-content" id="no-show-content" style="display: none;">
                        <div class="no-show-header">
                            <div class="no-show-icon">🎵</div>
                            <h2 class="no-show-title">No shows planned currently</h2>
                        </div>
                        <p class="no-show-description">But we'd love to play for you!</p>
                        <div class="no-show-actions">
                            <a href="book.html" class="primary-button">Book Us Now</a>
                        </div>
                    </div>
```

- **Emoji/icon**: change the character inside `<div class="no-show-icon">…</div>`.
- **Headline**: edit `<h2 class="no-show-title">…</h2>`.
- **Description**: edit `<p class="no-show-description">…</p>`.
- **Button**:
  - Change `href="book.html"` if you want it to go somewhere else.
  - Change button label by editing `Book Us Now`.

---

### 4. JS that controls show vs “no shows” mode

The logic that switches between **show mode** and **no-shows mode** is defined inline in `index.html`:

```startLine:endLine:index.html
    <script>
    // Toggle between shows and no-shows mode
    function setNoShowsMode(enabled) {
        const showContent = document.getElementById('show-content');
        const noShowContent = document.getElementById('no-show-content');
        const unifiedCard = document.getElementById('unified-card');
        
        if (enabled) {
            // Fade out current content
            showContent.style.opacity = '0';
            setTimeout(() => {
                showContent.style.display = 'none';
                noShowContent.style.display = 'block';
                noShowContent.style.opacity = '0';
                // Add no-shows mode class for different styling
                unifiedCard.classList.add('no-shows-mode');
                // Fade in new content
                setTimeout(() => {
                    noShowContent.style.opacity = '1';
                }, 50);
            }, 300);
        } else {
            // Fade out current content
            noShowContent.style.opacity = '0';
            setTimeout(() => {
                noShowContent.style.display = 'none';
                showContent.style.display = 'block';
                showContent.style.opacity = '0';
                // Remove no-shows mode class
                unifiedCard.classList.remove('no-shows-mode');
                // Fade in new content
                setTimeout(() => {
                    showContent.style.opacity = '1';
                }, 50);
            }, 300);
        }
    }
    </script>
```

- Call **`setNoShowsMode(false)`** to show the **upcoming show** card.
- Call **`setNoShowsMode(true)`** to show the **“no shows planned”** card.

The initial mode is set when the page loads from `static/javascript/carousel.js`:

```startLine:endLine:static/javascript/carousel.js
    // Initialize with shows mode (false = show mode, true = no shows mode)
    setNoShowsMode(false);
```

- To always show “no shows planned” by default, change this line to:
  - `setNoShowsMode(true);`

You can also test this quickly in the browser console:

- Open DevTools → **Console**.
- Run `setNoShowsMode(true)` or `setNoShowsMode(false)` and watch the card switch.

---

### 5. Where the animations for the shows section live

The scroll/visibility animation for the shows card is also in `static/javascript/carousel.js`:

```startLine:endLine:static/javascript/carousel.js
// Animation for shows section - New unified card design
window.addEventListener('DOMContentLoaded', function() {
    var showsSection = document.querySelector('.shows-section');
    var showsBgImage = document.querySelector('.shows-bg-image');
    var unifiedCard = document.querySelector('.shows-card-unified');
    
    if (!showsSection || !showsBgImage || !unifiedCard) return;
    
    function onScroll() {
        var rect = showsSection.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Trigger animation when section is 70% visible
        if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
            showsSection.classList.add('active');
            unifiedCard.classList.add('visible');
        } else {
            showsSection.classList.remove('active');
            unifiedCard.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial check
    
    // Initialize with shows mode (false = show mode, true = no shows mode)
    setNoShowsMode(false);
});
```

You normally don’t need to touch this unless you want to change **when** the shows card animates in or which mode is set by default.


