---
title: Big data final summary
date: 2026-01-07 10:00:00
categories:
  - BIG DATA
description: including many knowledage about big data foundation
---

---

## BIG DATA

---

###### 1   大數據概述

###### 1.1   大數據的挑戰

###### 1.1.1   大數據帶來的思維轉變

1. 全樣而非抽樣

   分析更多數據，無需再依賴隨機采樣

2. 效率而非精確

   接受各種各類复雜的數據，而不再追求精確性

3. 相關而非因果

   不再热衷于寻找因果关系，即大数据告诉我们“是什么”而不是“为什么”，从因果关系向相关关系转变

###### 1.2   大數據的特征

​	4V

1. Volume（大量）
2. Variety（多樣化）
3. Velocity（快速化）
4. Value（價值密度低）

*大數據由結構化以及非結構化數據組成*

###### 1.3   大數據的產生

###### 1.3.1   大數據的產生階段

1. 運營式系統階段

   数据往往伴随一定的**运营活动产生**并**记录在数据库**中，这种数据的产生方式是**被动的**

2. 用戶原創內容階段

   以博客、微博为代表的新型社交网络出现并快速发展，其數據的產生方式是**主動的**

3. 感知式系統階段

   VR/AR等，数据第三次大飞跃导致大数据的产生

###### 1.3.2   科學研究的4范式 

1. Empirical
2. Theoretical
3. Computational
4. Data Exploration

###### 1.4   大數據計算模式

1. 批处理計算

   針對大規模數據的計算，如**Spark**、**MapReduce**

2. 流式計算

   針對流數據的實時計算，如**Flume**、**Storm**

3. 圖計算

   針對大規模圖結構數據的处理，如Pregel、GraphX

4. 查詢分析計算

   大規模數據的存儲與查詢分析，如**Cassandra**、**Hive**、**HBase**

从数据在信息系统中的生命周期看，大数据从数据源开始，经过分析、挖掘到最终获得价值一般需要经过6个主要环节，包括**数据收集**、**数据存储**、**资源管理与服务协调**、**计算引擎**、**数据分析和可视化**

###### 1.5   大數據技術實現

###### 1.5.1   Hadoop與Spark

<img src="./F-1.png" style="zoom:33%;" />

1. Sqoop/Canal：**关系型数据收集**和导入工具，是连接关系型数据库（如MySQL）和Hadoop（如HDFS）的桥梁
2. Flume：**非关系型数据收集**工具，主要是流式日志数据，可近实时收集，经过滤、聚集后加载到HDFS等存储系统
   1. *常見的Flume拓扑結構是**多路合并**以及**多路复用***
3. Kafka：**分布式消息队列**，一般作为数据总线使用，它允许多个数据消费者订阅并获取感兴趣的数据
4. HDFS：**Hadoop分布式文件系统**
5. HBase：构建在HDFS之上的**分布式数据库**
6. Kudu：**分布式列式存储数据库**
7. YARN：**统一资源管理与调度系统**
8. ZooKeeper：基于简化的Paxos协议实现的**服务协调系统**
9. MapReduce/Tez：MapReduce是一个经典的**批处理计算引擎**，Tez是基于MapReduce开发的**通用DAG计算引擎**
10. Spark：**通用的DAG计算引擎**，它提供了**基于RDD**的数据抽象表示
11. Impala/Presto：分别由Cloudera和Facebook开源的MPP系统，允许用户使用**标准SQL处理存储在Hadoop中的数据**
12. Storm/Spark Streaming：**分布式流式实时计算引擎**
13. Hive/Pig/SparkSQL：在计算引擎之上构建的**支持SQL或脚本语言的分析系统**
14. Mahout/MLlib：在计算引擎之上构建的**机器学习库**
15. Apache Beam/Cascading：基于各类计算框架封装的**高级API**，方便用户**构建复杂的数据流水线**



###### 2   分布式消息隊列

###### 2.1   Kafka概述

###### 2.1.1   設計動機

1. 數據producer和consumer耦合度過高
2. producer和consumer數據处理速率不對等
3. 大量并發的網絡連接對後端consumer不夠友好

###### 2.1.2   Kafka的架構

​	采用了 **push-pull** **架构**， 即Producer将数据直接“push”给Broker，而Consumer从Broker端“pull”数据

- Consumer可根据自己的实际负载和需求获取数据，避免采用“push”方式给Consumer带来较大压力。

