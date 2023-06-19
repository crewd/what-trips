# 어떤 여행

<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/nestjs-E0234E?style=flat&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeOrm-white?style=flat"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178c6?style=flat&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazonaws&logoColor=white">

## 🔎 About

여행 일정을 관리하는 API입니다.

회원가입, 로그인 기능과 여행, 일정, 장소를 관리할 수 있습니다.

## 📄 [API](http://ec2-43-206-46-14.ap-northeast-1.compute.amazonaws.com:3000/)

[API Swagger](http://ec2-43-206-46-14.ap-northeast-1.compute.amazonaws.com:3000/api)

### User

- POST `/user/login` 로그인

- POST `/user/signup` 회원가입

### Trip

- GET `/trip/list` 여행 목록 조회

- POST `/trip/add` 여행 추가

- GET `/trip/{tripId}` 여행 상세

- PATCH `/trip/{tripId}` 여행 수정

- DELETE `/trip/{tripId}` 여행 삭제

### Plan

- GET` /trip/{tripId}/plan` 일정 목록 조회

- POST `/trip/{tripId}/plan` 일정 추가

- PATCH `/plan/{planId}` 일정 체크여부 수정

- DELETE `/plan/{planId}` 일정 삭제

### Place

- POST `/trip/{tripId}/place` 장소 추가

- GET `/trip/{tripId}/place` 장소 목록

- DELETE `/place/{placeId}/delete` 장소 삭제
