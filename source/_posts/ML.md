---
title: Machine Learning
date: 2025-12-31 08:00:00
categories:
  - junior_first
description: including the basic concept of ML, DL, RL. 
---

---

## Machine Learning

---

###### 1   概述

###### 1.1   機器學習的概念

###### 1.1.1   定義

通過學習數據的內在規律來獲取經驗以及知識，并使用獲取到的經驗來進行預測

###### 1.1.2   Loss函數

1. MSE ： $Loss = \frac{1}{N}\sum_{i=1}^{N}(y_i-\hat{y_i})^2$
2. Cross-Entropy ： $Loss = -\frac{1}{N}\sum_{i=1}^{N}[y_ilog(\hat{y_i}) + (1-y_i)log(1-\hat{y_i})]$



###### 2   幾何模型

###### 2.1   定義

使用幾何特性（線、面）來對樣本的類別進行划分

###### 2.2   幾何模型的常見類型

1. 線性回归
2. 線性分類器（感知機）
3. 支持向量機
4. KNN
5. K-means



###### 3   邏輯模型

###### 3.1   定義

通過邏輯表達式來將實例空間划分

###### 3.2   概念學習

利用某个bool函數的輸入和輸出來預測其學習過程

###### 3.3   FINDS算法

初始化假設 -> 遍歷正例 -> 一般化假設

###### 3.4   决策樹

通過**信息增益**來選擇特征去划分樣本

*$g(D, A) = H(D) - H(D|A)$*



###### 4   模型的評估與選擇

###### 4.1   經驗誤差與泛化誤差

- 經驗誤差指的是訓練時的誤差

- 泛化誤差指的是對於新樣本的誤差（模型沒有見過的樣本）

###### 4.2   過擬合與欠擬合

- 過擬合：訓練集上表現好，**測試集上表現差**
  - 通常是因為數據噪声、數據量少、模型架構過於复雜所導致的
  - **early stop**、**數據增強**、**正則化**、**dropout**等方法可以有效解決過擬合
- 欠擬合：訓練集與測試集上**表現都差**
  - 數據量少、模型結構簡單所導致
  

###### 4.3   數據集的划分

1. 留出法

2. K折交叉驗證法

   *注：該方法訓出的k个模型無法當最終的模型來使用，因為這些模型是沒有使用全量數據集訓出來的，只能用於確定超參數以及評估模型的平均泛化能力*

3. 自助法

###### 4.4   模型的性能度量

*TP、FP、TN、FN：T/F代表模型預測的是正確還是錯誤，P/N代表模型預測的結果是什麼*

1. accuracy：$\frac{TP+TN}{TP+TN+FP+FN}$
2. precision：$\frac{TP}{TP+FP}$     （預測為正中多少真的是正）
3. recall：$\frac{TP}{TP+FN}$     （實際正例中有多少被預測為正）
4. F1-score：$2\times \frac{Precision\times Recall}{Precision+Recall}$



###### 5   計算學習理論

計算學習理論回答了什麼是成功的學習，即能夠以**高概率近似正確地預測新數據**

###### 5.1   PAC（在有限空間下）

###### 5.1.1   PAC可學習

存在足夠的樣本數 m≥M，使得學習器能以至少 1−δ 的概率，輸出一個泛化誤差 E(h) 小於 ϵ 的假設 h。
$$
若要使\quad P(E(h)≤ϵ)≥1−δ \\
則必須\quad m≥\frac{1}{ϵ}(ln∣H∣+ln\frac{1}{δ})
$$

###### 5.1.2   不可知PAC可學習

存在足夠的樣本數 m≥M，使得學習器能以至少 1−δ 的概率，輸出一個假設 h。 h 的泛化誤差 E(h) 相比於假設空間 H 中**最佳假設** h′ 的泛化誤差 minh′∈HE(h′)，只會大 ϵ
$$
P(E(h)−min_{h′∈H}E(h′)≤ϵ)≥1−δ \\
m≥\frac{1}{2ϵ^2}(ln2∣H∣+ln\frac{1}{δ})
$$

###### 5.2   VC（在無限空間下）

VC維用於衡量在無限空間H下的分類能力 ，度量了假設空間的**複雜度**， VC 維越大，假設空間的**表示能力越強**

*任何VC維有限的假設空間都是不可知PAC可學習的*



###### 6   概率模型

*分為判別式概率模式以及生成式概率模型*

###### 6.1   定義

模型的學習任務變為計算變量的概率分布，通過該分布來進行一个預測

###### 6.2   Bayes Theorem

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
$$

###### 6.3   Bayes Decision Theory

基於概率和**誤判損失**來選擇最優行動的決策框架。當loss函數選擇0-1損失時，該選擇就是**最大後驗概率** 準則

###### 6.4   Naive Bayes model

