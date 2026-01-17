---
title: DataBase System Theory
date: 2025-12-29 08:00:00
categories:
  - junior_first
description: about DataBase system design 
---

> [!NOTE]
>
> ### CH1-DB-concept
>
> 
>
> 1. 數據抽象的三个層次
>    - 物理層
>      - 數據在底基的組織與實現
>    - 邏輯層
>      - 數據在表中的組織，數據與數據間的關係
>    - 視圖層
>      - 用戶所能看到的數據的樣子
> 2. 數據獨立性
>    - 物理數據獨立性
>      - 修改物理模式（內模式）不影響邏輯模式以及應用程式的能力，即修改底層數據組織的方式不影響對外的服務
>    - 邏輯數據獨立性
>      - 修改邏輯模式（概念模式）不影響應用程式的能力，即修改了表的結構可以不影響對外提供的服務
> 3. 數據庫
>
>    - 定義
>      - 長期存儲、有組織、可共享的數據的集合
>
>    - 數據庫的三級模式
>
>      - 外模式
>        - 使用者或應用程序所看到的那部分數據
>
>      - 內模式
>        - 數據在物理設備上的儲存方式
>
>      - 概念模式
>        - 描述整个數據庫的結構
> 4. DBMS
>    - 用戶與操作系統間的數據管理軟件
> 5. DMS
>    - 帶有DBMS的計算機系統

---

> [!NOTE]
>
> ### CH2-Relation Model
>
> 
>
> 1. Relation：在數據庫中關係就是一張表
> 2. Relation Schema（關係模式）：一張表的數據關係，如 Customer(id, name)
> 3. 鍵：
>    - 超鍵：能夠唯一標識一个turple的一个屬性集合
>    - 候選鍵：最小的超鍵
>    - 主鍵：人為指定的用於唯一標識一个turple的屬性集合
>    - 外鍵：引用另一個表的主鍵，維護參照完整性
> 4. 關係代數運算
>    - 選擇$\sigma$（選行）
>    - 投影$\pi$（選列）
>    - 並（兩表同構，兩表合并）
>    - 差（兩表同構，留不同）
>    - 笛卡爾積（所有可能的元組組合 n＋m列，n*m行）
>    - 自然連接（自動選擇兩表相同的列合并，只保留有連接的，合并同名的列即最後結果不會出現兩个同名的列）
> 5. 連接類型
>    - 內連接：只保留匹配的turple
>    - 外連接：左外、右外、全外連接。沒有被匹配的置null

---

> [!NOTE]
>
> ### CH3. SQL
>
> 
>
> 1. **DDL（數據庫定義語言）**
>
>    - create
>
>      - ~~~sql
>        create table students (
>        	student_id INT,
>            name VARCHAR(50) NOT NULL,
>            age INT,
>            gender CHAR(1),
>            dept_id INT,
>            id_card INT NOT NULL  #（候選鍵必須不為空）
>                                                                                                                                                                                                                                                                                                                                                                                                                                 
>            PRIMARY KEY (student_id),
>            FOREIGN KEY (dept_id) REFERENCES Department (dept_id),
>            CHECK (age >18 and age < 60)
>            UNIQUE (id_card)	# 定義候選鍵，即不為主鍵但也要是唯一的屬性
>        );
>        ~~~
>    
>      - 
>    
>    - alter
>      - 新增列：alter t1 add column [column_name] [data_type] [data_constraint];
>      - 刪除列：alter t1 drop column [name];
>      - 修改列定義：alter t1 modify column [name] [new_datatype] [new_constraint];
>
>
> 2. **DML（數據庫操縱語言）**
>
>   - select
>     - DISTINCT，去除重覆的元組
>     - from （from中出現多表默認進行笛卡爾積）
>     - where [condition]：condition可用模糊查詢/范圍查詢
>       - name LIKE To%
>       - Age BETWEEN 18 and 35 （閉區間）
>       - where中不可使用聚合函數，也不能使用select中as的別名
>     - 在SELECT列表中同時使用了**「聚合函數」和「非聚合列（普通列）」**，那麼這些普通列必須全部出現在GROUP BY子句中
>       - 要麼select count(*) from students
>       - 要麼select dept, count(*) from students group by dept
>       - ***不可以是***select dept count(*) from students
>     - Order by (desc降序，默認升序)
>     - 聚合函數AVG、MAX、MIN、SUM、COUNT
>     - 分組group by
>       - having 對group by後的表進行過濾
>     - LIMIT 限制條數
>     - OFFSET 從第幾條開始取
>     
>    - Insert
>      - insert into t1 (column1, column2) values ('Tom', 18)
>    - update
>      - update t1 set column1= value1 where ...
>    - delete
>      - delete from t1 where ... 
>
> 
>
> ***拿表 (FROM) -> 挑行 (WHERE) -> 分組 (GROUP) -> 挑組 (HAVING) -> 選列 (SELECT) -> 排序 (ORDER) -> 截斷 (LIMIT)***

