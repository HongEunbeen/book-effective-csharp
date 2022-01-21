
## FormattableString 객체

여러 문화권과 다양한 언어를 다뤄야 하는 경우 세부적인 제어가 필요하기 때문에 문자열을 생성하는 과정을 좀 더 자세히 알고 있어야 합니다.

하지만, `Formattable`을 상속한 타입의 객체라면 이를 통해 현재 컴퓨터에 지정된 문화권을 고려한 문자열을 생성할 수 있습니다.

즉, 문화권과 언어를 지정하여 문자열을 쉽게 생성할 수 있습니다.

### FormattableStirng 상속한 타입 객체 생성

문자열 보간 기능의 결과로 생성되는 반환값이 `string`일 수도 있지만 `FormattableString`을 상속한 타입일 수도 있습니다.

```csharp

//무자열 보간 기능 이용해 문자열 생성
string first = $"It's the {DateTime.Now.Day} of the {DateTime.Now.Month} month";

//문자열 보간 기능 이용해 FormattableString 상속한 타입의 객체 생성
FormattableString second = $"It's the {DateTime.Now.Day} of the {DateTime.Now.Month} month";

```

이렇게 문자열 보간 기능을 시용하면  `string` 객체와 `FormattableString`을 상속한 타입의 객체, 두 가지 타입으로 생성이 가능합니다.

## var선언과 FormattableString 객체

```csharp
var third = $"It's the {DateTime.Now.Day} of the {DateTime.Now.Month} month";
```

 `var`로 변수를 선언하게 된다면 이 변수는 `string` 객체가 될 수도 있지만, `FormattableString`을 상속한 타입의 객체가 될 수 있습니다.

var로 변수를 선언 시 FormattableStirng으로 컴파일러가 변환을 해주길 바란다면 주의점이 있습니다.

**문자열을 매개변수로 취하는 메서드**

문자열을 매개변수로 취하는 메서드에 변수를 전달하는 코드를 작성하면 `var`로 선언한 변수는 문자열 타입이 되기에 작성해서는 안 됩니다.

**오버로딩 메서드**

`string`과 `FormattableStirng`을 모두 받아들일 수 있는 오버로딩 메서드를 작성하면 `var`로 선언한 변수가 문자열 타입이 되기에 작성해서는 안 됩니다.

**확장 메서드**

컴파일러는 `string`과 `FormattableStirng` 타입을 상속한 객체 중 무엇을 생성할지 결정할 때 반환 객체 오른쪽에 `.`를 사용하는 경우가 있는지 살펴봅니다.

이때, 반환 객체 오른쪽에 `.` 를 직접 사용한 경우 문자열 타입이 되기에 작성해서는 안 됩니다.

## 📌 정리

- 문자열 보간 기능은 글로벌화 혹은 지역화에 필요한 거의 모든 기능을 갖추고 있습니다.
- 문화권을 임의로 지정해야 하는 경우에는 명시적으로 `FormattableString` 타입의 객체를 생성하도록 코드를 작성해야 합니다.
