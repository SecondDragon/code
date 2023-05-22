/* Task版块的Store */
import { observable, action, runInAction, makeObservable, makeAutoObservable } from 'mobx';
import { getTaskList } from '../api';

export default class TaskStore {
    constructor(root) {
        this.root = root;
        /* // 基于makeObservable给状态和方法设置装饰效果！！
        makeObservable(this, {
            taskList: observable,
            queryAllTaskAction: action.bound,
            removeTaskAction: action.bound,
            updateTaskAction: action.bound
        }); */
        // makeAutoObservable：对makeObservable的加强，可以自己给状态和方法设置装饰，等同于上述操作
        makeAutoObservable(this);
    }

    taskList = null;
    // 异步获取全局任务
    async queryAllTaskAction() {
        let list = [];
        try {
            let result = await getTaskList(0);
            if (+result.code === 0) list = result.list;
        } catch (_) { }
        runInAction(() => {
            this.taskList = list;
        });
    }
    // 同步删除某一任务
    removeTaskAction(id) {
        let { taskList } = this;
        if (!Array.isArray(taskList)) return;
        this.taskList = taskList.filter(item => {
            return +item.id !== +id;
        });
    }
    // 同步修改某一任务
    updateTaskAction(id) {
        let { taskList } = this;
        if (!Array.isArray(taskList)) return;
        this.taskList = taskList.map(item => {
            if (+item.id === +id) {
                item.state = 2;
                item.complete = new Date().toLocaleString('zh-CN');
            }
            return item;
        });
    }
};

/* mobx5的处理 */
/* export default class TaskStore {
    constructor(root) {
        // root：最外层Store类的实例「包含各个版块Store的实例」
        // 我们以后可以在TASK版块中，基于this.root获取根Store实例，基于根Store实例，访问其他版块Store的实例
        this.root = root;
    }

    @observable taskList = null;

    // 异步获取全局任务
    @action.bound async queryAllTaskAction() {
        let list = [];
        try {
            let result = await getTaskList(0);
            if (+result.code === 0) list = result.list;
        } catch (_) { }
        runInAction(() => {
            this.taskList = list;
        });
    }

    // 同步删除某一任务
    @action.bound removeTaskAction(id) {
        let { taskList } = this;
        if (!Array.isArray(taskList)) return;
        this.taskList = taskList.filter(item => {
            return +item.id !== +id;
        });
    }

    // 同步修改某一任务
    @action.bound updateTaskAction(id) {
        let { taskList } = this;
        if (!Array.isArray(taskList)) return;
        this.taskList = taskList.map(item => {
            if (+item.id === +id) {
                item.state = 2;
                item.complete = new Date().toLocaleString('zh-CN');
            }
            return item;
        });
    }
}; */