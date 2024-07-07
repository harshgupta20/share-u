export const endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    getUser: '/users',
    updateUser: '/users',
    AdminAllUsers: '/admin/users',
    adminUpdateUser: `/admin/users/`,
    adminAddUser: '/admin/users',
    adminDeleteUser: '/admin/users/',
    getLinks: '/users/link',
    addLink: '/users/link',
    deleteLink: '/users/link',
    publicProfile: '/public/username',
    getOtpOnEmail: "/auth/loginWithOTP",
    verifyOtpForEmail: "/auth/verifyOTP",
}

export const userRole = {
    ADMIN: "1",
    USER: "2"
}

export const website={
    TITLE: "Share Pro"
}