import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import api from "../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Select, Checkbox, Modal } from "antd";

const { Option } = Select;

const SignUp = () => {
    const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

    const showTermsModal = () => {
        setIsTermsModalVisible(true);
    };

    const handleTermsModalOk = () => {
        setIsTermsModalVisible(false);
    };

    const handleTermsModalCancel = () => {
        setIsTermsModalVisible(false);
    };
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            await api.post("/register", values);
            toast.success(
                "Đăng kí thành công! Vui lòng kiểm tra email của bạn để xác thực tài khoản."
            );
            navigate("/signin");
        } catch (error) {
            console.log(error);
            toast.error("Đăng kí thất bại: " + error.response.data);
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Đăng kí</h1>
            <Form
                form={form}
                name="signup-form"
                className="signup-form"
                onFinish={handleSubmit}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="role"
                    label="Vai trò"
                    rules={[
                        {
                            required: true,
                            message: "Hãy chọn vai trò của bạn!",
                        },
                    ]}
                >
                    <Select placeholder="Chọn 1 vai trò">
                        <Option value="MEMBER">Chủ sở hữu</Option>
                        <Option value="RENTER">Người thuê</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: "email",
                            message:
                                "Định dạng email không đúng, vui lòng thử lại!",
                        },
                        {
                            required: true,
                            message: "Hãy nhập email của bạn!",
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    rules={[
                        {
                            required: true,
                            message: "Hãy nhập tên đăng nhập của bạn!",
                        },
                    ]}
                >
                    <Input placeholder="Tên đăng nhập" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: "Hãy nhập mật khẩu !",
                        },
                        {
                            min: 8,
                            message: "Mật khẩu phải có ít nhất 8 kí tự!",
                        },
                        () => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    (/\d/.test(value) &&
                                        /[!@#$%^&*(),.?":{}|<>]/.test(value))
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt và một chữ số!"
                                    )
                                );
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Xác nhận mật khẩu"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng xác nhận mật khẩu!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Mật khẩu xác nhận không khớp")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Xác nhận mật khẩu" />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          new Error(
                                              "Bạn cần phải đồng ý với điều chính sách và điều khoản !"
                                          )
                                      ),
                        },
                    ]}
                >
                    <Checkbox>
                        Tôi đã đọc và đồng ý với{" "}
                        <span
                            style={{ color: "#1890ff", cursor: "pointer" }}
                            onClick={showTermsModal}
                        >
                            chính sách và điều khoản
                        </span>
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <div className="form-actions">
                        <button type="submit" className="signup-submit">
                            Đăng kí
                        </button>
                    </div>
                </Form.Item>

                <div className="signup-footer">
                    Đã có tài khoản? <Link to="/signin">Đăng nhập</Link>
                </div>
                <Modal
                    title=" Điều khoản và Điều kiện sử dụng Dịch vụ "
                    visible={isTermsModalVisible}
                    onOk={handleTermsModalOk}
                    onCancel={handleTermsModalCancel}
                    footer={[
                        <button key="back" onClick={handleTermsModalCancel}>
                            Return
                        </button>,
                        <button
                            key="submit"
                            type="primary"
                            onClick={handleTermsModalOk}
                        >
                            Agree
                        </button>,
                    ]}
                >
                    <p>
                        Xin chào và hoan nghênh bạn đến với trang web cho thuê
                        căn hộ của chúng tôi. Trước khi bạn bắt đầu sử dụng dịch
                        vụ của chúng tôi, hãy đọc kỹ và hiểu rõ các điều khoản
                        và điều kiện sau đây. Việc sử dụng dịch vụ của chúng tôi
                        đồng nghĩa với việc bạn chấp nhận và tuân theo những
                        điều khoản này. 1. Phạm vi Dịch vụ: Trang web của chúng
                        tôi cung cấp nền tảng kết nối giữa người có nhu cầu thuê
                        căn hộ và những người cung cấp dịch vụ cho thuê căn hộ.
                        Chúng tôi không chịu trách nhiệm về chất lượng của căn
                        hộ được cung cấp bởi các bên thứ ba, nhưng cam kết sẽ cố
                        gắng hỗ trợ giải quyết các tranh chấp xảy ra giữa các
                        bên. 2. Đăng ký và Tài khoản: Bạn có thể cần phải đăng
                        ký một tài khoản để sử dụng một số tính năng của trang
                        web. Bạn phải cung cấp thông tin chính xác và đầy đủ khi
                        đăng ký tài khoản. Bạn chịu trách nhiệm duy trì bảo mật
                        cho tài khoản của mình và không chia sẻ thông tin đăng
                        nhập với bất kỳ ai khác. 3. Quyền Sở hữu Trí tuệ: Mọi
                        nội dung trên trang web, bao gồm cả văn bản, hình ảnh và
                        logo, là tài sản của chúng tôi hoặc các bên cấp phép của
                        chúng tôi. Bạn không được sao chép, sửa đổi hoặc phân
                        phối bất kỳ nội dung nào từ trang web của chúng tôi mà
                        không có sự cho phép trước bằng văn bản. 4. Trách nhiệm
                        của Người Dùng: Bạn cam kết sẽ sử dụng trang web của
                        chúng tôi một cách hợp pháp và không vi phạm bất kỳ luật
                        pháp nào. Bạn phải chịu trách nhiệm đối với mọi hoạt
                        động được thực hiện thông qua tài khoản của mình. Bạn
                        đồng ý không sử dụng trang web của chúng tôi để phổ biến
                        hoặc chia sẻ nội dung bất hợp pháp hoặc gây hại. 5. Giới
                        Hạn Trách Nhiệm: Chúng tôi không chịu trách nhiệm đối
                        với bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc
                        không thể sử dụng trang web của chúng tôi. Chúng tôi
                        không đảm bảo rằng trang web của chúng tôi sẽ luôn hoạt
                        động một cách liên tục và không bị gián đoạn. 6. Thay
                        Đổi và Hủy bỏ: Chúng tôi có quyền thay đổi hoặc hủy bỏ
                        bất kỳ phần nào của dịch vụ hoặc điều khoản và điều kiện
                        này vào bất kỳ thời điểm nào mà không cần thông báo
                        trước. 7. Luật áp dụng và Giải quyết tranh chấp: Mọi
                        tranh chấp phát sinh từ hoặc liên quan đến việc sử dụng
                        trang web của chúng tôi sẽ được giải quyết theo luật
                        pháp của quốc gia chúng tôi hoạt động. Bất kỳ tranh chấp
                        nào không thể giải quyết được thông qua đàm phán sẽ được
                        đưa ra tòa án có thẩm quyền. Bằng cách sử dụng trang web
                        của chúng tôi, bạn đồng ý tuân thủ và chấp nhận tất cả
                        các điều khoản và điều kiện này. Nếu bạn không đồng ý
                        với bất kỳ điều khoản nào, vui lòng không sử dụng dịch
                        vụ của chúng tôi.
                    </p>
                </Modal>
            </Form>
            <p className="signup-copy">
                Copyright © 4Rent Website {new Date().getFullYear()}.
            </p>
        </div>
    );
};
export default SignUp;
