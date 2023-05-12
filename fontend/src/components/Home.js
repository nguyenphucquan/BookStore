import React from 'react';
import Header from './Header';

const Home = () => {
  const isLoggedIn = false; // Thay đổi giá trị này tùy theo trạng thái đăng nhập của người dùng

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      {/* Nội dung khác của trang Home */}
    </div>
  );
};

export default Home;
