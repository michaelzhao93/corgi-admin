import {
  Button,
  Select,
  Option,
  DatePicker,
  Table,
  TableColumn,
  Loading,
  Scrollbar,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Pagination,
  Tag,
  Row,
  Dialog,
  Checkbox,
  RadioGroup,
  Radio,
  RadioButton,
  MessageBox,
  Message,
  Switch,
  Drawer,
  Tooltip
} from 'element-ui'

export default {
  install(Vue) {
    Vue.use(Button)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(DatePicker)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Loading)
    Vue.use(Scrollbar)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Submenu)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Badge)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Pagination)
    Vue.use(Tag)
    Vue.use(Row)
    Vue.use(Dialog)
    Vue.use(Checkbox)
    Vue.use(RadioGroup)
    Vue.use(Radio)
    Vue.use(RadioButton)
    Vue.use(Switch)
    Vue.use(Drawer)
    Vue.use(Tooltip)

    Object.defineProperty(Vue.prototype, '$msgbox', {
      value: MessageBox
    })
    Object.defineProperty(Vue.prototype, '$message', {
      value: Message
    })
  }
}

