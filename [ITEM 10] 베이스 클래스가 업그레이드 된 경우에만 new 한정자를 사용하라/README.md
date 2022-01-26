## virtual로 선언하지 않은 멤버의 재정의

`virtual`로 선언되지 않은 메서드를 `new` 한정자를 통해 재정의하면 메서드의 동작 방식을 모호하게 만들 수 있습니다.

개발자는 메서드를 호출할 때 사용한 참조나 레이브을 변경한다고 해서 동작 방식이 바뀔 것이라고 생각하지 않기에 부모 클래스의 메서드와 자식 클래스에서 재정의한 메서드가 다른 내용일지라도  동일한 작업이 실행되기를 기대합니다.

## new 한정자

```csharp
public class MyClass
{
	public void MagicMethod
	{
		Console.WriteLine("MyClass");
	}
}

public class MyOtherClass : MyClass
{
	public new void MagicMethod()
	{
		Console.WriteLine("MyOTherClass");
	}
}

```

`new` 한정자는 비가상 메서드를 가상 메서드로 만드는 것이 아니라 클래스의 명명 범위 내에 새로운 메서드를 추가하는 역할을 수행합니다.

### [비가상 메서드 vs 가상 메서드]

- 비가상 메서드 : 정적으로 바인딩되므로 호출하는 코드는 정확히 메서드를 호출합니다.
- 가상 메서드 : 동적으로 바인딩되므로 런타임에 객체의 타입이 무엇이냐에 따라 부합하는 메서드를 호출합니다.

### [가상 메서드]

다형성이 필요한 경우에만 가상 메서드를 사용해야 합니다.

가상 메서드를 제한적으로 사용하는 것은 클래스의 가능성을 제약하기도 하지만 더 신중한 가이드라인을 제시하는 것입니다.

## new 한정자 사용

베이스 클래스에서 이미 사용하고 있는 메서드를 재정의해 새로운 베이스 클래스를 만들어야 하는 경우에만 사용합니다.

```csharp
public class BaseWidget
{
	public void NormalizeValues() { }
}

public class MyWidget : BaseWidget
{
	public void NormalizeValues() { }
}
```

부모 클래스에 동일 이름의 메서드가 추가되는 경우 해결 방법은 두 가지가 있습니다.

[1. **자식 클래스에서 정의한 메서드 이름 변경]**

```csharp
public class MyWidget : BaseWidget
{
	public void NormalizeAllValues()
	{
		base.NormalizeValues()
	}
}
```

**[2. 자식 클래스에서 정의한 메서드의 이름을 변경하지 않고 new 한정자를 사용하기]**

```csharp
public class MyWidget : BaseWidget
{
	public new void NormalizeValues()
	{
		base.NormalizeValues()
	}
}
```

장기적인 관점으로는 첫 번째 방법이 옳지만 부모 클래스를 널리 공개한 경우라면 `new` 한정자를 이용하는 편이 좋습니다.

`new` 한정자를 이용하면 베이스 클래스가 업그레이드되어 파생 클래스의 멤버와 이름이 충졸하는 경우 문제를 해결할 수 있습니다.

## 결론

- `new`한정자를 사용할 때는 메서드를 호출할 때 모호한 상황이 발생할 수 있으므로 각별한 주의가 필요합니다.
- 부모 클래스가 업그레이드 되어 메서드의 이름이 충돌하는 경우는 `new`한정자를 사용합니다.
