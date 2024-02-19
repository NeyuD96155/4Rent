import React from "react";
// Khai báo một component tên là AmenitiesList. Component này nhận vào props là amenities.
const AmenitiesList = ({ amenities }) => {
    return (
        <ul>
            {/* Sử dụng phương thức map để duyệt qua mảng amenities. Mỗi phần tử trong mảng sẽ được hiển thị dưới dạng một thẻ <li> */}
            {amenities.map((amenity, index) => (
                //   Thẻ <li> sử dụng index làm key và hiển thị giá trị của amenity
                <li key={index}>{amenity}</li>
            ))}
        </ul>
    );
};

export default AmenitiesList;
