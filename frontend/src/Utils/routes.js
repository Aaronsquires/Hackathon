export const Routes = {
    //? Auth
    Login: { path: "/Login" },
    Register: { path: "/Register" },
    Logout: { path: "/Logout" },

    //? Dashboard
    //Home
    Dashboard: { path: "/dashboard" },

    //Inventory
    Inventory: { path: "/inventory" },
    InventoryEdit: { path: "/inventory/product/edit/:id" },
    InventoryEditNoId: { path: "/inventory/product/edit/" },
    
    //Orders
    Orders: { path: "/orders" },
    OrdersAdd: { path: "/orders/create" },

    //Settings
    SettingsBase: { path: "/settings" },

    //Settings Product
    SettingsProduct: { path: "/settings/product" },
    SettingsProductEdit: { path: "/settings/product/edit/:id" },
    SettingsProductEditNoID: { path: "/settings/product/edit/" },
    SettingsProductCreate: { path: "/settings/product/create" },
    
    // Settings Backlog
    SettingsBacklog: { path: "/settings/backlog" }


};