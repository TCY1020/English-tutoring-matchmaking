# English-tutoring-matchmaking(英文家教媒合平台)
![English-tutoring-matchmaking-首頁](./public/image/Recording%202023-10-10%20at%2016.08.00.gif)
[English-tutoring-matchmaking-ERD](https://www.figma.com/file/Urh3EQpDw1LlAVYEld9h4T/Untitled?type=design&node-id=0%3A1&mode=design&t=eV89KI8KJzJIvFZl-1)
## 介紹

英文家教媒合，使用者可選擇學生或老師的身分，依據不同身分會有不同的介面與功能(如學生可以選課，老師可以開課)
### 功能
* 區分三種身分，學生、老師、管理者(註冊預設為學生)
* 學生與老師可以修改個人資料及頭像
* 學生可以選課(一個課程時段只能給一個學生選擇)、已上過課程評分、留言
* 老師可以開課、可以選課程長度(30、60分鐘)、看到學生的評分及流言
* 學生可以在自己的個人頁面知道尚未上的課程及上過尚未評分的老師
* 老師可以在自己的個人頁面看到已被預約的課程及知道學生的評分及留言
## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：
  ```
  npm install
  ```
4. 與自己的資料庫連接之後，請繼續輸入：
  ```
  npx sequelize db:migrate
  npx sequelize db:seed:all
  ```
5. nodemon啟動
  ```
  npm run dev
  ```
8. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
  ```
  Example app listening on http://localhost:3000/
  ```
9. 若欲暫停使用
  ```
  ctrl + c
  ```
### 測試帳號
若種子資料創建成功，可使用測試帳號:
+ admin(root):
  - 帳號: root@example.com
  - 密碼: 12345678
+ 使用者1(user1):
  - 身分: 學生
  - 帳號: user1@example.com
  - 密碼: 12345678 
+ 使用者2(user2):
  - 身分: 學生
  - 帳號: user2@example.com
  - 密碼: 12345678 
+ 使用者3(user3):
  - 身分: 學生
  - 帳號: user3@example.com
  - 密碼: 12345678 
+ 使用者4(user4):
  - 身分: 老師
  - 帳號: user4@example.com
  - 密碼: 12345678 
+ 使用者4(user5):
  - 身分: 老師
  - 帳號: user5@example.com
  - 密碼: 12345678 

## 開發工具

* "MySQL Workbench 8.0 CE",
* "figma",
