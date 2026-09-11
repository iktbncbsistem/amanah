document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize App
    console.log("Sistem ILKBS Initialized.");
    
    // 2. Setup Navigation Listeners
    setupNavigation();
    
    // 3. Load initial view based on hash
    handleRoute(window.location.hash || '#dashboard');
});

window.addEventListener('hashchange', () => {
    handleRoute(window.location.hash);
});

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item, .bottom-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Update active state visual
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Activate both desktop and mobile equivalents if present
            const targetHash = e.currentTarget.getAttribute('href');
            document.querySelectorAll(`[href="${targetHash}"]`).forEach(el => el.classList.add('active'));
        });
    });
}

function handleRoute(hash) {
    const mainView = document.getElementById('main-view');
    const pageTitle = document.getElementById('page-title');
    
    // Skeleton Loading effect
    mainView.innerHTML = `<div class="skeleton-loader">Memuatkan data...</div>`;
    
    // Simple Router
    setTimeout(() => {
        switch(hash) {
            case '#dashboard':
                pageTitle.textContent = "Dashboard Eksekutif";
                renderDashboard(mainView);
                break;
case '#kursus':
    pageTitle.textContent = "Katalog Kursus";
    if (typeof CourseModule !== 'undefined') {
        CourseModule.renderCatalog(mainView);
    } else {
        mainView.innerHTML = "Ralat: Modul Kursus tidak dijumpai.";
    }
    break;
            case '#joborder':
                pageTitle.textContent = "Pengurusan Job Order";
                renderEmptyState(mainView, "Tiada tempahan Job Order", "Tempahan baru akan dipaparkan di sini.");
                break;
            default:
                pageTitle.textContent = "Sistem ILKBS";
                renderDashboard(mainView);
        }
    }, 300); // Simulate network latency
}

function renderDashboard(container) {
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
            <div style="background: white; padding: 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
                <div style="color: var(--text-muted); font-size: var(--text-sm);">📚 KURSUS AKTIF</div>
                <div style="font-size: var(--text-xl); font-weight: 700; color: var(--primary); margin-top: 8px;">12</div>
            </div>
            <div style="background: white; padding: 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
                <div style="color: var(--text-muted); font-size: var(--text-sm);">💰 TERIMAAN TAHUNAN</div>
                <div style="font-size: var(--text-xl); font-weight: 700; color: var(--success); margin-top: 8px;">RM 18,450</div>
            </div>
        </div>
    `;
}

function renderEmptyState(container, title, description) {
    container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
            <div style="font-size: 40px; margin-bottom: 16px;">📭</div>
            <h3 style="color: var(--text-main); margin-bottom: 8px;">${title}</h3>
            <p>${description}</p>
        </div>
    `;
}
