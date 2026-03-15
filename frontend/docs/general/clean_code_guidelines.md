# Clean Code Guidelines for React / JavaScript

This document defines best practices for writing **clean, maintainable, and scalable React and JavaScript code**.

---

## 1. General Principles

### 1.1 Prioritize Readability

Code should be easy to read and understand.

Guidelines:

- Prefer clear code over clever tricks
- Avoid unnecessary abstractions
- Optimize for maintainability

Bad

```javascript
const r = arr.map((a) => a * 2);
```

Good

```javascript
const doubledNumbers = numbers.map((number) => number * 2);
```

---

### 1.2 Single Responsibility

Each function, component, or module should have **one responsibility**.

Bad

```javascript
function UserProfile() {
  fetchUser();
  renderUser();
  updateUser();
}
```

Better

```javascript
function UserProfile() {
  const user = useUser();
  return <UserView user={user} />;
}
```

---

### 1.3 Avoid Duplication (DRY)

Repeated logic increases bugs and maintenance costs.

Bad

```javascript
const total = price + price * 0.2;
const discountPrice = price + price * 0.2 - 10;
```

Better

```javascript
function calculateTax(price) {
  return price * TAX_RATE;
}
```

---

## 2. Naming Conventions

### 2.1 Variables

Use meaningful names.

Bad

```javascript
const x = 10;
```

Good

```javascript
const retryAttempts = 10;
```

---

### 2.2 Functions

Function names should clearly describe their behavior.

Bad

```javascript
function data() {}
```

Good

```javascript
function fetchUserData() {}
```

---

### 2.3 Booleans

Boolean names should sound like a question.

Bad

```javascript
const flag = true;
```

Good

```javascript
const isAuthenticated = true;
```

---

## 3. React Component Guidelines

### 3.1 Keep Components Small

Large components are hard to maintain.

Bad

```javascript
function Dashboard() {
  // hundreds of lines
}
```

Better

```javascript
function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardStats />
      <DashboardActivity />
    </>
  );
}
```

---

### 3.2 Prefer Functional Components

Avoid class components unless necessary.

Good

```javascript
function UserCard({ user }) {
  return <div>{user.name}</div>;
}
```

---

### 3.3 Extract Logic into reusable Hooks

---

## 4. Component Patterns

### 4.1 Use a consistent structure

Example:

```javascript
import { useState } from 'react';

export default function ExampleComponent({ title }) {
  const [count, setCount] = useState(0);

  const handleClick = () = > {
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

Order:

1. Imports
2. Constants
3. Hooks
4. Handlers
5. JSX

### 4.2 Colocate things as close as possible to where it's being used

Keep components, functions, styles, state, etc. as close as possible to where they are being used. This will not only make your codebase more readable and easier to understand but it will also improve your application performance since it will reduce redundant re-renders on state updates.

### 4.2 Avoid large components with nested rendering functions

Do not add multiple rendering functions inside your application, this gets out of control pretty quickly. What you should do instead is if there is a piece of UI that can be considered as a unit, is to extract it in a separate component.

```javascript
// this is very difficult to maintain as soon as the component starts growing
function Component() {
  function renderItems() {
    return <ul>...</ul>;
  }
  return <div>{renderItems()}</div>;
}

// extract it in a separate component
function Items() {
  return <ul>...</ul>;
}

function Component() {
  return (
    <div>
      <Items />
    </div>
  );
}
```

### 4.3 Stay consistent

Keep your code style consistent. For example, if you name your components using pascal case, do it everywhere. Most of code consistency is achieved by using linters and code formatters, so make sure you have them set up in your project.

### 4.4 Limit the number of props a component is accepting as input

If your component is accepting too many props you might consider splitting it into multiple components or use the composition technique via children or slots.

[Composition Example Code](../apps/react-vite/src/components/ui/dialog/confirmation-dialog/confirmation-dialog.tsx)

---

## 5. Avoid Deep Nesting

Bad

```javascript
if (user) {
  if (user.profile) {
    if (user.profile.name) {
      return user.profile.name;
    }
  }
}
```

Better

```javascript
return user?.profile?.name;
```

---

## 6. Error Handling

Handle errors explicitly.

Use try/catch

Bad

```javascript
try {
  await fetchData();
} catch {}
```

Good

```javascript
try {
  await fetchData();
} catch (error) {
  console.error('Failed to fetch data', error);
}
```

---

## 7. Code Review Checklist

Before merging a pull request:

- [ ] Code is readable
- [ ] Components are small
- [ ] No duplicated logic
- [ ] Proper naming conventions
- [ ] Hooks extracted when needed
- [ ] Tests added or updated
- [ ] No unused code
- [ ] No console logs

---

## 8. Refactoring Guidelines

Refactor when you see:

- Components that seem too large
- Repeated JSX
- Complex state logic
- Deep nesting
- Large props objects

Golden rule:

### Leave the code better than you found it