---

> [!NOTE]
>
> ### CH4. INTERMEDIATE SQL
>
> 
>
> 1. **連接**
>
> - 自然連接
>
>   - Natural join：自動匹配相同名稱的列作連接，連接結果**只含匹配的列**
>
> - 連接條件
>
>   - ON：指定任意連接條件，可能出現重覆列
>   - USING：指定用哪一列連接，連接結果中該列只出現一次
>
> - 內連接
>
>   - 默認的join，**只保留匹配的列**
>
> - 外連接
>
>   - 左外、右外、全外：連接結果保留左、右、全（元組）
>
>     
>
> 2. **視圖**
>
> - create view v1 as <query>
> - 通常只有簡單視圖（單表、無聚合、無 Distinct、無 Group by）才能更新
>
> 
>
> 3. **完整性約束**
>
> - 單表約束(實體完整性)
>   - NOT NULL
>   - PRIMARY KEY
>   - UNIQUE
>   - CHECK
> - 參考完整性約束
>   - FOREIGN KEY
>   - **級聯動作 (Cascading Actions)：** 當父表數據刪除/更新時，子表怎麼辦？
>     - ON DELETE CASCADE (跟著刪除)
>     - ON DELETE SET NULL (設為空)

---

> [!IMPORTANT]
>
> ### CH6. ER-Model
>
> 
>
> 1. 畫ER圖
>    - 強實體集--方框表示
>
>    - 弱實體集--雙方框表示
>      - 弱與強之間的關係要用雙菱形框表示，且弱實體端是完全參與的
>      - 強實體集是部分參與，且為1端。弱為N端
>
>    - 關係集--菱型框表示
>
>    - 關係集上的屬性--虛線加方框表示
>
>    - 有向線表示一對多（一的那邊被箭頭指）
>
>    - 雙線表示完全參與（畫圖時，問一下自己A無B成立嗎，若不成立則A是雙線的）
>
> 
>
> 2. ER圖轉關係模型/關係圖
>    - 強實體 -- 直接轉為表即可
>
>    - 弱實體 -- 直接轉為表，其主鍵由弱實體集的標識符以及所依賴的強實體集的主鍵共同組成
>
>    - 關係集
>      - 1:1 -- 將其中一表的主鍵作外鍵加到另一表中（雙線的那端優先被加）
>      - 1:N -- 將1端的主鍵作外鍵加入到N端中，若該關係集有其他屬性也一并加入（若有雙線則雙線優先）
>      - N：M -- 創建新表，將兩端的主鍵加入組成主鍵，表中包含原有關係集的屬性
>
>    - 多值屬性 -- 創建新表，由多值屬性與原實體集中的主鍵共同組成新表的主鍵
>
>      >A ... several B , B ... several A ==> M:N
>      >
>      >A ... several B , B ... unique A ==> 1 : N (A為1)
>      >
>      >
>      >
>      >Every ... must ... ===> 完全參與
>      >
>      >Each ... has to ... ===> 完全參與
>      >
>      >Must belongs to ... ===> 完全參與
>
> 
>
> 3. 關係模型轉ER圖
>    - 將每个關係模式畫出其方框，主鍵under實線
>    - 外鍵是從哪个表引來的就指向哪个表

