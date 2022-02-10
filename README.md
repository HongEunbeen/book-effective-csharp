## 📕 이펙티브 C# (3판) : 강력한 C# 코드를 구현하는 50가지 전략과 기법 책 정리


### 1. C#  언어 요소

| ITEM | TITLE | ☑️ | DATE | 
| :--: |   :-------   | ----:| :----: |
| 1 | 지역변수를 선언할때는 var를 사용하는 것이 낫다 | ☑️ | 22-01-17 |
| 2 | const보다는 readonly가 좋다 | ☑️ | 22-01-18 |
| 3 | 캐스트보다는 is, as가 좋다 | ☑️ | 22-01-19 |
| 4 | string.Format()을 보간 문자열로 대체하라 | ☑️ | 22-01-20 |
| 5 | 문화권별로 다른 문자열을 생성하려면 FormattableString을 사용하라 | ☑️ | 22-01-21 |
| 6 | nameof() 연산자를 적극 활용하라 | ☑️ | 22-01-24 |
| 7 | 델리게이트를 이용하여 콜백을 표현하라 | ☑️ | 22-01-25 |
| 8 | 이벤트 호출 시에는 null 조건 연산자를 사용하라 | ☑️ | 22-01-25 |
| 9 | 박싱과 언박싱을 최소화하라 | ☑️ | 22-01-26 |
| 10 | 베이스 클래스가 업그레이드된 경우에만 new 한정자를 사용하라 | ☑️ | 22-01-26 |

### 2. .NET 리소스 관리

| ITEM | TITLE | ☑️ | DATE | 
| :--: |   :-------   | ----:| :----: |
| 11 | .NET 리소스 관리에 대한 이해 | ☑️ | 22-01-27 |
| 12 | 할당 구문보다 멤버 초기화 구문이 좋다 |☑️ | 22-01-27 |
| 13 | 정적 클래스 멤버를 올바르게 초기화하라 | ☑️ | 22-01-28 |
| 14 | 초기화 코드가 중복되는 것을 최소화하라 | ☑️ | 22-02-03 |
| 15 | 불필요한 객체를 만들지 말라|  ☑️ | 22-02-04 |
| 16 | 생성자 내에서는 절대로 가상 함수를 호출하지 말라 | ☑️ | 22-02-05 |
| 17 | 표준 Dispose 패턴을 구현하라 | ☑️ | 22-02-07 |

### 3. 제네릭 활용

| ITEM | TITLE | ☑️ | DATE | 
| :--: |   :-------   | ----:| :----: |
| 18 | 반드시 필요한 제약 조건만 설정하라 | ☑️ | 22-02-06 |
| 19 | 런타임에 타입을 확인하여 최적의 알고리즘을 사용하라 | ☑️ | 22-02-09 |
| 20 | IComparable<T>와 IComparer<T>를 이용하여 객체의 선후 관계를 정의하라 | ⬜️ | |
| 21 | 타입 매개변수가 IDisposable을 구현한 경우를 대비하여 제네릭 클래스를 작성하라 | ⬜️ | |
| 22 | 공변성과 반공변성을 지원하라 | ⬜️ | |
| 23 | 타입 매개변수에 대해 메서드 제약 조건을 설정하려면 델리게이트를 활용하라 | ⬜️ | |
| 24 | 베이스 클래스나 인터페이스에 대해서 제네릭을 특화하지 말라 | ⬜️ |  | |
| 25 | 타입 매개변수로 인스턴스 필드를 만들 필요가 없다면 재네릭 메서드를 정의하라 | ⬜️ | |
| 26 | 제네릭 인터페이스와 논제테릭 인터페이스를 함께 구현하라 | ⬜️ | |
| 27 | 인터페이스를 간략히 정의하고 기능의 확장은 확장 메서드르 사용하라 | ⬜️ | |
| 28 | 확장 메서드를 이용하여 구체화도니 제네릭 타입을 개선하라 | ⬜️ | |
  
### 4. LINQ 활용

| ITEM | TITLE | ☑️ | DATE | 
| :--: |   :-------   | ----:| :----: |
| 29 | 컬렉션을 반환하기보다 이터레이터를 반환하는 것이 낫다 | ⬜️ | |
| 30 | 루프보다 쿼리 구문이 낫다 | ⬜️ | |
| 31 | 시쿼스에 사용할 수 있는 조합 가능한 API를 작성하라 | ⬜️ | |
| 32 | Action, Predicate, Function과 순회 방식을 분리하라 | ⬜️ | |
| 33 | 필요한 시점에 필요한 요소를 생성하라 | ⬜️ | |
| 34 | 함수를 매개변수로 사용하여 결합도를 낮추라 | ⬜️ | |
| 35 | 확장 메서드는 절대 오버로드하지 마라 | ⬜️ | |
| 36 | 쿼리 표현식과 메서드 호출 구문이 어떻게 대응되는지 이해하라 | ⬜️ | |
| 37 | 쿼리를 사용할 때는 즉시 평가보다 지연 평가가 낫다 | ⬜️ | |
| 38 | 메서드보다 람다 표현식이 낫다 | ⬜️ | |
| 39 | function과 action 내에서는 예외가 발생하지 않도록 하라 | ⬜️ | |
| 40 | 지연수행과 즉시 수행을 구분하라 | ⬜️ | |
| 41 | 값비싼 리소스를 캡처하지 말라 | ⬜️ | |
| 42 | IEnumerable<T> 데이터 소스와 IQueryable<T> 데이터 소스를 구분하라 | ⬜️ | |
| 43 | 쿼리 결과의 의미를 명확히 강제하고, Single()과 First()를 사용하라 | ⬜️ | |
| 44 | 바인딩된 변수는 수정하지 말라 | ⬜️ | |
