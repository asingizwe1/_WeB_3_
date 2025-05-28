
# === Real World Examples ===

# 1. Method Overriding in a University System

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display_info(self):
        print(f"Name: {self.name}, Age: {self.age}")

class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id

    def display_info(self):
        super().display_info()
        print(f"Student ID: {self.student_id}")

class Lecturer(Person):
    def __init__(self, name, age, subject):
        super().__init__(name, age)
        self.subject = subject

    def display_info(self):
        super().display_info()
        print(f"Subject: {self.subject}")

print("=== Method Overriding Example ===")
s = Student("Alice", 20, "S001")
s.display_info()

l = Lecturer("Dr. Bob", 45, "Mathematics")
l.display_info()


# 2. Method Overloading (simulated using default arguments)

class Calculator:
    def add(self, a, b=0, c=0):
        return a + b + c

calc = Calculator()
print("\n=== Method Overloading Example ===")
print(calc.add(5))       # 5
print(calc.add(5, 10))   # 15
print(calc.add(5, 10, 20)) # 35


# 3. Method Resolution Order (MRO)

class A:
    def greet(self):
        print("Hello from A")

class B(A):
    def greet(self):
        print("Hello from B")

class C(A):
    def greet(self):
        print("Hello from C")

class D(B, C):
    pass

print("\n=== MRO Example ===")
d = D()
d.greet()  # Output will follow MRO
print(D.__mro__)  # Print the method resolution order