- Consumer自己维护已读取消息的offset而不是由Broker端维护，这大大缓解了Broker的压力，使得它更加轻量级

*Kafka **Broker负载均衡**实际上是**对leader partition**的负载均衡，即保证leader partition在各个Broker上数目尽可能相近*

###### 2.2   爬蟲的原理

<img src="./F-2.png" style="zoom:33%;" />

###### 2.3   大數據存儲

###### 2.3.1   數據序列化

​	当需要将**数据存入文件**或者**通过网络发送出去**时，需将**数据对象转化为字节流**，即对数据序列化

常用的序列化框架包括：常用的有Thrift、Protocol Buffers和Avro（Hadoop中的），它们被称为“Language Of Data”

<img src="./F-3.png" style="zoom:33%;" />

###### 2.3.2   文件存儲格式

​	常见的存储格式包括**行式存储**和**列式存储**两种：行式存储以**文本格式Text File**、key/value**二进制存储格式Sequence File**为典型代表；

列式存储以**ORC**、**Parquet**和**Carbon Data**三种文件格式为代表

<img src="./F-4.png" style="zoom:33%;" />



###### 3   分布式文件系統

###### 3.1   數據擴容

​	**纵向扩展**(scale-up)：利用**现有的存储系统**，通过不断**增加存储容量**来满足数据增长的需求

​	**横向扩展**(scale-out)：以网络互连的节点为单位**扩大存储容量(集群)**

###### 3.2   文件級別與块級別的分布式文件系統

文件級別存在兩个不足：**难以负载均衡**（文件大小不一致導致難以保證）、**难以并行处理**（多節點并發讀導致存储文件的节点出口网络带宽成为瓶颈）

***块級別就優化了上述的問題***

块級別将文件**分成等大的数据块**(比如128MB)，并以**数据块为单位**存储到**不同节点**上，进而解决文件级别的分布式系统存在的负载均衡和并行处理问题

- Master：负载存储和管理元信息，包含目錄樹與文件块列表
- Slave：存储实际的数据块，并与Master维持心跳信息，汇报自身健康状态以及负载情况等
- Client：用户通过客户端与Master和Slave交互，完成文件系统的管理和文件的读写等

###### 3.3   HDFS

###### 3.3.1   架構

​	HDFS是**块級別**的，采用了**主從結構** 。**主节点**被称为**NameNode**，只有**一个**，管理元信息和所有从节点；

**从节点**称为**DataNode**，通常存在**多个**，存储实际的数据块

<img src="./F-5.png" style="zoom:33%;" />

NameNode：NameNode是HDFS集群管理者，负责**管理文件系统元信息**和**所有DataNode**

DataNode：DataNode**周期性**向NameNode**汇报心跳**以表明自己活着，一旦NameNode发现**某个DataNode出现故障**，会在**其他存活DataNode上重构丢失的数据块**

###### 3.3.2   關鍵技術

**容錯性設計**

1. NameNode故障：HDFS允许为每个Active NameNode分配一个Standby NameNode ，以防止单个NameNode宕机后导致元信息丢失和整个集群不可访问
2. DataNode故障：其他DataNode上會存有副本，NameNode通過其他存活的DataNode上重構丟失的數據
3. 數據块損壞（較驗碼不一致），处理方法同上

###### 3.4   NoSQL

<img src="./F-6.png" style="zoom:33%;" />

<img src="./F-7.png" style="zoom:33%;" />

<img src="./F-8.png" style="zoom:33%;" />

###### 3.4.1   NoSQL的三大理論基石

1. CAP

   C是**一致性**，A是**可用性**，P是**分區容錯性**。

   其核心是一个分布式系统**不可能同时**很好的满足一致性，可用性和分区容错性这**三个需求**， **最多只能同时较好的满足两个**。

   - **CA** ：单点集群，满足一致性，可用性的系统，通常在可扩展性上不太强大。（传统数据库） 

   - **CP** ：满足一致性，分区容错性的系统，通常性能不是特别高。（Redis、MongoDB） 

   - **AP** ：满足可用性，分区容错性的系统，通常可能对一致性要求低一些。（大多数的选择）

2. BASE

   **反ACID模型**，完全不同ACID模型，牺牲高一致性，获得可用性或可靠性

   <img src="./F-9.png" style="zoom:33%;" />

