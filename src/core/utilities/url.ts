import { webRoutes, StructureBasicRoutesWeb } from "@/config/webRoutes";


const recursiveSetObjet = (route: StructureBasicRoutesWeb, container: { [x: string]: string; }[]) => {

    const result = {
        [route.uri ? route.uri() : route.path]:  route.title
    };

    container.push(result);

    if (!route.children) {
       return;
    }

    Object.entries(route.children)
    .forEach((routes) => {
        const route = routes[1];
        recursiveSetObjet(route, container);
    });
};


export const setTitleApp = (pathname: string) => {
    const objRoutes: { [x: string]: string; }[] = [];
    Object.entries(webRoutes)
        .forEach((routes) => {
            const route = routes[1];
            recursiveSetObjet(route, objRoutes);
        });
    const objTitle = objRoutes.find((res) => Reflect.has(res, pathname) || Reflect.has(res, `/${pathname}`));
    const title = objTitle ? objTitle[pathname] ?? objTitle[`/${pathname}`] : '';
    
    document.title = `${title} | Vibrant Essences LLC `;

};