## 정적 멤버 초기화 구문 & 정적 생성자

정적 멤버 변수를 포함하는 타입이 있다면 인스턴스 생성 전 정적 멤버 변수를 초기화해야 합니다.

### [정적 생성자]

타입 내에 정의된 모든 메서드, 변수, 속성에 최초로 접근하기 전 자동으로 호출되는 메서드입니다.

### [정적 생성자 vs 초기화 구문]

정적 변수를 초기화하거나 싱글톤 패턴을 적용할때 효과적으로 수행 가능합니다.

하지만 정적 멤버를 간단히 초기화 하는 경우라면 멤버 초기화 구문을 사용해도 좋습니다.

```csharp
//멤버 초기화 구문 사용
public class MySingleton
{
	private static readonly MySingleton theOneAndOnly = new MySingleton();

	public static MySingleton TheOnly { get{ return theOneAndOnly;} }
	private MySingleton() {}
}
```

인스턴스 생성자를 `private`으로 선언하고 멤버 초기화 구문을 사용한 부분을 정적 생성자로 변경할 수 있습니다.

```csharp
//생적 생성자 구문 사용
public class MySingleton
{
	private static readonly MySingleton theOneAndOnly;
	static MySingleton() { theOneAndOnly = new MySingleton(); }

	public static MySingleton TheOnly { get{ return theOneAndOnly;} }	
	private MySingleton() {}
}
```

### [멤버 초기화 구문 대신 만드시 정적 생성자 사용]

예외가 발생할 가능성이 있는 경우 멤버 초기화 구문은 예외를 잡아 낼 수 없으므로 정적 생성자를 사용해야 합니다.

```csharp
static MySingleton()
{
	try
	{ theOneAndOnly = new MySingleton();}
	catch {}
}
```

### [정적 생성자 주의점]

정적 생성자는 CLR에 의해 호출됩니다. 정적 생성자에서 예외가 발생한다면 CLR은 `TypeInitializationException`을 던지고 프로그램을 종료해 버리기 때문에 주의해야 합니다.

## 정리

- 정적 멤버 초기화 구문과 정적 생성자는 클래스의 정적 멤버를 초기화하는 깔끔하고 명확한 방법을 제공합니다.
