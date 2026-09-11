const Permissions = {
    userRoles: [],

    async fetchUserRoles(userId) {
        const { data, error } = await supabase
            .from('user_roles')
            .select('roles(code)')
            .eq('user_id', userId);
            
        if (error) {
            console.error('Ralat mengambil profil:', error);
            return [];
        }
        
        this.userRoles = data.map(item => item.roles.code);
        return this.userRoles;
    },

    hasRole(roleCode) {
        return this.userRoles.includes(roleCode);
    },

    applyRoleBasedUI() {
        // Sembunyikan semua menu sensitif secara lalai (default)
        document.querySelectorAll('.nav-item[data-role]').forEach(el => {
            el.style.display = 'none';
        });

        // Paparkan menu jika pengguna adalah ADMIN
        if (this.hasRole('ADMIN')) {
            document.querySelectorAll('.nav-item').forEach(el => {
                el.style.display = 'flex'; 
            });
            return;
        }

        // Paparkan menu berdasarkan role khusus
        this.userRoles.forEach(role => {
            document.querySelectorAll(`.nav-item[data-role*="${role}"]`).forEach(el => {
                el.style.display = 'flex';
            });
        });
    }
};
