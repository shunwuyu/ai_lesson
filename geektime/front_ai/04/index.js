// TensorFlow js NPL 库
const tf = require('@tensorflow/tfjs-node')
// MNIST 是一个包含手写数字图像及其标签的数据集，常用于训练和测试机器学习模型。
const mnist = require('mnist')

const loadData = () => {
  // 8000 代表训练集的大小 2000 代表训练集的大小
  const set = mnist.set(8000, 2000);
  // 得到属性
  const { training, test } = set;
  // 每一项都有input 和 output
  const formatData = (data) => {
    return {
      // reshape 重塑为四维张量  -1 自动计算第一个纬度大小
      images: tf.tensor(data.map(item => item.input)).reshape([-1, 28, 28, 1]),
      // 一维数组
      labels: tf.tensor(data.map(item => item.output))
    }
  }
  return { trainData: formatData(training), testData: formatData(test) };
}


const buildNetModel = () => {
  // 基于tf的序列模型
  const model = tf.sequential();
  // 二维卷机层
  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    kernelSize: 5,
    filters: 6,
    activation: 'relu'
  }));

  model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
  model.add(tf.layers.conv2d({ kernelSize: 5, filters: 16, activation: 'relu', }));
  model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
  model.add(tf.layers.flatten()); 
  model.add(tf.layers.dense({ units: 120, activation: 'relu', }));
  model.add(tf.layers.dense({ units: 84, activation: 'relu', })); 
  model.add(tf.layers.dense({ units: 10, activation: 'softmax', }));
  return model
}

const run = async () => {
  const { trainData, testData } = loadData()
  // console.log(trainData);
  const model = buildNetModel()
  
}

run()
  .catch(console.error)