​	基于**贝叶斯定理**与**特征条件独立假设**的分类方法，核心思想是**計算給定輸入樣本 $X$ 下，屬於各個類別 $y$ 的後驗概率 $P(y|X)$，並取概率最大的類別作為預測結果**

​	設輸入樣本 $X = \{x_1, x_2, ..., x_n\}$ 為 $n$ 維特徵向量，類別集合為 $Y = \{c_1, c_2, ..., c_k\}$。

根據貝葉斯定理，後驗概率為：
$$
P(c_k | X) = \frac{P(X | c_k) P(c_k)}{P(X)}
$$

*   $P(c_k)$：**先驗概率**， $c_k$ 在數據集中出現的概率。
*   $P(X | c_k)$：**似然概率**，即在類別 $c_k$ 下，出現特徵組合 $X$ 的概率。
*   $P(X)$：**證據**，對於所有類別來說都是常數，比較大小時可忽略。

由於直接計算聯合概率 $P(x_1, x_2, ..., x_n | c_k)$ 非常困難（參數爆炸），我們引入獨立假設：
$$
P(X | c_k) = P(x_1, x_2, ..., x_n | c_k) = \prod_{i=1}^{n} P(x_i | c_k)
$$
將上述兩步結合，樸素貝葉斯分類器的預測公式為：
$$
\hat{y} = \arg\max_{c_k} \left( P(c_k) \prod_{i=1}^{n} P(x_i | c_k) \right)
$$
*由於分母是相同的，所以我們一般使用**联合概率與先驗概率**的乘積來决定預測的結果*



​	訓練模型的本質就是利用訓練集統計上面的 $P(c_k)$ 和 $P(x_i | c_k)$。

1. 先驗概率 $P(c_k)$
   1. $$P(c_k) = \frac{\text{類別 } c_k \text{ 的樣本數}}{\text{總樣本數}}$$
2. 條件概率 (似然) $P(x_i | c_k)$
   1. 根據特徵類型不同，計算方式不同：
      1. **離散特徵 (多項式模型)**：
         $$P(x_i = a | c_k) = \frac{\text{類別 } c_k \text{ 中特徵 } i \text{ 取值為 } a \text{ 的樣本數}}{\text{類別 } c_k \text{ 的總樣本數}}$$
         1. **拉普拉斯平滑 (Laplace Smoothing)**：防止頻率為 0 導致整體概率為 0。
            $$P(x_i = a | c_k) = \frac{N_{a,k} + \lambda}{N_k + \lambda \times S_i}$$
            ($\lambda=1$, $S_i$ 為特徵 $i$ 可能取值的數量)
      2. **連續特徵 (高斯模型)**：
         假設特徵服從高斯分佈，計算該類別下特徵的均值 $\mu_{k,i}$ 和方差 $\sigma^2_{k,i}$：
         $$P(x_i | c_k) = \frac{1}{\sqrt{2\pi\sigma^2_{k,i}}} \exp\left(-\frac{(x_i - \mu_{k,i})^2}{2\sigma^2_{k,i}}\right)$$

###### 6.5   Logistic regression

处理分類問題的線性模型，使用非線性映射函數sigmoid來轉換為概率分布

$$
P(y=1|x) = \frac{1}{1+e^{-(\omega \cdot x + b)}}
$$
在樣本為x的情況下，輸出為正例的對數概率



###### 7   Convolutional Neural Network

###### 7.1   Definition

每一層的響應由上一層的局部感受野的激發而得到，具有參數共享、局部連接、平移不變性

###### 7.2   Convolution Layer

*用於提取圖像的特征*

###### 7.2.1   calculation of Output size

$$
N_{out}=\frac{N_{in}-K+2P}{S}+1
$$

輸出的channels數由filters數量决定

###### 7.2.2   calculation of parameters

$$
parameters = (\text{Kernel}_H \times \text{Kernel}_W \times C_{in} + 1) \times C_{out}
$$

###### 7.3   Pooling Layer

*降維操作，to reduce parameter*

###### 7.3.1   calculation of Output size

$$
N_{out}=\frac{N_{in}}{\text{pooling}_{size}}
$$

###### 7.3.2   calculation of parameters

pool層沒有可學習的參數，為0

###### 7.4   Fully-Connecting Layer

將Convolution後的最終結果進行一个維度變換，以送入softmax中得到概率分布

###### 7.4.1   calculation of parameters

$$
parameters =(N_{in} + 1) \times N_{out}
$$

###### 7.5   LeNet5

該網絡是一个8層結構，包括C1, S2, C3, S4, C5, F6, F7, F8， 每个Layer的參數設定如下：

