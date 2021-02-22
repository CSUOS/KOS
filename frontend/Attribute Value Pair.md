## Attribute Value Pair

- attribute value pair(이하: pair)는 attribute id, attribute type, attribute name, attribute value로 구성된다.
- 사용자는 입력한 attribute name과 선택한 attribute type으로 pair를 생성한다.
- 사용자는 attribute type으로 제한된 양식에 따라 attribute value를 입력할 수 있다.




## Attribute type의 Class

### modifiable, selectable, creatable

attribute type은 각자 modifiable, selectable, creatable한 속성을 가진다.

```
modifiable : boolean
ㄴ 사용자가 값을 수정 혹은 지정할 수 있는가
selectable : boolean
ㄴ 사용자가 옵션을 선택할 수 있는가(component가 select 기능을 가지는가)
creatable : boolean
ㄴ 사용자가 옵션을 추가할 수 있는가
```

- modifiable=true는 selectable을 포함한다.

- selectable=true는 creatable을 포함한다.



| 구분       | 비고                                                         | 예외      |
| ---------- | ------------------------------------------------------------ | --------- |
| modifiable | value field에 mouse hover event 있음                         | checkbox  |
| selectable | value field 클릭 시 value field 아래에 select 생김           | 해당 없음 |
| creatable  | select 가장 하단에 value field 안 text field의 input대로 옵션을 추가할 수 있는 item 생김 | 해당 없음 |

## class

```
[1] 수정가능하고 옵션 추가가능한 경우
[2] 수정가능하고 옵션 추가불가능한 경우
[3] 수정불가능한 경우
[4] 기타(수정가능하고 선택불가능)
```

| class | desc                                                         | type                                                         |
| ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [1]   | 수정가능, 옵션 추가가능<br />modifiable=true, selectable=true, creatable=true | single-select<br />multi-select<br />state                   |
| [2]   | 수정가능, 옵션 추가불가능<br />modifiable=true, selectable=true, creatable=false | member                                                       |
| [3]   | 수정불가능<br />modifiable=false                             | creator<br />createdAt<br/>updatedAt<br/>modifier<br/>add-button |
| [4]   | 기타<br />modifiable=true, selectable=false                  | deadline<br />text-field<br />date-picker<br />url<br />checkbox<br />description |

## Attribute type의 구분

1. **기본**

해당 type의 경우

- 사용자는 name과 value를 수정할 수 없다. 단, 예외로 value를 지정하거나 수정할 수 있는 type도 있다.
- 사용자가 TASK 를 만들 때 기본적으로 생성이 되어있다.
- 사용자가 삭제할 수 있으며, 삭제 후 다시 생성할 수 있다.
- 모든 pair들을 통틀어 하나만 만들 수 있다.



사용자가 지정하거나 수정할 수 없는 value는 모두 *이탤릭체*이다.

사용자가 지정하거나 수정할 수 있는 value는 **볼드체**이다.

| attribute type | attribute name | attribute value                                 | 비고                                                         | modifiable | selectable | creatable |
| -------------- | -------------- | ----------------------------------------------- | ------------------------------------------------------------ | ---------- | ---------- | --------- |
| creator        | *Creator*      | *작성자 이름*                                   |                                                              | false      | -          | -         |
| modifier       | *Modifier*     | *최근 수정자 이름*                              |                                                              | false      | -          | -         |
| member         | *Assign*       | **선택된 멤버들** : 사용자 지정<br />*멤버들*   | 사용자가 *멤버들* 중에서 선택한 값으로 **선택된 멤버들** 수정 가능 | true       | true       | false     |
| createdAt      | *CreatedAt*    | *생성일자*                                      |                                                              | false      | -          | -         |
| updatedAt      | *UpdatedAt*    | *최근 수정일자*                                 |                                                              | false      | -          | -         |
| deadline       | *Deadline*     | **데드라인**                                    | 사용자가 **데드라인** 수정 가능(날짜 선택 가능)              | true       | false      | -         |
| state          | *State*        | **선택된 상태** : 사용자 지정<br />***상태들*** | 사용자가 ***상태들*** 중에서 선택한 값으로 **선택된 상태** 수정 가능<br />사용자가 ***상태들***에 **원하는 상태** 추가 가능<br />***상태들*** 중 기본 제공: 시작전 / 진행중 / 완료 | true       | true       | true      |

