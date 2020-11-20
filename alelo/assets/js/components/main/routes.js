import ClassList from "./class_list.vue";
import ClassView from "./class_view.vue";
import ArchivedClass from "./archived_class.vue";
import ClassStudent from "./class_student.vue";
import Setting from "./setting.vue";

export default [
  {
    path: "/",
    component: ClassList,
    name: 'ClassList',
    meta: {
      text: "common.menu.classList",
      hide: true
    }
  },
  {
    path: "/class_list",
    component: ClassList,
    name: 'ClassList',
    meta: {
      text: "common.menu.classList",
    }
  },
  {
    path: "/class/:id?",
    component: ClassView,
    name: 'ClassView',
    meta: {
      text: "common.menu.classView",
    }
  },
  {
    path: "/archived_class",
    component: ArchivedClass,
    name: 'ArchivedClass',
    meta: {
      text: "common.menu.archivedClass",
    }
  },
  {
    path: "/setting",
    component: Setting,
    name: 'Setting',
    meta: {
      text: "common.menu.setting",
    }
  },
  {
    path: "/class/:classId/student/:id",
    component: ClassStudent,
    name: 'ClassStudent',
    meta: {
      text: "ClassStudent",
      hide: true,
      hideRouterLink: true
    }
  }
]