3. 最終一致性

   对于关系型数据库，**强一致性**要求**更新过的数据**能被**后续的访问都能看到**。如果能容忍后续的**部分或者全部访问不到**，则**是弱一致性**。如果**经过一段时间后**要求**能访问到更新后的数据**，则**是最终一致性**。

   **强一致性：**W+R>N

   **弱一致性：**W+R<=N	(W為更新数据时需要**保证写完成的节点数**，R為**读取数据时需要读取的**节点数，N為**数据复制的份数**)

   **最终一致性 = **W+R≤N**+ 异步的数据同步机制**

###### 3.4.2   NoSQL的模型

​	主要有4種

1. **Key-Value**：主要思想主要来自于**哈希表**。（Redis、Riak）
2. **Key-Column**：一个**稀疏**的、**分布式**的、**持久化的多维排序图**，并通过**字典顺序来组织数据**， 支持动态扩展，以达到负载均衡。（BigTable、HBase、Hadoop DB）
3. **Key-Document**：核心思想是**数据用文档(如 JSON)来表示**（MongoDB、CouchDB）
4. **圖模型**：基于图论实现的一种新型NoSQL数据库。它的数据存储结构和数据的查询方式都是**以图论为基础**的（Neo4j）

<img src="./F-10.png" style="zoom:33%;" />



###### 4   分布式存儲

###### 4.1   HBase數據模型

​	HBase数据模型为**逻辑数据模型**和**物理数据存储**，其中逻辑数据模型是用户从数据库所看到的模型，它直接与HBase数据建模相关；物理数据模型是面向计算机物理表示的模型，描述了HBase数据在存储介质（包括内存和磁盘）上的组织结构。

###### 4.2   HBase基本架構

​	采用了经典的**master/slave架构**，与HDFS不同的是，它的**master与slave不直接互连**，而是通过**引入ZooKeeper**让两类服务解耦

- **HMaster**：可以**存在多个**，主HMaster由ZooKeeper动态选举产生，当主HMaster出现故障后，系统可由ZooKeeper动态选举出的新HMaster接管
  - 协调RegionServer：为RegionServer分配region，均衡各RegionServer的负载，发现失效的RegionServer并重新分配其上的region
  - 元信息管理：为用户提供table的增删改查操作
- **RegionServer：**RegionServer负责单个Region的存储和管理（比如Region切分），并与Client交互，处理读写请求
- **ZooKeeper：**ZooKeeper内部存储着有关HBase的重要元信息和状态信息，担任着**HMaster与RegionServer之间的服务协调**角色
- **Client：**Client提供HBase访问接口，与RegionServer交互读写数据，并维护cache加快对HBase的访问速度

###### 4.3   HBase的原理

###### 4.3.1   Region定位

<img src="./F-11.png" style="zoom:33%;" />

###### 4.3.2   RegionServer

1. **BlockCache**：读缓存，负责**缓存频繁读取的数据**，采用了**LRU置换**策略
2. **MemStore**：写缓存，负责**暂时缓存未写入磁盘的数据**，并在写入磁盘前对**数据排序**。每个region内的**每个column family拥有一个MemStore**
3. **HFile**：一种支持**多级索引的数据存储格式**，用于保存HBase表中实际的数据。所有HFile均**保存在HDFS**中
4. **WAL**：即Write Ahead Log，保存在HDFS上的**日志文件**，用于保存那些**未持久化到HDFS中的HBase数据**，以便RegionServer宕机后恢复这些数据

<img src="./F-12.png" style="zoom:33%;" />

*讀流程：先找BlockCache，沒有就找MemStore，再沒有才找HFile*

*寫流程：先寫到WAL中，再寫到MemStore中，到達一定量後刷新到HFile中*

###### 4.3.3   HBase實例

<img src="./F-13.png" style="zoom:33%;" />

###### 4.4   Amazon AWS架構

​	AWS（全局基礎設施）三大概念：**Region**（區域）、**Availability Zone**(可用区)，**Edge Locations**（边缘节点）

每个Region中有多个Availability Zone（可看作數據中心）。Edge Locations是一个内容分发网络，用於降低内容分发的延迟。



###### 5   分布式協調與資源管理

###### 5.1   Zookeeper基本架構

​	ZooKeeper服务通常由**奇数个**ZooKeeper实例构成，其中**一个实例为leader**角色，**其他为follower**角色，它们同时维护了层级目录结构的一个副本，并通过ZAB ( ZooKeeper Atomic Broadcast)协议维持副本之间的一致性。

