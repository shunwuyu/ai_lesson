export default function App() {
  return (
    <div style={{ padding: 24 }}>
      {/* 🔥 直接使用，无需 import */}
      <Button type="primary">Primary Button</Button>

      <br />

      <Input placeholder="请输入" style={{ width: 200, margin: '8px 0' }} />

      <Modal title="标题" open={false}>
        <p>这是模态框内容</p>
      </Modal>

      <DatePicker style={{ marginLeft: 8 }} />
    </div>
  );
}