import React, { useRef, useContext, useState, useCallback, useEffect } from 'react';
import { Form, Input, Message } from '@arco-design/web-react';
import styles from './style/index.module.less';
const EditableContext = React.createContext({ getForm: null });

export const EditableRow = (props) => {
  const { children, record, className, ...rest } = props;
  const refForm = useRef(null);
  const getForm = () => refForm.current;

  return (
    <EditableContext.Provider value={{ getForm }}>
      <Form
        style={{ display: 'table-row' }}
        children={children}
        ref={refForm}
        wrapper='tr'
        wrapperProps={rest}
        className={`${className} ${styles['editable-row']}`}
      />
    </EditableContext.Provider>
  );
}


export const EditableCell = (props) => {
  const { children, className, rowData, column, onHandleSave } = props;

  const ref = useRef(null);
  const refInput = useRef(null);
  const { getForm } = useContext(EditableContext);
  const [editing, setEditing] = useState(false);

  const handleClick = useCallback(
    (e) => {
      if (
        editing &&
        column.editable &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.classList.contains('js-demo-select-option')
      ) {
        cellValueChangeHandler();
      }
    },
    [editing, rowData, column]
  );

  useEffect(() => {
    editing && refInput.current && refInput.current.focus();
  }, [editing]);

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick]);

  const cellValueChangeHandler = () => {
    const form = getForm();
    form.validate([column.dataIndex], (errors, values) => {
      if (!errors || !errors[column.dataIndex]) {
        setEditing(!editing);
        onHandleSave && onHandleSave({ ...rowData, ...values });
      }
    });
  };

  if (editing) {
    return (
      <div ref={ref}>
        <Form.Item
          style={{ marginBottom: 0 }}
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValue={rowData[column.dataIndex]}
          field={column.dataIndex}
          rules={[
            {
              required: true,
              message:'请输入分类名称'
            },
          ]}
        >
          <Input ref={refInput} onPressEnter={cellValueChangeHandler} />
        </Form.Item>
      </div>
    );
  }

  const toggleEdit = () => {
    if (column.editable) {
      if (rowData.articleNum > 0) {
        return Message.warning('该分类下有文章不能修改！');
      }
      setEditing(!editing)
    }
    
  }

  return (
    <div
      className={column.editable ? `${styles['editable-cell']} ${className}` : className}
      onClick={toggleEdit}
    >
      {children}
    </div>
  );
}