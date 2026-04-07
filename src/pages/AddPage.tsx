import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["products"],
    mutationFn: async (value) => {
      await axios.post(`http://localhost:3000/products`, value);
    },
    onSuccess: () => {
      toast.success("them thanh cong");
      nav("/list");
    },
    onError: () => {
      toast.success("them that bai");
    },
  });

  const onsubmit = (value: void) => {
    mutate(value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form onFinish={onsubmit} layout="vertical" className="space-y-6">
        {/* Text input */}
        <Form.Item label="Input" name="name">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item label="Giá" name="price">
          <InputNumber placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item label="loại" name="category">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        <Form.Item label="Ảnh" name="image">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>

        {/* Select */}
        {/* <Form.Item label="Danh mục" name="category">
          <Select placeholder="Chọn danh mục" options={[]} />
        </Form.Item> */}

        {/* Submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;
