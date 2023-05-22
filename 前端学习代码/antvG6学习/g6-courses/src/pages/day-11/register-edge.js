export default G6 => {
  G6.registerEdge('right-tree', {
    draw (cfg, group) {
      const xOffset = 22;
      const yOffset = 10;
      const { startPoint, endPoint } = cfg;
      const Ydiff = endPoint.y - startPoint.y;
      const QPoint = {
        x: startPoint.x + xOffset,
        y: endPoint.y,
      };
      const path = Ydiff === 0 ? [
        ['M', startPoint.x + xOffset, startPoint.y],
        ['L', endPoint.x, endPoint.y],
      ] : [
          ['M', startPoint.x, startPoint.y],
          ['L', QPoint.x, startPoint.y],
          ['L', QPoint.x, endPoint.y + (Ydiff > 0 ? -yOffset : yOffset)],
          ['Q', QPoint.x, QPoint.y, QPoint.x + yOffset, endPoint.y],
          ['L', endPoint.x, endPoint.y],
      ];

      const shape = group.addShape('path', {
        attrs: {
          path,
          stroke: '#666',
          ...cfg,
        },
        name: 'right-tree-edge',
      });

      return shape;
    },
  });
};
