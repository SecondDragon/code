import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col } from 'antd';
import {
  Chart,
  Tooltip,
  Axis,
  Legend,
  Line,
  Bar,
  Point,
  SmoothLine,
  Coord,
  Pie,
  View,
} from 'viser-react';
import DataSet from '@antv/data-set';
import { days7 } from '@/utils/utils';
import './Dashboard.less';
const articlesData = (() => {
  const sourceData = [
    { day: days7[0], 查看: 7.0, 点赞: 3.9, 收藏: 3.0, 评论: 1, 打赏: 5 },
    { day: days7[1], 查看: 6.9, 点赞: 4.2, 收藏: 7.0, 评论: 4, 打赏: 4 },
    { day: days7[2], 查看: 9.5, 点赞: 5.7, 收藏: 4.0, 评论: 5, 打赏: 0 },
    { day: days7[3], 查看: 14.5, 点赞: 8.5, 收藏: 3.0, 评论: 12, 打赏: 4 },
    { day: days7[4], 查看: 18.4, 点赞: 11.9, 收藏: 3.0, 评论: 17, 打赏: 2 },
    { day: days7[5], 查看: 21.5, 点赞: 15.2, 收藏: 6.0, 评论: 3, 打赏: 0 },
    { day: days7[6], 查看: 25.2, 点赞: 17.0, 收藏: 8.0, 评论: 7, 打赏: 4 },
  ];

  const dv = new DataSet.View().source(sourceData);
  dv.transform({
    type: 'fold',
    fields: ['查看', '点赞', '收藏', '评论', '打赏'],
    key: 'view',
    value: 'articles',
  });
  const data = dv.rows;

  const scale = [
    {
      dataKey: 'day',
      range: [0, 1],
    },
  ];
  return {
    data,
    scale,
  };
})();

const userVisits = (() => {
  const sourceData = [
    { day: days7[0], 首次访问用户: 7.0, 二次访问用户: 3.9, 多次访问用户: 3.0 },
    { day: days7[1], 首次访问用户: 6.9, 二次访问用户: 4.2, 多次访问用户: 7.0 },
    { day: days7[2], 首次访问用户: 9.5, 二次访问用户: 5.7, 多次访问用户: 4.0 },
    { day: days7[3], 首次访问用户: 14.5, 二次访问用户: 8.5, 多次访问用户: 3.0 },
    { day: days7[4], 首次访问用户: 18.4, 二次访问用户: 11.9, 多次访问用户: 3.0 },
    { day: days7[5], 首次访问用户: 21.5, 二次访问用户: 15.2, 多次访问用户: 6.0 },
    { day: days7[6], 首次访问用户: 25.2, 二次访问用户: 17.0, 多次访问用户: 8.0 },
  ];

  const dv = new DataSet.View().source(sourceData);
  dv.transform({
    type: 'fold',
    fields: ['首次访问用户', '二次访问用户', '多次访问用户'],
    key: 'user',
    value: 'visits',
  });
  const data = dv.rows;

  const scale = [
    {
      dataKey: 'day',
      min: 0,
      max: 1,
    },
  ];
  return {
    data,
    scale,
  };
})();

const addUser = (() => {
  const data = [
    { day: days7[0], 新增用户: 7.0 },
    { day: days7[1], 新增用户: 6.9 },
    { day: days7[2], 新增用户: 9.5 },
    { day: days7[3], 新增用户: 14.5 },
    { day: days7[4], 新增用户: 0 },
    { day: days7[5], 新增用户: 21.5 },
    { day: days7[6], 新增用户: 25.2 },
  ];
  const scale = [
    {
      dataKey: 'day',
      min: 0,
      max: 1,
    },
  ];
  return {
    data,
    scale,
  };
})();

const skill = (() => {
  const sourceData = [
    { value: 50, type: 'JS', name: 'Vue' },
    { value: 40, type: 'JS', name: 'React' },
    { value: 5, type: 'JS', name: 'Angular' },
    { value: 20, type: 'JS', name: 'Koa' },
    { value: 20, type: 'JS', name: 'Node.js' },
    { value: 50, type: 'JS', name: 'Jquery' },
    { value: 10, type: 'JS', name: 'Express' },

    { value: 30, type: 'UI', name: 'Element' },
    { value: 30, type: 'UI', name: 'iView' },
    { value: 30, type: 'UI', name: 'Ant-design' },
  ];

  const dv = new DataSet.View().source(sourceData);
  dv.transform({
    type: 'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent',
  });
  const data = dv.rows;

  const viewDv = new DataSet.View().source(sourceData);
  viewDv.transform({
    type: 'percent',
    field: 'value',
    dimension: 'name',
    as: 'percent',
  });
  const viewData = viewDv.rows;

  const scale = {
    dataKey: 'percent',
    formatter: '.2%',
  };
  const itemTpl =
    '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>';

  const style = {
    lineWidth: 1,
    stroke: '#fff',
  };

  const tooltip = [
    'name*percent',
    (item, percent) => {
      percent = (percent * 100).toFixed(2) + '%';
      return {
        name: item,
        value: percent,
      };
    },
  ];

  const color = ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4'];
  return {
    data,
    viewData,
    scale,
    itemTpl,
    style,
    tooltip,
    color,
  };
})();
export default () => {
  useEffect(() => {});
  return (
    <PageContainer>
      <Card>
        <Row>
          <Col className="chart-box" span={24}>
            <div className="chart-title">文章总数据</div>
            <Chart forceFit height={400} data={articlesData.data} scale={articlesData.scale}>
              <Tooltip />
              <Axis />
              <Legend />
              <SmoothLine position="day*articles" color="view" />
              <Point
                position="day*articles"
                color="view"
                size={4}
                style={{ stroke: '#fff', lineWidth: 1 }}
                shape="circle"
              />
            </Chart>
          </Col>
        </Row>

        <Row style={{ marginTop: 30 }}>
          <Col className="chart-box" span={11}>
            <div className="chart-title">用户访问量</div>
            <Chart forceFit height={400} data={userVisits.data} scale={userVisits.scale}>
              <Tooltip />
              <Axis />
              <Legend />
              <Line position="day*visits" color="user" />
              <Point
                position="day*visits"
                color="user"
                size={4}
                style={{ stroke: '#fff', lineWidth: 1 }}
                shape="circle"
              />
            </Chart>
          </Col>
          <Col className="chart-box" offset={2} span={11}>
            <div className="chart-title">新增用户</div>
            <Chart forceFit height={400} data={addUser.data} scale={addUser.scale}>
              <Tooltip />
              <Axis />
              <Bar position="day*新增用户" />
            </Chart>
          </Col>
        </Row>

        <Row style={{ marginTop: 30 }}>
          <Col className="chart-box" span={24}>
            <div className="chart-title">前端技能展示</div>
            <Chart
              forceFit
              height={400}
              data={skill.data}
              scale={skill.scale}
            >
              <Tooltip showTitle={false} itemTpl={skill.itemTpl} />
              <Coord type="theta" radius={0.5} />
              <Pie
                position="percent"
                color="type"
                label={['type', { offset: -10 }]}
                tooltip={skill.tooltip}
                select={false}
                style={skill.style}
              />
              <View data={skill.viewData} scale={skill.scale}>
                <Coord type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
                <Pie
                  position="percent"
                  color={['name', skill.color]}
                  label="name"
                  tooltip={skill.tooltip}
                  select={false}
                  style={skill.style}
                />
              </View>
              <Legend />
            </Chart>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};
