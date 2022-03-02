## 제네릭 타입의 호환성

만약, 제네릭 타입이 아닌 방식도 지원하겠다고 결정했다면

1. 클래스와 인터페이스
2. public 속성
3. serialize 대상이 되는 요소

→ 세 가지 요소에 대해 논제네릭 방식을 지원해야 합니다.

### [논제네릭 방식 지원해야 하는 이유]

서로 다른 타입 간에 동일성을 비교하는 기능에서는 제네릭으로 구현하기 어렵습니다. 

또한, 단일의 컬렉션 내에 서로 다른 타입의 객체를 저장할 수 있어야 한다면 제네릭은 도움이 되지 않습니다.

```csharp
public static bool CheckEquality(object left, object right)
{
	if (left == null) return right == null;
	return left.Equals(right);
}
```

→ 제네릭을 사용하는 대신 `System.object` 를 이용해 비교하는 메서드를 구현했습니다.

```csharp
public static bool CheckEquality(object left, object right) where T : IEquatable<T>
{
	if (left == null) return right == null;
	return left.Equals(right);
}
```

→ 이렇게 된다면 `IEqualtable<T>.Equals()`는 `T` 타입을 매개변수로 취합니다.

- `System.Ojbect.Equals()`는 `Object` 타입을 취함
- `IEqualtable<T>.Equals()`는 `T` 타입 취함

결국 기존에 정의된 public 메서드를 이처럼 재정의하는 이유는 새롭게 개발 중인 타입이 1.x 버전의 .NET 과도 잘 동작하도록 하기 위함입니다.

## 논제네릭 인터페이스

논제네릭 인터페이스를 추가하는 작업은 적절한 원형의 메서드를 추가하는 수준에서 간단히 해결됩니다.

- 논제네릭 `IComparable` 인터페이스 구현 → 제네릭 버전의 구현체를 활용해 구현

→ 이러한 기능 이용시 인터페이스 내에 정의된 메서드의 원형 손쉽게 추가 가능합니다.

## 정리

- 제네릭이 포함되기 전 개발된 코드와 새로 작성하는 코드가 함께 사용돼야 한다면 반드시 논제네릭 인터페이스를 구현해야 합니다.
- 논제네릭 인터페이스를 구현할 때는 반드시 명시적인 방법으로 구현하는 것이 좋습니다. (실수 방지 위해)
