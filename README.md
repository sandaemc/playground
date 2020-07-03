# SharpDomain

A collection of reusable classes for Domain-Driven Design

### Installation

`dotnet add package SharpDomain`

### Usage

```
class MyUser : Entity { } 

interface IMyUserRepository : IRepository<MyUser> { }

class IsAdultSpecification : ISpecification<MyUser> {}
```
