// import { useLocation } from "react-router-dom";
import React from "react";

const Success = () => {
    // const location = useLocation();

    // useEffect(() => {
    //     // Phân tích các tham số từ URL
    //     const searchParams = new URLSearchParams(location.search);
    //     const vnp_Amount = searchParams.get("vnp_Amount");
    //     const vnp_BankCode = searchParams.get("vnp_BankCode");
    //     // Lấy các thông tin khác tương tự

    //     // Thực hiện hành động tương ứng với dữ liệu nhận được từ URL
    //     console.log("Thông tin thanh toán thành công:");
    //     console.log("Số tiền thanh toán:", vnp_Amount);
    //     console.log("Ngân hàng:", vnp_BankCode);
    //     // Thực hiện các hành động khác tùy theo yêu cầu của ứng dụng

    //     // Ví dụ: Chuyển hướng đến trang /payment
    //     // navigate("/payment");
    // }, [location]);

    return (
        <div>
            <h1>Thanh toán thành công!</h1>
            {/* Hiển thị thông tin khác tùy theo yêu cầu của ứng dụng */}
        </div>
    );
};

export default Success;
