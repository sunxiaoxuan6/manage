import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AllOrder from "../views/AllOrder";
import Index from "../views/Index";
import AddOrder from "../views/AddOrder";
import OrderUpdate from "../views/OrderUpdate";

Vue.use(VueRouter);
  const routes = [
  {
    path: "/",
    name: "订单管理",
    component: Index,
    show:true,
    redirect:"/allOrder",
    children:[
    {
      path: "/allOrder",
      name: "查询订单",
      component: AllOrder
    },{
      path:"/addOrder",
      name:"添加订单",
      component:AddOrder
    }
    ]
  },{
      path: '/update',
      component: OrderUpdate,
      show: false
    }
];

const router = new VueRouter({
  routes
});

export default router
