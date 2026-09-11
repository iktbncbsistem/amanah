const CourseModule = {
    async fetchActiveCourses() {
        // Ambil data kursus yang aktif sahaja dari Supabase
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('status', true)
            .order('created_at', { ascending: false });
            
        if (error) {
            console.error('Ralat memuat turun kursus:', error);
            return [];
        }
        return data;
    },

    async renderCatalog(container) {
        container.innerHTML = `<div class="skeleton-loader">Memuatkan katalog kursus...</div>`;
        
        const courses = await this.fetchActiveCourses();
        
        if (courses.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <div style="font-size: 40px; margin-bottom: 16px;">📚</div>
                    <h3 style="color: var(--text-main); margin-bottom: 8px;">Tiada Kursus Ditawarkan</h3>
                    <p>Sila hubungi Penyelaras untuk maklumat lanjut.</p>
                </div>
            `;
            return;
        }

        // Header & Button Tambah (Hanya untuk Admin/Penyelaras)
        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="margin: 0; color: var(--primary);">Katalog Kursus Jangka Pendek</h3>
                <button id="btn-add-course" class="btn btn-primary" data-role="ADMIN,COORDINATOR" style="display: none;">
                    + Tambah Kursus
                </button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
        `;

        // Loop dan bina Kad Kursus
        courses.forEach(c => {
            html += `
                <div style="background: white; border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-light); display: flex; flex-direction: column;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                        <div style="width: 48px; height: 48px; background: var(--primary-light); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 24px;">
                            📘
                        </div>
                        <div>
                            <div style="font-weight: 700; color: var(--text-main);">${c.course_code}</div>
                            <div style="font-size: var(--text-sm); color: var(--success); font-weight: 600;">RM ${c.fee.toFixed(2)}</div>
                        </div>
                    </div>
                    <h4 style="margin: 0 0 12px 0; font-size: 16px; flex-grow: 1;">${c.name}</h4>
                    <div style="display: flex; gap: 8px; margin-top: auto;">
                        <button class="btn btn-secondary" style="flex: 1; padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); background: transparent; cursor: pointer;">Papar</button>
                        <button class="btn btn-primary" style="flex: 1; padding: 8px; border-radius: var(--radius-sm); background: var(--primary); color: white; border: none; cursor: pointer;" onclick="CourseModule.applyCourse('${c.id}')">Mohon</button>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;

        // Terapkan kawalan akses selepas UI di-render
        if (typeof Permissions !== 'undefined') {
            Permissions.applyRoleBasedUI();
        }
    },

    applyCourse(courseId) {
        // [Fungsi Guest Application akan bersambung di sini]
        alert('Fungsi permohonan untuk ID: ' + courseId + ' akan dibuka dalam bentuk borang.');
    }
};







