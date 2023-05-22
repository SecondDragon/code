/* 注册自定义节点 */

export default G6 => {
  G6.registerNode('tree-node', {
    draw (cfg, group) {
      const style = this.getShapeStyle(cfg, group);
      const shape = group.addShape('rect', {
        attrs: {
          ...style,
        },
        name: 'rect-node',
      });

      group.addShape('text', {
        attrs: {
          fontSize: 14,
          fill:     '#666',
          text:     cfg.label,
          x:        -style.width / 2 + 6,
          y:        style.height / 2 - 8,
        },
        name: 'node-label',
      });

      /* if (cfg.children) {
        group.addShape('circle', {
          attrs: {
            r:      7,
            fill:   '#fff',
            stroke: '#ccc',
            x:      style.width / 2 + 11,
          },
          name: 'node-icon',
        });

        group.addShape('text', {
          attrs: {
            text:     '-',
            fontSize: 16,
            fill:     '#ccc',
            cursor:   'pointer',
            x:        style.width / 2 + 6,
            y:        6,
          },
          name: 'node-icon-text',
        });
      } */

      return shape;
    },
    update (cfg, node) {
      const group = node.getContainer();
      const children = group.get('children');
      const nodeLabel = children.find(child => child.cfg.name === 'node-label');
      const icon = children.find(child => child.cfg.name === 'node-icon-text');

      if (nodeLabel) {
        nodeLabel.attr({
          text: cfg.label,
        });
      }

      if (icon) {
        icon.attr({
          text: cfg.collapsed ? '+' : '-',
        });
      }
    },
  }, 'rect');
};
