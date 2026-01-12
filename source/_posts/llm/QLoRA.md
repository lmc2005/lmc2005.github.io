---
title: QLoRA微調Qwen-2.5-7B-Instruct
date: 2025-11-27 18:42:00
tags: llm
categories:
  - llm_sft
description: About this article, I introduced from scratch how to fine-tune the Qwen2.5-7B-Instruct model with QLoRA.
---
## QLoRA微調Qwen-2.5-7B-Instruct

### 1. 準備工作

- 在智星雲上租賃顯卡，本項目采用的是RTX 3090（單GPU，24G RAM）的配置，CPU不作要求（>＝8核＋16G即可），太低會導致對數據的处理導入等操作太慢
  - 鏡像采用Ubantu22.04
- 準備數據集，本項目采用huggingface的**alpaca_gpt4_zh**數據集



### 2. 初始化環境配置

1. ssh登入服務器
2. 使用`git clone https://github.com/hiyouga/LLaMA-Factory.git`命令clone llama-factory倉庫到本地
3. `conda create -n llama_factory python=3.10`創建一个conda環境
4. 進入conda環境并執行`pip install -e '.[torch,metrics]'`安裝所有需要的庫
5. 檢查環境配置是否成功

~~~python
import torch

device = torch.cuda.current_device()
print(device)

torch.cuda.get_device_name(device)

torc.__version__
~~~

<img src="./1.png" style="zoom:33%;" />

使用`llamafactory-cli train -h`來檢查llama-factory基礎庫安裝是否正確，有大量輸出指導即為成功



### 3. 模型與數據集準備

#### 3.1 模型準備

##### 方法一

由於模型普遍較大，無法直接使用`git clone`來獲取，需先下載Git LFS再clone。

~~~bash
sudo apt-get update
sudo apt-get install git-lfs

# 啟用 LFS
git lfs install
~~~

隨後在LLaMA-Factory目錄中創建一个名為model的目錄用於存放模型，再在該目錄中執行`git clone https://huggingface.co/Qwen/Qwen2.5-7B-Instruct`即可

Att：模型會放到model目錄中，日後模型的路徑要使用絕對路徑`-model_name_or_path model/Qwen2.5-7B-Instruct`



##### 方法二（推薦）

在git clone不成功的情況下，可在服務器使用huggingface_cli來下模型

首先下載huggingface-_cli和hf_transfer

~~~sh
pip install huggingface-hub==0.35.0
export HF_HUB_ENABLE_HF_TRANSFER=1
~~~

進入model目錄執行`hf download Qwen/Qwen2.5-7B-Instruct --local-dir Qwen2.5-7B-Instruct`



##### 方法三

在本地下載并上傳到服務器

~~~bash
pip install huggingface-hub hf_transfer
export HF_HUB_ENABLE_HF_TRANSFER=1
hf download Qwen/Qwen2.5-7B-Instruct --local-dir D:/models/Qwen2.5-7B-Instruct
~~~

執行`tar -czvf qwen2.5-7b-instruct.tar.gz Qwen2.5-7B-Instruct/`壓縮文件

隨後執行`scp -P 21824 qwen2.5-7b-instruct.tar.gz root@js1.blockelite.cn:/root/LLaMA-Factory/model/`上傳至服務器的model目錄中



> 建議使用huggingface直接在服務器上下，本地下再上傳會很慢，壓縮和解縮很慢，因為模型的參數大多都是不同的浮點數，沒有重复的所以壓縮完文件也很大



#### 3.2 模型測試

***（方法一）***

在LLaMA-Factory目錄中創建一个`test_qwen.sh`，內容如下

~~~sh
#!/bin/bash

# --- 1. 環境設定 ---
export CUDA_VISIBLE_DEVICES=0

# --- 2. 啟動 LLaMA-Factory 命令行推理/聊天界面 ---
llamafactory-cli chat \
    --model_name_or_path model/Qwen2.5-7B-Instruct \
    --template qwen \
    --quantization_bit 4
~~~

注意\後不可有空格

在執行bash前要在conda環境下執行`pip install bitsandbytes>=0.39.0`

使用`chmod +x test_qwen.sh`賦予執行權限，并執行`bash test_qwen.sh`



***（方法二）***

創建infer.yaml文件，內容如下：