*因為ZAB協議規定了多數个節點寫成功才算成功，所以由奇數个實例組成會更好，分析如下：*

對於2N＋1个節點，則需N＋1个節點寫成功才算成功，則**可容忍的故障节点数**為N个節點

對於2N＋2个節點，需N＋2个節點寫成功才算成功，則**可容忍的故障节点数**也為N个節點 ＝＝》既然最後剩的數量都一樣，那當然選擇少的節點數，這樣延遲更小嘛

###### 5.2   YARN

###### 5.2.1   設計思想

​	在Hadoop 1.0中，**JobTracker**由**资源管理**（由TaskScheduler模块实现）和**作业控制**（由JobTracker中多个模块共同实现）两部分组成

<img src="./F-14.png" style="zoom:33%;" />

###### 5.2.2   基本架構與原理

​	Yarn总体上采用**master/slave架构**，其中，**ResourceManager为master**，**NodeManager为slave**, ResourceManager负责对各个NodeManager上的资源进行统一管理和调度。当用户提交一个应用程序时，需要提供一个用以**跟踪和管理这个程序的ApplicationMaster**，它负责向ResourceManager**申请资源**，并要求**NodeManager启动可以占用一定资源的任务**，由于不同的ApplicationMaster被分布到不同的节点上，因此它们**之间不会相互影响**

<img src="./F-15.png" style="zoom:33%;" />

- ResourceManager (RM) ：是一个**全局的资源管理器**，负责整个系统的资源管理和分配。由两个组件构成：**调度器(Scheduler)** 和**应用管理器(Applications Manager, ASM)**。

- ApplicationMaster (AM) ：用户提交的每个应用程序均包含一个独立的AM，其**在NodeManager上執行**
- NodeManager (NM) ： NM是**每个节点上的资源管理器**

*YARN提供两种**多租户资源调度器**，分别是Yahoo !开源的**CapacityScheduler**和Facebook 开源的**Fair Scheduler***

###### 5.2.3   工作流程

1.  **提交應用程序**：客戶端向 `ResourceManager` (RM) 提交程式（包含 `ApplicationMaster` 代碼、啟動命令和資源需求）。
2.  **啟動 ApplicationMaster**：RM 分配**第一個 Container**，並通知對應的 `NodeManager` (NM) 在其中啟動 `ApplicationMaster` (AM)。
3.  **AM 註冊**：AM 啟動後向 RM 註冊（使用戶可查看狀態），並開始初始化及準備申請資源。
4.  **資源獲取**：AM 透過 RPC 輪詢向 RM **申請並領取**資源（Container）。
5.  **請求啟動 Container**：AM 拿到資源後，與對應的 NM 通信，請求啟動任務。
6.  **啟動 Container**：NM 設置好運行環境（變量、jar包等），將啟動命令寫入腳本，並通過 `ContainerExecutor` 執行腳本來啟動任務。
7.  **Container 監控**：AM 通過與 RM 的心跳或 Container 的匯報，實時監控任務狀態。若任務失敗，AM 會負責重啟。
8.  **註銷 AM**：應用程序運行完成後，AM 向 RM **註銷**並退出執行，釋放資源。

###### 5.3   资源管理系统 Mesos

<img src="./F-16.png" style="zoom:33%;" />

1. Mesos Master

   是整个系统的核心，负责**管理**整个系统中的**资源和接入**的各种**框架**，并**将Mesos Slave上的资源**按照某种策略**分配给框架**。

   为了防止Mesos Master出现故障后导致集群不可用，**Mesos允许用户配置多个MesosMaster**，并**通过ZooKeeper进行管理**，当主Mesos Master出现故障后，ZooKeeper可马上从备用Master中选择一个提升为新的主Mesos Master

2. Mesos Slave

   Mesos Slave负责**接收并执行来自Mesos Master的命令**，并**定时**将任务执行状态**汇报给Mesos Master**

3. Framework Scheduler

   **Framework是指外部的框架**，如**MPI**、**MapReduce**、**Spark**等， 这些框架可通过注册的方式接入Mesos，以便Mesos进行统一管理和资源分配。一个Framework在Mesos上工作流程为：首先通过自己的调度器**向Mesos注册**，并**获取**Mesos分配给自己的**资源**，然后再由自己的**调度器将这些资源分配给框架中的任务**

