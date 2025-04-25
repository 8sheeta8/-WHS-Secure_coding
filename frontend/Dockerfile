# React 빌드용
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 빌드된 정적 파일만 nginx로 복사
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
