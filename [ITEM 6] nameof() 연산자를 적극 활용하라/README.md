## 문자열 식별자에 의존하는 라이브러리

이종간 데이터 호환을 위해 사용하는 간단한 라이브러리들은 간편할지는 몰라고 추가 비용이 발생합니다.

**타입 정보 손실**

타입 정보를 활용해 추가 기능을 제공하는 개발 도구의 도움을 더 이상 받지 못하며 정적 타입 언어의 주요 장점을 상실하는 문제가 발생합니다.

## C# 6.0 nameof() 연산자

`nameof()` 연산자는 심볼 그 자체를 해당 심볼을 포함하는 문자열로 대체해줍니다.

```csharp
public string Name
{
	get { return name; }
	set
	{
		if ( value != name )
		{
			name = value;
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name)));
		}
	}
}

private string name;
```

위의 코드는 `nameof()` 연산자를 사용했습니다.

```csharp
PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name)));
```

`nameof()` 연산자를 사용했기에 속성의 이름을 변경할 경우 이벤트의 인자로 전달해야 하는 문자열로 쉽게 변경할 수 있습니다.

## `nameof()` 활용법

**이름을 다양하게 사용**

심볼의 이름을 평가하기때문에 타입, 변수, 인터페이스, 네임스페이스에 대해 사용할 수 있습니다.

**정규화되지 않은 이름**

완전히 정규화된 이름, 정규화되지 않은 이름 도무 제한 없이 사용할 수 있습니다.

**로컬 이름을 문자열로 반환**

정규화된 이름(`System`, `Int`)을 사용하더라도 항상 로컬 이름을 문자열로 반환하는 역할을 수행합니다.

**예외 타입에 사용**

```csharp
public static void ExceptionMessage(object thisCantBeNull)
{
	if(thisCantBeNull == null) 
		throw new ArgumentNullException(nameof(thisCantBeNull), "string");
}
```

예외 타입은 매개변수의 이름 자체를 생성자의 매개변수로 취하는 경우가 많습니다.
이때. `nameof()`를 사용하면 이름 바꾸기 작업을 수행할 때 실수를 줄일 수 있습니다.

**특성의 매개변수**

특성의 매개변수로 문자열을 전달해는 경우에 사용할 수 있습니다.
경로 이름으로 네임스페이스 이름을 사용한다면 `nameof()`를 사용하는 것이 편리합니다.

## 결론

- `nameof()` 연산자를 사용하면 심볼의 이름을 완전히 바꾸거나 수정할 경우 손쉽게 변경 사항을 반영할 수 있습니다.
- 가능한 한 심볼을 유지할 수 있다면 자동화 도구를 활용할 수 있는 가능성이 높아지기 때문에, 다른 도구를 사용하거나 개발자가 직접 내용을 눈으로 검토하는 것에 비해 오류를 발견하기 쉬워집니다.
