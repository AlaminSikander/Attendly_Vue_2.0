import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { checkTokenExists } from '@/service/middleware'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    beforeEnter: checkTokenExists,
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/client/clientList',
                    name: 'clientList',
                    component: () => import('@/views/pages/client/clientList.vue')
                },
                {
                    path: '/test/allTest',
                    name: 'allTest',
                    component: () => import('@/views/pages/test/allTest.vue')
                },
                {
                    path: '/test/testTwo',
                    name: 'testTwo',
                    component: () => import('@/views/pages/test/testTwo.vue')
                },
                {
                    path: '/client/newClient',
                    name: 'newClient',
                    component: () => import('@/views/pages/client/newClient.vue')
                },
                {
                    path: '/staff/staffList',
                    name: 'staffList',
                    component: () => import('@/views/pages/staff/staffList.vue')
                },
                {
                    path: '/staff/staffType',
                    name: 'staffType',
                    component: () => import('@/views/pages/staff/staffType.vue')
                },
                {
                    path: '/staff/newStaff',
                    name: 'newStaff',
                    component: () => import('@/views/pages/staff/newStaff.vue')
                },
                {
                    path: '/assignment/currentAssignment',
                    name: 'currentAssignment',
                    component: () => import('@/views/pages/assignment/currentAssignment.vue')
                },
                {
                    path: '/assignment/createAssignment',
                    name: 'createAssignment',
                    component: () => import('@/views/pages/assignment/createAssignment.vue')
                },
                {
                    path: '/rates/rateType',
                    name: 'rateType',
                    component: () => import('@/views/pages/rates/rateType.vue')
                },
                {
                    path: '/staff/staffRequest',
                    name: 'staffRequest',
                    component: () => import('@/views/pages/staff/staffRequest.vue')
                },
                {
                    path: '/access/accessControl',
                    name: 'accessControl',
                    component: () => import('@/views/pages/access/accessControl.vue')
                },
                {
                    path: '/access/createAdministratorUser',
                    name: 'createAdministratorUser',
                    component: () => import('@/views/pages/access/createAdministratorUser.vue')
                },
                {
                    path: '/access/administratorUsers',
                    name: 'administratorUsers',
                    component: () => import('@/views/pages/access/administratorUsers.vue')
                },
                {
                    path: '/myDigitalAccounts/people',
                    name: 'people',
                    component: () => import('@/views/pages/myDigitalAccounts/people.vue')
                },
                {
                    path: '/myDigitalAccounts/illustration',
                    name: 'illustration',
                    component: () => import('@/views/pages/myDigitalAccounts/illustration.vue')
                },
                {
                    path: '/myDigitalAccounts/leave',
                    name: 'leave',
                    component: () => import('@/views/pages/myDigitalAccounts/leave.vue')
                },
                {
                    path: '/myDigitalAccounts/payslip',
                    name: 'payslip',
                    component: () => import('@/views/pages/myDigitalAccounts/payslip.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/Input.vue')
                },
                {
                    path: '/uikit/floatlabel',
                    name: 'floatlabel',
                    component: () => import('@/views/uikit/FloatLabel.vue')
                },
                {
                    path: '/uikit/invalidstate',
                    name: 'invalidstate',
                    component: () => import('@/views/uikit/InvalidState.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/Button.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/Table.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/List.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/Tree.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/Overlay.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: '/uikit/menu',
                    component: () => import('@/views/uikit/Menu.vue'),
                    children: [
                        {
                            path: '/uikit/menu',
                            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                        },
                        {
                            path: '/uikit/menu/seat',
                            component: () => import('@/views/uikit/menu/SeatDemo.vue')
                        },
                        {
                            path: '/uikit/menu/payment',
                            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                        },
                        {
                            path: '/uikit/menu/confirmation',
                            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                        }
                    ],
                    beforeEnter: checkTokenExists,
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/File.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/Misc.vue')
                },
                {
                    path: '/blocks',
                    name: 'blocks',
                    component: () => import('@/views/utilities/Blocks.vue')
                },
                {
                    path: '/utilities/icons',
                    name: 'icons',
                    component: () => import('@/views/utilities/Icons.vue')
                },
                {
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/utilities/Documentation.vue')
                }
            ],
            beforeEnter: checkTokenExists,
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue'),
            beforeEnter: checkTokenExists,
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue'),
            beforeEnter: checkTokenExists,
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue'),
            beforeEnter: checkTokenExists,
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue'),
            beforeEnter: checkTokenExists,
        },
        // {
        //     path: '/client/clientList',
        //     name: 'error',
        //     component: () => import('@/views/pages/client/clientList.vue')
        // }
    ]
});

export default router;
