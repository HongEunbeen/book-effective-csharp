## 제네릭 메서드의 오버로드

컴파일러는 제네릭 메서드의 타입 매개변수가 다른 타입으로 변경될 수 있음을 고려해 오버로드된 메서드 중 하나를 선택합니다.

오버로드된 메서드가 여러 개인 경우, 컴파일러가 이 중 하나를 어떻게 선택하는지 정확히 알고 있어야 합니다.

## 제네릭 메서드가 메서드 확인 규칙에 끼치는 영향

제네릭 메서드가 정의되어 있는 경우 필요한 메서드의 원형에 정확하게 부합하도록 닫힌 메서드가 생성됩니다.

```csharp
public class MyBase {}
public interface IMessage{ void WriteMessage(); }
public class MyDerived : MyBase, IMessage
{
	void IMessage.WriteMessage() => WriteLine("A");
}

public class AnotherType : IMessage
{
	void IMessage.WriteMessage() => WriteLine("B");
}

class Program
{
	static void WriteMessage(MyBase b) { WriteLine("C"); }
	static void WriteMessage<T>(T b) { WriteLine("D"); }
	static void WriteMessage(IMessage b) { WriteLine("E"); b.WriteMessage(); }
}
```

### [요청한 메서드와 정확히 일치하는 메서드]

```csharp
MyDerived d = new MyDerived();
WriteMessage(d);
```

- 출력값 : `D`
    - `WriteMessage(MyBase b)` 타입이 아닌 `WriteMessage<T>(T b)`가 호출

제네릭 메서드의 타입 매개변수인 T를 MyDerived로 대체하면 컴파일러 입장에서는 요청한 메서드와 정확히 일치하는 메서드를 찾을 수 있습니다.

반면 `WriteMessage(MyBase b)`  는 암시적 형변환이 필요하기 때문에 컴파일러는 제네릭 메서드를 호출하도록 코드를 생성합니다.

### [명시적 형변환을 한 메서드]

```csharp
MyDrived d = new MyDerived();
WriteMessage((IMessage) d);
```

- 출력값 : `E A`
    - `WriteMessage(IMessage b)` `IMessage.WriteMessage()` 두 메서드 실행

### [상속관계는 없지만 특정 인터페이스를 구현하고 있는 타입의 메서드]

```csharp
AnotherType anObject = new AnotherType();
WriteMessage((IMessage)anObject);
```

- 출력값 : `E B`
    - `static void WriteMessage(IMessage b)` `void IMessage.WriteMessage()`두 메서드 실행
    

## 인터페이스에 제네릭

인터페이스에 대해 제네릭을 특화하게 되면 오류가 발생할 가능성이 높습니다.

제네릭을 이용하는 이유는 런타임에 타입 확인을 수행하지 않기 위함이지만 검사할 조건이 몇 개밖에 없는 경우라면 괜찮습니다.

주의는 해야하지만 사용자에게 종작 방식을 숨길 수 있기 때문입니다.

### [예외적인 숫자 타입]

정수 타입과 실수 타입 사이에는 상속관계가 없기때문에 타입 매개변수로 지정할 수 있는 타입별로 각기 특화된 코드를 작성하는 편이 좋습니다.

## 정리

- 제네릭 메서드의 타입 매개변수로 특정 타입이 주어질 경우 해당 메서드의 특화를 수행하기로 결정했다면, 이 타입을 상속한 모든 파생 타입에 대해서도 특화를 수행해야 합니다.
- 인터페이스에 대해 특화를 수행하기로 결정했다면 인터페이스를 구현하고 있는 모든 타입에 대해서도 특화를 수행해야 합니다.
- 부모 클래스와 자식 클래스에 대해 모두 수행 가능하도록 하기 위해 부모 클래스를 이용해 특화하려는 시도는 바람직하지 않습니다.