---

> [!IMPORTANT]
>
> ### CH7 Relational DataBase Design
>
> 
>
> 1. $F^＋$
>    - 在F的基礎上應用各種推導性質推出的
>
> 1. $\alpha{}^+$
>    - 在$\alpha{}$上應用F所推出
>
> 1. $F_c$
>    - 先將所有依賴進行右側單一化，即X->AB變為X->A, X->B
>    - 再去**左無關**屬性
>      - 左無關：若依賴$\alpha{}->\beta{}$，則求$(\alpha{}-A)^+$中是否含$\beta$即可，含即無關
>      - 右無關：若依賴$\alpha{}->\beta{}$，則令$F'=F的該依賴替換為去掉無關屬性的依賴$，例：F={A->BCD}, 我想算B是無關的，則F'={A->CD}，并使用F'來推導$\alpha{}^+$，若存在A則說明B是無關的
>    - 對於每个依賴X->Y，在F集合去掉該依賴，并計算X的正閉包，則包含Y則該依賴去掉（Fc中不包含該條）
>    - 去除冗餘依賴後將X->Y, X->Z合并為X->YZ得到最後的Fc
>    
> 1. candidate key
>    - 只出現在左的為L，只出右的為R，兩都出為LR，都沒出為N
>    - 先計算$(L并N)^+$，若包含該關係的所有屬性，則L并N就是唯一的候選鍵
>    - 否則將L并N與LR集合的每一个元素都結合并求正閉包，求出的包含所有的屬性那就是一个候選鍵，候選鍵可有多个
>
> 1. 3NF
>    - 求$F_c$
>    - 求候選鍵
>    - 將$F_c$中的每个依賴都弄成一个新表，即X->Y, {X, Y}（鍵為X）
>    - 所有的表合成一个總表，D={R1, R2,...}若原候選鍵不在里面時，將其加入即為結果。（多候選鍵選其一即可）
>
> 1. BCNF
>    - 求候選鍵
>    - 看所有依賴，若不是平凡依賴（即依賴沒有出現兩邊都相同的屬性）且其左部不是候選鍵，則不符BCNF，拆表
>    - 將該左部作為X，右部作為Y。建一个新表R1為XUY，該鍵為X，依賴為原依賴中只包含X，Y的，建表R2，屬性為原表中去掉X加入Y，鍵為原鍵，依賴為原依賴中只包含當前屬性的依賴
>    - 不斷拆表直至所有都滿足BCNF
>
> 1. 判斷無損分解
>    - R1交R2->R1或R1交R2->R2
>    - 即求R1或R2的正閉包，看是否包含（R1交R2）
>
> 1. 判斷函數依賴保持
>    - 將分解後的依賴作并集得出依賴集G
>    - 對於分解前的每个函數依賴，基於G計算其左部的正閉包是否包含右部，若都包含則是保持的
>
>    **BCNF不考。3種NF的定義要知道**
>
> 單主鍵自動滿足2NF，否則非鍵元素必須被鍵中每个元素指著（不可存在不被鍵中的某一鍵指著）
>
> 3NF必須滿足不存在A->B, B->C，A為主鍵且B、C不為主鍵

---

> [!NOTE]
>
> ### CH13 DataBase Storage Structure
>
> 
>
> - record被映射為block存在disk中
>
> - 為了加快查找效率，memory中存在一个buffer專門用於存放block的副本以盡可能reduce block在disk以及memory間的transfer
>
> - record是定長或變長的
>   - 先存定長，之後存空值位圖、變長，最後存實際數據
>     - 變長用（offset，length）turple來表示
>   
> - 一个块可存多條記錄，記錄在块中的組織方式使用了分槽頁結構（slot）
>   - 每个块中的slot包含了
>     - header：存元數據
>
>     - 緊接著header的是**Slot Array**，其中的每个slot存了[記錄在頁內的字節偏移量, 記錄長度]，故指向尾部的真實數據
>
>       - 數據是從後往前存的
>
>     - **中間：** 空閒空間
> - 文件中可包含多个块，块中又有多條record。record在文件中的組織方式如下：
>   - 堆文件組織：有位就放
>   - 順序文件組織：按搜索碼順著存
>   - 散列文件組織：使用一个散列函數映射完了存
>
> 
>

