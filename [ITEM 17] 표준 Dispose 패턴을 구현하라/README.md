## Dispose 패턴

.NET Freamwork 내부에서 비관리 리소스를 정리하는 표준화된 패턴입니다.

타입을 작성할 때 이 패턴을 이용하면 개발자들이 IDisposable 인터페이스를 통해 리소스를 삭제할 수 있다는 기능을 안정적으로 제공할 수 있습니다.

표준 Dispose 패턴은 GC와 연계되어 동작하며 불가피한 경우에만 finalizer를 호출해 성능을 향상 시켰습니다.

### [부모 클래스 수행]

상속 최상위 부모 클래스는 작업을 수행해야 합니다.

- 리소스를 정리하기 위해 IDisposable 인터페이스를 구현해야 합니다.
- 멤버 필드로 비관리 리소스를 포함하는 경우 방어적으로 동작할 수 있도록 finalizer를 추가해야 합니다.
- 실제 리소스 정리 작업을 수행하는 다른 가상 메서드에 작업을 위임하도록 작성돼야 합니다.

### [자식 클래스]

자식 클래스는 작업을 수행해야 합니다.

- 파생 클래스가 고유의 리소스 정리 작업을 수행해야 한다면 부모 클래스에서 정의한 가상 메서드를 오버라이딩 합니다.
- 멤버 필드로 비관리 리소스를 포함하는 경우에만 finalizer를 추가해야 합니다.
- 부모 클래스에서 정의하고 있는 가상 함수를 반드시 재호출해야 합니다.

## finalizer

비관리 리소스를 포함하는 클래스는 반드시 finalizer를 구현해야 합니다.

finalizer도 없고 Dispose()를 호출하는 것 조차 없으면 리소스 누수가 발생하기 합니다.

이때, 어떤 경우에도 비관리 리소스가 누수되지 않고 올바르게 정리된 것임을 보장하는 유일한 방법이 finalizer를 구현하는 것입니다.

### [finalizer 수행 방법]

GC 작업이 수행되면 finalizer가 없는 가비지 객체는 즉각 메모리에서 제거됩니다.

하지만 GC는 finalizer를 가진 객체를 특별하게 처리합니다.

1. 메모리에 남게 된 finalizer를 가진 객체의 참조를 finalizer 큐에 삽입합니다.
2. finalizer 스레드를 이용해 finalizer 큐에 포함된 객체들의 finalizer를 순차적으로 호출합니다.
3. 호출된  finalizer를 가진 객체는 더 이상 호출할 필요가 없음을 나타내는 플래그를 설정합니다.
4. 플래그가 설정된 객체들은 메모리로부터 제거될 수 있는 대상이 됩니다.

이때, 1번 작업으로 인해 처음 GC 작업 세대에 수집되지 않고 한 세대가 높아지면 제거될 기회를 얻게 됩니다.

이러한 비용 문제를 해결 할 수 있는 방법이 있습니다.

- IDisposable
- 상속관계에서의 정리
- finalize와 Dispose()의 중복된 코드 제거

### [IDisposable]

IDisposable을 구현하는 것은 사용자와 .NET 런타임에게 리소스를 정리할 수 있는 방법이 있다는 것을 알려주는 표준화된 방법입니다.

```csharp
public interface IDisposable
{
	void Dispose();
	//IDisposable 인터페이스는 하나의 메서드만 가집니다.
}
```

IDisposable.Dispose() 메서드는 네 가지 작업을 반드시 수행해야 합니다.

1. 모든 비관리 리소스를 정리한다.
2. 모든 관리 리소스를 정리한다.
3. 객체가 이미 정리되었음을 나타내기 위한 상태 플래그 설정, 앞서 이미 정리된 객체에 대해 추가로 정리 작업이 요청될 경우 이 플로그를 확인하여 ObjectDisposed 예외를 발생시킨다.
4. finalizer 호출 회피 (이를 위해 GC.SuppressFinalize(this)를 호출한다.)

