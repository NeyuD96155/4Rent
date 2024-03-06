import React, { useState } from "react";
import "../styles/Faq.css";

const Faq = () => {
    const [faqs, setFaqs] = useState([
        {
            question: "Câu hỏi 1: Tôi cần làm gì để đặt chỗ?",
            answer: "Trả lời 1: Để đặt chỗ, bạn có thể truy cập trang web của chúng tôi và sử dụng chức năng đặt phòng trực tuyến hoặc liên hệ trực tiếp với chúng tôi qua điện thoại hoặc email.",
            isOpen: false,
        },
        {
            question: "Câu hỏi 2: Tôi có thể hủy đặt phòng không?",
            answer: "Trả lời 2: Có, bạn có thể hủy đặt phòng của mình. Tuy nhiên, chúng tôi cần thông báo trước ít nhất 48 giờ trước ngày nhận phòng để nhận được hoàn trả đầy đủ.",
            isOpen: false,
        },
        {
            question: "Câu hỏi 3: Bảo mật thông tin của tôi như thế nào?",
            answer: "Trả lời 3: Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Mọi thông tin đều được mã hóa và chúng tôi không chia sẻ thông tin của bạn với bất kỳ bên thứ ba nào.",
            isOpen: false,
        },
    ]);

    const toggleFAQ = (index) => {
        setFaqs((prevFaqs) =>
            prevFaqs.map((faq, i) => ({
                ...faq,
                isOpen: i === index ? !faq.isOpen : false,
            }))
        );
    };

    return (
        <div className="faq-container">
            <h1>Câu hỏi thường gặp</h1>
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className={`faq-item ${faq.isOpen ? "open" : ""}`}
                    onClick={() => toggleFAQ(index)}
                >
                    <div className="faq-question">{faq.question}</div>
                    <div className="faq-answer">
                        {faq.isOpen && <p>{faq.answer}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Faq;
