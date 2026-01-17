import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Table, Button, Form, Input, Tag, message, Card, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { getTodos, createTodo, updateTodo, deleteTodo, CreateTodoDto, Todo } from '../lib/api'

export const Route = createFileRoute('/')({ component: App })

const { Title } = Typography;

function App() {
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      form.resetFields()
      message.success('Todo created successfully')
    },
    onError: () => {
      message.error('Failed to create todo')
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: Partial<CreateTodoDto> }) =>
      updateTodo(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      message.success('Todo updated successfully')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      message.success('Todo deleted successfully')
    },
  })

  const onFinish = (values: CreateTodoDto) => {
    createMutation.mutate(values)
  }

  const columns = [
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed: boolean, record: Todo) => (
        <Tag color={completed ? 'green' : 'volcano'} style={{ cursor: 'pointer' }} onClick={() => updateMutation.mutate({ id: record.id, todo: { completed: !completed } })}>
          {completed ? 'Done' : 'Pending'}
        </Tag>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Todo) => (
        <span style={{ textDecoration: record.completed ? 'line-through' : 'none' }}>
          {text}
        </span>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: Todo) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteMutation.mutate(record.id)}
        />
      ),
    },
  ]

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title level={2}>Todo List</Title>
        <Form form={form} layout="inline" onFinish={onFinish} style={{ marginBottom: 24 }}>
          <Form.Item name="title" rules={[{ required: true, message: 'Please input title!' }]}>
            <Input placeholder="What needs to be done?" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={createMutation.isPending}>
              Add Todo
            </Button>
          </Form.Item>
        </Form>

        <Table
          dataSource={todos}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  )
}