~~~yaml
model_name_or_path: /root/LLaMA-Factory/model/Qwen2.5-7B-Instruct
template: qwen
do_sample: false
~~~

執行`llamafactory-cli chat infer.yaml`即可



> 建議統一使用yaml來執行訓練、評估、測試。因為.sh腳本常常會報錯。



#### 3.3 數據集準備

直接在訓練腳本中指定dataset即可，huggingface會自動下載，若要自定義數據集那就得手動上傳到服務器并在dataset中指定其路徑



### 4. 模型訓練

##### 4.1 tmux中启動模型訓練

使用`tmux new -s qwen_train`開启一个tmux會話并在此進行訓練，使用Ctrl ＋ B 後點D可退出，但該會話仍會繼續進行

`tmux ls`可查看所有tmux會話

使用`tmux attach -t qwen_train`可恢復該會話并查看訓練情況



在LLaMA-Factory目錄中創建`train.yaml`，內容如下：

~~~yaml
model_name_or_path: /root/LLaMA-Factory/model/Qwen2.5-7B-Instruct # [基礎模型]：指定用於微調的原始模型文件夾路徑。

### method
stage: sft                        # [訓練階段]：指定為 SFT（監督式微調）。
do_train: true                    # [執行訓練]：確保程式進入訓練模式。
finetuning_type: lora             # [微調類型]：使用 LoRA (Low-Rank Adaptation) 參數高效微調。
quantization_bit: 4               # [量化位數]：設置為 4-bit，啟用 QLoRA，極大節省 VRAM。
lora_rank: 8                      # [LoRA 秩]：定義 LoRA 矩陣的維度。秩越高，表達能力越強。
lora_target: all                  # [目標模塊]：對模型中所有合適的層（如 QKV 矩陣）應用 LoRA。

dataset: alpaca_gpt4_zh           # [數據集名稱]：指定用於訓練的數據集名稱。
template: qwen                    # [對話模板]：指定用於預處理和模型輸入輸出的 Qwen 模型專有模板。
cutoff_len: 1024                  # [序列最大長度]：模型能處理的最大 token 數量。
#max_samples: 1000                # [最大樣本數]：如果取消註釋，將只使用數據集的前 1000 條樣本。
overwrite_cache: true             # [覆蓋緩存]：每次運行時重新處理數據集，覆蓋舊的緩存文件。
preprocessing_num_workers: 16     # [預處理線程數]：設定用於數據預處理的 CPU 工作進程數量。

### output
output_dir: output                # [輸出目錄]：訓練結果（Checkpoints、日誌等）將被保存的目錄
logging_steps: 10                 # [日誌記錄步數]：每訓練 10 步（10次權重更新），記錄一次當前的訓練損失 
save_steps: 1000                  # [檢查點保存步數]：每訓練 1000 步，保存一次模型Checkpoint
plot_loss: true                   # [繪製損失圖]：訓練結束後生成損失曲線圖（例如 `training_eval_loss.png`）
overwrite_output_dir: true        # [覆蓋輸出目錄]：允許覆蓋 `output_dir` 中的舊文件

### train
per_device_train_batch_size: 1    # [單卡即時批次大小]：單張 GPU 每次實際處理的樣本數（設為 1 以節省 VRAM）。
gradient_accumulation_steps: 16   # [梯度累積步數]：累積 16 個批次的梯度後，才進行一次權重更新。
# 組合得出：有效批次大小為 1 * 16 = 16。
learning_rate: 1.0e-5             # [學習率]：模型在每次優化步驟中更新權重的幅度。
num_train_epochs: 2.0             # [訓練週期數]：整個訓練集將被模型完整掃描 2 次。
lr_scheduler_type: cosine         # [學習率調度器]：採用餘弦 (Cosine) 衰減策略，使學習率平滑下降。
warmup_ratio: 0.1                 # [預熱比例]：訓練開始時，前 10% 的總步數用於學習率預熱。
fp16: true                        # [混合精度訓練]：啟用 FP16 混合精度計算，加速訓練和節省顯存。
ddp_timeout: 180000000            # [分佈式訓練超時]：多卡訓練時的通信超時時間（單卡訓練中無關）。

