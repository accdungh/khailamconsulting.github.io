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
      text: "Class List",
      hide: true
    }
  },
  {
    path: "/class_list",
    component: ClassList,
    name: 'ClassList',
    meta: {
      text: "Class List",
    }
  },
  {
    path: "/class/:id?",
    component: ClassView,
    name: 'ClassView',
    meta: {
      text: "Class Viewer",
    }
  },
  {
    path: "/archived_class",
    component: ArchivedClass,
    name: 'ArchivedClass',
    meta: {
      text: "Archived Classes",
    }
  },
  {
    path: "/setting",
    component: Setting,
    name: 'Setting',
    meta: {
      text: "Settings",
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
