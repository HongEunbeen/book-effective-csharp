## 제약 조건

형식 매개변수로 받아들이는 타입이 특정 조건을 만족해야 할 때 사용합니다.

제약 조건은 두 가지 역할을 합니다.

- 런타임 오류가 발생할 가능성이 있는 부분을 컴파일 타임 오류로 대체
- 타입 매개변수로 사용할 수 있는 타입을 명확히 규정해 사용자에게 도움

타입 매개변수의 역할을 규정할 수는 있지만, 무엇을 해서는 안되는지를 정의할 수 없습니다.

## IDisposable

타입 매개변수로 지정하는 타입이 IDisposable을 구현하고 있다면 특별한 추가 작업이 필요합니다.

```csharp
public class EngineDriverOne<T> where T : IEngine, new()
{
	public void GetThignsDone()
	{
		T driver = new T();
		using (driver as IDisposable){ driver.DoWork(); }
	}
} 
```

만약 T가 IDisposable을 구현한 타입일 경우 리로스 누수가 발생할 수 있기 때문에 T 타입을 생성할 때 IDisposable 구현하고 있는지 확인하는 작업을 진행합니다.

### [using문에서 형변환]

```csharp
using (driver as IDisposable){ driver.DoWork(); }
```

1. 컴파일러는 IDisposable로 형변환된 객체를 저장하기 위해 숨겨진 지역변수를 생성합니다.
2. T가 IDisposable을 구현하지 않았다면 지역변수의 값은 null이 됩니다.
3. C# 컴파일러는 지역변수의 값이 null인지 검사 후 Dispose()를 호출하도록 코드를 생성합니다.
4. using 블록을 종료할 떄 Dispose() 메서드가 호출됩니다.
    
    → 지역변수의 값이 null인 경우 Dispose()가 호출되지 않습니다.
    

### [타입 매개변수 타입을 이용한 인스턴스 생성]

타입 매개변수로 전달한 타입을 이용하여 인스턴스를 생성한다면

- using문을 사용
- 해당 타입이 IDisposable 구현 여부 알 수 없으므로 형변환 코드 사용

위 두 코드가 필요합니다.

### [타입 매개변수 타입을 이용한 멤버 변수 선언]

이 경우도 IDisposable을 구현했을 가능성이 있는 타입으로 멤버변수를 선언할 수 있습니다.

```csharp
public sealed class EngineDriver2<T> : IDisposable where T : IEngine, new()
{
	//생성 작업이 오래 걸릴 수 있으므로, Lazy를 이용하여 초기화했다.
	private Lazy<T> driver = new Lazy<T>(() => new T())
	public void GetThingsDone() => driver.Value,DoWork();
	
	public void Dispose()
	{
		 if(driver.IsValueCreated) { (driver.Value as IDisposable)?.Dispose(); }
	}
}
```

위 코드는 세 가지의 특징이 있습니다.

- IDisposable을 구현해 해당 리소스를 처리해야 합니다.
(sealed를 추가했다면 파생 클래스를 만든 가능성이 없기때문에 표준 Dispose 전체를 구현하지 않아도 됩니다.)
- IDisposable을 구현하는 모든 타입은 Dispose()를 여러 번 호출하는 경우에도 문제없이 동작하도록 구현해야 합니다.

### [제네릭 클래스 리팩토링]

new() 제약 조건을 제거할 수 있게 리팩토링을 하면 복잡한 설계를 피할 수 있습니다.

```csharp
public sealed class EngineDriver<T> where T : IEngine
{
	private T driver;
	public EngineDriver(T driver) { thie.driver = driver; }
	public void GetThingsDone() { driver.DoWork(); }
}
```

- Dispose의 호출 책임을 제네릭 클래스 외부로 전담시키기
- 객체의 소유권을 제네릭 클래스 외부로 옮기기

## 정리

- 제네릭 클래스의 타입 매개변수로 객체를 생성하는 경우 타입이 IDisposable을 구현하고 있는지 확인하고 방어적으로 코드를 작성해야 리소스가 누락되지 않습니다.
- 타입 배개변수로는 지역변수 정도만을 생성하도록 코드를 작성하는 것이 좋습니다.
- 타입 매개변수로 멤버 변수를 선언해야 하는 경우라면 지연 생성을 사용해야 할 수 있고, IDisposable을 구현해야 할 수 있습니다.