### eval
val_size: 0.1                     # [驗證集大小]：將 10% 的訓練數據分離出來作為驗證集。
per_device_eval_batch_size: 1     # [單卡評估批次大小]：評估時單卡處理的樣本數。
eval_strategy: steps              # [評估策略]：按照訓練步數進行週期性評估。
eval_steps: 500                   # [評估步數]：每訓練 500 步，就在驗證集上執行一次完整的評估。
~~~

在LLaMA-Factory目錄下執行`llamafactory-cli train train.yaml` 即可開始訓練。



##### 4.2 顯卡監控

*在訓練時可使用`nvidia-smi`來查看顯卡的運行情況*

<img src="./3.png" style="zoom:33%;" />

- Perf 代表顯卡的性能狀態由P0-P12性能逐漸減弱
- 從Memory-Usage可看出目前顯存已占用了8G
- GPU-Util 代表GPU的利用率
- 下面的Processes代表每个進程的情況



##### 4.3 訓練輸出解析

<img src="./2.png" style="zoom:33%;" />

- `Num examples`為數據集樣本總量，在`yaml`文件中可設置`max_examples`，不設置默認全集訓練
- `Num Epochs`表示循環整个數據集的次數，即在同一數據集上訓練n次
- `Instantaneous batch size per device`表示每次送入（單張）GPU顯存的實際樣本數，設置過大會出現OOM現象（out of memory）
- `Gradient Accumulation steps`表示累積梯度的步數，即累積多少个step的梯度才反向傳播一次更新參數
- `Total train batch size`（***Effective Batch size***） ＝單卡批次大小×累積步數×卡數
  - 這是實際訓練中每次從數據集中抽取用於訓練的樣本數
- `Number of trainable parameters`為可訓練的參數量
- `Total optimization steps`（***Iteration***） 為總權重更新次數，即整個訓練過程中，模型權重將被更新的總次數。
  - $$\frac{總樣本數}{有效批次大小}$$×Num Epochs



### 5. 參數合并

`LLaLM-Factory/output`中可查看checkpoint，checkpoint保存了第k个step（指的是optimization steps）的模型參數，在該目錄下執行

`grep "eval_loss" trainer_log.jsonl`可查看checkpoint的eval_loss，選擇loss最小的Adapter，并在`LLaMA-Factory`目錄下創建`export.yaml`文件

~~~yaml
# export.yaml 導出配置文件
model_name_or_path: /root/LLaMA-Factory/model/Qwen2.5-7B-Instruct # 原始模型路徑
adapter_name_or_path: output_new/checkpoint-XXX # <--- 新的 Checkpoint 路徑
template: qwen
export_dir: merged_models/qwen2.5-7b-lora-merged # 最終合併模型的輸出目錄
export_device: cpu                             # 推薦使用 CPU 進行合併
export_legacy_format: false
~~~

執行`llamafactory-cli export export.yaml`隨後會將base model與Adapter合并後

保存在`/root/LLaMA-Factory/merged_models/qwen2.5-7b-lora-merged`中



### 6. 模型評估

~~~bash
llamafactory-cli eval --task mmlu --model_name_or_path /root/LLaMA-Factory/model/Qwen2.5-7B-Instruct --template qwen --batch_size 1 –n_shot 5
~~~

執行該命令可使該模型在mmlu上做評測



### 7. 模型保存

使用`scp -P 21824 root@js1.blockelite.cn:/root/LLaMA-Factory/output/training_loss.png ~/Desktop/`可在本地上將服務器中的數據拉到本地

先在服務器上壓縮微調過的模型的文件，再用scp命令傳到本地



---



## QLoRA與LoRA對比

> QLoRA本質上與LoRA是一樣的原理，但QLoRA會對模型參數進行量化，以降低對VRAM的需求
> **其實就是用計算時間換取顯存空間**

- QLoRA首先會將原始模型權重從 16-bit 壓縮到 **4-bit** 進行儲存（NF4），NF4量化時每組權重會對應一个**縮放因子**和**零點**用於解量化。

- 與此同時會進行二次量化（DQ）**將這些量化常數（縮放因子和零點）再次進行量化**。

- 分頁優化器：使用 CUDA 的統一內存功能，自動在 **GPU 顯存**和**主機 CPU 內存**之間，根據需求交換優化器狀態的內存頁面。
  - 優化器為模型的**每個可訓練參數**都儲存一組 m（動量） 和 v（方差） 數值，以用於計算模型參數的下一次更新。所以它會占用很多的VRAM
