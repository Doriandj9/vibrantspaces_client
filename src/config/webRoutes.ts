export type StructureBasicRoutesWeb = {
    path: string;
    title: string;
    uri?: CallableFunction;
    children?: {
        [p: string]: StructureBasicRoutesWeb 
    }
};

export type WebRoutesType = {
    [key: string]: StructureBasicRoutesWeb
};


export const webRoutes = {
    home: {
        path: '/',
        title: 'Home',
        uri(){
            return this.path;
        },
        children: {
            services: {
                path: 'services/:name',
                title: 'Services',
                uri(){
                    return `/${this.path}`;
                }
            }
        }
    },
    privacy:{
        path: '/privacy',
        title: 'Privacy Policy',
        uri(){
            return this.path;
        }
    },
    login: {
        path: '/auth/login',
        title: 'Login',
        uri(){
            return this.path;
        }
    },
    admin: {
        path: '/admin',
        title: 'Dashboard Admin',
        children: {
            home: {
                path: 'home',
                title: 'Admin Home',
                uri(){
                    return `/admin/${this.path}`;
                }
            },
            services: {
                path: 'services',
                title: 'Services',
                uri(){
                    return `/admin/${this.path}`;
                }
            },
            requests: {
                path: 'requests',
                title: 'Requests for Services',
                uri(){
                    return `/admin/${this.path}`;
                }
            }
        }
    }
};