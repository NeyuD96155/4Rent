import React from "react";
import "../styles/Rules.css";

const Rules = () => {
    return (
        <div className="cancellation-policy-container">
            <h1 className="rules-heading">Điều khoản pháp lý</h1>
            <ul className="rules-content">
                <li>Chúng tôi làm web cho thuê bất động sản.</li>
                <li>
                    Việc sử dụng dịch vụ của chúng tôi đồng nghĩa với việc bạn
                    đồng ý với các điều khoản và điều kiện sau đây.
                </li>
                <li>
                    Bạn cam kết không sử dụng dịch vụ của chúng tôi cho các mục
                    đích bất hợp pháp hoặc gây hại đến người khác.
                </li>
                <li>
                    Chúng tôi không chịu trách nhiệm về bất kỳ thông tin sai
                    lệch hoặc không chính xác nào được cung cấp trên trang web
                    của chúng tôi.
                </li>
                <li>
                    Mọi tranh chấp phát sinh từ việc sử dụng dịch vụ của chúng
                    tôi sẽ được giải quyết theo pháp luật hiện hành của quốc
                    gia.
                </li>
            </ul>

            <h1 className="rules-heading">Điều khoản dịch vụ</h1>
            <ul className="rules-content">
                <li>
                    Dịch vụ của chúng tôi cung cấp nền tảng để người thuê nhà và
                    chủ nhà gặp nhau và thỏa thuận về việc thuê nhà.
                </li>
                <li>
                    Chúng tôi không chịu trách nhiệm về việc thực hiện các giao
                    dịch hoặc xung đột giữa người thuê nhà và chủ nhà.
                </li>
                <li>
                    Bạn phải tuân thủ các quy định pháp luật địa phương khi sử
                    dụng dịch vụ của chúng tôi.
                </li>
                <li>
                    Chúng tôi có quyền cập nhật, sửa đổi hoặc hủy bỏ bất kỳ phần
                    nào của dịch vụ mà không cần thông báo trước.
                </li>
            </ul>
        </div>
    );
};

export default Rules;
