import React from "react";
import "../styles/Blog.css";

const blogPosts = [
    {
        id: 1,
        title: "Cách chọn căn hộ phù hợp cho việc cho thuê",
        content:
            "Khi bạn muốn cho thuê căn hộ của mình, việc chọn loại căn hộ phù hợp có thể quyết định đến khả năng thu hút khách thuê. Bài viết này sẽ hướng dẫn bạn cách chọn căn hộ phù hợp cho mục đích cho thuê.",
        date: "20 Tháng 1, 2024",
    },
    {
        id: 2,
        title: "Đảm Bảo Hợp Pháp Khi Cho Thuê Timeshare: Hướng Dẫn Từ Chuyên Gia",
        content:
            "Bài viết này tập trung vào các khía cạnh pháp lý quan trọng mà chủ sở hữu timeshare cần lưu ý khi cho thuê. Từ hợp đồng cho thuê đến quy định và luật pháp liên quan, bài viết cung cấp một cái nhìn tổng quan về cách đảm bảo mọi thứ diễn ra suôn sẻ và hợp pháp.",
        date: "Ngày 19 Tháng 3, 2024",
    },

    {
        id: 3,
        title: "Bắt Đầu Với Timeshare: Từ A đến Z",
        content:
            "Bài viết giới thiệu về khái niệm timeshare, cách nó hoạt động, và lợi ích của việc sở hữu timeshare. Tiếp theo, bài viết cung cấp hướng dẫn từng bước về cách bạn có thể cho thuê timeshare của mình, từ việc định giá cho đến việc tìm kiếm khách thuê.",
        date: "Ngày 5 Tháng 3, 2024",
    },
    {
        id: 4,
        title: "Giá Thuê Timeshare: Bí Quyết Để Tối Ưu Hóa Lợi Nhuận",
        content:
            "Bài viết này cung cấp hướng dẫn về cách định giá timeshare của bạn cho thuê. Phân tích thị trường, cạnh tranh, và yếu tố mùa vụ là những khía cạnh được thảo luận để giúp bạn đặt giá thuê một cách thông minh, tối ưu hóa lợi nhuận mà vẫn giữ được sự cạnh tranh.",
        date: "Ngày 26 Tháng 3, 2024",
    },
    {
        id: 5,
        title: "Tận Dụng Đánh Giá Khách Thuê: Cải Thiện Timeshare Của Bạn",
        content:
            "Bài viết cuối cùng trong loạt bài này nhấn mạnh tầm quan trọng của việc thu thập và phân tích đánh giá từ khách thuê. Bài viết cung cấp lời khuyên về cách tận dụng phản hồi để cải thiện chất lượng và dịch vụ, từ đó tăng cường sự hài lòng của khách thuê và khả năng cho thuê trong tương lai.",
        date: "Ngày 2 Tháng 3, 2024",
    },
];

const Blog = () => {
    return (
        <div className="blog-container">
            <h2 className="blog-heading">Bài viết mới nhất</h2>
            {blogPosts.map((post) => (
                <div key={post.id} className="blog-post">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-content">{post.content}</p>
                    <span className="post-date">{post.date}</span>
                </div>
            ))}
        </div>
    );
};

export default Blog;
