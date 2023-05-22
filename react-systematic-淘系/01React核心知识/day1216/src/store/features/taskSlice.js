/* TASK版块的切片，包含：REDUCER & ACTION-CREATOR */
import { createSlice } from '@reduxjs/toolkit';
import { getTaskList } from '../../api';

const taskSlice = createSlice({
    // 设置切片的名字
    name: 'task',
    // 设置此切片对应reducer中的初始状态
    initialState: {
        taskList: null
    },
    // 编写不同业务逻辑下，对公共状态的更改
    reducers: {
        getAllTaskList(state, action) {
            // state:redux中的公共状态信息「基于immer库管理，无需自己再克隆了」
            // action:派发的行为对象，我们无需考虑行为标识的问题了；传递的其他信息，都是以action.payload传递进来的值！！
            state.taskList = action.payload;
        },
        removeTask(state, { payload }) {
            let taskList = state.taskList;
            if (!Array.isArray(taskList)) return;
            state.taskList = taskList.filter(item => {
                // payload:接收传递进来的，要删除那一项的ID
                return +item.id !== +payload;
            });
        },
        updateTask(state, { payload }) {
            let taskList = state.taskList;
            if (!Array.isArray(taskList)) return;
            state.taskList = taskList.map(item => {
                if (+item.id === +payload) {
                    item.state = 2;
                    item.complete = new Date().toLocaleString('zh-CN');
                }
                return item;
            });
        }
    }
});

// 从切换中获取actionCreator：此处解构的方法和上面reducers中的方法，仅仅是函数名相同；方法执行，返回需要派发的行为对象；后期我们可以基于dispatch进行任务派发即可！！
export let { getAllTaskList, removeTask, updateTask } = taskSlice.actions;
// console.log(getAllTaskList([])); //=>{type: 'task/getAllTaskList', payload: []}
export const removeTaskAction = removeTask;
export const updateTaskAction = updateTask;

// 实现异步派发「redux-thunk」
export const getAllTaskListAsync = () => {
    return async dispatch => {
        let list = [];
        try {
            let result = await getTaskList(0);
            if (+result.code === 0) {
                list = result.list;
            }
        } catch (_) { }
        dispatch(getAllTaskList(list));
    };
};

// 从切片中获取reducer
export default taskSlice.reducer;