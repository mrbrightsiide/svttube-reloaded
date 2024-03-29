# SVTtube
바닐라 javacript를 사용하여 만든 유튜브 클론코딩입니다.  
<b>NodeJS, Express.js, webpack, SCSS</b>를 사용하였습니다.</br></br>


## Link
📌 https://svttube.herokuapp.com/</br></br>
<img src="https://user-images.githubusercontent.com/90305737/192520355-e8d72311-acd4-4201-af53-3ed110ab3b91.png" width="700"/></br></br>
## Description
**✔ 파일 구조**
```bash
├────── client
│   ├── controllers
│   ├── models
│   ├── routers
│   ├── scss
│   ├── utils
│   └── views
├── db.js
├── init.js
├── middlewares.js
└── server.js
```

</br>**✔ URL**
```bash
/ -> Home

/join -> Join
/login -> Login
/search -> Search

/users/:id -> See User
/users/logout -> Log out
/usere/edit -> Edit user profile
/users/delete -> Delete user

/videos/:id -> See video
/videos/:id/edit -> Edit video
/videos/:id/delete -> Delete video
/videos/upload -> Upload video
```
</br>**✔ 구현**
- <b>ffmpeg</b> 라이브러리를 사용하여 썸네일을 추출하고, 촬영한 비디오를 변환하여 다운로드하는 기능을 구현했습니다.
- 바닐라javascript로 <b>class문법</b>과 <b>fetch</b>를 사용하여 비디오 메뉴변경을 싱글 페이지 내에서 구현하였습니다.
<img src="https://user-images.githubusercontent.com/90305737/192525070-47fb6ee6-07f8-4516-9b71-fd7ed6a36446.gif" width="500"/></br></br>
- fetch를 사용하여 싱글 페이지 내에서 댓글 작성하기, 영상 조회수 카운트를 구현하였습니다.
- SCSS로 <b>반응형 레이아웃</b>을 구현하였습니다.
  
</br>**✔ 기능**
- 유저 로그인, 회원가입, github로 회원가입, 유저 프로필 수정
- 영상 업로드, 영상 수정, 영상 녹화 후 다운로드

</br>**✔ 트러블 슈팅**  
- [[Javascript] 비디오 플레이어의 재생바와 볼륨을 Input range로 커스텀하기](https://luckymeandu.tistory.com/25)
- [[Javascript] pug 템플릿 내에 불러온 script에 변수 전달하기](https://luckymeandu.tistory.com/26)
