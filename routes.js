import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BorderColor from "@material-ui/icons/BorderColor";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Kullanici Profili",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,

    layout: "/admin",
  },
  {
    path: "/order-form",
    name: "Siparis Formu",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BorderColor,

    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   rtlName: "ل",
  //   icon: Person,

  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   rtlName: "ة",
  //   icon: Person,

  //   layout: "/auth",
  // },

  // {
  //   path: "/table-list",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",

  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,

  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,

  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,

  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,

  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,

  //   layout: "/rtl",
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,

  //   layout: "/admin",
  // },
];

export default routes;
