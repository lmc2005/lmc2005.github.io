---
title: mermaid繪製圖表
date: 2025-11-15 00:23:00
categories:
  - code language
description: Use mermaid to create different chart.
---

## 使用mermaid來繪製圖表

我們使用**mermaid**語言來繪製圖表，當今大模型給你畫的圖也是基於該語言生成的。



***mermaid基礎語法***

1. Flowchart

- 初始行定義: 圖表類型 方向 （方向的意思是你的流程是從上至下TD或左至右LR）
- 後續行縮進之後給每个A、B、C...來block的內容命名，相當於把內容轉換成A、B...變量，後續都使用變量來規划流程
- 两个變量間使用 --> 來相連，變量間都是M：N關係的，即一个變量可指向多个變量，多个也可指向一个

<img src="./1.png" style="zoom:25%;" />

mermaid代碼如下，通過使用不同的{},[],()組合可得到不同的邊框形狀

~~~md
flowchart TD
	A[one]
	B[two]
	C(three)
	D((four))
	E{five}
	F[[six]]
	G[(seven)]
	H([eight])
	A-->B
	B-->C
	C-->D
	E-->D
	F-->D
	D-->G
	D-->H
~~~



2. Sequence Diagram

- 定義participant,   participant variable as content
- ->> 實線箭頭
- -->> 虛線箭頭（用於respond）
- activate 激活狀態，即帶一个小方框
- deactivate
- alt else end畫虛線框

<img src="./2.png" style="zoom:25%;" />

代碼如下：

~~~md
sequenceDiagram
    participant User as 用戶
    participant API as 伺服器API
    participant DB as 資料庫

    User->>API: POST /data
    activate API
    API->>DB: 查詢數據
    activate DB
    DB-->>API: 返回記錄
    deactivate DB
    alt 數據有效
        API-->>User: 200 OK
    else 數據無效
        API-->>User: 404 Not Found
    end
    deactivate API
~~~

