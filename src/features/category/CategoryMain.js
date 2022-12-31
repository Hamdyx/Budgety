import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Form, Input, InputNumber, Modal } from 'antd';
import { addNewCategory, fetchCategories, selectAllCategories } from '../category/categorySlice';
import CategoryBox from '../budget/CategoryBox';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
        }}
    />
);

export const CategoryMain = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log('Success:', { values });
        const updated = { [values.category]: { budget: values.budget } }
        console.log('Success:', { updated, values });
        dispatch(addNewCategory(values))
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const categoriesItems = categories.map((el, i) => (
        <Col key={i} sm={{ span: 4 }}>
            <CategoryBox item={el} />
        </Col>
    ));

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <>
            <Row>
                <Col sm={{ span: 2 }}>
                    <h5>Categories</h5>
                </Col>
                <Col sm={{ span: 1 }}>
                    <Button className="budget-add-btn" onClick={showModal}>+</Button>
                    <Modal title="Add Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your category!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Budget"
                                name="budget"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Budget!',
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Col>
                <Col>
                    <ColoredLine color={'#545963'} />
                </Col>
            </Row>
            <Row className="category-row">{categoriesItems}</Row>
        </>
    );
};

export default CategoryMain;