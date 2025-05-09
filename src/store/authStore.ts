import { deleteCookie, getCookie, setCookie } from '@/core/utilities/cookies';
import { User } from '@/core/@types/core';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';


type AuthProps = {
    token: string | null;
    user: User | null;
    updateToken: (payload: string, timeExpired: string) => unknown;
    updateUser: (payload: string) => unknown;
    isLogin: boolean;
    isAdmin: boolean;
    logout: () => unknown;
};

let jwt: string = '';
let token: null | string = getCookie('token');

if (token) {
    token = atob(token);
};

const tokenExist = Boolean(token);


if (!localStorage.jwt) {
    localStorage.setItem('jwt', '');
} else {
    jwt = localStorage.getItem('jwt') || '';
}




export const useAuthStore = create<AuthProps>()((set) => {
    let user: User | null = null;
    try {
        user = jwt !== '' ? jwtDecode(jwt || '') : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        user = null;
    }

    if (!tokenExist) {
        localStorage.removeItem('jwt');
    }

    return {
        token: token,
        user: tokenExist ? user : null,
        isLogin: tokenExist,
        updateToken: (payload: string, timeExpired: string) => set((state) => {
            setCookie('token', btoa(payload), timeExpired);
            return {
                ...state,
                token: payload,
                isLogin: true
            };
        }),
        updateUser: (payload: string) => set((state) => {
            localStorage.setItem('jwt', payload);
            const user: User | null = payload !== '' ? jwtDecode(payload,) : null;

            return {
                ...state,
                user: user,
                isAdmin: user?.rol.name == 'Admin'
            };
        }),
        logout: () => set(() => {
            deleteCookie('token');
            localStorage.removeItem('jwt');
            return {
                user: null,
                isLogin: false,
                isAdmin: false,
                token: null,
            };
        }),
        isAdmin: user?.rol?.name === 'Admin'
    };
});