# 保險理賠 區塊鏈 API

## Table of Contents
  * [部署到自己的電腦](#部署到自己的電腦)
  * [在自己電腦開發](#在自己電腦開發)
  * [Web API 程式目錄結構](#WebAPI程式目錄結構)
  * [部署到測試環境](#部署到測試環境)

## 部署到自己的電腦
  * Blockchain
  * Web API
    ``` bash
    cd ics-chain-api/
    npm install #安裝 node packages
    swagger project start #啟動 Web API 服務
    #API 服務位置：http://localhost:10010/api
    ```

## 在自己電腦開發
  * Blockchain
  * Web API
    ``` bash
    cd ics-chain-api/
    code . #使用 Visual Studio Code 開啟目錄， 或用自己習慣的 Node.JS 編輯器

    swagger project edit #啟動 Web API 編輯器
    ```

## Web API 程式目錄結構
  ``` bash
  \api
    \controllers #request handling 呼叫共用函式，資料組裝，回傳狀態
    \helpers #本專案專屬的共用函式庫(外部輸出資料處理)
    \mocks
    \swagger #OpenAPI-Specification v2.0, route -> controller mapping 也在這設定
  \config #設定檔
  \lib #本專案專屬的共用函式庫(內部邏輯資料處理)
    blockchain_integartion.js #區塊鏈整合
    task_queue.js #工作佇列, 批次執行
  \test #測試
    \api
      \helper #本專案專屬的共用函式庫(外部輸出資料處理)
    \lib #測試本專案專屬的共用函式庫(內部邏輯資料處理)
      blockchain_integartion.js #區塊鏈整合
      task_queue.js #工作佇列, 批次執行
  app.js #主程式
  packages.json #node packages
  README.md #本說明文件
  ```

## 部署到測試環境
  * Blockchain
  * Web API