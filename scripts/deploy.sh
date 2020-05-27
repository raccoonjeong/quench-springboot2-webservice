#!/bin/bash
mkdir -p $REPOSITORY/logDir

REPOSITORY=/home/ec2-user/app/step2
PROJECT_NAME=quench-springboot2-webservice

echo "> Build 파일 복사"
cp $REPOSITORY/zip/*.jar $REPOSITORY/
mkdir -p $REPOSITORY/logDir/1

echo "> 현재 구동 중인 애플리케이션 PID 확인"
mkdir -p $REPOSITORY/logDir/2

CURRENT_PID=$(pgrep -fl quench-springboot2-webservice | grep jar | awk '{print $1}')

echo "> 현재 구동 중인 애플리케이션 PID: $CURRENT_PID"
mkdir -p $REPOSITORY/logDir/3

if [ -z "$CURRENT_PID" ]; then
  echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
  mkdir -p $REPOSITORY/logDir/4_1
else
  echo "> kill -9 $CURRENT_PID"
  mkdir -p $REPOSITORY/logDir/4_2
  kill -9 $CURRENT_PID
  sleep 5
fi

echo "> 새 애플리케이션 배포~"
mkdir -p $REPOSITORY/logDir/5

JAR_NAME=$(ls -tr $REPOSITORY/*.jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"
mkdir -p $REPOSITORY/logDir/6

echo "> $JAR_NAME 에 실행권한 추가"
mkdir -p $REPOSITORY/logDir/7

chmod +x $JAR_NAME

echo "> $JAR_NAME 실행"
mkdir -p $REPOSITORY/logDir/8

nohup java -jar -Dspring.profiles.active=real -Dspring.config.location=classpath:/application-real.yml,/home/ec2-user/app/application-oauth.yml,/home/ec2-user/app/application-real-db.yml $JAR_NAME > $REPOSITORY/nohup.out 2>&1 &
mkdir -p $REPOSITORY/logDir/9