import React, { useEffect, useState } from 'react';
import Item from './item';

const UploadImage = (props) => {
  const {
    value,
    onChange,
    max,
    showImg = true,
    showLink = true,
    showIcon = false,
    showAction = true,
  } = props;
  interface IImage {
    _id?: string;
    imgUrl?: string;
    link?: string;
    icon?: string;
    showAdd?: boolean;
    showReduce?: boolean;
  }

  const initImgs: Array<IImage> = [
    {
      _id: '',
      imgUrl: '',
      link: '',
      icon: '',
    },
  ];

  const [imgsArr, setImgsArr] = useState(() => {
    console.log('value', value);

    return value ? value : initImgs;
  });

  useEffect(() => {
    if (!value) {
      setImgsArr(initImgs);
    } else {
      debugger
      const length = value.length;
      value.map((item, idx) => {
        if (length < max) {
          // 1 < 3
          item.showReduce = length != 1;
          item.showAdd = length - 1 === idx;
        } else {
          item.showReduce = true; //可以删除
          item.showAdd = false;
        }
      });
      setImgsArr(value);
    }
  }, [value]);

  const onItemChange = (data) => {
    console.log(data);
    imgsArr.forEach((item, index) => {
      if (index === data.index) {
        item[data.field] = data.value;
      }
    });
    onChange(imgsArr);
  };

  const onAdd = () => {
    if (imgsArr.length < max) {
      imgsArr.push({
        imgUrl: '',
        link: '',
        icon: '',
      });
      console.log(imgsArr);

      onChange(imgsArr);
    }
  };
  const onRemove = (index) => {
    if (imgsArr.length > 1) {
      imgsArr.splice(index, 1);
      onChange(imgsArr);
    }
  };
  console.log('imgsArr:', imgsArr);
  
  return (
    <>
      {imgsArr?.map((item, index) => {
        return (
          <Item
            key={index}
            {...item}
            index={index}
            onChange={onItemChange}
            onAdd={onAdd}
            onRemove={onRemove}
            showImg={showImg}
            showLink={showLink}
            showIcon={showIcon}
            showAction={showAction}
          />
        );
      })}
    </>
  );
};

export default UploadImage;