IDisposable을 이용하면 finalize 과정으로 인한 비용을 피할 수 있습니다.

### [상속관계에서의 정리]

자식 클래스에서 부모 클래스의 리소스를 정리하기 위해서 자식 클래스가 finalizer나 자신만의 IDisposable을 구현할 때 반드시 부모 클래스에서 구현한 함수를 호출하도록 코드를 작성해야 합니다.

부모 클래스와 자식 클래스가 각자 자신의 dispose 여부를 나타내기 위해 고유의 플래그를 가졌습니다. 

즉, 방어적으로 코드를 작성하기 위해 플래그를 이중으로 배치했습니다.

### [finalize와 Dispose()의 중복된 코드 제거]

finalize와 Dispose()는 일반적으로 동일한 역할을 수행하므로 중복된 코드가 존재합니다.

```csharp
protected virtual void Dispose(bool isDisposing);
```

표준 Dispose 패턴에서 정의하고 있는 메서드로 가상 헬퍼 함수입니다. 또한, 리소스 정리를 위한 공통 작업을 수행하고 자식 클래스에서 리소스를 정리할 기회를 줍니다.

이 가상 함수를 구현하면 finalizer와 Dispose 양쪽에서 사용이 가능합니다.

이때, 코드의 마지막 부분에서는 부모 클래스에서 정의하고 있는 Dispose(bool)함수를 호출해야 합니다.

## 방어적인 작성

Dispose와 finalizer는 방어적으로 작성되어야 합니다.

### [Dispose]

Dispose는 한 번 이상 호출될 수 있으므로 여러 번 호출하더라도 반드시 동일하게 동작하도록 구현해야 합니다.

하지만 이미 정리된 객체의 필드에는 접근하지 않아야 합니다. 이미 dispose된 객체에 대해서도 finalizer가 호출될 수 있기 때문입니다.

### [finalize]

호출 여부와 상관없이 finalizer가 존재하는 것만으로도 상당한 성능상의 손해를 감수해야 하기 때문에 필요 없는 경우라면 추가해서는 안됩니다.

부모 클래스가 비관리 리소스를 포함하지 않는데 자식 클래스가 비관리 리소스를 포함하고 있다면 Dispose 패턴의 구현부를 그대로 유지하는 것이 좋습니다.

## Dispose 내에서는 리소스 정리 작업만

Dispose나 finalizer에서 다른 작업을 수행하게 되면 객체의 생명주기와 관련된 심각한 문제를 일으킬 수 있습니다.

특히, finalizer를 가진 객체는 최종적으로 정리가 완료되기 전 코드를 다시한 번 수행하는데 이 순간에도 비관리 리소스를 삭제하는 작업 외에는 다른 작업을 해서는 안됩니다.

```csharp
public class BadClass
{
	private static readonly List<BadClass> finalizedList = new List<BadClass>();
	private string msg;
	
	public BadClass(string msg) { msg = (string) msg.Clone(); }
	~BadClass() { finalizedList.Add(this); }
	// finalizeer를 실행할 때 전역 목록에 자신을 추가하기에 객체는 다시 살아납니다.
```

객체가 다시 살아나면 문제가 발생합니다.

- GC는 객체에 대해 이미 finalizer를 호출했으므로 더 이상 finalizer를 호출할 필요 없다고 간주
- 객체에 포함된 필드들은 사용 불가

이러한 문제들로 finalizer와 2개의 Dispose 메서드 내에서는 리소스 저일 외에는 다른 작업을 해서는 안됩니다.

## 정리

- 반드시 비관리 리소스를 포함하는 경우에만 finalizer를 구현해야 합니다.
- IDisposeable 인터페이스만 필요하고  finalizer를 구현할 필요가 없는 경우라도 표준 Dispose 패턴 구조는 유지해야 합니다.
- finalizer와 2개의 Dispose 메서드 내에서는 리소스 저일 외에는 다른 작업을 해서는 안됩니다.
