# Dự án Shopee

## Chức năng trong dự án

- Authentication module: Quản lý bằng JWT

  - Đăng ký
  - Đăng nhập
  - Đăng xuất

- Trang danh sách sản phẩm:

  - Có phân trang
  - Sort (sắp xếp) theo từng thuộc tính sản phẩm
  - filter nâng cao theo từng thuộc tính sản phẩm
  - Tìm kiếm sản phẩm

- Trang chi tiết sản phẩm:

  - Hiển thị thông tin chi tiết
  - Ảnh hiển thị theo slider + hover zoom effect
  - Có chức năng mua hàng

- Giỏ hàng

  - Quản lý đơn hàng: Thêm, sửa, xóa sản phẩm
  - Mua hàng

- Quản lý Profile khách hàng

  - Update thông tin cá nhân
  - Upload Avatar
  - Đổi mật khẩu
  - Xem tình trạng đơn hàng

## Công nghệ sử dụng

- Build tool: Vite
- Linter : Prettier + ESLint + Editor Config
- Thư viện SPA : ReactJs
- Ngôn ngữ : Typescript
- Thư viện CSS : Tailwindcss, Floating UI
- API: Restful API, Axios
- Authentication: JWT (access token + refresh token)
- State Management: React Query và Context API
- Form Management: React Hook Form
- Router: React Router
- Hỗ trợ đa ngôn ngữ với react.i18next
- SEO : React Helmet
