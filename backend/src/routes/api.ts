import express from 'express';

const router = express.Router();

// 模拟数据
const mockData = {
  chickens: [
    { id: 1, name: '小黄', age: 6, health: 95, activity: 85 },
    { id: 2, name: '小白', age: 5, health: 90, activity: 70 },
    { id: 3, name: '小黑', age: 7, health: 92, activity: 80 },
    { id: 4, name: '小花', age: 4, health: 98, activity: 90 },
    { id: 5, name: '小红', age: 6, health: 88, activity: 75 }
  ],
  stats: {
    activity: 85,
    health: 92,
    feed: 65,
    water: 42,
    eggs: 12,
    feedConsumption: 2.3,
    waterConsumption: 4.8
  },
  emotions: [
    { emoji: '😊', label: '开心', count: 8 },
    { emoji: '😌', label: '放松', count: 4 },
    { emoji: '😰', label: '紧张', count: 1 },
    { emoji: '😱', label: '恐慌', count: 0 }
  ],
  alerts: [
    { id: 1, type: 'warning', message: '鸡舍温度偏高，建议开启通风' },
    { id: 2, type: 'info', message: '小白今日活动量较昨日减少15%' }
  ]
};

router.get('/chickens', (req, res) => {
  res.json(mockData.chickens);
});

router.get('/stats', (req, res) => {
  res.json(mockData.stats);
});

router.get('/emotions', (req, res) => {
  res.json(mockData.emotions);
});

router.get('/alerts', (req, res) => {
  res.json(mockData.alerts);
});

router.get('/health/:id', (req, res) => {
  const { id } = req.params;
  const chicken = mockData.chickens.find(c => c.id === parseInt(id));
  if (chicken) {
    res.json({
      ...chicken,
      healthHistory: [95, 94, 95, 96, 95]
    });
  } else {
    res.status(404).json({ error: 'Chicken not found' });
  }
});

export default router;