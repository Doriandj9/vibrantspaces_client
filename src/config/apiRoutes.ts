


export const routesApi = {
    auth: {
        login: 'security/attempt',
        logout: 'security/logout',
        user: 'settings/user',
        forgot_pass: '/security/forgot-password',
        verify_pass: '/security/verify-password',
        change_pass: '/security/change-password',
    },
    services: {
        all: 'services',
        children: function(){
            return {
                setImage: `${this.all}/set-img/{id}`
            };
        },
        data_services: {
            resource: 'data-services',
            children(){
                return {
                    user: `${this.resource}/user/{tax_id}`,
                    send_confirmation: `${this.resource}/send-confirmation`,
                    message: `${this.resource}/send-message`,
                    message_get: `${this.resource}/messages`,
                    update_notify: `${this.resource}/notification/{id}`,
                    update_service_data: `${this.resource}/{id}`,
                };
            }
        }
    }
    
};