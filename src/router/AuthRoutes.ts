const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Login',
            path: '/auth/login',
            component: () => import('@/views/authentication/SideLogin.vue')
        },
        {
            name: 'Register',
            path: '/auth/register',
            component: () => import('@/views/authentication/SideRegister.vue')
        },
        {
            name: 'Error',
            path: '/auth/404',
            component: () => import('@/views/authentication/Error.vue')
        }
    ]
};

export default AuthRoutes;
