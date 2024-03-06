import React from "react";
import "../styles/Privacy.css";

const Privacy = () => {
    return (
        <div className="cancellation-policy-container">
            <h1>QUYỀN RIÊNG TƯ</h1>
            <p>
                Chào mừng bạn đến với <i>quyền riêng tư</i>. Ở đây, chúng tôi đề
                cập đến cách chúng tôi <i>thu thập</i>, <i>sử dụng</i> và{" "}
                <i>bảo vệ</i> thông tin trên trang web của mình.
            </p>

            <h6>1. Thu thập thông tin</h6>
            <p>
                Chúng tôi có thể thu thập thông tin không riêng tư, chẳng hạn
                như loại trình duyệt, loại máy chủ, loại hệ điều hành và loại
                phiên bản, với mục đích cải thiện trải nghiệm của bạn trên trang
                web của chúng tôi.
            </p>

            <h6>2. Sử dụng thông tin</h6>
            <p>
                Thông tin thu thập từ bạn có thể được sử dụng để phân tích xu
                hướng, quản lý trang web, theo dõi hoạt động của người dùng trên
                trang web và thu thập thông tin khác liên quan đến trang web.
            </p>

            <h6>3. Bảo mật</h6>
            <p>
                Chúng tôi cam kết <u>bảo vệ thông tin</u> trên trang web của
                mình. Tuy nhiên, hãy lưu ý rằng không có phương tiện truyền
                thông nào qua internet hoặc phương thức lưu trữ điện tử nào là
                hoàn toàn an toàn và bảo mật 100%.
            </p>
        </div>
    );
};

export default Privacy;