2. **생성**

해당 type의 경우

- 사용자는 name과 value를 수정할 수 있다.
- 사용자가 TASK 를 만들 때 기본적으로 생성되어있지 않다.
- 사용자가 삭제할 수 있다.
- 모든 pair들을 통틀어 여러 번 만들 수 있다.

| attribute type | attribute name | attribute value                                              | 비고                                                         | component     | modifiable | selectable | creatable |
| -------------- | -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------- | ---------- | ---------- | --------- |
| text-field     | 사용자 입력    | 사용자 입력 : string                                         |                                                              | text-field    | true       | false      | -         |
| date-picker    | 사용자 입력    | 사용자 입력 : string                                         |                                                              | date-picker   | true       | false      | -         |
| single-select  | 사용자 입력    | ```선택된 값``` : 사용자 지정<br />```옵션들``` : 사용자 입력 | 사용자가 ```옵션들```을 만들고 삭제할 수 있음<br />사용자가 ```옵션들``` 중 ```선택한 값```으로 ```선택된 값``` 수정 가능 | single-select | true       | true       | true      |
| multi-select   | 사용자 입력    | ```선택된 값들``` : 사용자 지정<br/>```옵션들``` : 사용자 입력 | 사용자가 ```옵션들```을 만들고 삭제할 수 있음<br/>사용자가 ```옵션들``` 중 선택한 값으로 ```선택된 값들``` 수정 가능 | multi-select  | true       | true       | true      |
| url            | 사용자 입력    | 사용자 입력 : string                                         |                                                              | url           | true       | false      | -         |
| checkbox       | 사용자 입력    | 사용자 지정 : boolean                                        |                                                              | checkbox      | true       | false      | -         |

3. **기타**

해당 type의 경우

- 사용자가 TASK를 만들 때 기본적으로 생성되어 있다.
- 사용자가 삭제할 수 없다.
- 사용자가 여러 번 만들 수 없다.

| attribute type | attribute name | attribute value | 비고                                  | component       | modifiable | selectable | creatable |
| -------------- | -------------- | --------------- | ------------------------------------- | --------------- | ---------- | ---------- | --------- |
| add-button     | +              | 해당 없음       | 가장 마지막 pair 아래에 생성되어 있음 | 해당 없음       | -          | -          | -         |
| description    | 설명           | 사용자 입력     | task window 가장 하단에 생성되어 있음 | 마크다운 에디터 | true       | false      |           |

## Attribute type과 component

- Attribute는 각각의 value를 특정한 양식으로 표현하는 component로 표시된다.

| component  | attribute type                              | value type                                                  |
| ---------- | ------------------------------------------- | ----------------------------------------------------------- |
| -          | creator, modifier                           | `string`                                                    |
| TextField  | text-field                                  | `string`                                                    |
| DatePicker | date-picker, deadline, createdAt, updatedAt | `string | Date | number`                                    |
| CheckBox   | checkbox                                    | `boolean`                                                   |
| URL        | url                                         | `string`                                                    |
| SelectItem | single-select, multi-select, state          | `Array<{ name: string, selected: boolean, color: string }>` |
| Tag        | member                                      | 논의 예정                                                   |

* Tag와 SelectItem 통합 예정 : 디자인 똑같음
* SelectItem value type 바꿀 예정 : selected 여부는 나타낼 수 있으나 selected 순서 보여줄 수 없음

## Pair의 순서

- 사용자는 drag n drop으로 pair의 순서를 변경할 수 있다.
- pair는 생성 순서대로 나열된다.

