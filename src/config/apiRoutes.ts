


export const routesApi = {
    auth: {
        login: 'security/attempt',
        logout: 'security/logout'
    },
    services: {
        all: 'services',
        children: function(){
            return {
                setImage: `${this.all}/set-img/{id}`
            };
        }
    }
    
};