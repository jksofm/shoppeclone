import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    translation: {
      'Download Application': 'Download Application',
      Facebook: 'Connect',
      'Cart Page': 'Cart Page',
      Login: 'Login',
      Register: 'Register',
      'My Account': 'My Account',
      'Purchase List': 'Purchase List',
      Logout: 'Logout',
      'All Categories': 'All Categories',
      'Áo thun': 'Shirt',
      'Đồng hồ': 'Watch',
      'Điện thoại': 'Mobile Phone',
      Filter: 'FILTER',
      'Price Range': 'Price Range',
      Apply: 'Apply',

      Review: 'Review',
      Upwards: 'upwards',
      DeleteAllFilters: 'Delete all filters',
      Sort: 'Sort',
      Popular: 'Popular',
      Latest: 'Latest',
      BestSelling: 'Best-selling',
      Price: 'Price',
      PriceMax: 'Max Price',
      PriceMin: 'Min Price',
      HaveAccountYet: 'Do you have account ?',
      AlreadyHaveAccount: 'You already have account ?',
      Rights: '© 2023 - Copyright belongs to Shopee Company Limited',
      Company: 'Shopee Company Limited',

      Region:
        'Country & Region: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil | México | Colombia | Chile',
      Location:
        'Floors 4-5-6, Capital Place Building, No. 29, Lieu Giai Street, Ngoc Khanh ward, Ba Dinh District, Hanoi, Vietnam. Hotline: 19001221 - Email: cskh@hotro.shopee.vn',
      Managerment: 'Person in charge of information management: Nguyen Duc Tri',
      BussinessCertificate: 'Business Registration Certificate No: 0106773786',
      ChangeProfile: 'Change Profile',
      ChangePassword: 'Change Pasword',
      'Tất cả': 'All',
      'Chờ xác nhận': 'Confirming',
      'Chờ lấy hàng': 'Wait for delevering',
      'Đang giao': 'Delevering',
      'Đã giao': 'Deleveried',
      'Đã hủy': 'Cancelled',
      TotalMoney: 'Order Total',
      Security: 'Profile management for account security',
      OldPassword: 'Old Password',
      NewPassword: 'New Password',
      ConfirmPassword: 'Confirm Password',
      Confirm: 'Confirm',
      Agree: 'I accept',
      Refuse: 'Refuse',
      Save: 'Save',
      MessageConfirmChangePassword: 'Are you sure to want to change your password ?',

      RecentlyAdded: 'Recently Added Products',
      MoreProductInCart: 'More products in cart',
      NoProductInCart: 'There is not any products in cart',
      WatchCartPage: 'View My Shopping Cart'
    }
  },
  vi: {
    translation: {
      'Download Application': 'Tải ứng dụng',
      Facebook: 'Kết nối',
      'Cart Page': 'Trang giỏ hàng',
      Login: 'Đăng nhập',
      Register: 'Đăng ký',
      'My Account': 'Tài khoản của tôi',
      'Purchase List': 'Đơn mua',
      Logout: 'Đăng xuất',
      'All Categories': 'Tất cả danh mục',
      'Áo thun': 'Áo thun',
      'Đồng hồ': 'Đồng hồ',
      'Điện thoại': 'Điện thoại',
      Filter: 'BỘ LỌC TÌM KIẾM',
      'Price Range': 'Khoảng giá',
      Apply: 'Áp dụng',
      Review: 'Đánh giá',
      Upwards: 'trở lên',
      DeleteAllFilters: 'Xóa tất cả',
      Sort: 'Sắp xếp theo',
      Popular: 'Phổ biến',
      Latest: 'Mới nhất',
      BestSelling: 'Bán chạy',
      Price: 'Giá',
      PriceMax: 'Giá cao nhất',
      PriceMin: 'Giá thấp nhất',
      HaveAccountYet: 'Bạn chưa có tài khoản ?',
      AlreadyHaveAccount: 'Bạn đã có tài khoản ?',
      Rights: '© 2023 Shopee. Tất cả các quyền được bảo lưu',
      Company: 'Công ty TNHH Shopee',

      Region:
        'Quốc gia & Khu vực: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil | México | Colombia | Chile',
      Location:
        'Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn',
      Managerment: 'Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)',
      BussinessCertificate:
        'Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015',
      ChangeProfile: 'Sửa hồ sơ',
      ChangePassword: 'Đổi mật khẩu',
      'Tất cả': 'Tất cả',
      'Chờ xác nhận': 'Chờ xác nhận',
      'Chờ lấy hàng': 'Chờ lấy hàng',
      'Đang giao': 'Đang giao',
      'Đã giao': 'Đã giao',
      'Đã hủy': 'Đã hủy',
      TotalMoney: 'Tổng số tiền',
      Security: 'Quản lý thông tin hồ sơ để bảo mật tài khoản',
      OldPassword: 'Mật khẩu cũ',
      NewPassword: 'Mật khẩu mới',

      ConfirmPassword: 'Nhập lại mật khẩu',
      Confirm: 'Xác nhận',
      Agree: 'Tôi đồng ý',
      Refuse: 'Từ chối',
      Save: 'Lưu',
      MessageConfirmChangePassword: 'Bạn có chắn chắn muốn đổi mật khẩu ?',
      RecentlyAdded: 'Sản phẩm mới thêm',
      MoreProductInCart: 'Còn lại giỏ hàng',
      NoProductInCart: 'Không có sản phẩm nào trong giỏ hàng',
      WatchCartPage: 'Xem giỏ hàng của tôi'
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    fallbackLng: 'vi'
  })

export default i18n
