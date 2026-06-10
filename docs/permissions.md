# Phân Quyền (Permissions)

Hệ thống phân quyền sử dụng custom auth (JWT + session cookie).

## Roles & Permissions

```text
admin    — Toàn quyền (bao gồm cả manager)
manager  — Xem/sửa mọi ticket, quản lý trạng thái active của khách hàng
user     — Mặc định, chỉ sửa được ticket được gán
```

DB schema: `permissions` → `user_permissions` (many-to-many) → `users`

## Các file chính

| File | Vai trò |
|---|---|
| `src/lib/auth.ts` | Server functions: `getCurrentUser()`, `getUserPermissions()`, `hasPermission()` |
| `src/lib/auth-helpers.ts` | `requireAuth()`, `requirePermission()` helpers |
| `src/app/(auth)/actions.ts` | Server actions: login, register, logout |
| `src/lib/queries/getUsers.ts` | Lấy danh sách user (id, email, name) cho dropdown tech |

## Luồng kiểm tra quyền

### Customer Form (`customers/form/`)

1. **Server Component** (`page.tsx`):
   - Gọi `getCurrentUser()` + `getUserPermissions()`
   - Xác định `isManager = permissions.includes("manager") || permissions.includes("admin")`
   - Truyền `isManager` xuống `CustomerForm`

2. **Client Component** (`customer-form.tsx`):
   - Checkbox **"Hoạt động"** chỉ hiển thị khi `isManager && customer?.id` (đang sửa KH hiện có)
   - Khi tạo mới KH: checkbox ẩn (mặc định active = true)

### Ticket Form (`tickets/form/`)

1. **Server Component** (`page.tsx`):
   - Gọi `getCurrentUser()` + `getUserPermissions()`
   - **Manager/Admin**: `isEditable = true`, fetch all users → `techs` array cho dropdown, truyền xuống form
   - **Employee**: so sánh `user.email.toLowerCase()` với `ticket.tech.toLowerCase()` → `isEditable`
   - Truyền `isEditable`, `techs` (nếu manager) xuống `TicketForm`

2. **Client Component** (`ticket-form.tsx`):
   - Phát hiện `isManager = Array.isArray(techs)`
   - Manager: `<SelectWithLabel>` chọn tech từ danh sách user
   - Employee: `<InputWithLabel disabled>` hiển thị tech email
   - `disabled={!isEditable}` trên các trường title, description, completed
   - Ẩn nút Save/Reset nếu `!isEditable`
   - Tiêu đề tự động: "Chỉnh sửa phiếu #X", "Xem phiếu #X", hoặc "Tạo phiếu sửa chữa mới"

## Disabled Styling

Input/Textarea/Select khi bị disabled:
- Light mode: `text-blue-500`
- Dark mode: `text-yellow-300`
- `opacity-75`

## Seed Data

Script `scripts/seed.ts` tạo 3 permissions mặc định:
- `admin` — Gán cho user `admin@repairshop.com`
- `manager`
- `user` — Gán tự động khi đăng ký tài khoản mới

Tài khoản mặc định: `admin@repairshop.com` / `admin123`