1. C1 ： Kernel **$5 \times 5$**, Stride **1**, Filters **6**, Padding **0**
1. S2（AvgPool）：$\text{size}=2\times2 \quad stride=2$
1. C3 ： Kernel **$5 \times 5$**, Stride **1**, Filters **16**, Padding **0**
1. S4：$\text{size}=2\times2 \quad stride=2$
1. C5 ： Kernel **$5 \times 5$**, Stride **1**, Filters **120**, Padding **0**
1. F6 ： $5\times5\times120 -> 120$
1. F7 ： $120->84$
1. F8 ： $84->classes$



###### 8   RNN

序列模型的输出除了和当前模型的输入有关，还和过去的输入以及输入的顺序有关，因此需要将**前一时刻网络的状态引入到当前时刻的输入**，这种思想导致了RNN的最终诞生

###### 8.1   RNN的兩種主要的模型

1. LSTM
   1. 遺忘門
   2. 輸入門
   3. 輸出門
2. GRU



###### 9   集成學習

###### 9.1   Definition

若一个學習器的正確率只比亂猜準一點點，則該學習器為一个弱學習器，集成學習就是將多个弱學習器組合起來，形式一个強學習器

###### 9.2   Bagging

- 自助采樣且并行訓練每个學習器，最後再集成（分類用投票、預測用均值）
- 解决**過擬合**的問題

###### 9.3   Boosting

- 串行訓練，一个分類準確率高的放在後面用於糾正前一个學習器的錯誤
- 解决**欠擬合**的問題



###### 10   Attention機制

###### 10.1   Attention公式

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$



###### 10.2   Attention的計算

$$
Q = XW^Q, \quad K = XW^K, \quad V = XW^V\\
$$

$$
\text{Score} = Q \cdot K^T
$$

$$
\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{n} e^{z_j}}
$$

$$
A = \text{softmax}(Score)
$$

$$
Z = A \times V
$$

*Q 為query， K 為每个東西的Keyword，V 為每个東西的實際內容。Score為query對所有東西的關注度*



###### 11   Reinforce Learning

###### 11.1   RL的概念

1. agent通過不斷的試錯與environment交互，目標是最大化累積回報
2. MDP的4要素：
   1. Action
   2. Reward
   3. State
   4. 折扣因子

*通過不斷的試錯來更新Q值，最大化累積回報*

###### 11.2   價值函數的計算方法

1. 蒙特卡洛方法（MC）

   完成一个完整的episode後才會更新。無偏估計、方差大、收斂慢

2. 時間差分法（TD）

   step-by-step，走一步更新一步。有偏估計、方差小、收斂快。**利用reward以及next state可獲的value來修正原來的Q-value**


###### 11.3   Q-Learning算法（走到下一步後基於reward以及new state後更新上一步的Q值）

1.  **初始化**：Q 表全為 0
2.  **選擇：基於當前狀態 $S$，用 **$\epsilon$-greedy** 策略選一個動作 $A$（有 $\epsilon$ 機率瞎蒙，有 $1-\epsilon$ 機率查表選最大的Q值）
3.  **執行**：執行動作 $A$，**環境**告訴你獎勵 $R$ 和新狀態 $S'$
4.  **更新**：
    *   看一眼新狀態 $S'$，找出那裡**理論上最大的 Q 值** 是多少（$\max Q(S', a')$）
    *   用 TD 公式算出目標值：$Target = R + \gamma \max Q(S', a')$
    *   修正舊的 $Q(S, A)$ 向目標值靠近
5.  **循環**：把 $S'$ 當作新的 $S$，重複步驟 2，直到 Q 表不再劇烈變化（收斂）

​	初始化Q表為全0，agent隨機采取一个action，并使用TD來計算其Q值并更新Q表。隨後每次有$\epsilon$的概率隨機選擇一个action以及$1-\epsilon$的概率查Q表并采取Q值最大的那个action，不斷重覆該步驟直至Q表收斂

*Q值是Reward＋future predict*	＝》$\quad Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma \mathbf{\max_{a'} Q(s', a')} - Q(s, a)]$

###### 11.4   Q-Learning與SARSA的區別

- Q-Learning：理論最優解，到達next state後會predict你選最優的下一个action（無論你最終選沒選那个最優的），并用最優的來計算上一步的Q-value
  - 收斂慢，但會得到最優解
  - $Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma \mathbf{\max_{a'} Q(s', a')} - Q(s, a)]$
  - off-policy
- SARSA：考慮實際的選擇，計算時必須基於next state的action來更新上一步的Q-value
  - 收斂快，會得到一个次優解，更安全
  - $Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma \mathbf{Q(s', a')} - Q(s, a)]$
  - on-policy

###### 11.5   RL與有監督學習對比

- 监督学习有样本和标签， 学习的过程是找到一种映射， 能够很好的**拟合样本**和标签。

- 强化学习， 问题中有**状态**、**动作**和**单步回报**。 学习的过程需要**不断产生数据**（采样本）， 基于样本找到在特定状态下的最佳动作（用价值来评估）， 以使得最终的回报**(累积回报）最大化**。
