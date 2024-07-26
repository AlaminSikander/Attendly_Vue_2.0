import { toRefs, reactive, computed } from 'vue';
import axios from 'axios'

const layoutConfig = reactive({
    ripple: true,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'aura-light-green',
    scale: 14,
    activeMenuItem: null
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout() {
    const setScale = (scale) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), setScale, onMenuToggle, isSidebarActive, isDarkTheme, setActiveMenuItem };
}

export default {
    name: 'Login',
    // data() {
    //     return {
    //         email: '',
    //         password: '',
    //         err: {}
    //     };
    // },
    methods: {
        loginSubmit() {
            console.log('Login attempt started');
            const credentials = {
                email: this.email,
                password: this.password
            };
            axios
                .post('http://mobile.hiredengine.ai/api/app/login', credentials)
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    console.log(response.data);
                    // router push here to dashboard if success
                    this.$router.push({ name: 'Dashboard' });
                })
                // .catch((err) => {
                //     this.err = err;
                //     console.error('Login failed', err);
                // });
                .catch((err) => {
                    this.err = err;
                    if (err.response) {
                        console.error('Login failed:', err.response.data);
                        console.error('Status code:', err.response.status);
                        console.error('Headers:', err.response.headers);
                    } else if (err.request) {
                        console.error('No response received:', err.request);
                    } else {
                        console.error('Error:', err.message);
                    }
                    console.error('Config:', err.config);
                });
        }
    },
    
};
