import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    //{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    //{ path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/admin',          title: 'Admin Profile',      icon:'nc-single-02',  class: '' },
    { path: '/orders',          title: 'Oders',      icon:'nc-cart-simple',  class: '' },
    { path: '/products',          title: 'Inventory',      icon:'nc-cart-simple',  class: '' },
    { path: '/logs',          title: 'Api Logs',      icon:'nc-settings',  class: '' },
    //{ path: '/hashes',         title: 'Hashes List',        icon:'nc-tile-56',    class: '' },
    //{ path: '/complaints',    title: 'User Complaints',        icon:'nc-single-copy-04', class: '' },
    //{ path: '/withdraws',    title: 'Withdraws',        icon:'nc-money-coins', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
