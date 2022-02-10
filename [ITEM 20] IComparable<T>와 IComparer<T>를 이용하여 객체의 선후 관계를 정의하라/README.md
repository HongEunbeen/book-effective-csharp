## IComparable<T>, IComparar<T>

객체의 선후 관계를 정의하기 위해서 제공하는 인터페이스입니다.

- IComparable : 타입의 기본적인 선후 관계를 정의
- IComparar : 기본적인 선후 관계 이외의 추가적인 선후 관계 정의
    - 타입 내 관계 연산자를 재정의해 해당 타입에 최적화된 방식으로 객체의 선후 관계 판단

## IComparable<T>

### [ComparareTo()]

IComparable에 정의되어 있는 유일한 메서드로 현재 객체가 대상 객체보다 작으면 음수를, 같으면 0, 크면 양수를 반환합니다.

### [IComparable]

오래된 API들이 여전히 IComparable를 사용하기 때문에 IComparable<T>를 구현할 떄는 IComparable도 같이 구현해 주어야 합니다.

### [타입 매개변수를 취하지 않는 IComparable의 단점]

- 인터페이스를 구현하려면 타입을 런타임에 확인해야하기에 CompareTo()에 전달되는 객체를 확인 불가
- 비교를 위해선 박싱/언박싱이 매 호출시 수행(System.Object의 타입의 매개변수를 취하기 때문에_

### [IComparable의 사용 이유]

- .NET Framework 2.0 이전에 개발된 코드에서 사용하기 위해서
- 일부 Base Class Library가 하위 호환성을 요구하기 때문에

### [IComparable 사용 방법]

```csharp
Customer c1;
Employee e1;
//if(c1.CompareTo(e1) > 0 ) // Customer.CompareTo() X 컴파일 불가
if((IComparable)c1).CompareTo(e1) > 0)	// IComparable.CompareTo() O 컴파일 가능
	Console.WriteLine("Customer one is greater");
```

IComparable 에 정의된 CompareTo는 IComparable .CompareTo와 같이 명시적인 방법으로 인터페이스 메서드를 구현해씃ㅂ니다. 

즉, IComparable 타입의 참조를 통해서만 메서드를 호출 할 수 있습니다.

### [IComparable 구현 방법]

반드시 명시적으로 인터페이스를 구현하고 추가적으로 강력한 타입의 public 오버로드 메서드도 함께 구현해야 합니다.

```csharp
public struct Customer : IComparable<Customer>, IComparable
{
	private readonly string name;
	public Customer(string name) { this.name = name; }

	//IComparable<Customer>
	public int CompareTo(Customer other) => name.CompareTo(other.name);

	//IComparable
	int IComparable.CompareTo(object obj) { return this.CompareTo((Customer)obj));
}

```

강력한 타입의 오버로드 메서드 사용

- 더 빠르게 비교 연산 수행 가능
- CompareTo 메서드의 오용 가능성 줄임

## 정리

- 선후 관계의 비교와 동일성의 비교는 별개의 작업입니다.
    - 참조 타입의 선후 관계는 객체의 내용을 기반으로 하지만 동일성 비교는 두 객체의 참조만을 비교합니다.
- IComparable과 IComparer는 타입에 선후 관계를 제공하기 위한 표준 메커니즘입니다.
- 기본적인 선후 관계는 IComparable을 통해 구현해야 하지만 별도로 IComparer를 이용하면 추가적인 선후 관계를 정의할 수 있습니다.
