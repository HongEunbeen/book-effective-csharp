## 확장 메서드

확장 메서드를 이용하면 인터페이스에 새로운 동작을 추가할 수 있습니다.

### [System.Linq.Enumerable]

`IEnumerable<T>` 에 정의된 50개 이상의 확장 메서드가 정의되어 있습니다.

확장 메서드를 정의하면 이점이 있습니다.

- 이미 `IEnumerable<T>`를 구현하고 있는 클래스를 수정할 필요 없음
- 별도의 구현 없이도 추가된 학장 메서드를 이용해 컬렉션에 대해 다양한 쿼리 연산을 수행할 수 있음

새로운 타입을 작성해야 한다고 생각이 든다면 확장 기법을 적용할 수 있을지 검토해야 합니다.

### [새로운 인터페이스 작성]

다양한 기능을 제공하도록 인터페이스를 정의하지 말고 필요한 기능만을 포함하도록 간단히 인터페이스를 작성해야 합니다.

사용자 편의를 위한 다양한 기능은 확장 메서드를 이용하면 효율적입니다.

### [인터페이스 내 정의된 메서드]

인터페이스와 확장 메서드를 같이 사용하는 경우, 인터페이스 내에 정의된 메서드의 기본 구현체를 확장 메서드를 통해 제공할 수도 있습니다.

→ 인터페이스를 구현해야 하는 책임이 있는 클래스에게 기초적인 구현 내용을 제공할 수 있음

```csharp
public interface IFoo
{ 
	int Market {get;set;}
}

public static class FooExtensions 
{ 
	public static void NextMarket(this IFoo Thing) => this.Market += 1; 
}

public class MyType : IFoo
{
	public int Market {get; set;}
}

MyType t = new MyType();
t.NextMarket();
```

만약, 기존 멤버를 이용해 새로운 메서드를 구현 가능하다면 확장 메서드로 구현하면 좋습니다.

### [주의점 - 확장 메서드의 원형과 내부 메서드의 원형]

```csharp
public interface IFoo
{ 
	int Market {get;set;}
}

public static class FooExtensions 
{ 
	public static void NextMarket(this IFoo Thing) => this.Market += 1; 
}

public class MyType : IFoo
{
	public int Market {get; set;}
	public void NextMarket() => Market += 1; //-> 이렇게 확장 메서드로 구현한 메서드와 동일한 원형일 경우 의미적으로 완전히 동일한 작업 수행
}

MyType t = new MyType();
t.NextMarket();
```

클래스 내에 구현한 메서드와 확장 메서드로 구현한 메서드가 동일한 원형일 경우 의미적으로 완전히 동일한 작업을 수행하도록 작성해야 합니다.

컴파일러는 동일한 원형의 메서드가 있는 경우 확장 메서드보다 클래스 내에 구현된 메서드를 우선적으로 호출합니다.

→ 따라서, 더욱 효율적인 알고리즘으로 구현한 코드가 클래스 내부에 배치되는 것이 좋습니다.

## 정리

- 인터페이스 내에 정의하는 멤버의 수를 최소한으로 하기 위해 노력해야 합니다.
- 사용자 편의를 위한 추가 메서드는 확장 메서드의 형태로 구현하는 것이 좋습니다.
