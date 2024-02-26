import React from 'react';

const Blog = () => {
  return (
    <div className="blog-container">
      <h2 className="blog-heading">Bài viết mới nhất</h2>
      <div className="blog-post">
        <h3 className="post-title">Cách chọn căn hộ phù hợp cho việc cho thuê</h3>
        <p className="post-content">Khi bạn muốn cho thuê căn hộ của mình, việc chọn loại căn hộ phù hợp có thể quyết định đến khả năng thu hút khách thuê. Bài viết này sẽ hướng dẫn bạn cách chọn căn hộ phù hợp cho mục đích cho thuê.</p>
        <span className="post-date">Ngày đăng: 20 Tháng 1, 2024</span>
      </div>
      <div className="blog-post">
        <h3 className="post-title">5 Mẹo để Tăng Khả Năng Cho Thuê Nhà</h3>
        <p className="post-content">Muốn tăng khả năng cho thuê nhà của bạn? Đọc bài viết này để tìm hiểu 5 mẹo đơn giản nhưng hiệu quả để thu hút nhiều người thuê hơn.</p>
        <span className="post-date">Ngày đăng: 10 Tháng 2, 2024</span>
      </div>
    </div>
  );
};

export default Blog;
