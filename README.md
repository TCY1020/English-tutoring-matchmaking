# English-tutoring-matchmaking(英文家教媒合平台)
![English-tutoring-matchmaking-首頁](./public/image/Recording%202023-10-10%20at%2016.08.00.gif)
## 介紹

記錄屬於自己的帳戶支出，使用者可以登入帳戶、記錄支出、新增及刪除支出、依照分類瀏覽支出狀況。
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

* "@faker-js/faker": "^8.1.0",
* "bcryptjs": "^2.4.3",
* "connect-flash": "^0.1.1",
* "dayjs": "^1.11.10",
* "express": "^4.17.1",
* "express-handlebars": "^7.1.2",
* "express-session": "^1.17.3",
* "imgur": "^1.0.2",
* "method-override": "^3.0.0",
* "multer": "^1.4.3",
* "mysql2": "^3.6.1",
* "passport": "^0.4.1",
* "passport-facebook": "^3.0.0",
* "passport-local": "^1.0.0",
* "sequelize": "^6.33.0",
* "sequelize-cli": "^6.6.1"