
# 📦 TypeScript Utility Types

TypeScript cung cấp một số Utility Types hữu ích để thao tác với kiểu dữ liệu. Dưới đây là các loại phổ biến và ví dụ cụ thể:

---

## 1. `Partial<T>`
Biến tất cả các thuộc tính của kiểu `T` thành tùy chọn (`optional`).

```ts
interface User {
  name: string;
  age: number;
}

const updateUser = (user: Partial<User>) => {
  // user.name và user.age đều là optional
};

updateUser({ name: "Alice" }); // OK
```

---

## 2. `Required<T>`
Biến tất cả các thuộc tính thành bắt buộc.

```ts
interface User {
  name?: string;
  age?: number;
}

const createUser = (user: Required<User>) => {
  // user.name và user.age đều phải có
};

createUser({ name: "Bob", age: 25 }); // OK
```

---

## 3. `Readonly<T>`
Biến tất cả thuộc tính thành chỉ đọc (`readonly`).

```ts
interface User {
  name: string;
  age: number;
}

const user: Readonly<User> = {
  name: "Charlie",
  age: 30
};

// user.age = 31; // ❌ Error: Cannot assign to 'age' because it is a read-only property.
```

---

## 4. `Pick<T, K>`
Chọn một vài trường từ kiểu `T`.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
  id: 1,
  name: "Diana"
};
```

---

## 5. `Omit<T, K>`
Loại bỏ một vài trường khỏi kiểu `T`.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserWithoutEmail = Omit<User, "email">;

const user: UserWithoutEmail = {
  id: 2,
  name: "Eve"
};
```

---

## 6. `Record<K, T>`
Tạo object có key kiểu `K` và value kiểu `T`.

```ts
type Role = "admin" | "user" | "guest";

const rolePermissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};
```

---

## 7. `ReturnType<T>`
Lấy kiểu trả về của một function.

```ts
function getUser() {
  return {
    id: 1,
    name: "Frank"
  };
}

type UserReturnType = ReturnType<typeof getUser>;

// UserReturnType: { id: number; name: string }
```

---

🧠 **Ghi nhớ**: Những utility types này rất hữu ích để tái sử dụng và tái cấu trúc kiểu một cách an toàn và hiệu quả.
