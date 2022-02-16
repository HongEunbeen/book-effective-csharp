## 델리게이트

임의의 정적 메서드를 반드시 구현해야 한다거나, 매개변수를 취하는 여타의 생성자를 반드시 구현하도록 제약 조건을 설정할 수는 없습니다.

하지만, 제약 조건으로 설정하고 싶은 메서드의 원형에 부합하는 델리게이트를 작성하면 제약 조건을 설정할 수 있습니다.

즉, 타입 매개변수에 대해 특정 인터페이스를 기반을 제약 조건을 설정할 필요가 없습니다.

## 제네릭 메서드 제약조건

### [예제1 - Func 델리게이트]

```csharp
public static class Example
{
	public static T Add<T>(T left, T right, Func<T, T, T> AddFunc ) => 
		AddFunc(left, right);
}
```

제약 조건을 설정하기 위해서 인터페이스를 사용하는 것이 쉽지 않다면 델리게이트를 이용하는 방법입니다.

1. 적절한 메서드의 원형을 고안하고 델리게이트 타입으로 정의합니다.
    
    ```csharp
    System.Func<T1, T2, TOutput>
    ```
    
2. 델리게이트의 인스턴스를 제네릭 메서드의 매개변수로 추가합니다.
    
    ```csharp
    public static T Add<T>(T left, T right, Func<T, T, T> AddFunc ) =>  AddFunc(left, right);
    ```
    
3. 해당 클래스의 사용자는 람다 표현식을 인자로 전달합니다.
    
    ```csharp
    int a = 6, b = 7;
    int sum = Example.Add(a, b, (x, y) => x + y);
    ```
    

### [C# 컴파일러 추론 방법]

1. 람다 표현식으로부터 매개변수의 타입과 반환 타입 모두 추론합니다.
    
    (예제의 경우 C# 컴파일러는 내부적으로 두 정숫값의 합이 반환하는 private 정적 메서드 생성)
    
2. private 정적 메서드를 생성하고 이름은 컴파일러에 의해 명명됩니다.
3. 컴파일러는  델리게이트 타입의 객체를 만들어 컴파일러가 생성한 메서드를 가리키도록 합니다.
    
    (예제의 경우 Func<T, T, T> 델리게이트 타입의 객체 생성)
    

### [예제2 -  Zip 델리게이트 이용]

시퀀스에 대해 수행할 알고리즘을 정의할 때도 델리게이트를 이용하는 것이 도움이 됩니다

```csharp
public static IEnumerable<TOutput> Zip<T1, T2, TOutput>(
	IEnumerable<T1> left, IEnumerable<T2> right,
	Func<T1, T2, TOutput generator)
```

Zip 메서드는 2개의 입력 시퀀스를 인자로 받아 이를 결합한 한쌍을 만듭니다.

1. 컴파일러는 내부적으로 람다 표현식의 내용을 담은 private 정적 메서드를 생성합니다.
2. 이 메서드에 대한 참조를 포함하는 델리게이트 객체를 생성합니다.
3. 델리게이트 객체를 생성한 후 Zip 메서드에 인자로 전달합니다.
4. 새로운 객체를 생성하기 위해 generator 델리게이트를 호출합니다.
5. generator 델리게이트는 2개의 입력값을 받아 새로운 반환 객체를 만드는 메서드를 참조하기 위해 사용됩니다.

```csharp
double[] xValues = {0,1,2,3,4,5,6,7,8,9};
double[] yValues = {0,1,2,3,4,5,6,7,8,9};

List<Point> vlaues = new List<Point>(Utilties.Zip(xValues, yValues, (x, y) =>  new Point(x, y));
```

## 제네릭 클래스의 제약조건 : 특정 메서드 설정

제네릭 타입 내의 여러 메서드가 동일한 델리게이트를 필요로 하는 경우 사용할 수 있습니다.

1. 제네릭 클래스의 타입 매개변수 중 하나를 델리게이트 타입으로 선언합니다.
2. 클래스의 인스턴스를 생성할 떄 델리게이트를 전달합니다.
3. 제네릭 클래스 내에서는 전달받은 델리게이트를 타입의 멤버로 저장해두고 재사용합니다.

### 예제1 - 델리게이트 캐싱

```csharp
public class InputCollection<T> {
	private List<T> thiesRead = new List<T>();
	private readonly CreateFromStream<T> readFunc;

	public InputCollection(CreateFromStream<T> readFnuc) { this.readFnuc = readFunc; }
	public void ReadFromStream(TextReader reader) => thiesRead.Add(readFunc(reader));
	public IEnumerable<T> Values => thingsRead;;
}
```

제네릭 타입에 매개변수를 갖는 생성자를 제약 조건으로 설정할 수 없기때문에 이 작업을 다른 메서드에 위임하도록 합니다.

```csharp
var readValues = new InputCollection<Point>( (inputStream) => new Point(inputStream) );
```

InputCollection 객체를 생성할 떄 델리게이트를 전달합니다.

## class나 인터페이스로 제약조건 설정

설계의 특성을 드러내는 가장 좋은 방법입니다.

- 공통적으로 사용됩니다.
- 다양한 알고리즘에서 활용할 수 있습니다.
- 인터페이스를 구현한 타입이 어떤 기능을 제공하느지가 명확하게 드러납니다.
    
    (선후 관계, 동일성 등)
    

## 정리

- 델리게이트를 이용하여 메서드에 대한 제약 조건을 설정하는 것이 훨씬 쉽습니다.
    
    → 제네릭 클래스나 제네릭 메서드 하나를 사용하기 위해 제약 조건으로 설정된 인터페이스를 구현한 타입을 매번 새롭게 만들어야 한느 경우라면,,
    
- 델리게이트를 이용하면 제네릭 타입을 더 쉽게 작성할 수 있습니다.
- 제네릭 인터페이스를 정의하고, 구현한 헬퍼 타입을 만드는 것도 괜찮습니다.
    
    → 특정 연산자, 정적 메섣, 델리게이트 등을 제약 조건으로 설정하기 위해서는,,,