---

> [!WARNING]
>
> ### CH 14 Indexing
>
> *若無索引文件，則查一條record要順序將block load入memory直到找到該record。有了索引文件則可直接將索引文件對應的block load進memory，之後查文件的索引表便知想要的record在哪个block，直接把那个block load進來即可*
>
> - 索引是一種數據結構，用於快速找到想要的數據。
>   索引文件由**index entries**組成，其中包含了**search key**以及**pointer**兩个字段
>
> - **Primary index/clustering index**：search key的順序與其在block/disk中存放的物理順序是一致的。一般該索引是主鍵，但也可以不是主鍵
>
> - Second index/Non-clustering index：key與物理存儲順序不一致。且該index必須是**Dense index**
>
> 
>
> - index type：
>
>   - Dense index：數據文件中的 **每一個** Search Key 值，在索引文件中都有一條對應的索引記錄
>   - Sparse index： 索引文件中只為 **部分** Search Key 值建立索引記錄
>     - **查找方法**：先找到小于目标值的最大索引项，然后从该位置开始顺序扫描数据文件
> - 多属性索引与**左前缀原则**
>   - 多个屬性的索引稱為复合索引，實際只創建了一个B＋樹，所以只有前面的索引相同了才會看後面的索引
>     - e.g 對於(A, B, C)，表先按A排序，當A相同時B才有序，當AB都相同時C才有序（有序說明可以進行二分查找）
>   - 對於复合索引的查詢要符合左前綴原則：
>     - **有效場景（走索引）：**
>       - WHERE a = 1 （利用 a 排序）
>       - WHERE a = 1 AND b = 2 （先找 a，a 內部 b 有序，繼續找 b）
>       - WHERE a = 1 AND b = 2 AND c = 3 （全匹配）
>     - **無效場景（索引失效）：**
>       - WHERE b = 2 （**無效**。因為全局來看，b 是無序的，無法二分查找）
>       - WHERE c = 3 （**無效**。理由同上）
>       - WHERE b = 2 AND c = 3 （**無效**）
>     - **斷層場景（部分失效）：**WHERE a = 1 AND c = 3**結果：** **a 走索引**，但 **c 不走索引**（只是過濾條件）。**原因：** 雖然找到了 a=1 的範圍，但在這個範圍內，b 不確定，所以 c 是無序的，只能遍歷掃描
>     - 若a使用了範圍查詢，即使用 > < 則其右邊的都無法走索引
> - 索引的SQL實現
>   - `CREATE INDEX index_name ON table(attributes);`
>   - `DROP INDEX index_name;`

---

> [!WARNING]
>
> ### CH 15 query processing
>
> *對於一條SQL語句，首先會被轉換為關係代數表達式，隨後會進行查詢優化，最後按查詢plan中cost最小的plan來進行查詢并返回結果*
>
> 
>
> ##### 線性查找
>
> *$b_r$代表關係R所占的block數*
>
> - Linear search：
>   - 按主鍵元素來找：在文件中順序遍歷。因主鍵唯一，所以找到一條就停
>     - $cost=\frac{b_r}{2}*t_T+t_s$
>   - 按非主鍵元素來找：要遍歷完所有block才算找全
>     - $cost=b_r*t_T+t_s$
>
> - Binary Search：
>   - 查找的文件的屬性必須是有序的，且是連續存放的
>
>   - $ Cost = \lceil \log_2(b_r) \rceil \times (t_T + t_S)$
>
> 
>
> ##### 索引查找
>
> *索引文件中先找索引块，再在块中找數據，所以找索引块也會有IO*
>
> - **(Primary Index, Candidate Key, Equality)**：葉子節點直接連數據
>   - $cost=(h_i+1)(t_T+t_s)$	查$h_i$次索引，加一次數據讀取
> - **（Primary Index, Non-key, Equality)**：目標不唯一
>   - $$ Cost = h_i \times (t_T + t_S) + t_S + t_T \times b $$
> - **(Secondary Index, Candidate Key) **
>   - $$ Cost = (h_i + 1) \times (t_T + t_S) $$
> - **(Secondary Index, Non-Candidate Key) **
>   - 假設有 $n$ 條記錄滿足條件
>
>   - $$ Cost = (h_i + n) \times (t_T + t_S) $$
>
>     - 遍歷索引 $h_i$ 次後，對於這 $n$ 條記錄，每一條都可能在不同的磁盤位置，所以每一條都需要一次 $t_S$ 和 $t_T$。

