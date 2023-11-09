const getMenuFrontEnd = (role)=>{
  
    const menu =  [
        {
          title:'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            {
              title: 'Main', url:'/'
            },
            {
              title: 'ProgressBar', url:'/dashboard/progress'
            },
            {
              title: 'Graphics', url:'/dashboard/graphic1'
            },
            {
              title: 'Promises', url:'/dashboard/promises'
            },
            {
              title: 'RXJS', url:'/dashboard/rxjs'
            }
          ]
        },
        {
          title:'Maintenance',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // {
            //   title: 'Users', url:'users'
            // },
            {
              title: 'Hospitals', url:'hospitals'
            },
            {
              title: 'Doctors', url:'doctors'
            }
          ]
        }
      ];

      if(role === "ADMIN_ROLE"){
        menu[1].submenu.unshift({title: 'Users', url:'users'})
      }
      return menu;

}

module.exports = {
    getMenuFrontEnd
}