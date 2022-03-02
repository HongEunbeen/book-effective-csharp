## 컬렉션

컬렉션을 사용하는 이유

- 특정 타입의 집합을 다뤄야 할 떄
- 컬렉션이 제공하는 고유의 기능을 활용할 때

제네릭 컬렉션을 사용합니다.

기존에 사용 중인 컬렉션 타입에 영향을 주지 않으면서 새로운 기능을 추가하고 싶다면,

구체화된 컬렉션 타입에 대해 확장 메서드를 작성하면 됩니다.

### [System.Linq.Enumberable]

`Enumerable`에는 `IEnumerable<T>` 타입을 특정 타입으로 구체화했을 때만 사용할 수 있는 메서드들이 많습니다.

- `IEnumerable<int>`, `IEnumerable<double>` 등

 → 타입 매개변수로 특정 숫자 타입이 전달되었을 경우에만 사용되는 특화 메서드가 있습니다.

```csharp
public static class Enumerable
{
	public static int Average(this IEnumerable<int> sequence); //확장 메서드
	public static int Max(this IEnumerable<int> sequence);
	public static int Min(this IEnumerable<int> sequence);
}
```

이 패턴은 타입 매개변수로 특정 타입이 주어졌을 때, 

해당 타입에 대해 가장 효과적으로 동작하도록 코드를 분리해 구현하는 방법입니다.

### [예제]

```csharp
public static void SendEmailCoupons(this IEnumerable<Customer> costomers, Coupon sepecialPOffer)
public static void IEnumerable<Customer> LostProspects(this IEnumerable<Customer> targetList)
```

만약, 위와 같이 확장 메서드를 사용하지 않고 구체화된 제네릭 타입을 상속해 새로운 타입을 만들어 한다면

```csharp
public class CustomerList : List<Customer>
{
	public void SendEmailCoupons(Coupon specialOffer);
	public static IEnumerable<Customer> LostProspects();
}
```

- `IEnumerable<Customer>`에 대하여 확장 메서드를 구현한 것에 비해서 제약이 많아집니다.
- 메서드 원형이 달라집니다.
    - 확장 메서드 : `IEnumerable<Customer>` 기반
    - 파생 클래스에 메서드 추가 : `List<Customer>` 기반
    
    → 파생 클래스에서는 이터레이터 메서드들을 사용할 수 없습니다.
    

### [예제 2]

```csharp
public static void IEnumerable<Customer> LostProspects(this IEnumerable<Customer> targetList){
	IEnumerable<Customer> answer = from c in targetList
																 where DateTime.Noew - c.LastOrderDate > TimeSpan.FromDays(30)
																 select c;
	
	return answer;
}
```

확장 메서드로 구현하면 람다 표현식을 이용해 재사용 가능한 쿼리를 작성할 수 있습니다.

## 정리

- 저장소 모델을 확정 짓기 위해 구체화된 제네릭 타입의 컬렉션은 구체화된 제네릭 타입을 살펴보고 논리적으로 어떤 메서드가 추가돼야 하는지 재검토해야 합니다.
- 구체화된 제네릭 타입을 상속해 메서드를 추가하기보다는 확장 메서드를 구현하는 편이 좋습니다.