4. Framework Executor

   用于**启动框架内部的任务**。由于不同的框架，启动任务的接口或者方式不同，当一个新的框架要接入Mesos时，通常需要指定专有的Executor，以**告诉Mesos如何启动该框架中的任务**

###### 5.4   各代的資源管理系統

​	Google经历的**三代资源调度器**的架构，分别是**中央式调度器架构**( 类似于Hadoop JobTracker，但是支持多种类型作业调度)、**双层调度器架构**(类似于Mesos和YARN)和**共享状态架构**(Omega) 。

1. 集中式调度器的特点是**资源的调度**和**应用程序的管理**功能**全部放到一个进程中完成**，开源界典型的代表是**MRv1 JobTracker**的实现
2. 双层调度器仍保留一个**简化的集中式资源调度器**，但**具体**任务相关的**调度策略**则**下放到各个应用程序调度器**中完成。这种调度器的典型代表是**Mesos**和**YARN**。
3. Omega是一种**基于共享状态的调度器** (Shared State Scheduler)，该调度器**将双层调度器中的集中式资源调度模块简化**成了一些**持久化的共享数据**（状态）和**针对这些数据的验证代码**，这里的“**共享数据**”实际上就是**整个集群的实时资源使用信息**



###### 6   計算引擎

###### 6.1   批处理計算引擎

###### 6.1.1   Mapreduce

​	它主要由两部分组成：**编程模型**和**运⾏时环境**。在其**計算框架**中，分為了**map**和**reduce**兩个組成部分，它們由map task和reduce task組成，**map task**和**reduce task**之間的數據傳輸采用了**pull**模型

Hadoop Reducer提供了5个必選的可編程組件：

1. InputFormat

   用於描述輸入數據的格式。**提供數據split**和**為mapper提供輸入數據的功能**

2. Mapper

   封裝了應用程序的**數據处理**邏輯。

3. Partitioner

   Partitioner的作⽤是对Mapper产⽣的**中间结果**进⾏分⽚，以便将同⼀组的数据交给**同⼀个Reducer**处理，它直接**影响Reduce阶段的负载均衡**。

4. Reducer

   基于Mapper产⽣的**结果**进⾏**规约操作**，产⽣最终结果

5. OutputFormat

   ⽤于描述输出数据的格式，它能够将⽤户提供**key/value对**写⼊**特定格式的⽂件**中

*combiner是一个可選組件，其作用是对Mapper输出结果做⼀个局部聚集，以减少本地磁盘写⼊量和⽹络数据传输量，并减少Reducer计算压⼒*

**Mapreduce的關鍵技術**

- **數據本地性**：盡量將計算任務分配至數據存儲節點以減少網路傳輸

- **推測執行**：在節點故障或執行緩慢時自動重試或啟動備份任務，保證大規模數據處理的高可用性

###### 6.1.2   Spark

​	Spark中的兩个重要概念：RDD（彈性分布式數據集）和DAG

1. RDD

   作⽤在RDD上的操作（或称为“算⼦”）主要分为两类：**transformation**和**action**

   - transformation：其主要作⽤是**将⼀种RDD转换为另外⼀类RDD**，⽐如通过“增加1”的转换⽅式将⼀个RDD[Int]转换成⼀个新的RDD[Int]。常⽤的transformatin操作包括**map**，**filter**，**groupByKey**等
   - action：其主要作⽤是**通过处理RDD得到**⼀个或⼀组**结果**，⽐如将⼀个RDD[Int]中所有元素值加起来，得到⼀个全局和。常⽤的action包括**saveAsTextFile**，**reduce**，**count**等

Spark程序是**惰性执⾏（Lazy Execution）**的，transformation只会记录RDD的转化关系，并不会触发真正的分布式计算，⽽**action才会触发程序的分布式执⾏**



***Spark的運行流程***：

（1）首先为应用**构建**起基本的**运行环境**，即由**Driver创建一个SparkContext**，进行资源的申请 、任务的分配和监控 ；

（2）资源管理器为Executor**分配资源**，并**启动Executor进程**；

（3）SparkContext根据RDD的依赖关系**构建DAG图**，DAG图提交给 DAGScheduler **解析成 Stage** ， 然后把一个个TaskSet提交给底层调度器TaskScheduler处理；Executor向SparkContext 申请Task ， Task Scheduler 将 Task 发放给Executor运行，并提供应用程序代码；

