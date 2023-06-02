import ElMenu from './el-menu';
import ElMenuItem from './el-menu-item';
import ElSubmenu from './el-submenu'
import resub from './resub.vue';
export default {
    props: {
        data: {}
    },
    components: {
        ElMenu,
        ElMenuItem,
        ElSubmenu,
        resub
    },
    render() {
        let renderChildren = (data) => {
            return data.map(child => (
                child.children ?
                    <el-submenu>
                        <div slot="title">{child.title}</div>
                        {renderChildren(child.children)}
                    </el-submenu> :
                    <el-menu-item>{child.title}</el-menu-item>
            ))
        }
        return (
            <el-menu>
                {renderChildren(this.data)}
            </el-menu>
        )
    }
}