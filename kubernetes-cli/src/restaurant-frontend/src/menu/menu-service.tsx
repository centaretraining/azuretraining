//process.env.MENU_API_URL

import * as client from '../service-client';
import { Menu } from './entities';

export function getMenus(){
    return client.get(`${process.env.MENU_API_URL}/api/Menus`);
}

export function getMenu(id: string){
    return client.get(`${process.env.MENU_API_URL}/api/Menus/${id}`);
}

export function postMenu(menu:Menu){
    return client.post(`${process.env.MENU_API_URL}/api/Menus`, menu);
}

export function putMenu(menu:Menu){
    return client.put(`${process.env.MENU_API_URL}/api/Menus`, menu);
}


