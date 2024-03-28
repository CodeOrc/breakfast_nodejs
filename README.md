# breakfast_nodejs 檔案說明
## 簡介
以nodeJS製作的簡易api，可藉由不同路由，串接mySQL資料庫進行提取資料及修改資料的功能。

## 資料
-位於data資料夾
breakfastDB.sql為MySQL匯出資料表
postman_collection為postman測試路由檔案

## 功能
- [GET] /product
  取得全部資料
  request query
    - page 所在頁數
    - category 指定產品類別id，沒有指定則取全部類別。
    - count 每頁幾筆資料，無指定預設為25。
      
- [GET] /product/[id]
  取得單筆資料，由產品id取得單筆產品資料。
  
- [POST] /product
  新增產品資料
  formdata
  - product_name 產品名
  - price 價格
  - desc 描述
  - category_id 產品類別
  - picture 圖片檔案
- [PUT] /product
  編輯產品資料
  - product_name 產品名
  - price 價格
  - desc 描述
  - category_id 產品類別
  
- [PUT] /product
  編輯產品圖片
  formdata
  - picture:圖片檔案
  
- [DELETE] /product
  變更產品的供應狀態，1或0。
  request query
  - p_id 產品id
    
- [DELETE] /product/deleteProduct
  確切從資料庫刪除產品資料
  request query
  - p_id 產品id
