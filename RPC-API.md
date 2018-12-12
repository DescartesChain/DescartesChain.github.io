## 快速启动
笛卡尔融云链的节点程序名字叫：**dcarjs**   
**启动方法**  
```bash
./dcarjs
```
**更改数据存储目录**  
```bash
dcarjs --datadir  // 不指定，默认存储在 home/.dcarchain/
```
**同步模式**
```bash
dcarjs --syncmode {"fast", "full"}
fast 快速同步数据
full 全同步数据
light 轻节点
```
**存档模式**
```bash
dcarjs --gcmode {"full", "archive"} //默认：full
full 默认值
archive 保存所有交易历史数据
```
**标识主机**
```bash
 dcarjs --identity  
```
其它参数无需指定，以上所有参数都是可选。

## 关于 JSON RPC API

笛卡尔链采用[JSON](http://json.org/)交换数据,它可以表示数字、字符串、值的有序序列和名称/值对的集合,是一种轻量级的数据交换格式,[JSON-RPC](http://www.jsonrpc.org/specification) 是一个轻量级远程过程调用(RPC)协议.这个规范主要定义了一些数据结构和它们的处理规则.它使用JSON作为数据格式.



## JSON-RPC 终端

默认 JSON-RPC 节点: http://localhost:4242

你可以使用`--rpc`,启动 HTTP JSON-RPC
```bash
dcarjs --rpc
```
rpcapi支持如下参数

```bash
--rpcapi    
admin,dcar,miner,net,personal
```

更改默认端口 (4242) 并监听地址 (localhost):

```bash
dcarjs --rpc --rpcaddr <ip> --rpcport <portnumber>
```

如果使用浏览器访问 RPC, 需要开启 CORS（跨域资源共享）否则,JavaScript调用将受到同源策略的限制,导致请求失败:

```bash
dcarjs --rpc --rpccorsdomain "http://localhost:4242"
```


## 十六进制值编码

目前有两种传递给JSON的关键数据类型:未格式化的字节数组（unformatted byte arrays）和数量（quantities）.两者都是通过十六进制编码传递的,但是对格式的要求不同:

当编码**quantities**时(整数,数字):编码为十六进制,前缀为“0x”,最紧凑的表示(一个例外:"0"表示为“0x0”).示例:
- 0x41 (十进制 65 )
- 0x400 (十进制 1024 )
- 错误: 0x (至少应该具备1位数字 - "0" is "0x0")
- 错误: 0x0400 (不允许有前导零,除了"0x0",其他十六进制数字不能以"0"开头)
- 错误: ff (必须加"0x"前缀)

当编码**UNFORMATTED DATA** (字节数组,hash 值,字节代码数组时）: 编码为十六进制,前缀为“0x”,每个字节有两个十六进制数字. 示例:
- 0x41 (size 1, "A")
- 0x004200 (size 3, "\0B\0")
- 0x (size 0, "")
- 错误: 0xf0f0f (数字必须是偶数)
- 错误: 004200 (必须加"0x"前缀)

**UNFORMATTED DATA** 还有一种情况,账户地址要加前缀 "Dc",示例：
- Dc30b53866764cf392208c838e387fa64a303e18dc

账户地址以 Dc 开头，输入地址时：支持`Dc`或`dc`, 输出时默认`dc`.

## 默认区块参数

下面这些方法都包含额外的默认区块参数

- [dcar_getBalance](#dcar_getbalance)
- [dcar_getTransactionCount](#dcar_gettransactioncount)
- [dcar_call](#dcar_call)


默认区块参数有以下选项：

- `HEX String` - 查询区块编号
- `String "earliest"` 最早的/创世区块
- `String "latest"` - 最新开采的区块
- `String "pending"` - 挂起状态/交易

## Curl 示例说明
文档中我们用curl调用 rpc 接口, 需要加  `-H "Content-Type: application/json"`，尾部指定调用的地址`localhost:4242`。你也可以用别的方式来调用 RPC 接口.


## JSON-RPC 方法

* [personal_newAccount](#personal_newAccount)
* [personal_unlockAccount](#personal_unlockAccount)
* [dcar_accounts](#dcar_accounts)
* [dcar_blockNumber](#dcar_blocknumber)
* [dcar_getBalance](#dcar_getbalance)
* [dcar_gasPrice](#dcar_gasprice)
* [dcar_getTransactionCount](#dcar_gettransactioncount)
* [dcar_getBlockTransactionCountByHash](#dcar_getblocktransactioncountbyhash)
* [dcar_getBlockTransactionCountByNumber](#dcar_getblocktransactioncountbynumber)
* [dcar_sendTransaction](#dcar_sendtransaction)
* [dcar_sendRawTransaction](#dcar_sendrawtransaction)
* [dcar_call](#dcar_call)
* [dcar_estimateGas](#dcar_estimategas)
* [dcar_getBlockByHash](#dcar_getblockbyhash)
* [dcar_getBlockByNumber](#dcar_getblockbynumber)
* [dcar_getTransactionByHash](#dcar_gettransactionbyhash)
* [dcar_getTransactionByBlockHashAndIndex](#dcar_gettransactionbyblockhashandindex)
* [dcar_getTransactionByBlockNumberAndIndex](#dcar_gettransactionbyblocknumberandindex)
* [dcar_getTransactionReceipt](#dcar_gettransactionreceipt)
* [dcar_getLogs](#dcar_getlogs)


## JSON RPC API 引用方法

***
#### personal_newAccount("passphrase")
创建新的账户地址
##### 参数
1. `passphrase` - 账户的密码

##### 返回值
`DATA`, 一个20字节的账户地址
##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"  --data
'{"jsonrpc":"2.0","method":"personal_newAccount","params":["test1234"],"id":1}' localhost:4242

// // 输出结果
{
  "jsonrpc": "2.0",
      "id": 1,
      "result": "Dc3bda2aaeec89e41dd5e9bf8f1895d1947366cc66"
}
```


***
#### personal_unlockAccount
解锁用户账户
##### 参数
`address`，输入一个20字节的账户地址  
`password`, 在这里输入对应账户地址的私钥文件的密码  
`time`, 输入一个整数，账户解锁时间周期，单位是秒

#### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["dc6c432c3801df594ce3991721db92cf81664a9c69", "test1234", 300],"id":1}' localhost:4242
// 返回
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": true
}
```
***
#### dcar_accounts

输出当前客户端拥有的地址列表


##### 参数
无特定参数

##### 返回值

`Array of DATA`, 客户端拥有的地址

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_accounts","params":[],"id":1}' localhost:4242

// // 输出结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["Dc30b53866764cf392208c838e387fa64a303e18dc"]
}
```

***

#### dcar_blockNumber

输出最近的区块编号

##### 参数
无特定参数

##### 返回值

`QUANTITY` 输出客户端当前的最高区块编号
##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_blockNumber","params":[],"id":83}' localhost:4242

// 输出结果
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x7dc8" // 32200
}
```

***

#### dcar_getBalance

返回指定地址的余额

##### 参数

1. `DATA`, 要查询的地址,长度20字节
2. `QUANTITY|TAG` - 区块编号的整数, 或者字符串 `"latest"`, `"earliest"` or `"pending"`, 下边是 参数示例

```js
params: [
   'Dc30b53866764cf392208c838e387fa64a303e18dc',
   'latest'
]
```

##### 返回值

`QUANTITY` 会返回一个当前的整数余额

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_getBalance","params":["Dc30b53866764cf392208c838e387fa64a303e18dc", "latest"],"id":1}' localhost:4242

// // 输出结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x668a0" // 420000
}
```

***
#### dcar_gasPrice


返回当前的 gas 价格

##### 参数
无
##### 返回值

`QUANTITY` - 一个当前gas 价格的整数


##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_gasPrice","params":[],"id":73}' localhost:4242

// 输出结果
{
  "id":73,
  "jsonrpc": "2.0",
  "Result": "0x09184e72a000" // 10000000000000
}
```

***

#### dcar_getTransactionCount

返回指定地址发起的交易数量

##### 参数

1. `DATA`,  20字节的账户地址
2. `QUANTITY|TAG` 区块编号,或者字符串：`"latest"`, `"earliest"` or `"pending"`, 参数示例
```js
params: [
   'Dc30b53866764cf392208c838e387fa64a303e18dc',
   'latest' // 最近开采出的区块
]
```

##### 返回值

`QUANTITY` 返回一个整数值,当前这个地址发起的交易数量
##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_getTransactionCount","params":["Dc30b53866764cf392208c838e387fa64a303e18dc","latest"],"id":1}' localhost:4242

// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

***


***

#### dcar_getBlockTransactionCountByNumber

指定一个区块号,查询这个区块里的交易数量

##### 参数

1. `QUANTITY|TAG` - 16进制的区块编号, 或者字符串 `"earliest"`, `"latest"` or `"pending"`, 示例如下

```js
params: [
   '0x7b', // 123
]
```

##### 返回值

`QUANTITY` 区块内该交易的编号

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_getBlockTransactionCountByNumber","params":["0x7b"],"id":1}' localhost:4242

// 输出结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa" // 10
}
```



***

#### dcar_sendTransaction

发起一笔交易或者创建一个合约

##### 参数

  - `Object` 交易对象（可不填）
  - `from`: `DATA`, 发起转账的20字节地址
  - `to`: `DATA`, 接受转账的20字节地址, (如果是创建合约,此项可不填)
  - `gas`: `QUANTITY`  转账手续费 (可不填, 默认: 90000),用于支付给矿工,用不完的部分会退回.
  - `gasPrice`: `QUANTITY`  - gas价格(可选的, 默认: 由可参与打包的矿工数量和等待打包的交易数量来决定)
  - `value`: `QUANTITY`  - 转账金额
  - `data`: `DATA`  如果这笔交易是为了创建一个合约,在这个部分填写合约代码.
  - `nonce`: `QUANTITY`  - (可选的)一个随机数. 如果用户的上一笔交易处于挂起状态,可以在这填写一个与挂起交易相同的随机数,可覆盖之前那笔挂起的交易.

```js
params: [{
  "from": "Dcb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "Dcd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x7d00", // 32000
  "gasPrice": "0x3b9aca00", // 1000000000
  "value": "0x7d0", // 2000
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f07246cceb"
}]
```

##### 返回值

`DATA`, 交易创建成功则返回一个 32 字节的交易 hash 值,如果交易不成功,则不返回任何值

使用 [dcar_getTransactionReceipt](#dcar_gettransactionreceipt) 可以获得创建的合约地址, 前提是这笔交易已经被确认.

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_sendTransaction","params":[{see above}],"id":1}' localhost:4242

// 输出结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d15f6ac3"
}
```

***

#### dcar_sendRawTransaction

Creates new message call transaction or a contract creation for signed transactions.
为已签名的交易创建一个新交易或者一个合约

##### 参数

1. `DATA`, 已签名的32字节交易地址

```js
params: ["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"]
```

##### 返回值

`DATA`, 返回一个32字节的合约hash 地址,如果合约未生效,则不返回任何值

使用 [dcar_getTransactionReceipt](#dcar_gettransactionreceipt) 可以获得已创建的合约地址, 前提是这笔交易已经被确认.

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_sendRawTransaction","params":[{see above}],"id":1}' localhost:4242

// 输出结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": " 0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d15c64b9 "
}
```

***

#### dcar_call

不发起交易的情况下,立即在区块链上执行一条新的**消息调用**（message call）

##### 参数

  - `Object` - 消息调用对象
  - `from`: `DATA`, (选填)20字节的发起人地址
  - `to`: `DATA`, 20字节的用于接受交易的地址
  - `gas`: `QUANTITY`  - (选填) 交易手续费,用于保证交易执行, dcar_call 通常不需要花费gas, 但这个参数在某些情况下是有必要的.
  - `gasPrice`: `QUANTITY`  - (选填)  gas 的价格
  - `value`: `QUANTITY`  - (选填) 转账金额,dcar_call不需要填写此项
  - `data`: `DATA`  - (选填)填写 签名方法的 hash 值和代码

  - `QUANTITY|TAG` - 区块编号, 或者字符串： `"latest"`, `"earliest"` or `"pending"`

##### 返回值

`DATA` - 返回已执行的合约的值

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_call","params":[{see above}],"id":1}' localhost:4242

// 输出结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

***

#### dcar_estimateGas

生成并返回一个确保交易完成的 gas 数量,这个数量可能会大大超过完成一笔交易实际所需要的手续费价格,仅仅是一个参考价.

##### 参数

和 [dcar_call](#dcar_call) 参数相同,但每个参数都是选填的.如果不填任何参数,会默认使用挂起区块的 gas 数量. 但要注意,这个数量可能不够完成一笔交易,建议用户交易时在这个基础上增加一些 gas 数量.
##### 返回值

`QUANTITY` - gas 数量

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"   --data '{"jsonrpc":"2.0","method":"dcar_estimateGas","params":[{see above}],"id":1}' localhost:4242

// 输出结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

***

#### dcar_getBlockByHash

通过区块的 hash 值返回区块信息


##### 参数

1. `DATA`, 32字节的区块hash 值
2. `Boolean` - 如果结果为『true』,返回该区块的全部交易数据；如果结果为『flase』,只返回交易的 hash 值.

```js
params: [
   '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d15c64b9 ',
   true
]
```

##### 返回值

`Object` - 返回区块数据,  如果找不到该区块则返回`null`

  - `number`: `QUANTITY` - 区块编号. 如果区块挂起该项返回 `null` .
  - `hash`: `DATA`, 32字节的区块哈希值. 如果区块挂起该项返回`null`
  - `parentHash`: `DATA`, 32字节的父块哈希值
  - `nonce`: `DATA`, 8字节的用于工作量证明的 hash 值 ,如果区块挂起该项返回 `null`
  - `transactionsRoot`: `DATA`, 32 字节的交易根数据
  - `stateRoot`: `DATA`, 32 字节的区块状态根数据
  - `receiptsRoot`: `DATA`, 32字节的区块收据根数据
  - `miner`: `DATA`, 区块奖励获得者20字节哈希值
  - `difficulty`: `QUANTITY` 该区块算力难度指数
  - `totalDifficulty`: `QUANTITY` - 全网算力难度指数
  - `extraData`: `DATA` - 该区块的额外数据.
  - `size`: `QUANTITY` - 该区块的容量.
  - `gasLimit`: `QUANTITY` - 该区块允许使用的最大 gas 值
  - `gasUsed`: `QUANTITY` - 该区块内所有交易使用的 gas 总和
  - `timestamp`: `QUANTITY` - 该区块被确认时的时间戳
  - `transactions`: `Array` - 交易的 hash 值列表.
  - `uncles`: `Array` 叔块的 hash 值列表.


##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"dcar_getBlockByHash","params":[" 0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d15c64b9 ", true],"id":1}' localhost:4242

// 输出结果
{
"id":1,
"jsonrpc":"2.0",
"result": {
    "number": "0x2db", // 731
    "hash": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d15c64b9 ",
    "parentHash": "0x9646252be9520f6e71339a8df9c55e4d7619deeb018d2a3f2d21fc165dd64cf3",
    "nonce": "0xe04d296d2460cfb8472af2c5fd05b5a214109c25688d3704aed5484f9a77c838",
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e3633e18",
    "stateRoot": "0xd5855eb08b3387c0af375e9cdb6acfc05eb8f519e419b874b6ff2ffda7ed1d01",
    "miner": "Dc4e65fda2159562a496f9f35228497af89122a308",
    "difficulty": "0x6cf3", // 27891
    "totalDifficulty":  "0x6cf3", // 27891
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "size":  "0x7ba5", // 31653
    "gasLimit": "0xe57d", // 58749
    "gasUsed": "0xe57d", // 58749
    "timestamp": "0x4eed454b" // 1324172619
    "transactions": [{...},{ ... }]
    "uncles": ["0x1606c4...", "0xd513fb7..."]
  }
}
```

***

#### dcar_getBlockByNumber

通过区块编号查询区块信息

##### 参数

1. `QUANTITY|TAG` - 区块编号, 或者字符串：`"earliest"`, `"latest"` or `"pending"`
2. `Boolean` - 如果结果为『ture』,返回该区块的全部交易数据；如果结果为『false』,只返回交易的 hash 值.

```js
params: [
   '0x29b', // 667
   true
]
```

##### 返回值

返回结果与 [dcar_getBlockByHash](#dcar_getblockbyhash)相同

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"dcar_getBlockByNumber","params":["0x29b", true],"id":1}' localhost:4242
```

结果与 [dcar_getBlockByHash](#dcar_getblockbyhash)相同

***

#### dcar_getTransactionByHash

返回值 the information about a transaction 请求ed by transaction hash.
通过交易的 hash 值查询交易信息

##### 参数

`DATA`, 32 字节的交易 hash 值

```js
params: [
   "0x06429689c0be688df01a7139479f3b252532c56795b733da78a91e4bf6ad39fa0"
]
```

##### 返回值

  - `Object` - 交易对象, 如果找不到则返回`null`

  - `blockHash`: `DATA`, 该交易所在区块的32字节 hash 值, 如果找不到则返回`null`.
  - `blockNumber`: `QUANTITY`  该交易所在区块的编号. 如果该区块处于挂起状态返回`null`.
  - `from`: `DATA`, 交易发起者的20字节地址.
  - `gas`: `QUANTITY`  gas 数量.
  - `gasPrice`: `QUANTITY`  gas 价格
  - `hash`: `DATA`, 32字节的交易 hash 值
  - `input`: `DATA`  伴随交易发送的数据
  - `nonce`: `QUANTITY`  交易发起者的随机数
  - `to`: `DATA`, 交易接收者的20字节地址 . 如果给交易是为了创建合约,此项返回`null`
  - `transactionIndex`: `QUANTITY` 该项交易在区块中的编号. 如果该区块处于挂起状态返回`null`.
  - `value`: `QUANTITY` 转账金额
  - `v`: `QUANTITY`  加密算法还原编号
  - `r`: `DATA`, 32 字节的加密算法签名 r
  - `s`: `DATA`, 32 字节的加密算法签名 s

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"dcar_getTransactionByHash","params":["088df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a7137fa6"],"id":1}' localhost:4242

// 输出结果
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"01d59ff54b1eb26b013ce3c3e61eb445bb8dfb5fc9dab3705b415a67127a003c2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"Dca7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xea60", // 60000
    "gasPrice":"0x2540be400", // 10000000000
    "hash":"088df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a7137fa6",
    "input":"0x68656c6c6d27",
    "nonce":"0x25", // 37
    "to":"Dcf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x3d", // 61
    "value":"0x4e20", // 200000
    "v":"0x25", // 37
    "r":"0xb405058b2d2457392da31b5e176d927f8e9ae20f328bcebc33eaac5fea16ddab",
    "s":"0x52f0125ad8b3c5c24ba66d1721c69724e8f69decef33019bac3249e2c0a21927"
  }
}
```

***

#### dcar_getTransactionByBlockHashAndIndex

返回值 information about a transaction by block hash and transaction index position.
通过交易所在区块的 hash 值以及交易所在区块中的编号来查询交易信息

##### 参数

1. `DATA`, 32 字节的区块哈希值
2. `QUANTITY` 交易在区块中的编号.

```js
params: [
   '0771606e55d6b4ca35a1e670ec64341a6b75ee36d15c64b9d5145a99d0592102',
   '0x0' // 0
]
```

##### 返回值

结果与 [dcar_getTransactionByHash](#dcar_gettransactionbyhash)相同

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"dcar_getTransactionByBlockHashAndIndex","params":["0771606e55d6b4ca35a1e670ec64341a6b75ee36d15c64b9d5145a99d0592102", "0x0"],"id":1}' localhost:4242
```

结果与[dcar_getTransactionByHash](#dcar_gettransactionbyhash)相同

***

#### dcar_getTransactionByBlockNumberAndIndex

返回值 information about a transaction by block number and transaction index position.
通过交易所在的区块编号以及交易所在区块中的编号来查询交易信息

##### 参数

1. `QUANTITY|TAG` - 区块编号,或者字符串 `"earliest"`, `"latest"` or `"pending"`
2. `QUANTITY` - 交易在区块中的编号
```js
params: [
   '0x1a8f', // 6799
   '0x0' // 0
]
```

##### 返回值

结果与[dcar_getTransactionByHash](#dcar_gettransactionbyhash)相同

##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"dcar_getTransactionByBlockNumberAndIndex","params":["0x1a8f", "0x0"],"id":1}' localhost:4242
```

结果与[dcar_getTransactionByHash](#dcar_gettransactionbyhash)相同

***

#### dcar_getTransactionReceipt

 通过交易的 hahs 值查询该笔交易的收据.

**注意** 此方法对挂起中的交易是无效的.


##### 参数

`DATA`, 32字节的交易 hash 值

```js
params: [
   '03d04e568238b5dc1ba6579132903239f854b143087c68db1b2168786408fcbc'
]
```

##### 返回值

  - `Object` 交易收据对象, 如果查询不到则返回`null`.
  - `transactionHash `: `DATA`, 32字节的交易 hash 值
  - `transactionIndex`: `QUANTITY` 交易在区块中的编号
  - `blockHash`: `DATA`, 该交易所在区块的32字节 hash 值
  - `blockNumber`: `QUANTITY` 该交易所在区块的编号
  - `from`: `DATA`, 交易发起者的20字节地址
  - `to`: `DATA`, 交易接受者的20字节地址,如果是创建合约的交易则返回`null`
  - `cumulativeGasUsed `: `QUANTITY ` 执行该交易累计花费的 gas 总量
  - `gasUsed `: `QUANTITY ` 单个交易花费的 gas 数量
  - `contractAddress `: `DATA`, 合约地址,如果没有创建合约,此项为`null`
  - `logs`: `Array` 该笔交易产生的 log 信息


还会返回 :

  - `root` : `DATA` 已提交的交易的32字节状态根数据
  - `status`: `QUANTITY` 成功返回 `1`  失败返回 `0`


##### 示例
```js
// 请求
curl -X POST -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"dcar_getTransactionReceipt","params":["03d04e568238b5dc1ba6579132903239f854b143087c68db1b2168786408fcbc"],"id":1}' localhost:4242

// 输出结果
{
"id":1,
"jsonrpc":"2.0",
"result": {
     transactionHash: '03d04e568238b5dc1ba6579132903239f854b143087c68db1b2168786408fcbc',
     transactionIndex:  '0x1', // 1
     blockNumber: '0x64', // 10
     blockHash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
     cumulativeGasUsed: '61a8', // 25000
     gasUsed: '0x514', // 1300
     contractAddress: '0xb60e8dd61c5d0870f0723315532be8058bb8eb97', // 如果没有创建合约则返回`null`
     logs: [{
         //  返回日志数据
     },..]
     status: '0x1'
        }
}
```

***



#### dcar_getLogs


查询所有匹配的关键字的日志信息
##### 参数

  - `Object` 过滤器对象
  - `fromBlock`: `QUANTITY|TAG`  (选填, 默认值: `"latest"`) 起始区块编号, 或者字符串： `"latest"`,`"pending"`, `"earliest"` .
  - `toBlock`: `QUANTITY|TAG` - (选填, 默认值: `"latest"`) 截止区块编号, 或者字符串： `"latest"`,`"pending"`, `"earliest"` .
  - `address`: `DATA|Array`, (选填)单个20字节的地址,或者一个地址列表,无论是合约地址还是钱包地址,都可以.
  - `topics`: `Array of DATA`,  (选填) 包含32字节“数据”主题的数组
  - `blockhash`:  `DATA`, (选填) 某个区块hash 地址,如果填写此项,`fromBlock`和`toBlock`就不必填写了.

```js
params: [{
  "topics": ["0x000000000000000000000000374fa86e6ebf0b97ca94f51533167ce5edbc8e27"]
}]
```

##### 返回值

***
- `Array` 日志对象数组,, 如果自上次查询以来没有任何更改,则为空数组


- 设置过滤器的参数如下

  - `removed`: `TAG` - 如果日志被移除则为`ture`,  如果是有效日志则为`false` .
  - `logIndex`: `QUANTITY` 日志在区块中的编号.
  - `transactionIndex`: `QUANTITY`  日志创建时交易在日志中的索引编号.如果日志挂起状态则返回 `null` .
  - `transactionHash`: `DATA`, 该笔交易的 hash 值,如果日志挂起状态则返回 `null` .
  - `blockHash`: `DATA`, 日志所在区块的 hash 值,如果区块挂起,或者日志处于挂起则返回 `null`.
  - `blockNumber`: `QUANTITY` . 日志所在的区块编号,如果区块挂起,或者日志处于挂起则返回 `null`.
  - `address`: `DATA`, 日志指向的20字节交易地址
  - `data`: `DATA` -包含在日志中的非索引参数.
  - `topics`: `Array of DATA` 数组中的数据

  ##### 示例
```js
  // 请求
  curl -X POST -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"dcar_getLogs","params":[{"topics":["0x000000000000000000000000374fa86e6ebf0b97ca94f51533167ce5edbc8e27"]}],"id":74}' localhost:4242
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x2bb", // 699
    "blockHash": "08216c5785ac562ff41e2dcfdf5785a59ebeb90bc63057c562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0df829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "Dc16c5785ac562ff41142f1fccd7de2dcfdf829c5a",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0xb65156eced59ebeb90bc63057636878c9a573c3ecf9438e5058bca0f92585014"]
    },{
      ...
    }]
}
```

***

### Change log
- 20180925 Tommy 创建
- 20180926 Tommy 修复 curl 命令