（ 4 ） Task 在 Executor 上运行 ， 把执行结果反馈给TaskScheduler，然后反馈给DAGScheduler，运行完毕后写入数据并释放所有资源。

<img src="./F-17.png" style="zoom:33%;" />

*Spark中資源管理和任務調度是分離的*



**Spark的運行模式**：

1. local：将Driver与Executor均运⾏在本地，⽅便调试
2. standalone：指由⼀个master和多个slave服务组成的Spark独⽴集群运⾏环境，⽽Spark应⽤程序的Driver与Executor则运⾏在该集群环境中

*Spark应⽤程序的运⾏环境由⼀个Driver和多个Executor构成*



**Spark作業的生命周期**：

1. ⽣成逻辑计划：将⽤户程序直接翻译成DAG
2. ⽣成物理计划：根据前⼀阶段⽣成的DAG，按照⼀定的规则进⼀步将之划分成若⼲Stage
3. 调度并执⾏任务：按照依赖关系，调度并计算每个Stage



###### 6.2   流式實時計算引擎

​	流式实时计算引擎分为两类：**⾯向⾏**和**⾯向微批处理**

- **⾯向⾏**的流式实时计算引擎的代表是**Apache Storm**，其典型特点是**延迟低，但吞吐率也低**。
- **⾯向微批处理**的流式实时计算引擎的代表是**Spark Streaming**，其典型特点是**延迟⾼，但吞吐率也⾼**。

###### 6.2.1   Storm基本架構

​	⼀个Storm集群由三类组件构成：**Nimbus**、**Supervisor**和**ZooKeeper**

- Nimbus：**集群管理和调度**组件，通常**只有⼀个**

- Supervisor：**计算**组件，通常有**多个**，负责执⾏实际的**计算任务**

  

***Storm的可靠性實現***

Storm采⽤了**基于acker框架**的可靠性机制，其优势在于，Storm不需要为每个消息保存整个消息树，单个消息只需要**约20个字节**进⾏追踪即可知道是否被完整处理完。Storm acker基本原理如下：

- 为每个**Spout Tuple**保存⼀个64位校验值，初始值为0。

- 每当**Bolt**发射或接收⼀个Tuple，该Tuple的ID（每个Tuple均对应⼀个唯⼀的64位ID）跟这个校验值进⾏异或操作。

- 如果每个Tuple都成功处理完了，则校验值变为0，这意味着⼀个Tuple被完整处理完毕。

如果⼀条消息在**⼀定时间内未处理完**（即校验值仍为**⾮0值**），则Storm认为该**消息丢失**或者**未处理完整**，则由acker通知Spout重新发送数据

###### 6.2.2   Flink

​	任何类型的数据都可以形成⼀种事件流，⽐如信⽤卡交易记录、传感器观测数据、机器⽇志、⽹站或移动应⽤程序上的⽤户交互记录，所有这些数据都形成⼀种流，因此数据可以被作为 **⽆界** 或者 **有界** 流来处理。



**⽆界流：**有定义流的开始，但没有定义流的结束，因此它们会⽆休⽌地产⽣数

- ⽆界流的数据必须**持续处理**，即数据被摄取后需要**⽴刻处理**。

- 处理⽆界数据通常要求以特定顺序摄取事件，例如**事件发⽣的顺序**，以便**保证结果的完整性**

**有界流：**有定义流的开始，也有定义流的结束

- 有界流可以在**摄取所有数据后再进⾏计算**。

- 有界流所有数据可以被排序，所以并**不需要有序摄取**



###### 6.3   圖計算

​	Google的三駕馬車：**GFS**、**Mapreduce**、**BigTable**

後Hadoop時代的新三駕馬車：**Caffeine**、**Dremel**、**Pregel**

###### 6.3.1   Pregel

​	Pregel是⼀种基于**BSP（块同步并⾏计算模型）**模型实现的并⾏图处理系统

BSP中的每个**超步（每一次計算迭代）**包含以下三个組件：

- **局部计算**：每个参与的处理器都有⾃⾝的计算任务
- **通讯**：处理器群相互交换数据
- **栅栏同步**：当⼀个处理器遇到“路障”（或栅栏），会等到其他所有处理器完成它们的计算步骤

以下是一个求最大值的Pregel計算過程

<img src="./F-18.png" style="zoom:33%;" />
