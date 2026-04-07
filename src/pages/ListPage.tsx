import { useQuery } from "@tanstack/react-query";
import { Image, Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ListPage() {
  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios(`http://localhost:3000/products`);
      return res.data;
    },
  });

  const onDelete = async (id: number) => {
    if (confirm("ban co chac mon xoa?")) {
      await axios.delete(`http://localhost:3000/products/${id}`);
      toast.success("xoa thanh cong");
    }
  };
  const column = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) => <Image src={img} width={80} />,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (_, record: any) => {
        return (
          <>
            <Link
              to={`/edit/${record.id}`}
              style={{
                color: "white",
                padding: 10,
                marginRight: 15,
                backgroundColor: "green",
              }}
            >
              Sửa
            </Link>
            <button
              onClick={() => onDelete(record.id)}
              style={{
                color: "white",
                padding: 10,
                marginRight: 15,
                backgroundColor: "red",
              }}
            >
              xóa
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={column} dataSource={data} />
      </div>
    </div>
  );
}

export default ListPage;