---

> [!IMPORTANT]
>
> ### CH16 query optimization
>
> 
>
>
> ##### Heuristic optimization
>
> - 盡早做選擇
> - 盡早做投影
> - 先執行限制性強的語句
>
> Step1: 先將**SQL轉化為關係代數**，FROM里多表默認執行多表連接
>
> Step2: 畫出**查詢樹**
>
> Step3: 選擇下移
>
> ​	**選擇所在的地方**應該是其**所有涉及的屬性所在的表**的**第一个公共上方**，若只涉及一个表就移到該表的上方
>
> Step4: 投影下放
>
> ​	檢查每个**斜杠**，看它的**所有上方所需要**它**下方表中**的哪些**屬性**
>
> Step5: 分割

---

> [!IMPORTANT]
>
> ### CH17 Transaction
>
> 
>
>
> #### schedule
>
> 1. serialability
>
>    - conflict ability：通過交換**不衝突**的操作指令，看能否將並發調度變換為串行調度
>    - view ability：關注數據的**讀取來源**和**最終寫入結果**是否與串行執行一致
>
> **判定是否可串行化**
>
> - 畫前序（優先）圖（RW、WR、WW）
>
> - 圖中無環則可串行化，其串行化序列為拓扑排序序列
>
> 
>
> 2. recoverability
>    - recoverable schedule：可讀別人改過的數據，但別人必須先於你commit
>    - casadeless schedule：讀的數據都是commit過的
>
> - 事務修改某值後無論有沒有commit，之後讀入的都是改過的值，只是還沒有持久化而已
>
> - 當試圖寫入不合法的數據時會rollback，如違反完整性約束
>
>   
>
> ##### Rollback
>
> **1. 違反完整性約束 (Integrity Constraint Violation)**
> 當操作導致數據不再滿足數據庫定義的規則時，系統會強制回滾
>
> - **Check 約束：** 數值超出範圍（如本題 age > 25）。
> - **主鍵/唯一約束：** 插入重複的主鍵或唯一鍵值。
> - **外鍵約束：** 引用了不存在的父表記錄。
> - **非空約束：** 試圖將 NULL 插入 NOT NULL 字段

---

> [!NOTE]
>
> ### CH18 Concurency control
>
> 1. 2PL
>    - growing phase：只可拿鎖或升級鎖
>    - shrinking phase：只可放鎖或降級鎖
> 2. strict 2PL
>    - 2PL＋Lock_X必須持續到commit後
> 3. rigoous 2PL
>    - 2PL＋Lock_X，Lock_S都必續持續到commit後

---

> [!IMPORTANT]
>
> ### CH 19 Recovery system
>
>
> *事務進行不下去、系統崩潰*
>
>
> ##### 基於日志的恢復系統
>
> Step1:找到離crash最近的checkpoint
>
> Step2:checkpoint前已commit的不用理，checkpoint後commit或abort的要Redo，即更新其值為Vnew
>
> Step3:checkpoint後沒commit或abort的要undo，從底往上一路恢復值，直到遇到該事務的start
>
> *<checkpoint L> L為处於active狀態的事務，即已start且未commit或abort的*
>
> **若在事務中遇到rollback，那麼日志接下來要把它執行undo操作的寫出來**



關係數據庫的設計：

<img src="3.png" style="zoom:25%;" />



多粒度鎖的相容矩陣（行為已有的鎖，列為新請求的鎖）

IS：除X外都相容

IX：只與IS，IX相容

S：只與IS，S相容

SIX：只與IX相容

X：不與任容鎖相容









