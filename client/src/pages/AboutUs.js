/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "../styles/About.css";
const AboutUs = () => {
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col">
                    <h1>Về chúng tôi</h1>
                    <p>
                        Tìm hiểu nhiều hơn về 4Rent và sứ mệnh mà chúng tôi mang
                        lại
                    </p>
                    <p>
                        4Rent là một nền tảng nơi mà mọi người có thể thuê và
                        cho thuê kì nghỉ.Nền tảng của chúng tôi cho phép người
                        dùng trao đổi căn hộ của họ một cách đơn giản và hiệu
                        quả, đảm bảo trải nghiệm lập kế hoạch kỳ nghỉ không gặp
                        rắc rối.
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h2>Tầm nhìn của chúng tôi</h2>
                    <p>
                        Tại 4Rent, tầm nhìn của chúng tôi là cách mạng hóa cách
                        mọi người đi nghỉ. Chúng tôi cố gắng kết nối các chủ sở
                        hữu timeshare với mạng lưới cơ sở kinh doanh rộng lớn,
                        cho phép họ khám phá các điểm đến mới một cách dễ dàng
                        và thoải mái.
                    </p>
                </div>
                <div className="col-md-6">
                    <img
                        src="./assets/img/i2.jpg"
                        alt="Vision Image"
                        className="img-fluid"
                    />
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <img
                            src="./assets/img/i1.jpg"
                            alt="Mission Image"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>Nhiệm vụ của chúng tôi</h2>
                        <p>
                            Sứ mệnh của chúng tôi là trao quyền cho chủ sở hữu
                            timeshare bằng cách cung cấp cho họ nhiều tùy chọn
                            trao đổi đa dạng, dịch vụ khách hàng hàng đầu và các
                            nguồn lực vô giá để nâng cao trải nghiệm kỳ nghỉ của
                            họ.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col">
                    <h2>Các thành viên</h2>
                    <p>
                        Gặp gỡ những cá nhân đầy nhiệt huyết đằng sau 4Rent. Đội
                        của chúng tôi bao gồm các chuyên gia về bất động sản,
                        công nghệ và dịch vụ khách hàng, tất cả tận tâm để làm
                        cho kỳ nghỉ của bạn giấc mơ thành hiện thực.
                    </p>
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h2>Lịch sử</h2>
                    <p>
                        Được thành lập vào năm 2024, 4Rent khởi đầu là một công
                        ty khởi nghiệp nhỏ và kể từ đó đã phát triển thành một
                        tên tuổi hàng đầu trong lĩnh vực chia sẻ thời gian ngành
                        trao đổi. Cuộc hành trình của chúng tôi là minh chứng
                        cho cam kết đổi mới và sự hài lòng của khách hàng.
                    </p>
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h2>Giá trị</h2>
                    <p>
                        Tại 4Rent, chúng tôi được hướng dẫn bởi các giá trị về
                        tính chính trực, sự hợp tác và sự xuất sắc. Những nguyên
                        tắc này ở trọng tâm của mọi việc chúng tôi làm, từ cách
                        chúng tôi tiến hành kinh doanh đến cách chúng tôi tương
                        tác với cộng đồng của mình.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
